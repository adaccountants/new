import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { addCard, type Card, type CardSection, KNOWLEDGE_CATEGORIES, updateCard } from "@/lib/cards-data";

const slugRequired = new Set<CardSection>(["services", "blog"]);

function cardSchema(section: CardSection) {
  return z
    .object({
      title: z.string().min(1, "Title is required"),
      subtitle: z.string().optional(),
      body: z.string().optional(),
      imageUrl: z.string(),
      slug: z.string().optional(),
      published: z.boolean(),
      category: z.string().optional(),
      fileUrl: z.string().optional(),
      fileName: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (slugRequired.has(section) && !data.slug?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Slug is required for this section",
          path: ["slug"],
        });
      }
      if (section === "knowledge" && !data.category?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Category is required",
          path: ["category"],
        });
      }
    });
}

type CardFormValues = z.infer<ReturnType<typeof cardSchema>>;

type CardFormProps = {
  section: CardSection;
  card?: Card;
  nextSortOrder: number;
};

export function CardForm({ section, card, nextSortOrder }: CardFormProps) {
  const navigate = useNavigate();
  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema(section)),
    defaultValues: {
      title: card?.title ?? "",
      subtitle: card?.subtitle ?? "",
      body: card?.body ?? "",
      imageUrl: card?.imageUrl ?? "",
      slug: card?.slug ?? "",
      published: card?.published ?? true,
      category: card?.category ?? "",
      fileUrl: card?.fileUrl ?? "",
      fileName: card?.fileName ?? "",
    },
  });

  const imageUrl = form.watch("imageUrl");
  const published = form.watch("published");
  const category = form.watch("category");
  const fileUrl = form.watch("fileUrl");
  const fileName = form.watch("fileName");

  function onSubmit(values: CardFormValues) {
    const payload: Omit<Card, "id"> = {
      section,
      title: values.title.trim(),
      imageUrl: values.imageUrl,
      published: values.published,
      sortOrder: card?.sortOrder ?? nextSortOrder,
      slug: values.slug?.trim() ?? "",
      subtitle: values.subtitle?.trim() ?? "",
      body: values.body?.trim() ?? "",
    };
    if (section === "knowledge") {
      const categoryValue = values.category?.trim() ?? "";
      const fileUrlValue = values.fileUrl?.trim() ?? "";
      const fileNameValue = values.fileName?.trim() ?? "";
      if (categoryValue) payload.category = categoryValue;
      if (fileUrlValue) payload.fileUrl = fileUrlValue;
      if (fileNameValue) payload.fileName = fileNameValue;
    }

    if (card) {
      updateCard(card.id, payload);
      toast.success("Card updated");
    } else {
      addCard(payload);
      toast.success("Card added");
    }
    void navigate({ to: "/admin/$section", params: { section } });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...form.register("title")} />
        {form.formState.errors.title ? (
          <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" {...form.register("subtitle")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" rows={8} {...form.register("body")} />
        {section === "careers" ? (
          <p className="text-xs text-muted-foreground">
            Career roles: separate paragraphs with a blank line. After the role copy, add a line
            containing only <code>---</code>, then one “ideal for” item per line.
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug{slugRequired.has(section) ? " (required)" : " (optional)"}</Label>
        <Input id="slug" {...form.register("slug")} placeholder="listed-non-listed-companies" />
        {form.formState.errors.slug ? (
          <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
        ) : null}
        {section === "services" ? (
          <p className="text-xs text-muted-foreground">
            Prefix homepage highlight cards with <code>home-</code> so they appear on the landing
            page instead of /services.
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        {/* TEMP: real Supabase Storage upload replaces this — store the public URL in imageUrl. */}
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            form.setValue("imageUrl", URL.createObjectURL(file), { shouldDirty: true });
          }}
        />
        <Input
          placeholder="Or paste an image URL"
          value={imageUrl}
          onChange={(event) => form.setValue("imageUrl", event.target.value, { shouldDirty: true })}
        />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="mt-2 h-40 w-full max-w-md rounded-md border object-cover"
          />
        ) : null}
      </div>

      {section === "knowledge" ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              {...(category ? { value: category } : {})}
              onValueChange={(value) => form.setValue("category", value, { shouldDirty: true })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {KNOWLEDGE_CATEGORIES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.category ? (
              <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Downloadable file</Label>
            {/* TEMP — file upload uses local object URL, replace with real Supabase Storage upload
                (separate bucket from images, e.g. 'knowledge-files') when backend is wired. */}
            {fileName ? (
              <p className="text-sm text-muted-foreground">Current file: {fileName}</p>
            ) : fileUrl ? (
              <p className="text-sm text-muted-foreground">Current file: {fileUrl}</p>
            ) : null}
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                form.setValue("fileUrl", URL.createObjectURL(file), { shouldDirty: true });
                form.setValue("fileName", file.name, { shouldDirty: true });
              }}
            />
          </div>
        </>
      ) : null}

      <div className="flex items-center gap-3">
        <Switch
          id="published"
          checked={published}
          onCheckedChange={(checked) => form.setValue("published", checked, { shouldDirty: true })}
        />
        <Label htmlFor="published">{published ? "Published" : "Draft"}</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit">{card ? "Save changes" : "Add card"}</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => void navigate({ to: "/admin/$section", params: { section } })}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
