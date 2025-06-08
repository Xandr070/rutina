import React, {useState, useEffect, useCallback} from 'react';
import {Link, useLocation} from 'react-router-dom';
import classNames from 'classnames';
import styles from "../styles/Header.module.scss";
import {CgProfile} from "react-icons/cg";

const useMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(`.${styles.mobileNav}`) && !target.closest(`.${styles.menuButton}`)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [isOpen]);

    const toggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {isOpen, toggle, close};
};

interface NavItem {
    path: string;
    label: string;
}

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const Header: React.FC = () => {
    const location = useLocation();
    const {isOpen, toggle, close} = useMobileMenu();

    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };

    const navigation: NavItem[] = [
        {path: '/rutina/', label: 'Главная'},
        {path: '/rutina/chat', label: 'AI Ассистент'},
        {path: '/rutina/events', label: 'Мероприятия'},
        {path: '/rutina/calendar', label: 'Календарь'},
    ];

    const NavLink: React.FC<NavLinkProps> = ({to, children, onClick}) => (
        <Link
            to={to}
            className={classNames(styles.navLink, {
                [styles.active]: isActive(to)
            })}
            onClick={onClick}
        >
            {children}
        </Link>
    );

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Link to="/rutina/" className={styles.logo} onClick={close}>
                        <span className={styles.logoText}>FamilyAI</span>
                    </Link>

                    <nav className={styles.nav}>
                        {navigation.map(({path, label}) => (
                            <NavLink key={path} to={path}>{label}</NavLink>
                        ))}
                    </nav>

                    <div className={styles.profileSection}>
                        <Link
                            to="/rutina/profile"
                            className={classNames(styles.profileButton, {
                                [styles.active]: isActive('/rutina/profile')
                            })}
                            onClick={close}
                        >
                            <CgProfile 
                                size={16}
                                color="currentColor"
                                className={styles.profileIcon}
                            />
                        </Link>
                    </div>

                    <button
                        className={styles.menuButton}
                        onClick={toggle}
                        aria-label="Открыть меню"
                        aria-expanded={isOpen}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12"/>
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16"/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <div
                className={classNames(styles.mobileNav, {
                    [styles.isOpen]: isOpen
                })}
            >
                {navigation.map(({path, label}) => (
                    <NavLink key={path} to={path} onClick={close}>
                        {label}
                    </NavLink>
                ))}
                <NavLink
                    to="/rutina/profile"
                    onClick={close}
                >
                    Профиль
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
