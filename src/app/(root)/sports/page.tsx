"use client";
import React, { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getAllSports,
  addSport,
  updateSport,
  deleteSport,
} from "@/services/sport";
import { uploadImage } from "@/utils";
import { Sport } from "@/types";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const SportsPage = () => {
  const queryClient = useQueryClient();
  const {
    data: sports,
    isLoading,
    error,
  } = useQuery({ queryKey: ["sports"], queryFn: getAllSports });

  const addMutation = useMutation({
    mutationFn: addSport,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sports"] }),
    onError: () => toast.error("Error adding a new sport!"),
  });

  const updateMutation = useMutation({
    mutationFn: updateSport,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sports"] }),
    onError: () => toast.error("Error updating the sport!"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSport,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sports"] }),
    onError: () => toast.error("Error deleting the sport!"),
  });

  const [sportName, setSportName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingSport, setEditingSport] = useState<Sport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleSave = async () => {
    let imageUrl = editingSport?.imageUrl || "";

    if (image) {
      imageUrl = await uploadImage(image);
    }

    if (editingSport) {
      updateMutation.mutate({
        _id: editingSport._id,
        name: sportName,
        imageUrl,
      });
    } else {
      addMutation.mutate({ name: sportName, imageUrl });
    }

    setSportName("");
    setImage(null);
    setEditingSport(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const toBeDeleted = sports?.find((s) => s._id === id);
    if (!confirm(`Are you sure you want to delete ${toBeDeleted?.name}?`))
      return;
    deleteMutation.mutate(id);
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading sports...</p>;
  if (error) return <p className="text-red-500">Error loading sports</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sports</h1>
        <Button
          onClick={() => {
            setEditingSport(null);
            setSportName("");
            setIsModalOpen(true);
          }}
        >
          Add Sport
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSport ? "Edit Sport" : "Add a New Sport"}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            placeholder="Enter sport name"
          />
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>
                {image
                  ? image.name
                  : "Drag & drop an image, or click to select"}
              </p>
            )}
          </div>
          <Button
            onClick={handleSave}
            disabled={addMutation.isPending || updateMutation.isPending}
          >
            {editingSport ? "Update" : "Save"}
          </Button>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sports?.map((sport) => (
          <Card key={sport._id}>
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href={`/sports/${sport._id}`}>{sport.name}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                width={200}
                height={150}
                src={sport?.imageUrl || "/default-sport-image.webp"}
                alt={sport.name}
                className="h-44 w-full object-cover rounded-md"
              />
              <div className="flex py-2 items-center justify-between">
                <Button
                  onClick={() => {
                    setEditingSport(sport);
                    setSportName(sport.name);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(sport._id)}>
                  <Trash2 />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SportsPage;
