
import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Shield, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface QuickPrompt {
  text: string;
  category: string;
  emoji: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋 Got questions about STIs? Ask away! I'm here to help you get the facts in a safe space. 💖 What's on your mind today?",
      isUser: false,
      timestamp: new Date(),
      quickReplies: ["What are common STIs? 🤔", "How can I prevent them? 🛡️", "Where can I get tested? 📍", "Tell me about symptoms 💭"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts: QuickPrompt[] = [
    { text: "What are common STIs?", category: "general", emoji: "🤔" },
    { text: "How can I prevent them?", category: "prevention", emoji: "🛡️" },
    { text: "Where can I get tested?", category: "testing", emoji: "📍" },
    { text: "Tell me about symptoms", category: "symptoms", emoji: "💭" },
    { text: "How to talk to my partner?", category: "communication", emoji: "💬" },
    { text: "Birth control options", category: "contraception", emoji: "💊" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): { text: string; quickReplies?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('sti') || lowerMessage.includes('std') || lowerMessage.includes('test') || lowerMessage.includes('testing')) {
      return {
        text: "Awesome question! ✨ Getting tested for STIs is totally normal and shows you're taking great care of your health! 🌟 Most tests are super quick - often just a simple urine test or blood draw. You can get tested at health clinics, doctor's offices, or community health centers. The best part? Everything is confidential! 🔒",
        quickReplies: ["Where exactly can I go? 📍", "What's the process like? 🤔", "How often should I test? ⏰", "Is it expensive? 💰"]
      };
    }
    
    if (lowerMessage.includes('birth control') || lowerMessage.includes('contraception') || lowerMessage.includes('pregnancy') || lowerMessage.includes('pill')) {
      return {
        text: "Great question! 💊 There are SO many effective birth control options these days! From pills and patches to IUDs and implants - each has different perks. 😊 The best choice totally depends on your lifestyle, health, and what feels right for you. A healthcare provider can help you find your perfect match! ✨",
        quickReplies: ["What are my options? 📋", "How effective are they? 📊", "Any side effects? 🤷‍♀️", "Where do I get them? 🏥"]
      };
    }
    
    if (lowerMessage.includes('symptoms') || lowerMessage.includes('normal') || lowerMessage.includes('body') || lowerMessage.includes('discharge') || lowerMessage.includes('pain')) {
      return {
        text: "Having questions about your body is SO normal! 🤗 Many changes and feelings are just part of being human and growing up. However, if you notice unusual discharge, pain, bumps, or anything that's got you worried - definitely chat with a healthcare provider. They're there to help, not judge! 💖",
        quickReplies: ["What symptoms should I watch for? 👀", "When should I see a doctor? 🩺", "Body changes - what's normal? 🌱", "Self-care tips? 💆‍♀️"]
      };
    }
    
    if (lowerMessage.includes('partner') || lowerMessage.includes('relationship') || lowerMessage.includes('talk') || lowerMessage.includes('communicate')) {
      return {
        text: "Communication is EVERYTHING! 💬💕 Having honest conversations about boundaries, consent, and health builds amazing trust and keeps everyone safe and happy. It might feel awkward at first (totally normal!), but these convos get easier with practice. Remember - you ALWAYS have the right to say no to anything! ✋",
        quickReplies: ["How do I start the convo? 🗣️", "Setting boundaries? 🚧", "Dealing with pressure? 😰", "Building trust? 🤝"]
      };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('clinic') || lowerMessage.includes('doctor') || lowerMessage.includes('where')) {
      return {
        text: "There are tons of places where you can get confidential help! 🏥💖 Planned Parenthood, community health centers, and your family doctor are all great options. Many services are available regardless of insurance or ability to pay - because your health matters! ✨",
        quickReplies: ["Find clinics near me 📍", "What services are available? 📋", "Do I need parent permission? 👨‍👩‍👧", "Cost and insurance info? 💳"]
      };
    }

    if (lowerMessage.includes('prevent') || lowerMessage.includes('protection') || lowerMessage.includes('safe') || lowerMessage.includes('condom')) {
      return {
        text: "Prevention is super smart! 🛡️✨ There are lots of ways to protect yourself: using condoms consistently, getting vaccinated (like HPV vaccine), regular testing, and open communication with partners. The good news? Most STIs are totally preventable with the right info and tools! 🌟",
        quickReplies: ["Condom basics? 🛡️", "Vaccines available? 💉", "Other protection methods? 🔒", "Partner communication tips? 💬"]
      };
    }
    
    return {
      text: "Thanks for sharing that with me! 😊💖 Sexual health covers SO many topics, and it's awesome that you're asking questions! Whether it's about your body, relationships, prevention, or just understanding what's normal - I'm here to help with reliable, judgment-free info! ✨",
      quickReplies: ["STI basics 📚", "Prevention tips 🛡️", "Body questions 🤔", "Relationship advice 💕"]
    };
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay with gentle animation
    setTimeout(() => {
      const response = generateResponse(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        quickReplies: response.quickReplies
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-purple-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center animate-pulse">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                Health Chat <Sparkles className="w-5 h-5 text-purple-500" />
              </h1>
              <p className="text-sm text-gray-600">Your friendly health companion 💖</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-green-700">Private & Safe 🔒</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl min-h-[600px] flex flex-col border border-white/20">
          
          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[500px]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] animate-fade-in ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg' 
                    : 'bg-white border border-purple-100 shadow-md'
                } rounded-2xl px-5 py-4`}>
                  <p className={`text-sm leading-relaxed ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                    {message.text}
                  </p>
                  
                  {/* Quick Reply Buttons */}
                  {message.quickReplies && !message.isUser && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {message.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100 text-purple-700 hover:text-purple-800 transition-all duration-200 hover:scale-105"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-purple-100 rounded-2xl px-5 py-4 shadow-md">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 mb-4 font-medium">✨ Try asking about:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleSendMessage(prompt.text)}
                    className="text-left justify-start bg-gradient-to-r from-white to-purple-50 border-purple-200 hover:from-purple-50 hover:to-pink-50 text-gray-700 h-auto py-4 px-4 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <span className="text-lg mr-3">{prompt.emoji}</span>
                    {prompt.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-purple-100 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
            <div className="flex gap-3">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Type your question here... 💬"
                className="flex-1 border-purple-200 focus:border-purple-400 rounded-full bg-white/80 backdrop-blur-sm"
              />
              <Button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 rounded-full w-12 h-12 p-0 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Professional Help CTA */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                Need professional help? 🩺✨
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                While I can provide general info, healthcare providers can give you personalized advice and care. 
                Many services are confidential and available regardless of your age or insurance status! 💖
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50 transition-all duration-200 hover:scale-105">
                  📍 Find clinics near me
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50 transition-all duration-200 hover:scale-105">
                  💖 Planned Parenthood
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50 transition-all duration-200 hover:scale-105">
                  📞 Crisis helpline
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 bg-white/60 rounded-full px-4 py-2 inline-block backdrop-blur-sm">
            🔒 Your conversations are private and not stored. This tool provides general information only and cannot replace professional medical advice. 💖
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
