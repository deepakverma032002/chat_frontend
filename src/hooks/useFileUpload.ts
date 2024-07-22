import authService from "@/api/AuthService";
import CoreApiService from "@/api/CoreApiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useFileUpload = () => {
  const [progress, setProgress] = useState<number>(0);

  const { data: res } = useQuery({
    queryKey: ["getPreSignedUrl"],
    queryFn: authService.getPreSignedUrl,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return CoreApiService.post<{ secureUrl: string }>(
        res?.result.url || "",
        { file: data },
        {
          withCredentials: false,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent) return;
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(percentCompleted);
          },
        }
      );
    },
  });

  return { ...mutation, progress, setProgress };
};

export { useFileUpload };
