import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideProps {
  titel: string;
  untertitel?: string;
  firmenLogo: string;
  baeckereiLogo: string;
  baeckereiName: string;

  backHref?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
}

export default function Slide({
  titel,
  untertitel,
  firmenLogo,
  baeckereiLogo,
  baeckereiName,
  backHref,
  children,
  className,
  contentClassName,
  id,
}: SlideProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex h-full w-full shrink-0 snap-center p-2 sm:p-3",
        className
      )}
    >
      {/* Rounded box wrapping the entire slide content */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-lg px-5 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5">
        {/* Header row: title left, logos right */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {titel}
            </h2>
            {untertitel && (
              <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl mb-4">
                {untertitel}
              </p>
            )}
            {backHref && (
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Zurück zur Übersicht
              </Link>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Image
              src={firmenLogo}
              alt="Firmenlogo"
              width={128}
              height={128}
              className="h-12 w-auto sm:h-16 md:h-20 object-contain"
            />
            <span className="text-sm font-medium text-muted-foreground sm:text-base md:text-lg">
              &times;
            </span>
            <Image
              src={baeckereiLogo}
              alt={`${baeckereiName} Logo`}
              width={128}
              height={128}
              className="h-12 w-auto sm:h-16 md:h-20 object-contain"
            />
          </div>
        </div>

        {/* Content area */}
        <div className={cn("mt-3 min-h-0 flex-1 overflow-y-auto px-1 pt-1 sm:mt-4 sm:px-2 sm:pt-2 md:mt-5", contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
