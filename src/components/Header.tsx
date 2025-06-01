import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from "./styles/Header.module.scss";

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };

    const navigation: NavItem[] = [
        { path: '/', label: 'Главная' },
        { path: '/chat', label: 'AI Ассистент' },
        { path: '/events', label: 'Мероприятия' },
        { path: '/calendar', label: 'Календарь' },
    ];

    const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => (
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
                        <div className={styles.logoIcon}>
                            <div className={styles.logoIconInner}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 20V10M12 10L7 6M12 10L17 6"
                                        stroke="url(#grad1)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <span className={styles.logoText}>
              FamilyAI
            </span>
                    </Link>

                    <nav className={styles.nav}>
                        {navigation.map(({ path, label }) => (
                            <NavLink key={path} to={path}>{label}</NavLink>
                        ))}
                    </nav>

                    <div className={styles.profileSection}>
                        <Link
                            to="/profile"
                            className={classNames(styles.profileButton, {
                                [styles.active]: isActive('/profile')
                            })}
                            onClick={closeMobileMenu}
                        >
                            <div className={styles.profileButtonInner}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    <button
                        className={styles.menuButton}
                        onClick={toggleMobileMenu}
                        aria-label="Открыть меню"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <nav className={classNames(styles.mobileNav, {
                [styles.isOpen]: isMobileMenuOpen
            })}>
                {navigation.map(({ path, label }) => (
                    <NavLink key={path} to={path} onClick={closeMobileMenu}>
                        {label}
                    </NavLink>
                ))}
                <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                >
                    Профиль
                </NavLink>
            </nav>

            <svg width="0" height="0">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F43F5E" />
                        <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                </defs>
            </svg>
        </header>
    );
};

export default Header; 