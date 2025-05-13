import MapDisplay from "@/components/MapDisplay";
import { HydrateClient } from "@/trpc/server";
import type { Map } from "@/types/structure";

const map: Map = {
  id: "test-map",
  layers: [
    {
      id: "base",
      name: "Background",
      type: "static",
      locked: true,
      src: "/maps/chult/chult-base.avif",
      width: 2213,
      height: 2997,
    },
    {
      id: "grid",
      name: "Grid",
      type: "grid-hex",
      cellWidth: 39.55,
      cellHeight: 34.41,
      gridType: "horizontal",
      cellFill: "transparent",
      cellStroke: "red",
      cellStrokeWidth: 1,
      offsetX: 3,
      offsetY: 2,
    },
    {
      id: "labels",
      name: "Labels",
      type: "static",
      locked: true,
      src: "/maps/chult/chult-labels.avif",
      width: 2213,
      height: 2997,
    },
  ],
};

export default function TestPage() {
  return (
    <HydrateClient>
      <main className="h-screen w-screen bg-neutral-950">
        <MapDisplay map={map} />
      </main>
    </HydrateClient>
  );
}
