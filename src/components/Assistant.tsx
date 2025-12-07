import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; time: string }>>([]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setIsAuthorized(true);
      setMessages([
        {
          text: `Здравствуйте, ${name}! Я готова ответить на ваши вопросы. Чем могу помочь?`,
          isUser: false,
          time: 'Только что'
        }
      ]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, {
        text: message,
        isUser: true,
        time: 'Только что'
      }]);
      setMessage('');
      
      setTimeout(() => {
        // Play pleasant notification sound (soft bell)
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        
        // Second tone for pleasant bell effect
        setTimeout(() => {
          const osc2 = audioContext.createOscillator();
          const gain2 = audioContext.createGain();
          
          osc2.connect(gain2);
          gain2.connect(audioContext.destination);
          
          osc2.frequency.value = 1000;
          osc2.type = 'sine';
          
          gain2.gain.setValueAtTime(0, audioContext.currentTime);
          gain2.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
          gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
          
          osc2.start(audioContext.currentTime);
          osc2.stop(audioContext.currentTime + 0.35);
        }, 50);
        
        setMessages(prev => [...prev, {
          text: 'Спасибо за ваш вопрос! Наш менеджер ответит вам в ближайшее время. Или вы можете позвонить нам прямо сейчас.',
          isUser: false,
          time: 'Только что'
        }]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Button with Avatar */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <button
            onClick={() => setIsOpen(true)}
            className="relative group"
            aria-label="Открыть чат"
          >
            {/* Static subtle glow - no animation */}
            <div className="absolute -inset-2 rounded-full bg-primary/10 blur-md"></div>
            
            {/* Avatar button */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden shadow-2xl ring-4 ring-card group-hover:ring-primary transition-all duration-300 group-hover:scale-110 bg-card">
              <img 
                src="https://cdn.poehali.dev/files/2025-12-08_00-26-02.png" 
                alt="Виктория - Онлайн консультант"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Online indicator - static, no pulse */}
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full ring-2 ring-card"></div>
            </div>

            {/* Message icon overlay */}
            <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Icon name="MessageCircle" size={18} className="text-white" />
            </div>
          </button>
        </div>
      )}

      {/* Assistant Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] w-[90vw] max-w-[400px]">
          <div className="bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src="https://cdn.poehali.dev/files/2025-12-08_00-26-02.png" 
                    alt="Виктория"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-card"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Виктория</h3>
                  <p className="text-xs text-muted-foreground">Онлайн • Ответит в течение минуты</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="X" size={18} />
              </Button>
            </div>

            {!isAuthorized ? (
              /* Authorization Form */
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold mb-2">Добро пожаловать!</h3>
                  <p className="text-sm text-muted-foreground">
                    Представьтесь, чтобы мы могли начать диалог
                  </p>
                </div>
                
                <form onSubmit={handleAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="chat-name" className="text-sm">Ваше имя</Label>
                    <Input
                      id="chat-name"
                      placeholder="Иван"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1.5 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="chat-phone" className="text-sm">Телефон</Label>
                    <Input
                      id="chat-phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="mt-1.5 h-11"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full metal-shine h-11">
                    <Icon name="MessageSquare" size={18} className="mr-2" />
                    Начать диалог
                  </Button>
                </form>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-3 text-center">Или свяжитесь другим способом:</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Icon name="Phone" size={14} className="mr-1.5" />
                      Позвонить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => window.open('https://wa.me/79000000000', '_blank')}
                    >
                      <Icon name="MessageCircle" size={14} className="mr-1.5" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Interface */
              <>
                {/* Messages */}
                <div className="p-4 h-[350px] overflow-y-auto bg-gradient-to-b from-background to-primary/5">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-2.5 mb-4 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                      {!msg.isUser && (
                        <img 
                          src="https://cdn.poehali.dev/files/2025-12-08_00-26-02.png" 
                          alt="Виктория"
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                      <div className={`rounded-2xl p-3 max-w-[75%] shadow-sm ${
                        msg.isUser 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-card border border-border/50 rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <span className={`text-xs mt-1.5 block ${
                          msg.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions in Chat */}
                {messages.length === 1 && (
                  <div className="px-4 pb-4 space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">Популярные вопросы:</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2.5 px-3 text-xs"
                      onClick={() => setMessage('Хочу узнать стоимость сварочных работ')}
                    >
                      💰 Узнать стоимость работ
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2.5 px-3 text-xs"
                      onClick={() => setMessage('Как быстро можете выехать на объект?')}
                    >
                      ⚡ Как быстро можете выехать?
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2.5 px-3 text-xs"
                      onClick={() => setMessage('Какие гарантии вы даёте?')}
                    >
                      🛡️ Какие гарантии на работы?
                    </Button>
                  </div>
                )}

                {/* Call Now Button - Always visible */}
                <div className="px-4 pb-3">
                  <Button
                    size="sm"
                    className="w-full metal-shine h-11"
                    onClick={() => window.location.href = 'tel:+79000000000'}
                  >
                    <Icon name="Phone" size={16} className="mr-2" />
                    Позвонить прямо сейчас
                  </Button>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50 bg-card">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Напишите сообщение..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 h-10 rounded-full"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="rounded-full metal-shine flex-shrink-0 h-10 w-10"
                      disabled={!message.trim()}
                    >
                      <Icon name="Send" size={16} />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Assistant;