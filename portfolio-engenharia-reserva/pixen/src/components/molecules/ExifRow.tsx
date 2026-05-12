import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ExifRowProps {
  tag: string;
  value: string | number;
  isEven: boolean;
}

export default function ExifRow({ tag, value, isEven }: ExifRowProps) {
  // Simple check to see if value looks like GPS coordinates to render a map link
  const isGPS = tag.toLowerCase().includes("gps position");
  
  return (
    <tr className={cn("border-b border-[#a1b1b6]/20", isEven ? "bg-[#556d78]" : "bg-transparent")}>
      <td className="py-2 px-4 text-sm font-bold text-[#a1b1b6] whitespace-nowrap w-1/3 align-top">
        {tag}
      </td>
      <td className="py-2 px-4 text-sm text-[#a1b1b6]/90 break-all align-top">
        {isGPS && typeof value === 'string' ? (
          <Link 
            href={`https://maps.google.com/?q=${encodeURIComponent(value)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </Link>
        ) : (
          value
        )}
      </td>
    </tr>
  );
}
