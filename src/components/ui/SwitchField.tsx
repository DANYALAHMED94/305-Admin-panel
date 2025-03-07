"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Switch from "react-switch";
import { Label } from "@/components/ui/label";

interface SwitchFieldProps {
  name: string;
  label: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onChange={(checked) => field.onChange(checked)}
            onColor="#3b82f6" // Blue color when checked
            offColor="#d1d5db" // Gray color when unchecked
            checkedIcon={false} // No icon when checked
            uncheckedIcon={false} // No icon when unchecked
            height={20} // Height of the switch
            width={40} // Width of the switch
          />
        )}
      />
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default SwitchField;
