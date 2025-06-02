import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import styles from '../styles/StatCard.module.scss';

interface StatCardProps {
  title: string;
  value: string;
  color: 'primary' | 'secondary' | 'success' | 'info';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={styles.card}
    >
      <div className={styles.content}>
        <div className={classNames(styles.icon, styles[color])}>
          {icon}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.value}>{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard; 