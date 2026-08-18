import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  FounderEditor,
  founderDraftFromSettings,
  founderDraftsEqual,
  type FounderDraft,
} from "@/components/admin/FounderEditor";
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
import { isSafeAdminUrl, UNSAFE_URL_MESSAGE } from "@/lib/safe-url";
import { getSettings, updateSettings } from "@/lib/site-settings-data";

export const Route = createFileRoute("/admin/pages/")({
  loader: async () => ({
    blocks: await getAllContentBlocks(),
    settings: await getSettings(),
  }),
  component: AdminPagesPage,
});

function AdminPagesPage() {
  const router = useRouter();
  const { blocks: allBlocks, settings } = Route.useLoaderData();
  const [page, setPage] = useState<ContentPage>("home");
  const blocks = allBlocks.filter((item) => item.page === page);
  const originals = useMemo(
    () => Object.fromEntries(blocks.map((block) => [block.key, block.value])),
    [blocks],
  );
  const [draft, setDraft] = useState<Record<string, string>>(originals);
  const savedFounder = founderDraftFromSettings(settings);
  const [founder, setFounder] = useState<FounderDraft>(savedFounder);
  const [founderBusy, setFounderBusy] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setFounder(founderDraftFromSettings(settings));
  }, [settings]);

  const copyDirty = blocks.some((block) => (draft[block.key] ?? block.value) !== block.value);
  const founderDirty = !founderDraftsEqual(founder, savedFounder);
  const dirty = copyDirty || (page === "about" && founderDirty);

  function selectPage(next: ContentPage) {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setPage(next);
    const nextBlocks = allBlocks.filter((item) => item.page === next);
    setDraft(Object.fromEntries(nextBlocks.map((block) => [block.key, block.value])));
    setFounder(founderDraftFromSettings(settings));
    setSavedFlash(false);
  }

  function save() {
    if (!isSafeAdminUrl(founder.founderPhotoUrl)) {
      toast.error(UNSAFE_URL_MESSAGE);
      return;
    }
    void (async () => {
      try {
        for (const block of blocks) {
          const value = draft[block.key] ?? block.value;
          if (value !== block.value) {
            await updateContent(block.key, value);
          }
        }
        if (founderDirty) {
          await updateSettings(founder);
        }
        await router.invalidate();
        toast.success("Saved");
        setSavedFlash(true);
        window.setTimeout(() => setSavedFlash(false), 2000);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Could not save");
      }
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
          <Button type="button" onClick={save} disabled={!dirty || founderBusy}>
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
        {page === "about" ? (
          <FounderEditor value={founder} onChange={setFounder} onBusyChange={setFounderBusy} />
        ) : null}
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
