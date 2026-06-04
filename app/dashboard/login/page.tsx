import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";
import { Lock } from "lucide-react";

type Props = { searchParams: Promise<{ callbackUrl?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  // Strict authentication: if user is already logged in, redirect to dashboard
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/dashboard";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3" style={{ color: "var(--primary)" }}>
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-ink font-serif">Owner Login</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to manage products & services</p>
        </div>

        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
