interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth?: number;
}

export default function HexCell({
  x,
  y,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
}: Props) {
  const s = width / 2; // radius of the hexagon
  const h = height / 2; // height of the hexagon

  const hexPath = `
    ${0} ${h}
    ${s / 2} ${0}
    ${(s * 3) / 2} ${0}
    ${2 * s} ${h}
    ${(s * 3) / 2} ${h * 2}
    ${s / 2} ${h * 2}
    `;

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        fill,
        overflow: "visible",
      }}
      className={`hover:!fill-green-500`}
      height={h * 2}
      width={s * 2}
    >
      <polygon points={hexPath} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}
