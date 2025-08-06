import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Smile, Mic, MicOff } from 'lucide-react';
import { ChatMessage } from '@/types';

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  matchId?: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ isOpen, onClose, matchId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'System',
      message: 'Welcome to the game! Good luck!',
      timestamp: new Date(Date.now() - 60000),
      type: 'system'
    },
    {
      id: '2',
      senderId: 'opponent',
      senderName: 'BingoKing',
      message: 'Good luck!',
      timestamp: new Date(Date.now() - 30000),
      type: 'text'
    },
    {
      id: '3',
      senderId: 'player',
      senderName: 'You',
      message: 'Thanks! You too!',
      timestamp: new Date(Date.now() - 15000),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: 'player',
        senderName: 'You',
        message: newMessage.trim(),
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate opponent response
      setTimeout(() => {
        const responses = [
          'Nice move!',
          'Good luck!',
          'This is getting intense!',
          'Almost there!',
          'Great game!'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const opponentMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: 'opponent',
          senderName: 'BingoKing',
          message: randomResponse,
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, opponentMessage]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 h-96 z-50">
      <Card className="h-full bg-white/95 backdrop-blur-md border-white/30 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-800">Game Chat</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'player' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.type === 'system'
                      ? 'bg-blue-100 text-blue-800 mx-auto'
                      : message.senderId === 'player'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.type !== 'system' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">
                          {message.senderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold opacity-75">
                        {message.senderName}
                      </span>
                    </div>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSystem; 