// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Button } from '../../components/Button/Button';
import Hero from '../../../public/hero.png';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const navigate = useNavigate();

  const newChatHandler = () => {
    navigate(`/chat/${1}`);
  };

  return (
    <div className={styles['container']}>
      <motion.img
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 2 }}
        src={Hero.src}
        className={styles['hero-img']}
        alt="hero"
      />
      <motion.div
        className={styles['hero-section']}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 60, opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className={styles['hero-text']}>
          <h1 className={styles['primary-heading']}>Your personal AI Chat Interface</h1>
          <p className={styles['subtitle']}>Your virtual companion is always here to help make your life easier!</p>
        </div>
        <div className={styles['hero-btn-container']}>
          <Button level="primary" fullWidth={false} clickHandler={newChatHandler}>
            Start Talking!
          </Button>
          <div className="mx-1"></div>
          <Button level="secondary" fullWidth={false} clickHandler={() => navigate('/about')}>
            Learn More
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
