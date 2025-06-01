import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineHome, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import classNames from 'classnames';
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
    icon: <HiOutlineUserGroup />
  },
  {
    prompt: "Найти занятия для дождливого дня",
    description: "Получите креативные идеи для увлекательного времяпрепровождения дома: от творческих мастер-классов до семейных игр и развивающих активностей.",
    icon: <HiOutlineHome />
  },
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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < 768;
      setIsMobile(newIsMobile);
      
      if (newIsMobile) {
        setIsSidebarExpanded(false);
      } else {
        setIsSidebarExpanded(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      {isMobile && (
        <div 
          className={classNames(styles.overlay, {
            [styles.visible]: isSidebarExpanded
          })}
          onClick={() => setIsSidebarExpanded(false)}
        />
      )}

      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onChatSelect={(id) => {
          setActiveChatId(id);
          if (isMobile) {
            setIsSidebarExpanded(false);
          }
        }}
        onChatDelete={handleChatDelete}
        onNewChat={handleNewChat}
        onChatRename={handleChatRename}
        isExpanded={isSidebarExpanded}
        className={classNames({
          [styles.expanded]: isSidebarExpanded,
          [styles.collapsed]: !isSidebarExpanded
        })}
      />

      <div className={styles.mainContent}>
        <div className={styles.chatHeader}>
          <button 
            className={styles.menuButton}
            onClick={toggleSidebar}
            aria-label={isSidebarExpanded ? "Скрыть меню" : "Показать меню"}
          >
            {isSidebarExpanded ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
          
          <div className={styles.chatInfo}>
            <div className={styles.aiAvatar}>
              <HiOutlineUserGroup className="w-5 h-5 text-white" />
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