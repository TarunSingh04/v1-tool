import React from 'react';
import styles from './styles.module.scss';

interface ScoreBarProps {
  label: string;
  percentage: number;
  color: string;
  className?: string;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  label,
  percentage,
  color,
  className = ''
}) => {
  const remaining = 100 - percentage;

  const commonTextStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.label} style={{ 
            color: color
          }}>{label}</div>
      
      <div className={styles.barContainer}>
        <div 
          className={styles.filledBar}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        >
          <div 
            className={styles.percentageText}
            style={{ 
              ...commonTextStyles,
              color: '#4B5563',
               display: 'flex',
               alignItems:"center"
            }}
          >
            {percentage}% COMPLETED 
          </div>
        </div>
        
        <div 
          className={styles.percentageText}
          style={{ 
            ...commonTextStyles,
            left: `${percentage}%`,
            width: `${remaining}%`,
            color: '#4B5563',
            display: 'flex',
            alignItems:"center"
          }}
        >
          {remaining}% REMAINING
        </div>
      </div>
    </div>
  );
};

// Example usage component
interface ESGScoreBarProps {
  scores: Array<{
    label: string;
    percentage: number;
    color: string;
  }>;
  className?: string;
}

export const ESGScoreBars: React.FC<ESGScoreBarProps> = ({
  scores,
  className = ''
}) => {
  return (
    <div className={className}>
      {scores.map((score) => (
        <ScoreBar
          key={score.label}
          label={score.label}
          percentage={score.percentage}
          color={score.color}
        />
      ))}
    </div>
  );
};

export default ESGScoreBars;