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
  Menu,
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
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
  | {
      label: string;
      to: "/admin/$section";
      params: { section: string };
      icon: typeof LayoutDashboard;
    }
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
  {
    label: "Partnerships",
    to: "/admin/$section",
    params: { section: "partnership" },
    icon: Handshake,
  },
  { label: "Team", to: "/admin/$section", params: { section: "team" }, icon: Users },
  { label: "Careers", to: "/admin/$section", params: { section: "careers" }, icon: Briefcase },
  { label: "Pages", to: "/admin/pages", icon: FileText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

/** Shared nav link renderer used by both the sidebar and the mobile Sheet. */
function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {nav.map((item) => {
        const href = item.to === "/admin/$section" ? `/admin/${item.params.section}` : item.to;
        const active =
          "end" in item && item.end
            ? pathname === "/admin" || pathname === "/admin/"
            : pathname === href || pathname.startsWith(`${href}/`);
        const Icon = item.icon;
        const className = cn(
          "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-slate-100 min-h-[44px]",
          active && "bg-slate-900 text-white hover:bg-slate-900",
        );
        if (item.to === "/admin/$section") {
          return (
            <Link
              key={item.label}
              to={item.to}
              params={item.params}
              className={className}
              onClick={onNavigate}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        }
        return (
          <Link key={item.label} to={item.to} className={className} onClick={onNavigate}>
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isLogin = pathname === "/admin/login";
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

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

  // Navigate to login in an effect — never during render, which causes
  // "setState on SiteShell while rendering AdminLayout" React errors.
  useEffect(() => {
    if (ready && !authed && !isLogin) {
      void navigate({ to: "/admin/login" });
    }
  }, [ready, authed, isLogin, navigate]);

  if (isLogin) {
    return <Outlet />;
  }

  if (!ready) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!authed) {
    return null;
  }

  function handleLogout() {
    setSheetOpen(false);
    void signOutAdmin().then(() => navigate({ to: "/admin/login" }));
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* ── Desktop sidebar (md+) ───────────────────────────── */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r bg-white">
        <div className="border-b px-5 py-4">
          <p className="text-sm font-semibold tracking-tight">Admin</p>
          <p className="text-xs text-muted-foreground">Alpha Digi CMS</p>
        </div>
        <NavLinks pathname={pathname} />
        <div className="border-t p-3">
          <Button
            variant="ghost"
            className="w-full justify-start min-h-[44px]"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* ── Mobile layout (below md) ────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b bg-white px-4 md:hidden">
          <div>
            <p className="text-sm font-semibold tracking-tight">Admin</p>
            <p className="text-xs text-muted-foreground leading-none">Alpha Digi CMS</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="Open navigation menu"
            onClick={() => setSheetOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </header>

        {/* Mobile Sheet drawer */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="left" className="w-72 p-0 flex flex-col">
            <SheetHeader className="border-b px-5 py-4">
              <SheetTitle className="text-sm font-semibold tracking-tight text-left">
                Admin
              </SheetTitle>
              <p className="text-xs text-muted-foreground text-left">Alpha Digi CMS</p>
            </SheetHeader>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <NavLinks pathname={pathname} onNavigate={() => setSheetOpen(false)} />
            </div>
            <div className="border-t p-3">
              <Button
                variant="ghost"
                className="w-full justify-start min-h-[44px]"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                Log out
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Content area — full width on mobile, right of sidebar on desktop */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
