import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Map '/' to Home
  index("routes/home.tsx"),  // just a string path to the component file

  // Auth route
  route("auth", "routes/auth.tsx"),

  // Catch-all for malformed URLs
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
