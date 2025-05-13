"use client";

import type { Map } from "@/types/structure";
import { useEffect, useMemo, useRef } from "react";
import Panzoom from "@panzoom/panzoom";
import { LayerComponent } from "./layers/LayerComponent";
import type { MapContext } from "@/types/rendering";

interface Props {
  map: Map;
}

export default function MapDisplay({ map }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    const panzoom = Panzoom(element, {
      animate: true,
      easing: "ease-in-out",
      overflow: "hidden",
    });
    element.parentElement?.addEventListener("wheel", panzoom.zoomWithWheel);
    return () => {
      panzoom.destroy();
    };
  }, [ref]);

  const context = useMemo<MapContext>(() => {
    return {
      mapWidth: map.layers[0]?.width ?? 0,
      mapHeight: map.layers[0]?.height ?? 0,
    };
  }, [map.layers]);

  return (
    <div
      ref={ref}
      className="relative w-full"
      onContextMenu={(event) => event.preventDefault()}
    >
      {map.layers.length > 0 && (
        <LayerComponent
          layer={map.layers[0]!}
          context={context}
          staticPosition
        />
      )}
      {map.layers.slice(1).map((layer) => (
        <LayerComponent key={layer.id} layer={layer} context={context} />
      ))}
    </div>
  );
}
