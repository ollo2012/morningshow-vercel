import Image from "next/image";
import { icons } from "lucide-react";

interface AnkuendigungImageProps {
  bild: string;
  alt: string;
  className?: string;
}

export function AnkuendigungImage({
  bild,
  alt,
  className = "",
}: AnkuendigungImageProps) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <Image src={bild} alt={alt} fill className="object-cover" />
    </div>
  );
}

interface AnkuendigungIconProps {
  icon: string;
  className?: string;
}

export function AnkuendigungIcon({ icon, className = "" }: AnkuendigungIconProps) {
  const LucideIcon = icons[icon as keyof typeof icons];
  if (!LucideIcon) return null;
  return <LucideIcon className={`shrink-0 text-muted-foreground ${className}`} />;
}
