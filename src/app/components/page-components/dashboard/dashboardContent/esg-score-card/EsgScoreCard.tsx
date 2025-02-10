"use client";
import React, { useState, useEffect } from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";
import styles from "./styles.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

interface ProgressItem {
  label: string;
  value: number;
  color: string;
  description: string;
}

interface GaugeProps {
  value?: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
}

const ScoreCardGauge: React.FC<GaugeProps> = ({
  value = 75,
  label = "B",
  size = 72,
  strokeWidth = 7,
  color = "#4ade80",
  trackColor = "#e5e7eb",
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Define the sweep angles (starting from left side)
  const startAngle = 270 + 137.5; // Bottom side
  const endAngle = 270 - 137.5; // Top side

  // Convert angles to radians
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  // Calculate points for the arc
  const startX = center + radius * Math.cos(startRad);
  const startY = center + radius * Math.sin(startRad);
  const endX = center + radius * Math.cos(endRad);
  const endY = center + radius * Math.sin(endRad);

  // Create the arc path
  const arcPath = `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 1 0 ${endX} ${endY}
  `;

  // Calculate the arc length for the progress
  const circumference = (radius * Math.PI * 275) / 180;
  const progress = Math.min(Math.max(value, 0), 100);
  const progressOffset = ((100 - progress) / 100) * circumference;

  return (
    <div className={styles.gaugeContainer}>
      <div className={styles.gaugeWrapper}>
        <div className={styles.gaugeContent}>
          <svg width={size} height={size} className={styles.gauge}>
            {/* Track arc */}
            <path
              d={arcPath}
              fill="none"
              stroke={trackColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className={styles.track}
            />

            {/* Progress arc */}
            <path
              d={arcPath}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: progressOffset,
              }}
              className={styles.progress}
            />
          </svg>

          {/* Label */}
          <div className={styles.labelContainer}>
            <span className={styles.label}>{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const progressData: ProgressItem[] = [
  {
    label: "Environmental",
    value: 40,
    color: "#A7F1A5",
    description: "Reflects stakeholder-approved sustainability policies.",
  },
  {
    label: "Social",
    value: 30,
    color: "#FDE083",
    description: "Indicates progress on socially responsible practices.",
  },
  {
    label: "Governance",
    value: 30,
    color: "#9EC8FD",
    description:
      "Shows the alignment of governance practices with updated policies.",
  },
];

const CircularProgressItem: React.FC<ProgressItem> = ({
  label,
  value,
  color,
  description,
}) => {
  const { value: countUpValue } = useCountUp({
    isCounting: true,
    end: value,
    duration: 2,
  });

  return (
    <div className={styles.progressiveContainer}>
      <ScoreCardGauge color={color} value={value} label={`${value}%`} />

      <Typography
        sx={{
          color: "#1D2029",
          marginLeft: "20px",
          fontSize: "16px",
          width: "80%",
          fontWeight: 600,
        }}
      >
        {label}
        <p className={styles.scoreSubtext}>{description}</p>
      </Typography>
      <BsThreeDots className={styles.takeAction} />
    </div>
  );
};

const CircularProgressCountUp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [escore, setEscore] = useState(0);
  const [sscore, setSscore] = useState(0);
  const [gscore, setGscore] = useState(0);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/score`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const data = await response.json();
        setEscore(Math.round(data.mean_e_score));
        setSscore(Math.round(data.mean_s_score));
        setGscore(Math.round(data.mean_g_score));
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchScore();
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const progressData: ProgressItem[] = [
    {
      label: "Environmental",
      value: escore,
      color: "#A7F1A5",
      description: "Reflects stakeholder-approved sustainability policies.",
    },
    {
      label: "Social",
      value: sscore,
      color: "#FDE083",
      description: "Indicates progress on socially responsible practices.",
    },
    {
      label: "Governance",
      value: gscore,
      color: "#9EC8FD",
      description:
        "Shows the alignment of governance practices with updated policies.",
    },
  ];

  return (
    <div className={styles.scorecard}>
      <p className={styles.cardheader}>ESG Scores</p>
      <div className={styles.itemscont}>
        {isVisible &&
          progressData.map((item, index) => (
            <CircularProgressItem key={index} {...item} />
          ))}
      </div>
    </div>
  );
};

export default CircularProgressCountUp;
