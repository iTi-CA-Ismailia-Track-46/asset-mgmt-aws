import { Hono } from "hono";
import { cors } from "hono/cors"; // 1. Import the middleware
import { assetsRoutes } from "./routes/asset";
import { filesRoutes } from "./routes/file";

export const app = new Hono();

// 2. Apply CORS middleware globally BEFORE your routes
app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.route("/api/assets", assetsRoutes);
app.route("/api/files", filesRoutes);

app.get("/", (c) => c.text("Asset Tracker API is running 🚀"));
