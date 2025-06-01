import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Chat.module.scss';

interface Activity {
  title: string;
  description: string;
  time?: string;
  location?: string;
}

interface SuggestedActivityProps {
  activity: Activity;
  onAccept: () => void;
  onDecline: () => void;
  onAddToCalendar: () => void;
}

const SuggestedActivity: React.FC<SuggestedActivityProps> = ({
  activity,
  onAccept,
  onDecline,
  onAddToCalendar
}) => {
  return (
    <div className={styles.suggestedActivity}>
      <h4 className={styles.activityTitle}>{activity.title}</h4>
      <p className={styles.activityDescription}>{activity.description}</p>
      <div className={styles.activityMeta}>
        {activity.time && (
          <span>
            <svg className="w-4 h-4 mr-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {activity.time}
          </span>
        )}
        {activity.location && (
          <span>
            <svg className="w-4 h-4 mr-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {activity.location}
          </span>
        )}
      </div>
      <div className={styles.activityActions}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAccept}
          className={styles.primary}
        >
          Отлично!
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddToCalendar}
          className={styles.secondary}
        >
          Добавить в календарь
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDecline}
          className={styles.danger}
        >
          Не подходит
        </motion.button>
      </div>
    </div>
  );
};

export default SuggestedActivity; 