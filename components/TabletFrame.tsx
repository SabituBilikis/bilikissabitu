import Image from "next/image";
import React from "react";

type Props = {
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  orientation?: "landscape" | "portrait";
  children?: React.ReactNode;
};

/**
 * Modern tablet device frame (iPad / Android Tablet) supporting both direct images
 * and rich interactive child UI content.
 */
export default function TabletFrame({
  src,
  alt = "Tablet preview",
  sizes = "(max-width:768px) 95vw, 840px",
  priority,
  orientation = "landscape",
  children,
}: Props) {
  return (
    <div className={`tablet-frame tablet-${orientation}`}>
      <div className="tablet-bezel">
        <div className="tablet-camera" aria-hidden="true" />
        <div className="tablet-screen">
          {children ? (
            children
          ) : src ? (
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              sizes={sizes}
              priority={priority}
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
