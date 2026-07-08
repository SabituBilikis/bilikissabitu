import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** next/image sizes hint — tune per placement */
  sizes?: string;
  priority?: boolean;
};

/**
 * Real iPhone 16 Pro device frame (Apple Developer Resources art) with the app
 * screen composited into the exact transparent screen area. object-fit: contain
 * + white screen keeps the whole screen — including the bottom nav — visible.
 */
export default function PhoneFrame({ src, alt, sizes = "180px", priority }: Props) {
  return (
    <div className="iphone">
      <div className="iphone-screen">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>
      <Image
        className="iphone-frame"
        src="/mockups/iphone-blue.png"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
      />
    </div>
  );
}
