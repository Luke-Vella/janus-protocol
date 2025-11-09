"use client";

import NewPost from "@/components/domain/new-post/new-post";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Post = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
};

type NewPost = {
  title: string;
  body: string;
};

type PostsState = {
  posts: Post[];
  addPost: (post: NewPost) => void;
  updatePost: (id: string, updatedPost: Partial<NewPost>) => void;
  removePost: (id: string) => void;
  clear: () => void;
};

function genId() {
  // simple unique-ish id without extra deps
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const usePostStore = create<PostsState>()(
  devtools((set) => ({
    posts: [],

    addPost: (newPost) => {
      const post: Post = {
        id: genId(),
        title: newPost.title.trim(),
        body: newPost.body.trim(),
        createdAt: new Date(),
      };

      // now this is allowed because devtools augments `set`
      set((s) => ({ posts: [post, ...s.posts] }), false, "posts/addPost");
    },
  }))
);
