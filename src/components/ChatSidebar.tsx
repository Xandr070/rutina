import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from '../styles/Chat.module.scss';

interface Chat {
  id: number;
  name: string;
  lastMessage: number;
}

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: number;
  onChatSelect: (chatId: number) => void;
  onChatDelete: (chatId: number) => void;
  onNewChat: () => void;
  onChatRename: (chatId: number, newName: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChatId,
  onChatSelect,
  onChatDelete,
  onNewChat,
  onChatRename
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRename = (chatId: number, newName: string) => {
    onChatRename(chatId, newName);
    setIsEditing(null);
  };

  return (
    <div className={classNames(styles.sidebar, {
      [styles.expanded]: isExpanded,
      [styles.collapsed]: !isExpanded
    })}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.title} style={{ opacity: isExpanded ? 1 : 0 }}>
          История чатов
        </h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.toggleButton}
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={isExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>

      <div className={styles.chatList}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {chats.map(chat => (
                <motion.div
                  key={chat.id}
                  layout
                  className={classNames(styles.chatItem, {
                    [styles.active]: chat.id === activeChatId
                  })}
                  onClick={() => onChatSelect(chat.id)}
                >
                  <div className={styles.chatInfo}>
                    {isEditing === chat.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleRename(chat.id, editValue)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename(chat.id, editValue)}
                        className={styles.input}
                        autoFocus
                      />
                    ) : (
                      <>
                        <div className={styles.chatName}>{chat.name}</div>
                        <div className={styles.chatDate}>
                          {new Date(chat.lastMessage).toLocaleDateString()}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.actions}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(chat.id);
                        setEditValue(chat.name);
                      }}
                      className={styles.actionButton}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onChatDelete(chat.id);
                      }}
                      className={classNames(styles.actionButton, styles.delete)}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={classNames(styles.sidebarFooter, { [styles.centered]: !isExpanded })}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className={styles.newChatButton}
        >
          {isExpanded ? (
            "Новый чат"
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m8-8H4" />
            </svg>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatSidebar; 