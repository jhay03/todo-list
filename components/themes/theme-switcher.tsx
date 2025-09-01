"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const iconDisplay = theme === "light" ? <Moon /> : <Sun />;

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleSwitch}
        className="text-lg hover:bg-gray-700 rounded-md px-3 py-2"
      >
        {iconDisplay}
      </Button>
    </>
  );
}
