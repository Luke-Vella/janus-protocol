"use client";

import classes from "./new-post.module.css";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";

interface NewPostProps {
  onBodyChangeHandler?: (body: string) => void;
  onAuthorChangeHandler?: (author: string) => void;
}

function NewPost(props: NewPostProps) {
  return (
    <form className="flex flex-col gap-2">
      <Label htmlFor="terms">New Post</Label>

      <Textarea
        id="body-content"
        className={classes.textarea}
        onChange={(event) => props.onBodyChangeHandler?.(event.target.value)}
      />

      <Label htmlFor="author-content">Author</Label>

      <Textarea
        id="author-content"
        className={classes.textarea}
        onChange={(event) => props.onAuthorChangeHandler?.(event.target.value)}
      />

      <div className="flex gap-4">
        <Button className="flex-1 my-2" type="submit" variant="default">
          Post
        </Button>
        <Button className="flex-1 my-2" type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default NewPost;
