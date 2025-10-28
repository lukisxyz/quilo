import { redirect } from "react-router";
import type { Route } from "./+types/_protected";
import { auth } from "~/lib/auth";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw redirect("/login");
  }
}
