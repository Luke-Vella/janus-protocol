"use client";

import MainHeader from "@/components/blocks/layout/main-header";
import PostsPage from "../posts/page";
import { useState } from "react";

function AppPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <MainHeader onCreatePost={() => setModalIsOpen(true)} />

        <main className="flex-grow">
          <PostsPage
            onStopPosting={() => setModalIsOpen(false)}
            isPosting={modalIsOpen}
          />
        </main>
      </div>
    </>
  );
}

export default AppPage;
