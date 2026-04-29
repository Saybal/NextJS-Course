import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute top-5">
        <Link className={buttonVariants({ variant: "secondary" })} href="/">
          <ArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </>
  );
}
