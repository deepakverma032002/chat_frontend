"use client";

import { useSession } from "@/contexts/AuthContext";
import React from "react";

const HomeTemplate = () => {
  const { session } = useSession();

  return <div>Home Template</div>;
};

export default HomeTemplate;
