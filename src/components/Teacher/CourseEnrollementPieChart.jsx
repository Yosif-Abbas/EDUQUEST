import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF6636',
  '#526D82',
  '#564FFD',
  '#FFEEE8',
  '#876A9A',
  '#23BD33',
  '#1D2026',
  '#A155B9',
  '#5FDDE5',
  '#FF7F50',
  '#6BA368',
  '#F9844A',
  '#F6BD60',
  '#9B5DE5',
  '#00B4D8',
  '#FF6F91',
  '#BDB2FF',
];

const CourseEnrollmentPieChart = ({ data }) => {
  if (!data) return;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="students_enrolled"
            nameKey="title"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip offset={-60} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseEnrollmentPieChart;
