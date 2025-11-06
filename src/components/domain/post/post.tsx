interface PostProps {
  className?: string;
  author?: string;
  body?: string;
}

function Post({ className, author, body }: PostProps) {
  return (
    <div className={className}>
      Post Component - by {author}
      <div>{body}</div>
    </div>
  );
}

export default Post;
