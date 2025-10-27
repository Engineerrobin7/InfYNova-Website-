"use client";

import { User } from "lucide-react";
import { Button } from "./ui/button";

export function UserProfile() {
  return (
    <Button variant="ghost" size="icon" aria-label="User profile">
      <User className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}