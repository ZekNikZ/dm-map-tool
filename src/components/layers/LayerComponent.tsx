import type { Layer } from "@/types/structure";
import StaticLayerComponent from "./StaticLayerComponent";
import HexGridLayerComponent from "./HexGridLayerComponent";
import type { MapContext } from "@/types/rendering";

interface Props {
  layer: Layer;
  context: MapContext;
  staticPosition?: boolean;
}

export function LayerComponent({ layer, context, staticPosition }: Props) {
  switch (layer.type) {
    case "grid-hex":
      return <HexGridLayerComponent layer={layer} context={context} />;
    case "grid-square":
      return <div>Square grid layer</div>;
    case "static":
      return (
        <StaticLayerComponent layer={layer} staticPosition={staticPosition} />
      );
    case "hidden-area":
      return <div style={{ backgroundColor: layer.color }}>Hidden area</div>;
    default:
      return null;
  }
}
