import { redirect } from "next/navigation";

export default function HomePage() {
  // Make the React Course section the effective homepage
  redirect("/react-course");
}
