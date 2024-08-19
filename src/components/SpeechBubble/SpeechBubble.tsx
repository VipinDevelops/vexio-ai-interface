// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styles from './SpeechBubble.module.css';
import Loader from '../../../public/loading.gif';
import { motion } from 'framer-motion';

export const SpeechBubble: React.FC<{
  speaker: string;
  text: string;
  loading?: boolean;
  animate: boolean;
  delay?: number;
}> = (props) => {
  let speechBubbleClass: string;
  let containerClass: string;

  if (props.speaker === 'ai') {
    speechBubbleClass = 'ai';
    containerClass = 'ai-container';
  } else {
    speechBubbleClass = 'user';
    containerClass = 'user-container';
  }

  const content = props.loading ? <img src={Loader.src} width={40} alt="Loading" /> : <p>{props.text}</p>;

  const loadingimage = <img src={Loader.src} width={40} alt="Loading" />;

  if (props.animate) {
    return (
      <motion.div
        className={styles[containerClass]}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, delay: props.delay ? props.delay : 0 }}
      >
        <div className="grow"></div>

        {props.loading ? (
          loadingimage
        ) : (
          <div className={styles[speechBubbleClass]}>
            {props.speaker == 'ai' ? <Typewriter text={props.text} /> : <p>{props.text}</p>}
          </div>
        )}
      </motion.div>
    );
  } else {
    return (
      <div className={styles[containerClass]}>
        <div className="grow"></div>
        <div className={styles[speechBubbleClass]}>{content}</div>
      </div>
    );
  }
};

export const sentenceVariants = {
  hidden: {},
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
};
interface TypewriterProps {
  text: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text }) => (
  <motion.p key={text} variants={sentenceVariants} initial="hidden" animate="visible">
    {text.split('').map((char, i) => (
      <motion.span key={`${char}-${i}`} variants={letterVariants}>
        {char}
      </motion.span>
    ))}
  </motion.p>
);
