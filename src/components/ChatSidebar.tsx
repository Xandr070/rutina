import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineChat } from 'react-icons/hi';
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
  isExpanded: boolean;
  className?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChatId,
  onChatSelect,
  onChatDelete,
  onNewChat,
  onChatRename,
  isExpanded,
  className
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleRename = (chatId: number, newName: string) => {
    onChatRename(chatId, newName);
    setIsEditing(null);
  };

  return (
    <div className={classNames(styles.sidebar, className, {
      [styles.collapsed]: !isExpanded
    })}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.title}>
          {isExpanded ? 'История чатов' : <HiOutlineChat />}
        </h3>
      </div>

      <div className={styles.chatList}>
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
              {isEditing === chat.id && isExpanded ? (
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
                  {isExpanded && (
                    <div className={styles.chatDate}>
                      {new Date(chat.lastMessage).toLocaleDateString()}
                    </div>
                  )}
                </>
              )}
            </div>
            {isExpanded && (
              <div className={styles.actions}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(chat.id);
                    setEditValue(chat.name);
                  }}
                  className={styles.actionButton}
                >
                  <HiOutlinePencil />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChatDelete(chat.id);
                  }}
                  className={classNames(styles.actionButton, styles.delete)}
                >
                  <HiOutlineTrash />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className={classNames(styles.sidebarFooter, {
        [styles.centered]: !isExpanded
      })}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className={styles.newChatButton}
        >
          {isExpanded ? (
            <span>Новый чат</span>
          ) : (
            <HiOutlinePlus />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatSidebar; 