import styles from './layout.module.scss';

export const QuestionLayout = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>{children}</div>
    </>
  );
}