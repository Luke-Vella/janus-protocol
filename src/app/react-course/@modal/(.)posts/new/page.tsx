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

import { useState } from "react";
import { usePostStore } from "@/stores/post-store";

export default function NewPostModal() {
  const router = useRouter();

  const [content, setContent] = useState("");
  const addPost = usePostStore((s) => s.addPost);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const postData = {
      body: content,
      title: content.slice(0, 20) || "Untitled Post",
      createdAt: new Date(),
    };

    addPost(postData);
  }

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

        <form onSubmit={submitHandler}>
          <div className="form-content my-4">
            <div className="space-y-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                placeholder="Post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
