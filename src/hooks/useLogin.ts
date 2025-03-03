import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// ✅ Define Validation Schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// ✅ TypeScript Type for Form Fields
type LoginFormInputs = z.infer<typeof loginSchema>;

// ✅ API Call Simulation (Replace with actual API request)
const loginUser = async (data: LoginFormInputs) => {
  return new Promise<{ success: boolean }>((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  );
};

// ✅ Custom Hook for Login
export const useLogin = () => {
  const router = useRouter();

  // ✅ Setup React Hook Form
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Setup Mutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/dashboard"); // 🔥 Redirect on success
    },
  });

  // ✅ Submit Handler
  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  };

  return { form, mutation, onSubmit };
};
