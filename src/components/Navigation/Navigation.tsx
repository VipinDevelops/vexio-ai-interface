import styles from './Navigation.module.css';
import { NavLink, useParams } from 'react-router-dom';

import Logo from '../../../public/logo.png';
export const Navigation = () => {
  const { chatId } = useParams() as any;

  return (
    <nav className={styles['nav-bar']}>
      <NavLink to="/">
        <div className={styles['logo']}>
          <img src={Logo.src} width={30} height={30} className="mr-2" alt="openai" />
          <span className={styles['title']}>VexioAI</span>
        </div>
      </NavLink>
      <div className="grow"></div>
    </nav>
  );
};
