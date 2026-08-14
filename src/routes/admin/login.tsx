/**
 * TEMP placeholder auth — NOT secure, replace with real Supabase Auth + RLS
 * before this goes live for a client.
 */

import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_PASSWORD, setAdminAuthed } from "@/lib/admin-config";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          if (password !== ADMIN_PASSWORD) {
            setError("Incorrect password");
            return;
          }
          setAdminAuthed(true);
          void navigate({ to: "/admin" });
        }}
      >
        <div>
          <h1 className="text-lg font-semibold">Admin login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Placeholder password gate for this mock CMS.
          </p>
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
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
    </div>
  );
}
