// ProgressBar.tsx
import React from 'react';
import styles from './styles.module.scss';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
}

const Circlescroll = ({
  progress = 75,
  color = '#22c55e', // green-500 equivalent
  height = '6px'
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={styles.container}>
      {/* Background bar */}
      <div className={styles.progressBackground}>
        {/* Progress indicator */}
        <div
          className={styles.progressBar}
          style={{ 
            width: `${clampedProgress}%`,
            backgroundColor: color,
            height
          }}
        />
      </div>
      
      {/* Circular percentage indicator */}
      <div 
        className={styles.circleWrapper}
        style={{ left: `${clampedProgress}%` }}
      >
        <div 
          className={styles.circle}
          style={{ backgroundColor: color }}
        >
          <span className={styles.percentage}>{clampedProgress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Circlescroll;