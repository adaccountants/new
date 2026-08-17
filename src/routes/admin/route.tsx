import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  isRedirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  BookOpen,
  Settings,
  Briefcase,
  Handshake,
  Layers,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAdminUser, signOutAdmin } from "@/lib/admin-auth";
import { getServerAdminUser } from "@/lib/admin-session";
import { cn } from "@/lib/utils";

function isAdminLoginPath(pathname: string) {
  return pathname === "/admin/login" || pathname.startsWith("/admin/login/");
}

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    if (isAdminLoginPath(location.pathname)) return;
    try {
      const admin = await getServerAdminUser();
      if (!admin) {
        throw redirect({ to: "/admin/login" });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;
      console.error("[admin] server session check failed", error);
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminLayout,
});

const nav: Array<
  | { label: string; to: "/admin"; icon: typeof LayoutDashboard; end: true }
  | { label: string; to: "/admin/$section"; params: { section: string }; icon: typeof LayoutDashboard }
  | { label: string; to: "/admin/pages"; icon: typeof LayoutDashboard }
  | { label: string; to: "/admin/inbox"; icon: typeof LayoutDashboard }
  | { label: string; to: "/admin/settings"; icon: typeof LayoutDashboard }
> = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Inbox", to: "/admin/inbox", icon: Inbox },
  { label: "Services", to: "/admin/$section", params: { section: "services" }, icon: Layers },
  {
    label: "Testimonials",
    to: "/admin/$section",
    params: { section: "testimonials" },
    icon: MessageSquareQuote,
  },
  { label: "Blog", to: "/admin/$section", params: { section: "blog" }, icon: Newspaper },
  { label: "Knowledge", to: "/admin/$section", params: { section: "knowledge" }, icon: BookOpen },
  { label: "Partnerships", to: "/admin/$section", params: { section: "partnership" }, icon: Handshake },
  { label: "Team", to: "/admin/$section", params: { section: "team" }, icon: Users },
  { label: "Careers", to: "/admin/$section", params: { section: "careers" }, icon: Briefcase },
  { label: "Pages", to: "/admin/pages", icon: FileText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isLogin = pathname === "/admin/login";
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getAdminUser().then((user) => {
      if (cancelled) return;
      setAuthed(Boolean(user));
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (isLogin) {
    return <Outlet />;
  }

  if (!ready) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!authed) {
    void navigate({ to: "/admin/login" });
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="flex w-60 shrink-0 flex-col border-r bg-white">
        <div className="border-b px-5 py-4">
          <p className="text-sm font-semibold tracking-tight">Admin</p>
          <p className="text-xs text-muted-foreground">Alpha Digi CMS</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const href = item.to === "/admin/$section" ? `/admin/${item.params.section}` : item.to;
            const active =
              "end" in item && item.end
                ? pathname === "/admin" || pathname === "/admin/"
                : pathname === href || pathname.startsWith(`${href}/`);
            const Icon = item.icon;
            const className = cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-slate-100",
              active && "bg-slate-900 text-white hover:bg-slate-900",
            );
            if (item.to === "/admin/$section") {
              return (
                <Link key={item.label} to={item.to} params={item.params} className={className}>
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            }
            return (
              <Link key={item.label} to={item.to} className={className}>
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              void signOutAdmin().then(() => navigate({ to: "/admin/login" }));
            }}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
