interface LayerBase<Type> {
  id: string;
  name: string;
  type: Type;
  locked?: boolean;
  offsetX?: number;
  offsetY?: number;
  width?: number;
  height?: number;
}

interface GridLayer<Type> extends LayerBase<Type> {
  cellWidth: number;
  cellHeight: number;
  cellFill: string | ((x: number, y: number) => string);
  cellStroke: string | ((x: number, y: number) => string);
  cellStrokeWidth: number;
  alwaysShowGridLines?: boolean;
}

// Interactive hex grid
export interface HexGridLayer extends GridLayer<"grid-hex"> {
  gridType: "horizontal" | "vertical";
}

// Interactive square grid
export type SquareGridLayer = GridLayer<"grid-square">;

// Non-interactive layer
export interface StaticLayer extends LayerBase<"static"> {
  src: string;
  width: number;
  height: number;
}

// Static layer can be clicked to toggle
export interface HiddenAreaLayer extends LayerBase<"hidden-area"> {
  color: string;
}

export type Layer =
  | HexGridLayer
  | SquareGridLayer
  | StaticLayer
  | HiddenAreaLayer;

export interface Map {
  id: string;
  layers: Layer[];
}

export interface MapState {
  layerVisibility: Record<string, boolean>;
  layerOpacity: Record<string, number>;
  gridState: Record<string, [number, number][]>;
}
