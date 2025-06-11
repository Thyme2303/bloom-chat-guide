
import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Shield, MapPin } from 'lucide-react';
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
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm here to help answer questions about sexual health. Our conversation is private and confidential. What would you like to know about?",
      isUser: false,
      timestamp: new Date(),
      quickReplies: ["STI testing", "Birth control", "Relationship questions", "Body questions"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts: QuickPrompt[] = [
    { text: "Where can I get tested for STIs?", category: "testing" },
    { text: "Tell me about birth control options", category: "contraception" },
    { text: "What are common STI symptoms?", category: "symptoms" },
    { text: "How can I talk to my partner about sex?", category: "communication" },
    { text: "Is what I'm experiencing normal?", category: "general" },
    { text: "Where can I find help near me?", category: "resources" }
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
        text: "Getting tested for STIs is a totally normal part of taking care of your health! 🌟 Most tests are quick and often just involve a simple urine test or blood draw. You can get tested at health clinics, doctor's offices, or many community health centers. The important thing is that testing is confidential and helps you know your status.",
        quickReplies: ["Where can I get tested?", "What's the testing process like?", "How often should I get tested?", "Tell me more about STIs"]
      };
    }
    
    if (lowerMessage.includes('birth control') || lowerMessage.includes('contraception') || lowerMessage.includes('pregnancy')) {
      return {
        text: "There are many effective birth control options available! 💊 From pills and patches to IUDs and implants, each method has different benefits. The best choice depends on your lifestyle, health, and preferences. A healthcare provider can help you find what works best for you.",
        quickReplies: ["Types of birth control", "How effective are they?", "Side effects to know about", "Where to get birth control"]
      };
    }
    
    if (lowerMessage.includes('symptoms') || lowerMessage.includes('normal') || lowerMessage.includes('body')) {
      return {
        text: "Having questions about your body is completely normal! 🤗 Many changes and feelings are a natural part of development and health. However, if you notice unusual discharge, pain, bumps, or anything that worries you, you can always talk to a healthcare provider. They're there to help, not judge.",
        quickReplies: ["Common symptoms to know", "When should I see a doctor", "Body changes and puberty", "Self-care tips"]
      };
    }
    
    if (lowerMessage.includes('partner') || lowerMessage.includes('relationship') || lowerMessage.includes('talk')) {
      return {
        text: "Communication with your partner is so important! 💕 Having honest conversations about boundaries, consent, and health helps build trust and keeps everyone safe. It might feel awkward at first, but these conversations get easier with practice. Remember, you always have the right to say no to anything that makes you uncomfortable.",
        quickReplies: ["How to start the conversation", "Talking about boundaries", "Consent and communication", "Dealing with pressure"]
      };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('clinic') || lowerMessage.includes('doctor')) {
      return {
        text: "There are many places where you can get confidential help! 🏥 Planned Parenthood, community health centers, and your family doctor are all good options. Many services are available regardless of whether you have insurance or can pay.",
        quickReplies: ["Find clinics near me", "What services are available?", "Do I need parental permission?", "Cost and insurance info"]
      };
    }
    
    return {
      text: "Thanks for sharing that with me! 😊 Sexual health covers lots of topics, and it's great that you're asking questions. Whether it's about your body, relationships, prevention, or just understanding what's normal, I'm here to help with reliable, non-judgmental information.",
      quickReplies: ["STI information", "Birth control basics", "Body and health questions", "Relationship advice"]
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

    // Simulate typing delay
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
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Health Chat</h1>
              <p className="text-sm text-gray-600">Your confidential health companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Private & Confidential</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg min-h-[600px] flex flex-col">
          
          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[500px]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.isUser ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-3 shadow-sm`}>
                  <p className={`text-sm ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                    {message.text}
                  </p>
                  
                  {/* Quick Reply Buttons */}
                  {message.quickReplies && !message.isUser && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
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
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (shown when no messages or after bot response) */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 mb-3">Or try asking about:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleSendMessage(prompt.text)}
                    className="text-left justify-start bg-white/80 border-blue-200 hover:bg-blue-50 text-gray-700 h-auto py-3"
                  >
                    {prompt.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Type your question here..."
                className="flex-1 border-gray-300 focus:border-blue-500 rounded-full"
              />
              <Button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full w-12 h-12 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Professional Help CTA */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">Need professional help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                While I can provide general information, healthcare providers can give you personalized advice and care. Many services are confidential and available regardless of your age or insurance status.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50">
                  Find clinics near me
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50">
                  Planned Parenthood
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50">
                  Crisis helpline
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your conversations are private and not stored. This tool provides general information only and cannot replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
