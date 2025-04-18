import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { cn } from "@/lib/utils";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
}

export const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  onChange,
  required = false,
  min,
}: FormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
              className={cn("w-full py-5", errors[name] && "border-red-500")}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              min={min}
              required={required}
            />
            <ErrorMessage
              name={name}
              render={({ message }) => (
                <p className="text-red-500 text-sm mt-1">{message}</p>
              )}
            />
          </div>
        )}
      />
    </div>
  );
};
