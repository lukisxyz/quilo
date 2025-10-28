import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("pages/home/index.tsx"),
  route("login", "pages/auth/login.tsx"),
  ...prefix("dashboard", [index("pages/dashboard/index.tsx")]),
  ...prefix("api", [...prefix("auth", [route("*", "api/auth/auth.ts")])]),
] satisfies RouteConfig;
