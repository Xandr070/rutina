import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Chat.module.scss';

interface SuggestedPromptProps {
  prompt: string;
  icon: React.ReactNode;
  description: string;
  onClick: (prompt: string) => void;
}

const SuggestedPrompt: React.FC<SuggestedPromptProps> = ({
  prompt,
  icon,
  description,
  onClick
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(prompt)}
      className={styles.promptCard}
    >
      <div className={styles.glow} />
      
      <div className={styles.content}>
        <div className={styles.icon}>
          {icon}
        </div>
        <div className={styles.text}>
          <h4 className={styles.title}>{prompt}</h4>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={styles.action}>
        <span>Спросить</span>
        <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </div>
    </motion.button>
  );
};

export default SuggestedPrompt; 