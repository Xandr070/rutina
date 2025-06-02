import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/FamilyMemberCard.module.scss';

interface FamilyMember {
  id: number;
  name: string;
  role: 'parent' | 'child';
  birthDate: string;
  interests: string[];
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  onDelete: (id: number) => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAgeString = (birthDate: string) => {
    const years = new Date().getFullYear() - new Date(birthDate).getFullYear();
    return `${years} ${years % 10 === 1 && years !== 11 ? 'год' : years % 10 >= 2 && years % 10 <= 4 && (years < 10 || years > 20) ? 'года' : 'лет'}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={styles.card}
    >
      <div className={styles.progressBar} style={{ transform: isHovered ? 'scaleX(1)' : 'scaleX(0)' }} />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {member.name[0]}
            </div>
            {member.role === 'parent' && (
              <div className={styles.badge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className={styles.info}>
            <h3 className={styles.name}>{member.name}</h3>
            <div className={styles.meta}>
              <span>{member.role === 'parent' ? 'Родитель' : 'Ребенок'}</span>
              <span className={styles.separator}>•</span>
              <span>{getAgeString(member.birthDate)}</span>
            </div>
          </div>
        </div>

        <div className={styles.interests}>
          {member.interests.map((interest, index) => (
            <span
              key={index}
              className={styles.interest}
            >
              {interest}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.actions}
            >
              <button
                onClick={() => onEdit(member)}
                className={styles.editButton}
              >
                Редактировать
              </button>
              <button
                onClick={() => onDelete(member.id)}
                className={styles.deleteButton}
              >
                Удалить
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FamilyMemberCard; 