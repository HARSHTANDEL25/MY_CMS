import { getAuthsession } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getAuthsession();

  return (
    <div>
      {
        session ? (
          
            <div className="flex flex-col items-center justify-center h- " >
              <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
              <p className="text-lg">Hello, {session.user.name}!</p>
            </div>
        )
        :(
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-lg">You are not signed in. Please sign in to access the dashboard.</p>
            </div>
        )
      }
    </div>
  );
}
