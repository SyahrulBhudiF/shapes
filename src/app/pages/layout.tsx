"use client";

import React from "react";

import { Progress } from "@/components/ui/progress";

export function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center p-8 pt-6">
      <Progress value={progress} className="w-[60%]" />
      {children}
    </div>
  );
}
export default Layout;
