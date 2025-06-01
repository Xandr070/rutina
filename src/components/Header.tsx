import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import classNames from 'classnames';
import styles from "./styles/Header.module.scss";
import {CgProfile} from "react-icons/cg";

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
        {path: '/', label: 'Главная'},
        {path: '/chat', label: 'AI Ассистент'},
        {path: '/events', label: 'Мероприятия'},
        {path: '/calendar', label: 'Календарь'},
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
                        <span className={styles.logoText}>FamilyAI</span>
                    </Link>

                    <nav className={styles.nav}>
                        {navigation.map(({path, label}) => (
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
                            <CgProfile 
                                size={16}
                                color="currentColor"
                                className={styles.profileIcon}
                            />
                        </Link>
                    </div>

                    <button
                        className={styles.menuButton}
                        onClick={toggleMobileMenu}
                        aria-label="Открыть меню"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12"/>
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16"/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <nav className={classNames(styles.mobileNav, {
                [styles.isOpen]: isMobileMenuOpen
            })}>
                {navigation.map(({path, label}) => (
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
        </header>
    );
};

export default Header;
