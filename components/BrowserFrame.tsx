import Image from "next/image";

type Props = { src: string; alt: string; sizes?: string; priority?: boolean };

/** A straight-on browser-window frame for web project screens. */
export default function BrowserFrame({ src, alt, sizes = "440px", priority }: Props) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="browser-screen">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </div>
  );
}
