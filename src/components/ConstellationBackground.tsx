import { useState } from 'react';

type Point = { x: number; y: number };
type Line = { from: Point; to: Point };

const POINT_COUNT = 36;        // 点の数
const CONNECT_DISTANCE = 140;  // これより近い点同士だけ線で繋ぐ
const MAX_CONNECTIONS = 2;     // 1つの点から伸ばす線の最大本数
const WIDTH = 340;
const HEIGHT = 220;

// ランダムな点を生成する
const generatePoints = (): Point[] => {
  const points: Point[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    points.push({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
    });
  }
  return points;
};

// 2点間の距離を求める（三平方の定理）
const getDistance = (a: Point, b: Point) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// 各点について、近い点をMAX_CONNECTIONS本まで線で繋ぐ
const generateLines = (points: Point[]): Line[] => {
  const lines: Line[] = [];

  points.forEach((point, i) => {
    // 自分以外の点との距離を計算して、近い順に並べる
    const nearby = points
      .map((other, j) => ({ other, index: j, dist: getDistance(point, other) }))
      .filter((entry) => entry.index !== i && entry.dist < CONNECT_DISTANCE)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, MAX_CONNECTIONS);

    nearby.forEach((entry) => {
      // 同じ線を2回描かないように、自分より後の点との組み合わせだけ描く
      if (i < entry.index) {
        lines.push({ from: point, to: entry.other });
      }
    });
  });

  return lines;
};

// 光らせる点をランダムに数個選ぶ
const pickHighlights = (points: Point[], count: number): Point[] => {
  const shuffled = [...points].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default function ConstellationBackground() {
  const [points] = useState(generatePoints);
  const [lines] = useState(() => generateLines(points));
  const [highlights] = useState(() => pickHighlights(points, 2));

  return (
    <svg
      className="constellation-bg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {lines.map((line, i) => (
        <line
          key={`line-${i}`}
          x1={line.from.x}
          y1={line.from.y}
          x2={line.to.x}
          y2={line.to.y}
          stroke="#d8d2c8"
          strokeWidth={1.2}
        />
      ))}

      {points.map((point, i) => {
        const isHighlighted = highlights.includes(point);
        const color = i % 2 === 0 ? '#EC4899' : '#22D3EE';

        return (
          <g key={`point-${i}`}>
            {isHighlighted && (
              <circle cx={point.x} cy={point.y} r={11} fill={color} opacity={0.25} />
            )}
            <circle
              cx={point.x}
              cy={point.y}
              r={isHighlighted ? 5 : 3}
              fill={isHighlighted ? color : '#b9b2a6'}
            />
          </g>
        );
      })}
    </svg>
  );
}
