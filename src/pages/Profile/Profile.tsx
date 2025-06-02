import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from '../../styles/Profile.module.scss';
import FamilyMemberCard from '../../components/FamilyMemberCard.tsx';
import StatCard from '../../components/StatCard';
import ProfileSection from '../../components/ProfileSection';

interface FamilyMember {
  id: number;
  name: string;
  role: 'parent' | 'child';
  birthDate: string;
  interests: string[];
}

const Profile: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      name: 'Александр',
      role: 'parent',
      birthDate: '1985-05-15',
      interests: ['Спорт', 'Путешествия', 'Фотография']
    },
    {
      id: 2,
      name: 'Мария',
      role: 'parent',
      birthDate: '1987-08-23',
      interests: ['Кулинария', 'Йога', 'Искусство']
    },
    {
      id: 3,
      name: 'Дмитрий',
      role: 'child',
      birthDate: '2015-03-10',
      interests: ['Конструкторы', 'Динозавры', 'Рисование']
    },
    {
      id: 4,
      name: 'София',
      role: 'child',
      birthDate: '2018-11-05',
      interests: ['Танцы', 'Куклы', 'Мультфильмы']
    }
  ]);

  const stats = [
    {
      title: 'Посещено мероприятий',
      value: '24',
      color: 'primary',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'Запланировано',
      value: '8',
      color: 'secondary',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Любимых мест',
      value: '12',
      color: 'success',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Достижений',
      value: '15',
      color: 'info',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  const handleEditMember = (member: FamilyMember) => {
    console.log('Edit member:', member);
  };

  const handleDeleteMember = (memberId: number) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleAddMember = () => {
    console.log('Add new family member');
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.container}>
        <ProfileSection title="Профиль">
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              А
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>Александр Иванов</h1>
              <p className={styles.email}>alexander@example.com</p>
              <div className={styles.actions}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={classNames(styles.button, styles.primary)}
                >
                  Редактировать профиль
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={classNames(styles.button, styles.secondary)}
                >
                  Настройки
                </motion.button>
              </div>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Статистика">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </ProfileSection>

        <ProfileSection title="Члены семьи">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionDescription}>
              Управляйте составом вашей семьи и настройками каждого участника
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddMember}
              className={classNames(styles.button, styles.primary)}
            >
              Добавить члена семьи
            </motion.button>
          </div>
          <div className={styles.familyGrid}>
            <AnimatePresence>
              {familyMembers.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                />
              ))}
            </AnimatePresence>
          </div>
        </ProfileSection>

        <ProfileSection title="Предпочтения">
          <div className={styles.preferencesGrid}>
            <div className={styles.preferenceSection}>
              <h3 className={styles.preferenceTitle}>Любимые активности</h3>
              <div className={styles.activitiesList}>
                {['Парки', 'Музеи', 'Мастер-классы', 'Спорт', 'Театр', 'Кино', 'Рестораны'].map((activity, index) => (
                  <span
                    key={index}
                    className={styles.activityTag}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.preferenceSection}>
              <h3 className={styles.preferenceTitle}>Особые предпочтения</h3>
              <div className={styles.checkboxList}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>Получать уведомления о новых мероприятиях</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>Персонализированные рекомендации</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>Подписка на новости и обновления</span>
                </label>
              </div>
            </div>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default Profile; 