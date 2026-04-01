import React, { useState, useRef, useEffect } from 'react';
import styles from './AiPanelpopup.module.css';

// SVG Icons
const SmartToyIcon = () => (
  <svg className={styles.headerIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const SendIcon = () => (
  <svg className={styles.sendIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const AttachFileIcon = () => (
  <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
  </svg>
);

const ImageIcon = () => (
  <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
);

const PulsingDot = () => (
  <div className={styles.pulsingDot}></div>
);

const AiPanelpopup = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Explain error', action: () => {} },
    { label: 'Give hint', action: () => {} },
    { label: 'Code review', action: () => {} }
  ];

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose}></div>
      
      {/* Panel */}
      <div className={styles.panel}>
        {/* Panel Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIconContainer}>
              <SmartToyIcon />
            </div>
            <div className={styles.headerText}>
              <div className={styles.headerTitleRow}>
                <h2 className={styles.headerTitle}>Ask AI</h2>
                <PulsingDot />
              </div>
              <p className={styles.headerSubtitle}>Active Assistant</p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </header>

        {/* Context & Content Area */}
        <div className={styles.content}>
          {/* Context Chip */}
          <div className={styles.contextChip}>
            <div className={styles.contextChipInner}>
              <span className={styles.contextDot}></span>
              <span className={styles.contextText}>Context: C++ Dynamic Array</span>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className={styles.suggestions}>
            <p className={styles.suggestionsLabel}>Quick Actions</p>
            <div className={styles.suggestionsRow}>
              {quickActions.map((action, index) => (
                <button key={index} className={styles.suggestionChip}>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div className={styles.chatHistory}>
            {/* AI Message 1 */}
            <div className={styles.aiMessage}>
              <div className={styles.messageBubbleAi}>
                Hello! I noticed a logic error in your <code className={styles.codeInline}>push_back</code> method. Would you like a hint on how to handle the memory reallocation?
              </div>
              <span className={styles.messageMeta}>AI Assistant • Just now</span>
            </div>

            {/* User Message */}
            <div className={styles.userMessage}>
              <div className={styles.messageBubbleUser}>
                Yes, please. I'm struggling with the capacity check.
              </div>
              <span className={styles.messageMeta}>You • 1m ago</span>
            </div>

            {/* AI Message 2 */}
            <div className={styles.aiMessage}>
              <div className={styles.messageBubbleAi}>
                Before adding an element, you should check if <code className={styles.codeInlineSecondary}>size == capacity</code>. If true, you'll need to allocate a new, larger array (usually double the size).
              </div>
              <span className={styles.messageMeta}>AI Assistant • Now</span>
            </div>
          </div>
        </div>

        {/* Input Bar Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              placeholder="Ask a technical question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
            />
            <button onClick={handleSend} className={styles.sendButton}>
              <SendIcon />
            </button>
          </div>
          <div className={styles.inputFooter}>
            <div className={styles.inputActions}>
              <button className={styles.actionButton}>
                <AttachFileIcon />
              </button>
              <button className={styles.actionButton}>
                <ImageIcon />
              </button>
            </div>
            <p className={styles.inputHint}>Enter to send</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiPanelpopup;
