import { useEffect, useRef, useState } from 'react';
import { ChatInput } from '../../components/ChatInput/ChatInput';
import { SpeechBubble } from '../../components/SpeechBubble/SpeechBubble';
import { Card } from '../../components/Card/Card';
import styles from './Chat.module.css';
import { motion } from 'framer-motion';

const promptTemplates = [
  'Can you help me understand the concept of machine learning?',
  'What are some effective ways to manage stress?',
  'How do I make an HTTP request in JavaScript?',
];

enum Speaker {
  AI = 'AI',
  Human = 'HUMAN',
}

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversation, setConversation] = useState<{ speaker: string; content: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const onInputChange = (input: string) => {
    setError('');
    setInput(input);
  };

  const onTemplateClicked = (template: string) => {
    setInput(template);
  };

  const onInputSubmit = async (prompt: string) => {
    setError('');
    if (prompt.trim().length > 0) {
      try {
        // Add the human message to the conversation
        const newConversation = [...conversation, { speaker: Speaker.Human, content: prompt }];
        setConversation(newConversation);
        setInput('');

        // Display loading bubble immediately
        setLoading(true);

        // Simulate AI response with delay
        setTimeout(async () => {
          const aiResponse = await generateAIResponse(prompt);
          setConversation((prev) => {
            const updatedConversation = [...prev];
            updatedConversation.push({ speaker: Speaker.AI, content: aiResponse });
            return updatedConversation;
          });
          setLoading(false);
        }, 500); // 0.5-second delay before AI starts "thinking"
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setError('Oops...an error has occurred. Please try again.');
        setLoading(false);
      }
    }
  };

  const generateAIResponse = async (prompt: string) => {
    // eslint-disable-next-line no-console

    // Simulate a delay for AI response generation
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 2-second delay for AI response

    //     response: 'Machine learning is a type of artificial intelligence that allows computers to learn from data and improve their performance over time without being explicitly programmed. It involves training algorithms on large datasets, allowing them to make predictions or decisions based on new input. Examples include recommendation systems, image recognition, and speech-to-text conversion.'
    //     response: 'Managing stress effectively can involve a variety of strategies, such as regular physical exercise, practicing mindfulness or meditation, maintaining a healthy diet, and getting enough sleep. It’s also important to take breaks, engage in hobbies, and connect with friends and family. Finding what works best for you is key to reducing stress and improving overall well-being.'
    //     response: "You can make an HTTP request in JavaScript using the Fetch API. Here's an example:"  fetch('https://api.example.com/data').then(response => response.json()).then(data => console.log(data)).catch(error => console.error('Error:', error)); " This code sends a GET request to the specified URL, processes the response as JSON, and handles any errors that may occur."

    // return `AI response to: "${prompt}"`;

    if (prompt.startsWith('Can you help me understand the concept of machine learning')) {
      return 'Machine learning is a type of artificial intelligence that allows computers to learn from data and improve their performance over time without being explicitly programmed. It involves training algorithms on large datasets, allowing them to make predictions or decisions based on new input. Examples include recommendation systems, image recognition, and speech-to-text conversion';
    } else if (prompt.startsWith('What are some effective ways to manage stress')) {
      return 'Managing stress effectively can involve a variety of strategies, such as regular physical exercise, practicing mindfulness or meditation, maintaining a healthy diet, and getting enough sleep. It’s also important to take breaks, engage in hobbies, and connect with friends and family. Finding what works best for you is key to reducing stress and improving overall well-being.';
    } else if (prompt.startsWith('How do I make an HTTP request in JavaScript')) {
      return "You can make an HTTP request in JavaScript using the Fetch API. Here's an example:`  fetch('https://api.example.com/data').then(response => response.json()).then(data => console.log(data)).catch(error => console.error('Error:', error)); ` This code sends a GET request to the specified URL, processes the response as JSON, and handles any errors that may occur.";
    }
    return `AI response to: "${prompt}"`;
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <>
      {conversation.length === 0 && (
        <div className={styles['secondary-section']}>
          <h2 className={styles['secondary-heading']}>Need an icebreaker?</h2>
          <motion.div
            className={styles['prompts-container']}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {promptTemplates.map((prompt, id) => (
              <button key={id} onClick={() => onTemplateClicked(prompt)}>
                <Card direction="row">
                  <p className={styles['prompt-text']}>{prompt}</p>
                </Card>
              </button>
            ))}
          </motion.div>
        </div>
      )}
      {conversation.length > 0 && (
        <div className={styles['chat-container']}>
          {conversation.map((speech, id) => {
            const speakerType = speech.speaker === Speaker.Human ? 'user' : 'ai';
            const animate = id === conversation.length - 1;
            return <SpeechBubble key={id} speaker={speakerType} text={speech.content} animate={animate} />;
          })}
          {loading && <SpeechBubble speaker="ai" text="" loading={true} animate={true} delay={0.5} />}
          {error && <div className={styles['error-container']}>{error}</div>}
          <div ref={chatEndRef} />
        </div>
      )}
      <ChatInput
        input={input}
        inputChangeHandler={onInputChange}
        inputSubmitHandler={() => onInputSubmit(input)}
        submitting={loading}
      />
    </>
  );
};
export default ChatPage;
