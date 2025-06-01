import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import styles from '../styles/Chat.module.scss';
import SuggestedActivity from './SuggestedActivity';

interface Activity {
  title: string;
  description: string;
  time?: string;
  location?: string;
}

interface Message {
  id: number;
  content: string;
  isAi: boolean;
  thinking?: boolean;
  activities?: Activity[];
}

interface MessageBubbleProps {
  message: Message;
  isAi: boolean;
  onActivityAction: (activity: Activity, action: 'accept' | 'decline' | 'calendar') => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isAi, onActivityAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={classNames(styles.messageBubble, {
        [styles.ai]: isAi,
        [styles.user]: !isAi
      })}
    >
      <div className={classNames(styles.bubbleContent, {
        [styles.ai]: isAi,
        [styles.user]: !isAi
      })}>
        <div className={classNames(styles.avatar, {
          [styles.ai]: isAi,
          [styles.user]: !isAi
        })}>
          {isAi ? (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        <div className={classNames(styles.message, {
          [styles.ai]: isAi,
          [styles.user]: !isAi
        })}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.thinking && (
            <div className="flex space-x-1 mt-2 h-4">
              <motion.div
                className="w-1 h-1 rounded-full bg-gray-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-1 h-1 rounded-full bg-gray-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-1 h-1 rounded-full bg-gray-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          )}
          {message.activities && (
            <div className="mt-3">
              {message.activities.map((activity, index) => (
                <SuggestedActivity
                  key={index}
                  activity={activity}
                  onAccept={() => onActivityAction(activity, 'accept')}
                  onDecline={() => onActivityAction(activity, 'decline')}
                  onAddToCalendar={() => onActivityAction(activity, 'calendar')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble; 