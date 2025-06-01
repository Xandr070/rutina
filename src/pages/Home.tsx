import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import { HiOutlineClock, HiOutlineChat, HiOutlineCalendar } from 'react-icons/hi';
import styles from './styles/Home.module.scss';
import {PiChartLine, PiLightbulb, PiRobotLight} from "react-icons/pi";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

type AIFeatureCardProps = FeatureCardProps

interface StepItemProps {
    number: number;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({icon, title, description}) => (
    <motion.div
        whileHover={{y: -5}}
        className={styles.featureCard}
    >
        <div className={styles.icon}>
            {icon}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
    </motion.div>
);

const AIFeatureCard: React.FC<AIFeatureCardProps> = ({icon, title, description}) => (
    <motion.div
        whileHover={{y: -5}}
        className={styles.aiFeatureCard}
    >
        <div className={styles.glow}/>
        <div className={styles.content}>
            <div className={styles.icon}>
                {icon}
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    </motion.div>
);

const StepItem: React.FC<StepItemProps> = ({number, title, description}) => (
    <div className={styles.stepItem}>
        <div className={`${styles.stepNumber} ${styles[`step${number}`]}`}>
            {number}
        </div>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDescription}>{description}</p>
    </div>
);

const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F43F5E"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                    </linearGradient>
                </defs>
            </svg>

            <div className={styles.backgroundEffects}>
                <div className={styles.blob1}/>
                <div className={styles.blob2}/>
            </div>

            <div className={styles.container}>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className={styles.hero}
                >
                    <h1 className={styles.title}>Семейный досуг будущего с{' '}<span className={styles.highlight}>искусственным интеллектом</span>
                    </h1>
                    <p className={styles.description}>
                        Откройте новые возможности для семейного отдыха с помощью искусственного интеллекта.
                        Персонализированные рекомендации, умное планирование и незабываемые моменты вместе.
                    </p>
                    <Link
                        to="/chat"
                        className={styles.cta}
                    >
                        Начать планирование
                    </Link>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    className={styles.features}
                >
                    <FeatureCard
                        icon={<HiOutlineClock />}
                        title="AI Ассистент"
                        description="Персональный помощник, который анализирует интересы вашей семьи и предлагает идеальные варианты досуга"
                    />
                    <FeatureCard
                        icon={<HiOutlineChat />}
                        title="Умный подбор"
                        description="AI учитывает возраст детей, интересы всех членов семьи, погоду и даже транспортную доступность"
                    />
                    <FeatureCard
                        icon={<HiOutlineCalendar />}
                        title="Календарь мероприятий"
                        description="Удобное планирование и отслеживание всех семейных событий в одном месте"
                    />
                </motion.div>

                <motion.section
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                    className={styles.steps}
                >
                    <h2 className={styles.sectionTitle}>Как это работает</h2>
                    <div className={styles.stepsGrid}>
                        <StepItem
                            number={1}
                            title="Создайте профиль"
                            description="Укажите состав семьи и интересы каждого члена"
                        />
                        <StepItem
                            number={2}
                            title="Общайтесь с AI"
                            description="Расскажите о своих пожеланиях ассистенту"
                        />
                        <StepItem
                            number={3}
                            title="Получите план"
                            description="AI предложит оптимальные варианты досуга"
                        />
                        <StepItem
                            number={4}
                            title="Наслаждайтесь"
                            description="Проводите время вместе и создавайте воспоминания"
                        />
                    </div>
                </motion.section>

                <motion.section
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.4}}
                    className={styles.aiFeatures}
                >
                    <h2 className={styles.sectionTitle}>
                        Преимущества AI в планировании досуга
                    </h2>
                    <p className={styles.sectionDescription}>
                        Искусственный интеллект анализирует множество факторов, чтобы предложить идеальные варианты для
                        вашей семьи
                    </p>
                    <div className={styles.grid}>
                        <AIFeatureCard
                            icon={<PiRobotLight />}
                            title="Персонализация"
                            description="AI учится на ваших предпочтениях и создает все более точные рекомендации с каждым использованием"
                        />
                        <AIFeatureCard
                            icon={<PiLightbulb />}
                            title="Быстрый анализ"
                            description="Мгновенная обработка данных о погоде, пробках, расписаниях и других важных факторах"
                        />
                        <AIFeatureCard
                            icon={<PiChartLine />}
                            title="Умная аналитика"
                            description="Анализ ваших предпочтений и создание персонализированных рекомендаций"
                        />
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default Home;
