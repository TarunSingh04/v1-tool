import React from 'react';
import styles from './styles.module.scss';

interface GaugeProps {
  value?: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  fontsz?: number;
  color?: string;
  trackColor?: string;
}

const Gauge: React.FC<GaugeProps> = ({ 
  value = 75,
  label = 'B',
  fontsz = 108,
  size = 200,
  strokeWidth = 12,
  color = '#4ade80',
  trackColor = '#e5e7eb'
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  
  // Define the sweep angles (starting from left side)
  const startAngle = 270 + 137.5;  // Bottom side
  const endAngle = 270 - 137.5;    // Top side
  
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
          <svg
            width={size}
            height={size}
            className={styles.gauge}
          >
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
            <span className={styles.label} style={{color:color,fontSize:`${fontsz}px`}}>
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gauge;