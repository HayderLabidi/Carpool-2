import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MessageSquare,
  Send,
  Image,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  ArrowLeft,
  Check,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  attachments?: {
    type: "image" | "file";
    url: string;
    name?: string;
  }[];
}

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

interface ChatInterfaceProps {
  currentUserId?: string;
  selectedChat?: {
    id: string;
    user: User;
    messages: Message[];
  };
  chats?: Array<{
    id: string;
    user: User;
    lastMessage: {
      text: string;
      timestamp: Date;
      unread: boolean;
    };
  }>;
  onSendMessage?: (chatId: string, message: string) => void;
  onSelectChat?: (chatId: string) => void;
}

const ChatInterface = ({
  currentUserId = "user-1",
  selectedChat = {
    id: "chat-1",
    user: {
      id: "user-2",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isOnline: true,
    },
    messages: [
      {
        id: "msg-1",
        senderId: "user-2",
        text: "Hi there! I'm interested in your ride from San Francisco to Los Angeles.",
        timestamp: new Date(Date.now() - 3600000 * 2),
        status: "read",
      },
      {
        id: "msg-2",
        senderId: "user-1",
        text: "Hello! Thanks for reaching out. Yes, I still have 2 seats available for the trip.",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
      },
      {
        id: "msg-3",
        senderId: "user-2",
        text: "Great! I'd like to book one seat. Do you allow medium-sized luggage?",
        timestamp: new Date(Date.now() - 1800000),
        status: "read",
      },
      {
        id: "msg-4",
        senderId: "user-1",
        text: "Yes, that's not a problem. I have plenty of trunk space for luggage.",
        timestamp: new Date(Date.now() - 900000),
        status: "delivered",
      },
      {
        id: "msg-5",
        senderId: "user-2",
        text: "Perfect! What time will you be departing?",
        timestamp: new Date(Date.now() - 600000),
        status: "read",
        attachments: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&q=80",
            name: "luggage.jpg",
          },
        ],
      },
    ],
  },
  chats = [
    {
      id: "chat-1",
      user: {
        id: "user-2",
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        isOnline: true,
      },
      lastMessage: {
        text: "Perfect! What time will you be departing?",
        timestamp: new Date(Date.now() - 600000),
        unread: false,
      },
    },
    {
      id: "chat-2",
      user: {
        id: "user-3",
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        isOnline: false,
        lastSeen: new Date(Date.now() - 3600000),
      },
      lastMessage: {
        text: "I'll be at the pickup point 10 minutes early.",
        timestamp: new Date(Date.now() - 86400000),
        unread: true,
      },
    },
    {
      id: "chat-3",
      user: {
        id: "user-4",
        name: "Emily Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        isOnline: true,
      },
      lastMessage: {
        text: "Do you have space for one more person?",
        timestamp: new Date(Date.now() - 172800000),
        unread: true,
      },
    },
  ],
  onSendMessage = (chatId, message) =>
    console.log(`Sending message to ${chatId}: ${message}`),
  onSelectChat = (chatId) => console.log(`Selected chat: ${chatId}`),
}: ChatInterfaceProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      onSendMessage(selectedChat.id, newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatSelect = (chatId: string) => {
    onSelectChat(chatId);
    if (isMobileView) {
      setShowChatList(false);
    }
  };

  const renderMessageStatus = (status: "sent" | "delivered" | "read") => {
    switch (status) {
      case "sent":
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case "delivered":
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case "read":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 -ml-1 text-blue-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[600px] w-full max-w-6xl mx-auto overflow-hidden rounded-lg border bg-background shadow-sm">
      {/* Chat List */}
      {(!isMobileView || showChatList) && (
        <div className="w-full md:w-1/3 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Messages</h2>
              <Badge variant="secondary" className="ml-2">
                {chats.filter((chat) => chat.lastMessage.unread).length}
              </Badge>
            </div>
            <Input placeholder="Search conversations..." className="mt-2" />
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${selectedChat?.id === chat.id ? "bg-accent" : ""}`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={chat.user.avatar}
                          alt={chat.user.name}
                        />
                        <AvatarFallback>
                          {chat.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.user.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">
                          {chat.user.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(chat.lastMessage.timestamp) === "Today"
                            ? formatTime(chat.lastMessage.timestamp)
                            : formatDate(chat.lastMessage.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage.text}
                        </p>
                        {chat.lastMessage.unread && (
                          <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            <span className="sr-only">Unread messages</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Chat Area */}
      {selectedChat && (!isMobileView || !showChatList) && (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowChatList(true)}
                  className="mr-1"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={selectedChat.user.avatar}
                    alt={selectedChat.user.name}
                  />
                  <AvatarFallback>
                    {selectedChat.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {selectedChat.user.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
              </div>
              <div>
                <h3 className="font-medium">{selectedChat.user.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedChat.user.isOnline
                    ? "Online"
                    : selectedChat.user.lastSeen
                      ? `Last seen ${formatTime(selectedChat.user.lastSeen)}`
                      : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Call</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Video Call</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setUserInfoOpen(true)}
                    >
                      <Info className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Info</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {selectedChat.messages.map((message) => {
                const isCurrentUser = message.senderId === currentUserId;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-accent"} rounded-lg p-3`}
                    >
                      {message.text && (
                        <p className="text-sm">{message.text}</p>
                      )}
                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index}>
                                {attachment.type === "image" && (
                                  <div className="rounded-md overflow-hidden">
                                    <img
                                      src={attachment.url}
                                      alt={attachment.name || "Attachment"}
                                      className="max-w-full h-auto"
                                    />
                                  </div>
                                )}
                                {attachment.type === "file" && (
                                  <div className="flex items-center gap-2 p-2 rounded-md bg-background/50">
                                    <Paperclip className="h-4 w-4" />
                                    <span className="text-sm truncate">
                                      {attachment.name || "File attachment"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      <div
                        className={`flex items-center mt-1 text-xs ${isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        <span>{formatTime(message.timestamp)}</span>
                        {isCurrentUser && (
                          <span className="ml-1">
                            {renderMessageStatus(message.status)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Type a message..."
                  className="min-h-[80px] pr-10 resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add emoji</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Attach file</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add image</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button
                className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Info Dialog */}
      <Dialog open={userInfoOpen} onOpenChange={setUserInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
            <DialogDescription>
              Details about {selectedChat?.user.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={selectedChat?.user.avatar}
                alt={selectedChat?.user.name}
              />
              <AvatarFallback className="text-2xl">
                {selectedChat?.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{selectedChat?.user.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedChat?.user.isOnline
                ? "Online"
                : selectedChat?.user.lastSeen
                  ? `Last seen ${formatTime(selectedChat.user.lastSeen)}`
                  : "Offline"}
            </p>

            <div className="w-full mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Phone</h4>
                <p className="text-sm">+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Email</h4>
                <p className="text-sm">
                  {selectedChat?.user.name.toLowerCase().replace(" ", ".")}
                  @example.com
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Ride Information</h4>
                <p className="text-sm">San Francisco to Los Angeles</p>
                <p className="text-sm text-muted-foreground">
                  June 15, 2023 at 9:00 AM
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserInfoOpen(false)}>
              Close
            </Button>
            <Button>
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatInterface;
