
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
      text: "สวัสดีค่ะ! 👋 ฉันพร้อมจะช่วยตอบคำถามเกี่ยวกับสุขภาพทางเพศของคุณ การสนทนาของเราเป็นความลับและส่วนตัว คุณอยากรู้เรื่องอะไรคะ?",
      isUser: false,
      timestamp: new Date(),
      quickReplies: ["การตรวจหาเชื้อ STI", "การคุมกำเนิด", "คำถามเรื่องความสัมพันธ์", "คำถามเรื่องร่างกาย"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts: QuickPrompt[] = [
    { text: "ฉันจะไปตรวจหาเชื้อ STI ได้ที่ไหน?", category: "testing" },
    { text: "บอกฉันเกี่ยวกับตัวเลือกการคุมกำเนิด", category: "contraception" },
    { text: "อาการของเชื้อ STI ทั่วไปมีอะไรบ้าง?", category: "symptoms" },
    { text: "ฉันจะคุยกับคู่ของฉันเรื่องเซ็กส์ได้อย่างไร?", category: "communication" },
    { text: "สิ่งที่ฉันประสบอยู่นี้เป็นเรื่องปกติไหม?", category: "general" },
    { text: "ฉันจะหาความช่วยเหลือในบริเวณใกล้เคียงได้ที่ไหน?", category: "resources" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): { text: string; quickReplies?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('sti') || lowerMessage.includes('std') || lowerMessage.includes('ตรวจ') || lowerMessage.includes('เชื้อ')) {
      return {
        text: "การตรวจหาเชื้อ STI เป็นส่วนหนึ่งของการดูแลสุขภาพที่ปกติมากค่ะ! 🌟 การตรวจส่วนใหญ่เร็วและมักจะเป็นเพียงการตรวจปัสสาวะหรือเจาะเลือดง่ายๆ คุณสามารถไปตรวจได้ที่คลินิกสุขภาพ คลินิกแพทย์ หรือศูนย์สุขภาพชุมชนหลายแห่ง สิ่งสำคัญคือการตรวจนั้นเป็นความลับและช่วยให้คุณรู้เรื่องสุขภาพของตัวเองค่ะ",
        quickReplies: ["ฉันจะไปตรวจได้ที่ไหน?", "ขั้นตอนการตรวจเป็นอย่างไร?", "ควรไปตรวจบ่อยแค่ไหน?", "บอกฉันเพิ่มเติมเรื่อง STI"]
      };
    }
    
    if (lowerMessage.includes('คุมกำเนิด') || lowerMessage.includes('ป้องกันการตั้งครรภ์') || lowerMessage.includes('ตั้งครรภ์')) {
      return {
        text: "มีวิธีการคุมกำเนิดที่มีประสิทธิภาพหลายแบบค่ะ! 💊 ตั้งแต่ยาเม็ด แผ่นแปะ ไปจนถึง IUD และการใส่ห่วง แต่ละวิธีมีข้อดีที่แตกต่างกัน ทางเลือกที่ดีที่สุดขึ้นอยู่กับวิถีชีวิต สุขภาพ และความต้องการของคุณ แพทย์สามารถช่วยคุณหาสิ่งที่เหมาะสมที่สุดค่ะ",
        quickReplies: ["ประเภทของการคุมกำเนิด", "ประสิทธิภาพแค่ไหน?", "ผลข้างเคียงที่ควรรู้", "จะหาการคุมกำเนิดได้ที่ไหน"]
      };
    }
    
    if (lowerMessage.includes('อาการ') || lowerMessage.includes('ปกติ') || lowerMessage.includes('ร่างกาย')) {
      return {
        text: "การมีคำถามเกี่ยวกับร่างกายของคุณเป็นเรื่องปกติมากค่ะ! 🤗 การเปลี่ยนแปลงและความรู้สึกหลายอย่างเป็นส่วนหนึ่งของการพัฒนาและสุขภาพที่ปกติ อย่างไรก็ตาม หากคุณสังเกตเห็นการคัดหลั่งที่ผิดปกติ ความเจ็บปวด ตุ่มผื่น หรือสิ่งใดที่ทำให้คุณกังวล คุณสามารถปรึกษาแพทย์ได้เสมอค่ะ พวกเขาอยู่ที่นั่นเพื่อช่วยเหลือ ไม่ใช่เพื่อตัดสิน",
        quickReplies: ["อาการทั่วไปที่ควรรู้", "เมื่อไหร่ควรไปหาแพทย์", "การเปลี่ยนแปลงร่างกายและวัยรุ่น", "เคล็ดลับการดูแลตัวเอง"]
      };
    }
    
    if (lowerMessage.includes('คู่') || lowerMessage.includes('ความสัมพันธ์') || lowerMessage.includes('คุย')) {
      return {
        text: "การสื่อสารกับคู่ของคุณสำคัญมากค่ะ! 💕 การสนทนาอย่างซื่อสัตย์เกี่ยวกับขอบเขต ความยินยอม และสุขภาพ ช่วยสร้างความไว้วางใจและรักษาความปลอดภัยของทุกคน อาจจะรู้สึกอึดอัดในตอนแรก แต่การสนทนาเหล่านี้จะง่ายขึ้นเมื่อฝึกฝนค่ะ จำไว้ว่าคุณมีสิทธิ์ที่จะปฏิเสธสิ่งใดที่ทำให้คุณรู้สึกไม่สบายใจ",
        quickReplies: ["จะเริ่มบทสนทนาอย่างไร", "การพูดคุยเรื่องขอบเขต", "ความยินยอมและการสื่อสาร", "การรับมือกับแรงกดดัน"]
      };
    }
    
    if (lowerMessage.includes('ช่วยเหลือ') || lowerMessage.includes('คลินิก') || lowerMessage.includes('แพทย์')) {
      return {
        text: "มีหลายสถานที่ที่คุณสามารถขอความช่วยเหลือเป็นความลับได้ค่ะ! 🏥 แพลนด์ แพร์เรนต์ฮูด ศูนย์สุขภาพชุมชน และแพทย์ประจำครอบครัวของคุณ ล้วนเป็นตัวเลือกที่ดี บริการหลายอย่างมีให้ไม่ว่าคุณจะมีประกันหรือไม่มีเงินจ่ายค่ะ",
        quickReplies: ["หาคลินิกใกล้ฉัน", "มีบริการอะไรบ้าง?", "ต้องได้รับอนุญาตจากผู้ปกครองไหม?", "ข้อมูลค่าใช้จ่ายและประกัน"]
      };
    }
    
    return {
      text: "ขอบคุณที่แบ่งปันเรื่องนี้กับฉันค่ะ 😊 สุขภาพทางเพศครอบคลุมหัวข้อหลายเรื่อง และเป็นเรื่องดีที่คุณถามคำถาม! ไม่ว่าจะเป็นเรื่องร่างกาย ความสัมพันธ์ การป้องกัน หรือแค่การทำความเข้าใจว่าอะไรเป็นเรื่องปกติ ฉันพร้อมจะช่วยด้วยข้อมูลที่เชื่อถือได้และไม่มีการตัดสินค่ะ",
      quickReplies: ["ข้อมูลเรื่อง STI", "พื้นฐานการคุมกำเนิด", "คำถามเรื่องร่างกายและสุขภาพ", "คำแนะนำเรื่องความสัมพันธ์"]
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
              <h1 className="text-lg font-semibold text-gray-800">แชทสุขภาพ</h1>
              <p className="text-sm text-gray-600">เพื่อนคู่ใจด้านสุขภาพที่เป็นความลับ</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>ส่วนตัวและเป็นความลับ</span>
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
              <p className="text-sm text-gray-600 mb-3">หรือลองถามเรื่อง:</p>
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
                placeholder="พิมพ์คำถามของคุณที่นี่..."
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
              <h3 className="font-semibold text-gray-800 mb-2">ต้องการความช่วยเหลือจากผู้เชี่ยวชาญ?</h3>
              <p className="text-sm text-gray-600 mb-4">
                แม้ว่าฉันสามารถให้ข้อมูลทั่วไปได้ แต่แพทย์สามารถให้คำแนะนำและการดูแลที่เหมาะสมกับคุณได้ บริการหลายอย่างเป็นความลับและมีให้ไม่ว่าอายุหรือประกันของคุณจะเป็นอย่างไร
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50">
                  หาคลินิกใกล้ฉัน
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50">
                  แพลนด์ แพร์เรนต์ฮูด
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-green-300 text-green-700 hover:bg-green-50">
                  สายด่วนช่วยเหลือ
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 การสนทนาของคุณเป็นส่วนตัวและไม่ถูกเก็บไว้ เครื่องมือนี้ให้ข้อมูลทั่วไปเท่านั้น และไม่สามารถทดแทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญได้
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
