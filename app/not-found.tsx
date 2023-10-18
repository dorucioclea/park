"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <div className="text-sm text-center">
        <h2 className="text-xl">404 | Page Not Found</h2>
        {process.env.NODE_ENV === "development" && (
          <p className="text-muted-foreground flex">
            It's possible you deleted the page&nbsp;
            <b>{pathname.replace("/", "")}</b>
          </p>
        )}
      </div>
      <Button>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
