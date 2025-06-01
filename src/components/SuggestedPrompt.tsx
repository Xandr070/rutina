import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';
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
      <div className={styles.icon}>
        {icon}
      </div>
      
      <h4 className={styles.title}>{prompt}</h4>
      <p className={styles.description}>{description}</p>

      <div className={styles.action}>
        <span>Спросить</span>
        <HiOutlineArrowRight className={styles.arrow} />
      </div>
    </motion.button>
  );
};

export default SuggestedPrompt; 