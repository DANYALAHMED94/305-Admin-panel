"use client";

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TeamFull } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface TeamSelectProps {
  name: string;
  label: string;
  teams: TeamFull[];
}

const TeamSelect: React.FC<TeamSelectProps> = ({ name, label, teams }) => {
  const { control } = useFormContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Select Teams
            <Search className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredTeams.map((team) => (
                <div
                  key={team._id}
                  className="flex items-center py-1 space-x-2"
                >
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value?.includes(team._id)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), team._id]
                            : field.value?.filter(
                                (id: string) => id !== team._id
                              );
                          field.onChange(updatedValue);
                        }}
                      />
                    )}
                  />
                  <Label>{team.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TeamSelect;
