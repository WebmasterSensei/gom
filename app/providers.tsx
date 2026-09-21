"use client";

import { AppwriteProvider } from "@appwrite.io/react";
import { appwriteConfig } from "@/lib/appwrite";

export function Providers({
  session,
  children,
}: {
  session?: string | null;
  children: React.ReactNode;
}) {
  return (
    <AppwriteProvider
      endpoint={appwriteConfig.endpoint}
      projectId={appwriteConfig.projectId}
      ssr={{ session, basePath: "/api/appwrite" }}
    >
      {children}
    </AppwriteProvider>
  );
}