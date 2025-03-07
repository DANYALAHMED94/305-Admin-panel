import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  onChange,
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2 ">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={name}
            placeholder={placeholder}
            type={type}
            className="w-full py-5"
            onChange={(e) => {
              field.onChange(e); // React Hook Form update
              onChange?.(e); // Custom onChange function (if provided)
            }}
          />
        )}
      />
    </div>
  );
};
