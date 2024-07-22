import authService from "@/api/AuthService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { revalidateUser } from "@/utils/action";

const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: any) => authService.login(data),
    onError: (msg) => {
      if (msg instanceof AxiosError) {
        toast.error(msg.response?.data.message || "Login failed");
        if (msg.response?.data.error === "NOT_VERIFIED") {
          router.push("/verification");
        }
      }
    },
    onSuccess: () => {
      toast.success("Login successfully");
      revalidateUser("/");
    },
  });
};

const useSingUp = () => {
  return useMutation({
    mutationFn: (data: any) => authService.signup(data),
  });
};

const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success("Logout successfully");
      revalidateUser("/login");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
};

const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: any) => authService.verifyEmail(data),
  });
};

const useGetVerificationCode = () => {
  return useMutation({
    mutationFn: (data: any) => authService.getVerificationCode(data),
  });
};

export {
  useLogin,
  useSingUp,
  useLogout,
  useVerifyEmail,
  useGetVerificationCode,
};
