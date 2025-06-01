import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/Chat.module.scss';
import ChatSidebar from '../../components/ChatSidebar';
import MessageBubble from '../../components/MessageBubble';
import SuggestedPrompt from '../../components/SuggestedPrompt';

interface Activity {
  title: string;
  description: string;
  time?: string;
  location?: string;
}

interface Message {
  id: number;
  content: string;
  isAi: boolean;
  thinking?: boolean;
  activities?: Activity[];
}

const suggestedPrompts = [
  {
    prompt: "Спланировать выходные с детьми",
    description: "Получите персонализированные рекомендации для активного и познавательного досуга всей семьей, учитывающие возраст детей и ваши интересы.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    prompt: "Организовать семейный праздник",
    description: "Создайте незабываемое событие с уникальным сценарием, играми, развлечениями и праздничным меню для всех возрастов.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    )
  },
  {
    prompt: "Найти занятия для дождливого дня",
    description: "Получите креативные идеи для увлекательного времяпрепровождения дома: от творческих мастер-классов до семейных игр и развивающих активностей.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    prompt: "Спланировать семейное путешествие",
    description: "Разработаем маршрут с учетом интересов всех членов семьи, включая достопримечательности, активности и места для отдыха.",
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const Chat: React.FC = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'Планирование выходных', lastMessage: Date.now() },
    { id: 2, name: 'Идеи для праздника', lastMessage: Date.now() - 86400000 },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [chatHistory, setChatHistory] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, content: "Привет! Я ваш AI-ассистент по планированию семейного досуга. Чем могу помочь?", isAi: true }
    ],
    2: [
      { id: 1, content: "Привет! Давайте спланируем ваш праздник.", isAi: true }
    ]
  });
  
  const [messages, setMessages] = useState(chatHistory[activeChatId] || []);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chatHistory[activeChatId] || []);
    setShowSuggestions(true);
  }, [activeChatId]);

  useEffect(() => {
    setChatHistory(prev => ({
      ...prev,
      [activeChatId]: messages
    }));
  }, [messages, activeChatId]);

  const handleNewChat = () => {
    const newChatId = Math.max(...chats.map(c => c.id)) + 1;
    const newChat = {
      id: newChatId,
      name: 'Новый чат',
      lastMessage: Date.now()
    };
    setChats(prev => [...prev, newChat]);
    setChatHistory(prev => ({
      ...prev,
      [newChatId]: [
        { id: 1, content: "Привет! Я ваш AI-ассистент по планированию семейного досуга. Чем могу помочь?", isAi: true }
      ]
    }));
    setActiveChatId(newChatId);
  };

  const handleChatDelete = (chatId: number) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    setChatHistory(prev => {
      const newHistory = { ...prev };
      delete newHistory[chatId];
      return newHistory;
    });
    if (activeChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setActiveChatId(remainingChats[0].id);
      }
    }
  };

  const handleChatRename = (chatId: number, newName: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, name: newName || 'Без названия' } : chat
    ));
  };

  const handleActivityAction = (activity: Activity, action: 'accept' | 'decline' | 'calendar') => {
    let response = "";
    switch (action) {
      case 'accept':
        response = `Отлично! Я рад, что вам понравилась идея "${activity.title}". Хотите добавить её в календарь?`;
        break;
      case 'decline':
        response = "Хорошо, давайте поищем что-то другое. Какие активности вам больше нравятся?";
        break;
      case 'calendar':
        response = `Событие "${activity.title}" добавлено в календарь на ${activity.time}. Я напомню вам о нём заранее!`;
        break;
    }
    
    setMessages(prev => [...prev, { id: Date.now(), content: response, isAi: true }]);
  };

  const generateAIResponse = (query: string) => {
    const responses = {
      "Предложи идеи для выходных с детьми": {
        content: "У меня есть несколько отличных идей для выходных с детьми:",
        activities: [
          {
            title: "Мастер-класс по гончарному делу",
            description: "Творческое занятие, где дети смогут создать свои собственные керамические изделия под руководством опытного мастера.",
            time: "Суббота, 15:00 - 17:00",
            location: "Творческая студия 'Глина'"
          },
          {
            title: "Семейный поход в веревочный парк",
            description: "Активный отдых на свежем воздухе с различными уровнями сложности для всей семьи.",
            time: "Воскресенье, 11:00 - 14:00",
            location: "Парк приключений 'Высота'"
          }
        ]
      },
      "default": {
        content: "Вот что я могу предложить:",
        activities: [
          {
            title: "Семейный пикник в парке",
            description: "Отличный способ провести время на природе всей семьей. Можно взять настольные игры и спортивный инвентарь.",
            time: "Суббота, 12:00 - 16:00",
            location: "Центральный парк"
          }
        ]
      }
    };

    return responses[query as keyof typeof responses] || responses.default;
  };

  const handleSubmit = async (content: string) => {
    if (!content.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), content, isAi: false }]);
    setInputValue('');
    setShowSuggestions(false);
    setIsThinking(true);

    setTimeout(() => {
      const response = generateAIResponse(content);
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: response.content,
        activities: response.activities,
        isAi: true
      }]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        onChatDelete={handleChatDelete}
        onNewChat={handleNewChat}
        onChatRename={handleChatRename}
      />

      <div className={styles.mainContent}>
        <div className={styles.chatHeader}>
          <div className={styles.chatInfo}>
            <div className={styles.aiAvatar}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className={styles.chatDetails}>
              <h2 className={styles.chatName}>
                {chats.find(chat => chat.id === activeChatId)?.name || 'AI Ассистент'}
              </h2>
              <p className={styles.status}>Всегда на связи</p>
            </div>
          </div>
        </div>

        <div className={styles.messageContainer}>
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.suggestedPrompts}
              >
                {suggestedPrompts.map((prompt, index) => (
                  <SuggestedPrompt
                    key={index}
                    prompt={prompt.prompt}
                    icon={prompt.icon}
                    description={prompt.description}
                    onClick={handleSubmit}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map(message => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isAi={message.isAi}
              onActivityAction={handleActivityAction}
            />
          ))}
          {isThinking && (
            <MessageBubble
              message={{ id: -1, content: "", thinking: true, isAi: true }}
              isAi={true}
              onActivityAction={handleActivityAction}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(inputValue);
            }}
            className={styles.inputForm}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите сообщение..."
              className={styles.input}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={styles.sendButton}
            >
              Отправить
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat; 