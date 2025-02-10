// Checkbox.tsx
import React from 'react';
import styles from './styles.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  value,
  onChange,
  ...props
}) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        value={value}
        onChange={onChange}
        {...props}
      />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;