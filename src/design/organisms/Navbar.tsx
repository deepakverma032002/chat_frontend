"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../atoms/button";
import { LogOut, MessagesSquare } from "lucide-react";
import { useSession } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../atoms/dropdown-menu";
import { useLogout } from "@/hooks/useAuthService";

const Navbar = () => {
  const { isLogin, session } = useSession();
  const { mutate: logout } = useLogout();

  return (
    <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <h1 className="text-black dark:text-white font-bold text-2xl items-center flex gap-1">
              <MessagesSquare /> Chat Application
            </h1>
          </Link>
        </div>
        <div className="hidden lg:block">
          {isLogin && (
            <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear text-base font-medium">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear text-base font-medium">
                <Link href="#">About</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear text-base font-medium">
                <Link href="#">Contact</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="hidden lg:flex lg:items-center gap-x-2">
          {!isLogin ? (
            <>
              {" "}
              <Button variant={"ghost"} asChild>
                <Link href={"/signup"}>Sign up</Link>
              </Button>
              <Button asChild>
                <Link href={"/login"}>Login</Link>
              </Button>{" "}
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-1 items-center">
                  <Avatar>
                    <AvatarImage src={session?.image} alt={session?.email} />
                    <AvatarFallback>
                      {`${session?.firstName.at(0)}${session?.lastName.at(0)}`}
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-slate-800 dark:text-white text-sm">
                    {session?.firstName} {session?.lastName}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer flex gap-1"
                    onClick={() => logout()}
                  >
                    <LogOut size={16} /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        <div className="flex items-center justify-center lg:hidden">
          <button className="focus:outline-none text-slate-200 dark:text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="text-2xl text-slate-800 dark:text-white focus:outline-none active:scale-110 active:text-red-500"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
