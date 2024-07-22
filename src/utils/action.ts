"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// Server actions are here

export const revalidateUser = async (path: string) => {
  revalidateTag("user-data");
  redirect(path || "/");
};
