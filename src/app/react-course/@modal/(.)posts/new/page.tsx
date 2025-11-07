// src/app/react-course/@modal/(.)posts/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const schema = zod.object({
  content: zod.string().min(5, "Content must be at least 5 characters"),
});

export default function NewPostModal() {
  const router = useRouter();
  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(schema),
  });

  const close = () => {
    router.back();
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>

        <div>
          <div className="form-content my-4">
            <div className="space-y-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea id="post-content" placeholder="Post content..." />
            </div>
          </div>

          <div className="flex justify-end gap-2 ">
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="default" onClick={close}>
              Create Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
