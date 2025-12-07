import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <>
      {/* Floating Button */}
      {isMinimized && (
        <Button
          onClick={() => {
            setIsMinimized(false);
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl metal-shine p-0 hover:scale-110 transition-transform duration-300"
        >
          <Icon name="MessageCircle" size={28} />
        </Button>
      )}

      {/* Assistant Widget */}
      {!isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px]">
          {/* Main Card */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
            {isOpen ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src="https://cdn.poehali.dev/files/2025-12-08_00-26-02.png" 
                        alt="Виктория"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-card"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Виктория</h3>
                      <p className="text-xs text-muted-foreground">Онлайн</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsMinimized(true)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="p-4 h-[300px] overflow-y-auto bg-gradient-to-b from-background to-primary/5">
                  {/* Welcome Message */}
                  <div className="flex gap-3 mb-4">
                    <img 
                      src="https://cdn.poehali.dev/files/2025-12-08_00-26-02.png" 
                      alt="Виктория"
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-card border border-border/50 rounded-2xl rounded-tl-none p-3 max-w-[240px] shadow-sm">
                      <p className="text-sm leading-relaxed">
                        Здравствуйте! Готова помочь вам. Напишите мне, если у вас появятся вопросы.
                      </p>
                      <span className="text-xs text-muted-foreground mt-1 block">Только что</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground px-1">Быстрые действия:</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-3 px-4"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Icon name="Phone" size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm">Заказать консультацию</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-3 px-4"
                      onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Icon name="FileText" size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm">Рассчитать стоимость</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-3 px-4"
                      onClick={() => window.open('https://wa.me/79000000000', '_blank')}
                    >
                      <Icon name="MessageSquare" size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm">Написать в WhatsApp</span>
                    </Button>
                  </div>
                </div>

                {/* Input Footer */}
                <div className="p-4 border-t border-border/50 bg-card">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Напишите сообщение..."
                      className="flex-1 px-4 py-2 rounded-full bg-background border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button size="icon" className="rounded-full metal-shine flex-shrink-0">
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Minimized Preview */
              <div 
                className="flex items-start gap-3 p-4 cursor-pointer hover:bg-primary/5 transition-colors"
                onClick={() => setIsOpen(true)}
              >
                <div className="relative">
                  <img 
                    src="https://cdn.poehali.dev/files/2025-12-08_00-26-02.png" 
                    alt="Виктория"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-card"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">Виктория</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Здравствуйте! Готова помочь вам. Напишите мне, если у вас появятся вопросы.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Assistant;
