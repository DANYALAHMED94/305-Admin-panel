"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamFull } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeam } from "@/services/team";
import toast from "react-hot-toast";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface TeamTableProps {
  teams: TeamFull[] | undefined;
  onEdit: (team: TeamFull) => void;
}

const TeamTable: React.FC<TeamTableProps> = ({ teams = [], onEdit }) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
    onError: () =>
      toast.error(
        "There was an error deleting the team! Please try again later."
      ),
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Teams</h2>
        <Input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

      {teams.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No teams created yet.</p>
      ) : filteredTeams.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          No teams match your search.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="w-full border rounded-lg">
            <TableHeader className="bg-gray-100 text-gray-700">
              <TableRow>
                <TableCell className="py-3 px-4 font-medium">Poster</TableCell>
                <TableCell className="py-3 px-4 font-medium">Name</TableCell>
                <TableCell className="py-3 px-4 font-medium">Type</TableCell>
                <TableCell className="py-3 px-4 font-medium">
                  Category
                </TableCell>
                <TableCell className="py-3 px-4 font-medium">
                  Is Super7 ?
                </TableCell>
                <TableCell className="py-3 px-4 font-medium text-center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.map((team) => (
                <TableRow
                  key={team._id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell className="py-3 px-4">
                    <Image
                      src={team?.imageUrl || "/placeholder.png"}
                      alt={team.name}
                      width={60}
                      height={60}
                      className="object-cover rounded-md shadow-sm"
                    />
                  </TableCell>
                  <TableCell className="py-3 px-4 font-medium">
                    {team.name}
                  </TableCell>
                  <TableCell className="py-3 px-4">{team.type}</TableCell>
                  <TableCell className="py-3 px-4">
                    {team.category?.name || "N/A"}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {team.isSuper7 ? (
                      <Badge>Yes</Badge>
                    ) : (
                      <Badge variant={"outline"}>No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="py-3 px-4 flex items-center justify-center gap-3">
                    <Button
                      onClick={() => onEdit(team)}
                      variant="outline"
                      size="icon"
                      className="hover:bg-blue-100"
                    >
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(team._id)}
                      variant="destructive"
                      size="icon"
                      className="hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4 " />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TeamTable;
