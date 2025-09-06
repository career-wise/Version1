import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Send, 
  Settings, 
  MessageCircle, 
  Search, 
  Menu, 
  X,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import Button from '../components/shared/ui/Button';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  messages: Message[];
}

const ChatPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState("6");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Create Html Game Environment...",
      lastMessage: "How to create a game?",
      messages: [
        { id: "1", content: "How to create a game?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "I can help you create a game! What type of game are you interested in building?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      title: "Apply To Leave For Emergency",
      lastMessage: "I need to apply for leave",
      messages: [
        { id: "1", content: "I need to apply for leave", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "I can help you with leave application. What type of leave do you need?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "3",
      title: "What Is UI UX Design?",
      lastMessage: "Explain UI/UX design",
      messages: [
        { id: "1", content: "Explain UI/UX design", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "UI/UX design focuses on creating user-friendly interfaces and experiences...",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "4",
      title: "Create POS System",
      lastMessage: "Build a POS system",
      messages: [
        { id: "1", content: "Build a POS system", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "I can help you build a Point of Sale system. What features do you need?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "5",
      title: "What Is UX Audit?",
      lastMessage: "What is a UX audit?",
      messages: [
        { id: "1", content: "What is a UX audit?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "A UX audit is a comprehensive evaluation of your product's user experience...",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "6",
      title: "Create Chatbot GPT...",
      lastMessage: "Create a chatbot gpt using python",
      messages: [
        {
          id: "1",
          content: "Create a chatbot gpt using python language what will be step for that",
          isUser: true,
          timestamp: new Date(),
        },
        {
          id: "2",
          content:
            "Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:\n\n1. **Install the required libraries:** You'll need to install the transformers library from Hugging Face to use GPT. You can install it using pip.\n\n2. **Load the pre-trained model:** GPT comes in several sizes and versions, so you'll need to choose the one that fits your needs. You can load a pre-trained GPT model. This loads the 1.5B parameter version of GPT-Neo, which is a powerful and relatively recent model.\n\n3. **Create a chatbot loop:** You'll need to create a loop that takes user input, generates a response using the GPT model, and outputs it to the user. Here's an example loop that uses the input() function to get user input and the gpt() function to generate a response. This loop will keep running until the user exits the program or the loop is interrupted.\n\n4. **Add some personality to the chatbot:** While GPT can generate text, it doesn't have any inherent personality or style. You can make your chatbot more interesting by adding custom prompts or responses that reflect your desired personality. You can then modify the chatbot loop to use these prompts and responses when appropriate. This will make the chatbot seem more human-like and engaging.\n\nThese are just the basic steps to get started with a GPT chatbot in Python. Depending on your requirements, you may need to add more features or complexity to the chatbot. Good luck!",
          isUser: false,
          timestamp: new Date(),
        },
        {
          id: "3",
          content: "What is use of that chatbot ?",
          isUser: true,
          timestamp: new Date(),
        },
        {
          id: "4",
          content:
            "Chatbots can be used for a wide range of purposes, including:\n\nCustomer service chatbots can handle frequently asked questions, provide basic support, and help customers",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "7",
      title: "How Chat GPT Work?",
      lastMessage: "How does ChatGPT work?",
      messages: [
        { id: "1", content: "How does ChatGPT work?", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "ChatGPT works using transformer neural networks trained on vast amounts of text data...",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "8",
      title: "Crypto Lending App Name",
      lastMessage: "Name for crypto app",
      messages: [
        { id: "1", content: "Name for crypto app", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "Here are some creative names for your crypto lending app...",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "9",
      title: "Operator Grammar Types",
      lastMessage: "Types of grammar operators",
      messages: [
        { id: "1", content: "Types of grammar operators", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "Grammar operators in formal language theory include...",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "10",
      title: "Mini States For Binary DFA",
      lastMessage: "Binary DFA states",
      messages: [
        { id: "1", content: "Binary DFA states", isUser: true, timestamp: new Date() },
        {
          id: "2",
          content: "A binary DFA (Deterministic Finite Automaton) has states that...",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentConversation = conversations.find((conv) => conv.id === activeConversationId);
  const messages = currentConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleConversationSelect = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    const newConversationId = Date.now().toString();
    const newConversation: Conversation = {
      id: newConversationId,
      title: "New Chat",
      lastMessage: "",
      messages: [],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversationId);
    setIsSidebarOpen(false);
  };

  const handleClearAll = () => {
    setConversations([]);
    setActiveConversationId("");
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          const updatedMessages = [...conv.messages, newMessage];
          return {
            ...conv,
            messages: updatedMessages,
            lastMessage: inputValue,
            title: conv.title === "New Chat" ? inputValue.slice(0, 30) + "..." : conv.title,
          };
        }
        return conv;
      }),
    );

    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question. Let me help you with that...",
        isUser: false,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, aiResponse],
            };
          }
          return conv;
        }),
      );
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">CHAT A.I+</h1>
          <Link to="/">
            <Button variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 fixed md:relative z-50 md:z-0
        w-80 bg-gray-50 border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
        h-full md:h-auto
      `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">CHAT A.I+</h1>
          </div>
          <Button
            onClick={handleNewChat}
            className="w-full rounded-full py-2.5 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New chat
          </Button>
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 px-6 overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Your conversations</p>
              <button 
                onClick={handleClearAll}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleConversationSelect(conv.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  conv.id === activeConversationId ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-100"
                }`}
              >
                <MessageCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{conv.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Time Separator */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-medium text-gray-400 mb-2">Last 7 Days</h4>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Settings</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AN</span>
            </div>
            <span className="text-sm font-medium text-gray-900">Andrew Nelson</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        {/* Chat Header */}
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AI</span>
            </div>
            <span className="text-sm text-gray-600 truncate">
              {currentConversation?.title || "Select a conversation"}
            </span>
          </div>
          <Button variant="ghost" className="hidden md:flex">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6 max-w-4xl">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Start a new conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex gap-4">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center">
                    {message.isUser ? (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">U</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">AI</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {message.isUser ? "You" : "CHAT A.I+"}
                      </span>
                      {!message.isUser && <span className="text-xs text-gray-400">●</span>}
                    </div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{message.content}</div>
                    {!message.isUser && (
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <ThumbsUp className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <ThumbsDown className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded transition-colors ml-auto">
                          <RefreshCw className="w-3 h-3" />
                          Regenerate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AI</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">CHAT A.I+</span>
                    <span className="text-xs text-gray-400">●</span>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-gray-200">
          <div className="flex gap-3 items-end max-w-4xl">
            <div className="flex-1 relative">
              <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-4 py-3 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-20">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🧠</span>
                </div>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="What's in your mind?..."
                  className="flex-1 resize-none outline-none text-gray-700 placeholder-gray-400 max-h-32"
                  rows={1}
                />
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="rounded-full p-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;