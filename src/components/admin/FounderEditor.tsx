import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettings } from "@/lib/site-settings-data";
import { uploadPublicFile } from "@/lib/storage-upload";

export type FounderDraft = {
  founderName: string;
  founderRole: string;
  founderCredentials: string;
  founderBio: string;
  founderPhotoUrl: string;
};

export function founderDraftFromSettings(settings: SiteSettings): FounderDraft {
  return {
    founderName: settings.founderName,
    founderRole: settings.founderRole,
    founderCredentials: settings.founderCredentials,
    founderBio: settings.founderBio,
    founderPhotoUrl: settings.founderPhotoUrl,
  };
}

export function founderDraftsEqual(a: FounderDraft, b: FounderDraft) {
  return (
    a.founderName === b.founderName &&
    a.founderRole === b.founderRole &&
    a.founderCredentials === b.founderCredentials &&
    a.founderBio === b.founderBio &&
    a.founderPhotoUrl === b.founderPhotoUrl
  );
}

export function FounderEditor({
  value,
  onChange,
  onBusyChange,
}: {
  value: FounderDraft;
  onChange: (next: FounderDraft) => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  function setBusy(busy: boolean) {
    setUploading(busy);
    onBusyChange?.(busy);
  }

  function patch(partial: Partial<FounderDraft>) {
    onChange({ ...value, ...partial });
  }

  return (
    <div className="space-y-4 rounded-xl border bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Founder (About page)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This is the team section on About. Leave the name blank to hide it. Photo is optional.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="founderName">Name</Label>
        <Input
          id="founderName"
          value={value.founderName}
          onChange={(e) => patch({ founderName: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="founderRole">Role</Label>
        <Input
          id="founderRole"
          value={value.founderRole}
          onChange={(e) => patch({ founderRole: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="founderCredentials">Credentials</Label>
        <Input
          id="founderCredentials"
          value={value.founderCredentials}
          onChange={(e) => patch({ founderCredentials: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="founderBio">Bio</Label>
        <Textarea
          id="founderBio"
          rows={8}
          value={value.founderBio}
          onChange={(e) => patch({ founderBio: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="founderPhoto">Photo</Label>
        <Input
          id="founderPhoto"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setUploadError("");
            setBusy(true);
            void uploadPublicFile("card-images", file)
              .then((url) => patch({ founderPhotoUrl: url }))
              .catch((err: unknown) => {
                setUploadError(err instanceof Error ? err.message : "Image upload failed");
              })
              .finally(() => setBusy(false));
          }}
        />
        <Input
          placeholder="Or paste an image URL"
          value={value.founderPhotoUrl}
          onChange={(event) => {
            setUploadError("");
            patch({ founderPhotoUrl: event.target.value });
          }}
        />
        {value.founderPhotoUrl ? (
          <img
            src={value.founderPhotoUrl}
            alt=""
            className="mt-2 h-40 w-full max-w-md rounded-md border object-cover"
          />
        ) : null}
        {uploading ? <p className="text-sm text-muted-foreground">Uploading…</p> : null}
        {uploadError ? <p className="text-sm text-destructive">{uploadError}</p> : null}
      </div>
    </div>
  );
}
