import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer, // Import ResponsiveContainer
} from "recharts";

const data = [
  {
    labelName: "Overall-score",
    previous: 50,
    current: 80,
    amt: 2400,
  },
  {
    labelName: "E-score",
    previous: 60,
    current: 90,
    amt: 2210,
  },
  {
    labelName: "S-score",
    previous: 40,
    current: 50,
    amt: 2290,
  },
  {
    labelName: "G-score",
    previous: 60,
    current: 40,
    amt: 2000,
  },
];

type CurrentData =
  | {
      total_score: number;
      total_e_score: number;
      total_s_score: number;
      total_g_score: number;
    }
  | {
      mean_e_score: number;
      mean_s_score: number;
      mean_g_score: number;
      onboarding_score: number;
    };

interface LinemetricsProps {
  currentData: CurrentData;
}

export default function Linemetrics({ currentData }: LinemetricsProps) {
  const isTotalScoreData = "total_score" in currentData;

  const data = [
    {
      labelName: "Overall Score",
      current: isTotalScoreData
        ? currentData.total_score
        : currentData.onboarding_score,
    },
    {
      labelName: "E-score",
      current: isTotalScoreData
        ? currentData.total_e_score
        : currentData.mean_e_score,
    },
    {
      labelName: "S-score",
      current: isTotalScoreData
        ? currentData.total_s_score
        : currentData.mean_s_score,
    },
    {
      labelName: "G-score",
      current: isTotalScoreData
        ? currentData.total_g_score
        : currentData.mean_g_score,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="labelName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="previous" stroke="#57B9FF" />
        <Line type="monotone" dataKey="current" stroke="#1B6FB8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
