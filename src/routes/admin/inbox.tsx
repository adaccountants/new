import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  deleteContactSubmission,
  listContactSubmissions,
  markContactSubmissionHandled,
  type ContactSubmission,
} from "@/lib/contact-submissions-data";

export const Route = createFileRoute("/admin/inbox")({
  loader: async () => ({ submissions: await listContactSubmissions() }),
  component: AdminInboxPage,
});

function formatSubmittedAt(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function truncate(value: string, length = 120) {
  const trimmed = value.replaceAll("\n", " ").trim();
  if (trimmed.length <= length) return trimmed;
  return `${trimmed.slice(0, length).trimEnd()}…`;
}

function AdminInboxPage() {
  const router = useRouter();
  const { submissions } = Route.useLoaderData();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function markHandled(item: ContactSubmission) {
    try {
      await markContactSubmissionHandled(item.id);
      toast.success(`Marked ${item.name} as handled`);
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update this submission.");
    }
  }

  async function remove(item: ContactSubmission) {
    try {
      await deleteContactSubmission(item.id);
      toast.success(`Deleted submission from ${item.name}`);
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete this submission.");
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions. Delete a row to fulfil a visitor's request to erase their
          information.
        </p>
      </div>

      {submissions.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No submissions yet.</p>
      ) : (
        <ul className="mt-8 divide-y rounded-xl border bg-white">
          {submissions.map((item) => {
            const expanded = expandedId === item.id;
            const handled = item.status === "handled";
            return (
              <li key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{item.name}</p>
                    <Badge variant={handled ? "secondary" : "default"}>{item.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a className="hover:underline" href={`mailto:${item.email}`}>
                      {item.email}
                    </a>
                    {item.phone ? ` · ${item.phone}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatSubmittedAt(item.createdAt)}</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                    {expanded ? item.message : truncate(item.message)}
                  </p>
                  {item.message.length > 120 ? (
                    <button
                      type="button"
                      className="mt-1 text-xs font-medium text-slate-900 underline-offset-2 hover:underline"
                      onClick={() => setExpandedId(expanded ? null : item.id)}
                    >
                      {expanded ? "Show less" : "View full message"}
                    </button>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={handled}
                    onClick={() => {
                      void markHandled(item);
                    }}
                  >
                    Mark as handled
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="outline">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
                        <AlertDialogDescription>
                          “{item.name}” ({item.email}) will be permanently deleted. Use this to
                          fulfil a deletion request.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            void remove(item);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
