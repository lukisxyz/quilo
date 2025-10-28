import type { PropsWithChildren } from "react";
import { Outlet, useNavigate } from "react-router";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      {/* Header */}
      <div className="bg-[whitesmoke] border-b border-gray-300">
        <header className="flex container mx-auto w-screen items-center justify-between px-8 py-4">
          <h1 className=" text-[#0000ff] text-2xl font-bold tracking-tight">
            Quilo
          </h1>
          <button
            type="button"
            onClick={() => {
              navigate("/login");
            }}
            className="bg-[#0000ff] text-white text-base px-4 font-semibold py-2 rounded-lg tracking-wide hover:opacity-90 transition"
          >
            Sign In
          </button>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">{children ? children : <Outlet />}</main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-300 text-sm text-gray-600">
        © {new Date().getFullYear()} Quilo. All rights reserved.
      </footer>
    </div>
  );
}
