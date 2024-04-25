import { FC } from 'react';
import styles from './styles.module.css';

export const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <nav>
                <ul>
                    <li>Footer Nav 1</li>
                </ul>
            </nav>
        </footer>
    );
};
