import { AuthForm } from "@/features/auth/components/auth-form";

interface SignInPageProps {
  searchParams: Promise<{ "password-reset"?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { "password-reset": passwordReset } = await searchParams;

  return <AuthForm mode="sign-in" passwordReset={passwordReset === "1"} />;
}
