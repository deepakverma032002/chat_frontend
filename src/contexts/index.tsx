"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Zoom } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./AuthContext";

const queryClient = new QueryClient();

interface RootContextProps extends PropsWithChildren {
  session?: User;
}

const RootContext: React.FC<RootContextProps> = ({ children, session }) => {
  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID || ""}
      >
        <AuthContextProvider session={session}>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Zoom}
          />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default RootContext;
