"use client";

import { UserProfileCard } from "~/components/derived/user-profile";
import { useSession } from "~/lib/auth-client";

export default function DashboardPage() {
  const { data } = useSession();
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <UserProfileCard
        email={data?.user.email}
        image={data?.user.image}
        name={data?.user.name}
      />
    </div>
  );
}
