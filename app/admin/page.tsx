import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // This handles the "default" behavior for the /admin URL
  redirect("/admin/announcements");
}