import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isSafeAdminUrl, isSafeExternalUrl, UNSAFE_URL_MESSAGE } from "@/lib/safe-url";
import { getSettings, updateSettings } from "@/lib/site-settings-data";
import { uploadPublicFile } from "@/lib/storage-upload";

export const Route = createFileRoute("/admin/settings")({
  loader: async () => ({ current: await getSettings() }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const router = useRouter();
  const { current } = Route.useLoaderData();
  const [firmName, setFirmName] = useState(current.firmName);
  const [phone, setPhone] = useState(current.phone);
  const [email, setEmail] = useState(current.email);
  const [address, setAddress] = useState(current.address);
  const [hours, setHours] = useState(current.hours);
  const [footerText, setFooterText] = useState(current.footerText);
  const [founderName, setFounderName] = useState(current.founderName);
  const [founderRole, setFounderRole] = useState(current.founderRole);
  const [founderCredentials, setFounderCredentials] = useState(current.founderCredentials);
  const [founderBio, setFounderBio] = useState(current.founderBio);
  const [founderPhotoUrl, setFounderPhotoUrl] = useState(current.founderPhotoUrl);
  const [socials, setSocials] = useState(current.socials);
  const [savedFlash, setSavedFlash] = useState(false);
  const [socialUrlError, setSocialUrlError] = useState("");
  const [founderPhotoError, setFounderPhotoError] = useState("");
  const [uploading, setUploading] = useState(false);

  const dirty =
    firmName !== current.firmName ||
    phone !== current.phone ||
    email !== current.email ||
    address !== current.address ||
    hours !== current.hours ||
    footerText !== current.footerText ||
    founderName !== current.founderName ||
    founderRole !== current.founderRole ||
    founderCredentials !== current.founderCredentials ||
    founderBio !== current.founderBio ||
    founderPhotoUrl !== current.founderPhotoUrl ||
    JSON.stringify(socials) !== JSON.stringify(current.socials);

  function save() {
    const invalid = socials.find((social) => social.url.trim().length > 0 && !isSafeExternalUrl(social.url));
    if (invalid) {
      setSocialUrlError(UNSAFE_URL_MESSAGE);
      return;
    }
    if (!isSafeAdminUrl(founderPhotoUrl)) {
      setFounderPhotoError(UNSAFE_URL_MESSAGE);
      return;
    }
    setSocialUrlError("");
    setFounderPhotoError("");
    void updateSettings({
      firmName,
      phone,
      email,
      address,
      hours,
      footerText,
      founderName,
      founderRole,
      founderCredentials,
      founderBio,
      founderPhotoUrl,
      socials,
    })
      .then(() => {
        void router.invalidate();
        toast.success("Settings saved");
        setSavedFlash(true);
        window.setTimeout(() => setSavedFlash(false), 2000);
      })
      .catch((err: unknown) => {
        toast.error(err instanceof Error ? err.message : "Could not save settings");
      });
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Site-wide contact details used in the header, footer and contact page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {dirty ? (
            <span className="text-sm text-amber-700">Unsaved changes</span>
          ) : savedFlash ? (
            <span className="text-sm text-emerald-700">Saved</span>
          ) : null}
          <Button type="button" onClick={save} disabled={!dirty || uploading}>
            Save
          </Button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firmName">Firm name</Label>
          <Input id="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hours">Hours</Label>
          <Input id="hours" value={hours} onChange={(e) => setHours(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="footerText">Footer text</Label>
          <Textarea
            id="footerText"
            rows={2}
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
          />
        </div>

        <div className="space-y-4 border-t pt-6">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Founder</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Shown on the About page. Leave the name blank to hide the block. Photo is optional.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="founderName">Name</Label>
            <Input id="founderName" value={founderName} onChange={(e) => setFounderName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="founderRole">Role</Label>
            <Input id="founderRole" value={founderRole} onChange={(e) => setFounderRole(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="founderCredentials">Credentials</Label>
            <Input
              id="founderCredentials"
              value={founderCredentials}
              onChange={(e) => setFounderCredentials(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="founderBio">Bio</Label>
            <Textarea
              id="founderBio"
              rows={8}
              value={founderBio}
              onChange={(e) => setFounderBio(e.target.value)}
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
                setFounderPhotoError("");
                setUploading(true);
                void uploadPublicFile("card-images", file)
                  .then((url) => setFounderPhotoUrl(url))
                  .catch((err: unknown) => {
                    setFounderPhotoError(err instanceof Error ? err.message : "Image upload failed");
                  })
                  .finally(() => setUploading(false));
              }}
            />
            <Input
              placeholder="Or paste an image URL"
              value={founderPhotoUrl}
              onChange={(event) => {
                setFounderPhotoError("");
                setFounderPhotoUrl(event.target.value);
              }}
            />
            {founderPhotoUrl ? (
              <img
                src={founderPhotoUrl}
                alt=""
                className="mt-2 h-40 w-full max-w-md rounded-md border object-cover"
              />
            ) : null}
            {uploading ? <p className="text-sm text-muted-foreground">Uploading…</p> : null}
            {founderPhotoError ? <p className="text-sm text-destructive">{founderPhotoError}</p> : null}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Socials</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSocials((list) => [...list, { platform: "", url: "" }])}
            >
              <Plus className="size-4" />
              Add
            </Button>
          </div>
          {socials.length === 0 ? (
            <p className="text-sm text-muted-foreground">No social links yet.</p>
          ) : (
            <ul className="space-y-3">
              {socials.map((social, index) => (
                <li key={index} className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    placeholder="Platform"
                    value={social.platform}
                    onChange={(e) =>
                      setSocials((list) =>
                        list.map((item, i) =>
                          i === index ? { ...item, platform: e.target.value } : item,
                        ),
                      )
                    }
                  />
                  <Input
                    placeholder="https://"
                    value={social.url}
                    onChange={(e) => {
                      setSocialUrlError("");
                      setSocials((list) =>
                        list.map((item, i) => (i === index ? { ...item, url: e.target.value } : item)),
                      );
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="h-11 w-11 shrink-0 sm:h-9 sm:w-9"
                    onClick={() => setSocials((list) => list.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {socialUrlError ? <p className="text-sm text-destructive">{socialUrlError}</p> : null}
        </div>
      </div>
    </div>
  );
}
