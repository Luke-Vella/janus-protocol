"use client";
import { usePostStore } from "@/stores/post-store";

export default function ReactCoursePostsPage() {
  const posts = usePostStore((state) => state.posts);

  // This will eventually fetch and list posts.
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2">{post.body}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created at: {post.createdAt.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
