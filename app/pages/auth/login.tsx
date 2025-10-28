import SignInCard from "~/components/derived/sign-in";
import { auth } from "~/lib/auth";
import type { Route } from "./+types/login";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (session) {
    throw redirect("/dashboard");
  }
}

export default function LoginPage() {
  return (
    <div className="max-w-screen-sm mx-auto w-screen h-screen flex justify-center items-center">
      <div className=""></div>
      <div className="">
        <SignInCard />
      </div>
    </div>
  );
}
