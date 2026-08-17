import { useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTENT_PAGES,
  type ContentPage,
  getAllContentBlocks,
  updateContent,
} from "@/lib/page-content-data";

export const Route = createFileRoute("/admin/pages/")({
  loader: async () => ({ blocks: await getAllContentBlocks() }),
  component: AdminPagesPage,
});

function AdminPagesPage() {
  const router = useRouter();
  const { blocks: allBlocks } = Route.useLoaderData();
  const [page, setPage] = useState<ContentPage>("home");
  const blocks = allBlocks.filter((item) => item.page === page);
  const originals = useMemo(
    () => Object.fromEntries(blocks.map((block) => [block.key, block.value])),
    [blocks],
  );
  const [draft, setDraft] = useState<Record<string, string>>(originals);
  const [savedFlash, setSavedFlash] = useState(false);

  const dirty = blocks.some((block) => (draft[block.key] ?? block.value) !== block.value);

  function selectPage(next: ContentPage) {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setPage(next);
    const nextBlocks = allBlocks.filter((item) => item.page === next);
    setDraft(Object.fromEntries(nextBlocks.map((block) => [block.key, block.value])));
    setSavedFlash(false);
  }

  function save() {
    void (async () => {
      for (const block of blocks) {
        const value = draft[block.key] ?? block.value;
        if (value !== block.value) {
          await updateContent(block.key, value);
        }
      }
      await router.invalidate();
      toast.success("Saved");
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
    })();
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit headings, intros and other copy. Changes apply to the live pages in this session.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {dirty ? (
            <span className="text-sm text-amber-700">Unsaved changes</span>
          ) : savedFlash ? (
            <span className="text-sm text-emerald-700">Saved</span>
          ) : null}
          <Button type="button" onClick={save} disabled={!dirty}>
            Save
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {CONTENT_PAGES.map((item) => (
          <Button
            key={item.id}
            type="button"
            variant={item.id === page ? "default" : "outline"}
            onClick={() => selectPage(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="mt-8 space-y-5">
        {blocks.map((block) => (
          <div key={block.key} className="space-y-2">
            <Label htmlFor={block.key}>
              {block.label}
              <span className="ml-2 font-normal text-muted-foreground">{block.key}</span>
            </Label>
            {block.type === "richtext" ? (
              <Textarea
                id={block.key}
                rows={block.key.endsWith(".body") ? 24 : 4}
                value={draft[block.key] ?? block.value}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, [block.key]: event.target.value }))
                }
              />
            ) : (
              <Input
                id={block.key}
                value={draft[block.key] ?? block.value}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, [block.key]: event.target.value }))
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
