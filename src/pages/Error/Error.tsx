// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Container } from '../../components/Container/Container';
import styles from './Error.module.css';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../../../public/hero.png';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const newChatHandler = () => {
    const id = 2;
    navigate(`/chat/${id}`);
  };

  return (
    <Container>
      <div className={styles['container']}>
        <motion.img
          src={Hero.src}
          alt="hero"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
        <motion.p
          className={styles['error-txt']}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 60, opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Oops...this page doesn&apos;t exist. What would you like to do?
        </motion.p>
        <motion.div
          className={styles['btn-container']}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 60, opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button level="primary" fullWidth={false} clickHandler={newChatHandler}>
            New Chat
          </Button>
          <div className="mx-1"></div>
          <Button level="secondary" fullWidth={false} clickHandler={() => navigate('/')}>
            Go Home
          </Button>
        </motion.div>
      </div>
    </Container>
  );
};
