import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  route("login", "pages/auth/login.tsx"),
  /* API Route */
  ...prefix("api", [...prefix("auth", [route("*", "api/auth/auth.ts")])]),

  /* Public Route */
  layout("components/layout/public.tsx", [index("pages/home/index.tsx")]),

  /* Protected Route */
  layout("pages/auth/_protected.tsx", [
    ...prefix("dashboard", [index("pages/dashboard/index.tsx")]),
  ]),
] satisfies RouteConfig;
