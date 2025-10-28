import { useSession } from "~/lib/auth-client";

export default function DashboardPage() {
	const { data } = useSession();
	return (
		<div>
			Dashboard
			<div>{JSON.stringify(data)}</div>
		</div>
	);
}
