import { createNextServerHelpers } from "@appwrite.io/react/server/next";
import { appwriteConfig } from "./appwrite";

const serverConfig = {
  endpoint: appwriteConfig.endpoint,
  projectId: appwriteConfig.projectId,
};

/**
 * Server-side Auth helpers (Next.js App Router).
 * Reads the session from the HTTP-only cookie and returns the current user.
 * Used to gate admin pages: redirect to /login when null.
 */
export async function getCurrentUser() {
  try {
    const helpers = createNextServerHelpers(serverConfig);
    return await helpers.getLoggedInUser();
  } catch (error) {
    console.error("Appwrite: failed to load current user", error);
    return null;
  }
}

/**
 * Read the session secret used to hydrate the client AppwriteProvider.
 */
export async function readSessionCookie() {
  try {
    const helpers = createNextServerHelpers(serverConfig);
    return await helpers.readSessionCookie();
  } catch (error) {
    console.error("Appwrite: failed to read session cookie", error);
    return null;
  }
}