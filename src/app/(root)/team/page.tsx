"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TeamTable from "@/components/team/TeamTable";
import TeamModal from "@/components/team/TeamModal";
import { TeamFull } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getAllTeams } from "@/services/team";
import LoadingBall from "@/components/global/LoadingBall";

const TeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamFull | null>(null);

  const { data: teams, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });

  const handleOpenModal = (team: TeamFull | null = null) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  if (isLoading) return <LoadingBall />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Teams</h1>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600">
          Add Team
        </Button>
      </div>

      <TeamTable teams={teams} onEdit={handleOpenModal} />

      {isModalOpen && (
        <TeamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          team={editingTeam}
        />
      )}
    </div>
  );
};

export default TeamPage;
