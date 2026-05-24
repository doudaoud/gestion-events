import { Client, Account } from "appwrite";

export const client = new Client();
const endpoint: string = import.meta.env.VITE_APPWRITE_ENDPOINT || "";
const projectId: string = import.meta.env.VITE_APPWRITE_PROJECT_ID || ""; 

if (endpoint && projectId) {
  client.setEndpoint(endpoint);
  client.setProject(projectId);
} else {
  console.error("Appwrite endpoint or project ID is missing from environment variables.");
}

export const account = new Account(client);
