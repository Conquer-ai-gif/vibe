import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { codeAgentFunction } from "@/inngest/functions";
 
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    codeAgentFunction,
  ],
  // Optional but recommended in dev:
  // serveHost: "http://localhost:3000",
  // servePath: "/api/inngest",
}); 