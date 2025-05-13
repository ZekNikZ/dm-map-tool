import type { HexGridLayer } from "@/types/structure";
import HexCell from "./grid/HexCell";
import type { MapContext } from "@/types/rendering";

interface Props {
  layer: HexGridLayer;
  context: MapContext;
}

export default function HexGridLayerComponent({ layer, context }: Props) {
  const {
    offsetX,
    offsetY,
    cellWidth,
    cellHeight,
    cellFill,
    cellStroke,
    cellStrokeWidth,
  } = layer;

  const numRows = context.mapHeight / cellHeight;
  const numCols = Math.ceil(((context.mapWidth / cellWidth) * 4) / 3);

  const cells = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex) => ({
      x: (offsetX ?? 0) + colIndex * ((cellWidth * 3) / 4),
      y:
        (offsetY ?? 0) +
        rowIndex * cellHeight +
        ((colIndex % 2) * cellHeight) / 2,
      width: cellWidth,
      height: cellHeight,
      fill:
        cellFill instanceof Function ? cellFill(colIndex, rowIndex) : cellFill,
      stroke:
        cellStroke instanceof Function
          ? cellStroke(colIndex, rowIndex)
          : cellStroke,
      strokeWidth: cellStrokeWidth,
    })),
  );

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        width: layer.width,
        height: layer.height,
        // backgroundColor: layer.color,
        // opacity: layer.opacity,
        pointerEvents: layer.locked ? "none" : "auto",
      }}
    >
      {/* Hex grid rendering logic goes here */}
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <HexCell
            key={`${rowIndex}-${colIndex}`}
            x={cell.x}
            y={cell.y}
            width={cell.width}
            height={cell.height}
            fill={cell.fill}
            stroke={cell.stroke}
            strokeWidth={cell.strokeWidth}
          />
        )),
      )}
    </div>
  );
}
