import PhoneFrame from "@/components/PhoneFrame";
import BrowserFrame from "@/components/BrowserFrame";
import TabletFrame from "@/components/TabletFrame";
import { TabletInteractiveCanvas } from "@/components/LearnFunMicroInteractions";
import type { Device, Screen } from "@/lib/projects";

type Props = {
  device: Device;
  screens: Screen[];
  /** cap how many screens actually render (container-dependent) */
  max?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * Straight-on device mockup, matched to platform. Screens are clipped inside
 * the frame and the whole mockup is sized to fit its container (no overflow).
 */
export default function Mockup({ device, screens, max = 3, sizes, priority }: Props) {
  const list = screens.slice(0, max);

  if (device === "web") {
    return <BrowserFrame src={list[0].src} alt={list[0].alt} sizes={sizes} priority={priority} />;
  }

  if (device === "tablet") {
    return (
      <div className="tablet-mockup-wrap">
        <TabletFrame>
          <TabletInteractiveCanvas />
        </TabletFrame>
      </div>
    );
  }

  // mobile / tablet → one or more phone frames in a contained row
  return (
    <div className="device-row" data-count={list.length}>
      {list.map((s, i) => (
        <PhoneFrame key={i} src={s.src} alt={s.alt} sizes={sizes} priority={priority && i === 0} />
      ))}
    </div>
  );
}
