"use client";
import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CategorySelector from "@/components/team/CategoryTree";
import { createTeam, updateTeam } from "@/services/team";
import { TeamFull } from "@/types";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { uploadImage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategorySelectorDropdown from "./CategorySelectorDropdown";
import { Checkbox } from "@/components/ui/checkbox"; // Add this import

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: TeamFull | null;
}

const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, team }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"general" | "school">("general");
  const [category, setCategory] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSuper7, setIsSuper7] = useState(false); // Add this state

  const queryClient = useQueryClient();

  useEffect(() => {
    if (team) {
      setName(team.name);
      setType(team.type);
      setCategory(team?.category?._id || null);
      setImageUrl(team.imageUrl || null);
      setIsSuper7(team.isSuper7 || false); // Initialize from team if it exists
    } else {
      setName("");
      setType("general");
      setCategory(null);
      setImageUrl(null);
      setIsSuper7(false); // Default to false for new teams
    }
  }, [team]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploading(true);
      const uploadedImageUrl = await uploadImage(acceptedFiles[0]);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
      }
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Mutation for creating/updating a team
  const { mutate: saveTeam, isPending } = useMutation({
    mutationFn: async () => {
      if (!name || !category || !imageUrl) return;
      const teamData = { name, type, category, imageUrl, isSuper7 }; // Include isSuper7 in teamData

      return team
        ? updateTeam({ id: team._id, teamData })
        : createTeam(teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] }); // Refresh teams
      onClose();
    },
    onError: (error) => {
      console.error("Error saving team", error);
    },
  });

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30 bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {team ? "Edit Team" : "Add Team"}
            </Dialog.Title>

            {/* Team Name Input */}
            <Input
              placeholder="Team Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Type Selection */}
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as "general" | "school")}
              className="my-4 "
            >
              <div className="flex items-center space-x-4">
                <RadioGroupItem value="general" id="general" />
                <label htmlFor="general" className="text-sm font-medium">
                  General
                </label>
                <RadioGroupItem value="school" id="school" />
                <label htmlFor="school" className="text-sm font-medium">
                  School
                </label>
              </div>
            </RadioGroup>

            {/* Category Selector */}
            <CategorySelectorDropdown
              selectedCategory={category}
              onSelect={setCategory}
            />

            {/* Super 7 Checkbox */}
            <div className="flex items-center space-x-2 my-4">
              <Checkbox
                id="super7"
                checked={isSuper7}
                onCheckedChange={(checked) => setIsSuper7(checked as boolean)}
              />
              <label
                htmlFor="super7"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Do you want to add this team to the super 7?
              </label>
            </div>

            {/* Drag & Drop Upload Section */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center justify-center cursor-pointer mt-4"
            >
              <input {...getInputProps()} />
              {uploading ? (
                <p className="text-sm text-gray-600">Uploading...</p>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="w-10 h-10 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Drag & Drop or Click to Upload
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => saveTeam()}
                disabled={isPending || uploading}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TeamModal;
