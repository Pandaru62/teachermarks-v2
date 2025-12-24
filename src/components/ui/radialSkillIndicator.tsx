import { SkillLevelEnum } from "../../interfaces/student-test.interface";
import { getSkillColor } from "../studentReport/studentReportPdf";

type RadialSkillProps = {
  level: {
    average: number;
    level: SkillLevelEnum;
  };
  size?: number; // px
  strokeWidth?: number;
};

export function RadialSkillIndicator({
  level,
  size = 64,
  strokeWidth = 6,
}: RadialSkillProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(Math.max(level.average, 0), 4) / 4;
  const dashOffset = circumference * (1 - progress);

  return (
    <div style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getSkillColor(level.level)}
          // stroke={getLevelColor(`LVL_${level}` as SkillLevelEnum)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Center text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-gray-700 font-semibold text-sm"
        >
          {Number.isNaN(level.average) ? "NN" : `${level.average.toFixed(2)}/4`}
        </text>
      </svg>
    </div>
  );
}
