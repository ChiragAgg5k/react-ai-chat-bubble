import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

interface ChatBubbleProps {
  apiKey: string;
  className?: string;
  initialMessage?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  apiKey,
  className = '',
  initialMessage = "Hello! How can I assist you today?",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { content: initialMessage, role: 'assistant' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessageToOpenAI = async (userMessage: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: userMessage }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const assistantMessage = response.data.choices[0].message.content;
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: assistantMessage }
      ]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user', content: inputMessage }
      ]);
      sendMessageToOpenAI(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className={`chat-bubble-container ${className}`.trim()}>
      <button
        className="chat-bubble-button"
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        Chat
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && <div className="message assistant-message">Thinking...</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

ChatBubble.propTypes = {
  apiKey: PropTypes.string.isRequired,
  className: PropTypes.string,
  initialMessage: PropTypes.string,
};

export default ChatBubble;
export type { ChatBubbleProps };