import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Bell, 
  Users, 
  Send, 
  ArrowLeft, 
  Search, 
  MoreVertical,
  CheckCircle,
  Clock,
  Star,
  User,
  Gamepad2,
  Trophy,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MessagesScreenProps {
  onBack: () => void;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: Date;
  type: 'chat' | 'notification' | 'system';
  isRead: boolean;
  category?: 'game' | 'payment' | 'promotion' | 'support' | 'general';
}

interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for messages and notifications
  const [notifications, setNotifications] = useState<Message[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'BetBingo System',
      message: 'Welcome to BetBingo! Your account has been successfully created.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      type: 'system',
      isRead: false,
      category: 'general'
    },
    {
      id: '2',
      senderId: 'game',
      senderName: 'Game Room #BG-4721',
      message: 'You won $25.50 in Quick Cash! Congratulations!',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      type: 'notification',
      isRead: false,
      category: 'game'
    },
    {
      id: '3',
      senderId: 'payment',
      senderName: 'Payment System',
      message: 'Your deposit of $50.00 has been processed successfully.',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      type: 'notification',
      isRead: true,
      category: 'payment'
    },
    {
      id: '4',
      senderId: 'promotion',
      senderName: 'Promotions Team',
      message: 'New weekend bonus! Get 50% extra on all deposits this weekend.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      type: 'notification',
      isRead: true,
      category: 'promotion'
    }
  ]);

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      name: 'BingoKing',
      participants: ['user', 'bingoking'],
      lastMessage: 'Great game! Good luck in the next round.',
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'LuckyPlayer',
      participants: ['user', 'luckyplayer'],
      lastMessage: 'Thanks for the game!',
      lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Support Team',
      participants: ['user', 'support'],
      lastMessage: 'Your issue has been resolved. Is there anything else?',
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 1,
      isOnline: true
    }
  ]);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (selectedChat) {
      // Load chat messages for selected chat
      const messages: Message[] = [
        {
          id: '1',
          senderId: selectedChat.id,
          senderName: selectedChat.name,
          message: 'Hello! How are you doing today?',
          timestamp: new Date(Date.now() - 600000), // 10 minutes ago
          type: 'chat',
          isRead: true
        },
        {
          id: '2',
          senderId: 'user',
          senderName: 'You',
          message: 'I\'m doing great! Just won a game of bingo!',
          timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          type: 'chat',
          isRead: true
        },
        {
          id: '3',
          senderId: selectedChat.id,
          senderName: selectedChat.name,
          message: 'Congratulations! That\'s awesome!',
          timestamp: new Date(Date.now() - 120000), // 2 minutes ago
          type: 'chat',
          isRead: false
        }
      ];
      setChatMessages(messages);
    }
  }, [selectedChat]);

  const markAsRead = (messageId: string) => {
    setNotifications(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(msg => ({ ...msg, isRead: true }))
    );
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'user',
        senderName: 'You',
        message: newMessage.trim(),
        timestamp: new Date(),
        type: 'chat',
        isRead: true
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedChat.id,
          senderName: selectedChat.name,
          message: 'Thanks for your message! I\'ll get back to you soon.',
          timestamp: new Date(),
          type: 'chat',
          isRead: false
        };
        setChatMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'promotion': return <Star className="w-4 h-4" />;
      case 'support': return <User className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'game': return 'from-green-500 to-emerald-500';
      case 'payment': return 'from-blue-500 to-cyan-500';
      case 'promotion': return 'from-yellow-500 to-orange-500';
      case 'support': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedChat) {
    return (
      <div className="p-4 h-full flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => setSelectedChat(null)}
            variant="ghost"
            size="sm"
            className="text-purple-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-purple-500 text-white">
                {selectedChat.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-semibold">{selectedChat.name}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${selectedChat.isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span className="text-xs text-purple-300">
                  {selectedChat.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4 text-purple-300" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.senderId === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-75 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-purple-300"
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="mr-4 text-purple-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            MESSAGES & NOTIFICATIONS
          </h1>
        </div>
        <p className="text-purple-300 text-lg">Stay updated with your game activity and conversations</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-md mx-auto"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-purple-300 focus:outline-none focus:border-purple-400"
        />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-purple-600">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {notifications.filter(n => !n.isRead).length > 0 && (
                <Badge className="ml-2 bg-red-500">
                  {notifications.filter(n => !n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="chats" className="text-white data-[state=active]:bg-purple-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chats
              {chatRooms.filter(r => r.unreadCount > 0).length > 0 && (
                <Badge className="ml-2 bg-red-500">
                  {chatRooms.filter(r => r.unreadCount > 0).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-white text-lg font-semibold">Recent Notifications</h3>
              <Button
                onClick={markAllAsRead}
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-800/30"
              >
                Mark All Read
              </Button>
            </div>

            {filteredNotifications.length === 0 ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8 text-center">
                  <Bell className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">No notifications found</h3>
                  <p className="text-purple-300">
                    {searchQuery ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card 
                    className={`backdrop-blur-md border-white/20 transition-all cursor-pointer hover:border-purple-400/50 ${
                      notification.isRead ? 'bg-white/5' : 'bg-purple-500/20 border-purple-400/30'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(notification.category || 'general')}`}>
                          {getCategoryIcon(notification.category || 'general')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold">{notification.senderName}</h4>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-red-400 rounded-full" />
                              )}
                              <span className="text-xs text-purple-300">
                                {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                          <p className="text-purple-200 text-sm">{notification.message}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge 
                              className={`bg-gradient-to-r ${getCategoryColor(notification.category || 'general')} text-white border-0 text-xs`}
                            >
                              {notification.category || 'general'}
                            </Badge>
                            {notification.type === 'system' && (
                              <Badge variant="outline" className="border-blue-400/30 text-blue-300 text-xs">
                                System
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="chats" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">Active Conversations</h3>

            {filteredChatRooms.length === 0 ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">No chats found</h3>
                  <p className="text-purple-300">
                    {searchQuery ? 'Try adjusting your search terms' : 'Start a conversation with other players!'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredChatRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card 
                    className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-400/50 transition-all cursor-pointer"
                    onClick={() => setSelectedChat(room)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            {room.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-white font-semibold">{room.name}</h4>
                            <div className="flex items-center space-x-2">
                              {room.unreadCount > 0 && (
                                <Badge className="bg-red-500">
                                  {room.unreadCount}
                                </Badge>
                              )}
                              <span className="text-xs text-purple-300">
                                {room.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                          <p className="text-purple-200 text-sm truncate">{room.lastMessage}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className={`w-2 h-2 rounded-full ${room.isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
                            <span className="text-xs text-purple-300">
                              {room.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MessagesScreen; 