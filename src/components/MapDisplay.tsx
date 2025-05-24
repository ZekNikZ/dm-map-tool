"use client";

import type { Map } from "@/types/structure";
import { useEffect, useMemo, useRef } from "react";
import Panzoom, { type PanzoomObject } from "@panzoom/panzoom";
import { LayerComponent } from "./layers/LayerComponent";
import type { MapContext } from "@/types/rendering";

interface Props {
  map: Map;
}

interface TrackedRect {
  width: number;
  height: number;
}

export default function MapDisplay({ map }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<PanzoomObject | null>(null);
  const elementBoundingBoxRef = useRef<TrackedRect | null>(null);

  function onResize() {
    // If panzoom is not initialized, do nothing
    const panzoom = panzoomRef.current;
    const element = ref.current;
    if (!panzoom || !element) {
      return;
    }

    // Calculate the new bounding box
    const oldWidth = elementBoundingBoxRef.current?.width ?? 0;
    const oldHeight = elementBoundingBoxRef.current?.height ?? 0;

    const newWidth = element.clientHeight;
    const newHeight = element.clientWidth;

    const diffX = newWidth - oldWidth;
    const diffY = newHeight - oldHeight;

    elementBoundingBoxRef.current = {
      width: newWidth,
      height: newHeight,
    };

    // Move the center of the panzoom to the center of the new bounding box
    panzoom.pan(diffY / 2, diffX / 2, { relative: true, animate: false });
  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // Create panzoom
    const element = ref.current;
    const panzoom = Panzoom(element, {
      animate: true,
      easing: "ease-in-out",
      overflow: "hidden",
    });
    panzoomRef.current = panzoom;

    // Add events
    element.parentElement?.addEventListener("wheel", panzoom.zoomWithWheel);
    window.addEventListener("resize", onResize);

    // Initial resize
    elementBoundingBoxRef.current = {
      width: element.clientWidth,
      height: element.clientHeight,
    };

    // Clean up
    return () => {
      panzoom.destroy();
      panzoomRef.current = null;
      window.removeEventListener("resize", onResize);
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
      className="relative h-full w-full"
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
