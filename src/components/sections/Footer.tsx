import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 border-t border-border/50 metal-texture">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img 
                src="https://cdn.poehali.dev/files/осе.png" 
                alt="Основа" 
                className="h-32 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground mb-4">
              Производство металлоконструкций и выездная сварка. Более 10 лет на рынке.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Контакты</h3>
            <div className="space-y-3">
              <a href="tel:+74998403312" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Phone" size={18} />
                <span>+7(499)840-33-12</span>
              </a>
              <a href="mailto:info@metallprom.ru" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={18} />
                <span>info@metallprom.ru</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MapPin" size={18} />
                <span>г. Москва, ул. Промышленная, 15</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Мессенджеры</h3>
            <div className="flex gap-3">
              <Button 
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full border-[#25D366] hover:bg-[#25D366] hover:text-white"
                onClick={() => window.open('https://wa.me/79773804500', '_blank')}
              >
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button 
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full border-[#0088cc] hover:bg-[#0088cc] hover:text-white"
                onClick={() => window.open('https://t.me/Ivan_517', '_blank')}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-6 text-center text-muted-foreground">
          <p>© 2024 Основа. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;