import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BottomNav({ backHref }: { backHref: string }) {
  return (
    <nav className="flex items-center justify-center px-4 py-3">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Link>
    </nav>
  );
}
