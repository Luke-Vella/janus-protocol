import React from "react";

export default function ReactCourseLayout({
  children,
  modal, // ← parallel route
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <>
      {children}

      {/* This renders only when a modal route is active */}
      {modal}
    </>
  );
}
