import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAdmin, ADMIN_LOGIN_ERROR } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          setPending(true);
          setError("");
          void signInAdmin(email.trim(), password)
            .then(() => navigate({ to: "/admin" }))
            .catch(() => {
              setError(ADMIN_LOGIN_ERROR);
            })
            .finally(() => setPending(false));
        }}
      >
        <div>
          <h1 className="text-lg font-semibold">Admin login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in with your admin account.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </div>
  );
}
