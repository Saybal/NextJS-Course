"use client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Ghost } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <nav className="flex items-center justify-between w-full py-5">
      {/* Logo */}
      <div className="text-3xl font-bold">
        <Link href="/">
          <h1>
            Draft <span className="text-blue-400"> Lab</span>
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <Link className={buttonVariants({ variant: "ghost" })} href="/">
          Home
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/blogs">
          Blogs
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/create">
          Create
        </Link>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isLoading ? null : isAuthenticated ? (
          <>
            <Link className={buttonVariants()} href="/" onClick={() => authClient.signOut({})}>
              LogOut
            </Link>
          </>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/login">
              Login
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/auth/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
