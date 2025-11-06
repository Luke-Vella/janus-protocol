export default function ReactCoursePostsPage() {
  // This will eventually fetch and list posts.
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Posts</h1>
      <p className="text-sm text-muted-foreground">
        Click the &quot;New Post&quot; button in the navbar to open the create
        form modal.
      </p>
      <ul className="space-y-2 list-disc list-inside">
        <li className="text-sm">(No posts yet)</li>
      </ul>
    </div>
  );
}
