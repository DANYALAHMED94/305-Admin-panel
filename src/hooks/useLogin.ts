import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { loginUser } from "@/services/auth";
import { useAuthStore } from "@/components/providers/AuthStoreProvider";

// ✅ Define Validation Schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// ✅ TypeScript Type for Form Fields
type LoginFormInputs = z.infer<typeof loginSchema>;

// ✅ Custom Hook for Login
export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuthStore((state) => state);

  // ✅ Setup React Hook Form
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Setup Mutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user, data.token);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    },
  });

  // ✅ Submit Handler
  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  };

  return { form, mutation, onSubmit };
};
