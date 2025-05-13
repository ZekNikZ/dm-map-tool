import type { StaticLayer } from "@/types/structure";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  layer: StaticLayer;
  staticPosition?: boolean;
}

export default function StaticLayerComponent({ layer, staticPosition }: Props) {
  return (
    <Image
      src={layer.src}
      alt={layer.name}
      width={layer.width}
      height={layer.height}
      className={clsx(
        "max-w-none",
        !staticPosition && "absolute top-0 left-0",
        layer.locked && "pointer-events-none",
      )}
      style={{
        // zIndex: layer.locked ? 1 : 0,
        pointerEvents: layer.locked ? "none" : "auto",
      }}
    />
  );
}
