"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { createTeam, updateTeam, deleteTeam } from "@/services/team";
import { Team } from "@/types";
import toast from "react-hot-toast";
import { getSportById } from "@/services/sport";
import { uploadImage } from "@/utils"; // Import the upload function

const SportsDetailPage = ({ params }: { params: { id: string } }) => {
  const { id: sportId } = params;
  const queryClient = useQueryClient();
  const [teamName, setTeamName] = useState("");
  const [teamType, setTeamType] = useState<"general" | "school">("general");
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch sport details
  const { data: sport, isLoading: sportLoading } = useQuery({
    queryKey: ["sport", sportId],
    queryFn: () => getSportById(sportId),
  });

  // Fetch teams for the sport
  // const { data: teams, isLoading: teamsLoading } = useQuery({
  //   queryKey: ["teams", sportId],
  //   queryFn: () => getTeamsBySport(sportId),
  // });

  const addMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["teams", sportId] }),
    onError: () => toast.error("Failed to add team"),
  });

  const updateMutation = useMutation({
    mutationFn: updateTeam,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["teams", sportId] }),
    onError: () => toast.error("Failed to update team"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["teams", sportId] }),
    onError: () => toast.error("Failed to delete team"),
  });

  // Handle Image Upload via Drag and Drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setTeamImage(file);
      setPreviewImage(URL.createObjectURL(file));
    },
  });

  const handleSave = async () => {
    let uploadedImageUrl = editingTeam?.imageUrl || ""; // Keep existing image if editing

    if (teamImage) {
      try {
        uploadedImageUrl = await uploadImage(teamImage); // Upload and get URL
      } catch (error) {
        toast.error("Image upload failed!");
        return;
      }
    }

    const teamData = {
      name: teamName,
      type: teamType,
      sport: sportId,
      imageUrl: uploadedImageUrl,
    };

    if (editingTeam) {
      updateMutation.mutate({ id: editingTeam._id, teamData });
    } else {
      addMutation.mutate(teamData);
    }

    // Reset Fields
    setTeamName("");
    setTeamType("general");
    setTeamImage(null);
    setPreviewImage(null);
    setEditingTeam(null);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setTeamName(team.name);
    setTeamType(team.type);
    setPreviewImage(team.imageUrl || null);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleAdd = () => {
    setEditingTeam(null);
    setTeamName("");
    setTeamType("general");
    setPreviewImage(null);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      deleteMutation.mutate(id);
    }
  };

  if (sportLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Sport Details */}
      <div className="flex space-x-4">
        <Image
          src={sport?.imageUrl || "/default-sport.png"}
          width={300}
          height={200}
          className="rounded-md"
          alt={sport?.name || "Image"}
        />
        <div className="h-full gap-3 flex flex-col">
          <h1 className="text-2xl font-bold">{sport?.name}</h1>
          <p className="text-gray-500 text-xl font-medium italic">
            #{sport?._id}
          </p>
        </div>
      </div>

      {/* Teams Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teams</h2>
        <Button onClick={handleAdd}>Add Team</Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTeam ? "Edit Team" : "Add a New Team"}
              </DialogTitle>
            </DialogHeader>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
            <select
              className="border p-2 mt-2"
              value={teamType}
              onChange={(e) =>
                setTeamType(e.target.value as "general" | "school")
              }
            >
              <option value="general">General</option>
              <option value="school">School</option>
            </select>

            {/* Drag & Drop Image Upload */}
            <div
              {...getRootProps()}
              className="border-2 min-h-24 border-dashed p-4 mt-4 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {previewImage ? (
                <Image
                  src={previewImage}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="mx-auto"
                />
              ) : (
                <p>Drag & drop an image, or click to select one</p>
              )}
            </div>

            <Button onClick={handleSave}>
              {editingTeam ? "Update" : "Save"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Teams List */}
      {/* {teams?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teams?.map((team) => (
            <Card key={team._id}>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={team.imageUrl || "/default-team.png"}
                  width={100}
                  height={100}
                  className="rounded-md"
                  alt={team.name}
                />
                <p className="text-gray-600">Type: {team.type}</p>
                <div className="flex justify-between mt-3">
                  <Button onClick={() => handleEdit(team)}>Edit</Button>
                  <Button onClick={() => handleDelete(team._id)}>
                    <Trash2 />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mt-4">
            No teams created for this sport yet!
          </p>
        </div>
      )} */}
    </div>
  );
};

export default SportsDetailPage;
