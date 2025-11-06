// src/app/react-course/@modal/(.)posts/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewPostModal() {
  const router = useRouter();

  const close = () => {
    router.replace("/react-course/posts"); // deterministic, not history-dependent
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

        <div className="space-y-3">
          <p>New Post form goes here.</p>
          <button
            className="rounded-md bg-primary px-3 py-2 text-primary-foreground"
            onClick={close}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
