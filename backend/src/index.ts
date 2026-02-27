import { serve } from "@hono/node-server";
import { app } from "./app";

serve({
  fetch: app.fetch,
  port: 5000,
});

console.log("API running on http://localhost:5000");
