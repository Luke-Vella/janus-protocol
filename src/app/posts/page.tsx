"use client";

import React from "react";
import Modal from "@/components/blocks/modal";
import NewPost from "@/components/blocks/new-post";
import Post from "@/components/blocks/post";
import { useState } from "react";

interface PostsPageProps {
  isPosting?: boolean;
  onStopPosting?: () => void;
}

function PostsPage(props: PostsPageProps) {
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  function changeBodyHandler(body: string) {
    setBody(body);
  }

  function changeAuthorHandler(author: string) {
    setAuthor(author);
  }

  let modalContent = null;

  if (props.isPosting) {
    modalContent = (
      <Modal onClick={props.onStopPosting}>
        <NewPost
          onBodyChangeHandler={changeBodyHandler}
          onAuthorChangeHandler={changeAuthorHandler}
        />
      </Modal>
    );
  }

  return (
    <div className="flex flex-col align-center w-full lg:w-200 mx-auto gap-8 p-8">
      {modalContent}

      <Post
        author={author}
        body={body}
        className="g-row self-center p-4 rounded-md shadow-md"
      />
    </div>
  );
}

export default PostsPage;
