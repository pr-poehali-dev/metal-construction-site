import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 metal-texture border-b border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <img 
            src="https://cdn.poehali.dev/files/осе.png" 
            alt="Основа" 
            className="h-12 sm:h-16 w-auto object-contain"
          />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="hover:text-primary transition-colors">О компании</a>
          <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
          <a href="#quiz" className="hover:text-primary transition-colors">Расчет</a>
          <a href="#gallery" className="hover:text-primary transition-colors">Галерея</a>
          <a 
            href="#contact" 
            className="hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >Контакты</a>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button 
            size="icon"
            variant="ghost"
            className="md:hidden w-9 h-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
          <Button 
            size="icon" 
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white border border-[#25D366]/30"
            onClick={() => window.open('https://wa.me/79773804500', '_blank')}
          >
            <Icon name="MessageCircle" className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
          </Button>
          <Button 
            size="icon" 
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0088cc]/10 hover:bg-[#0088cc] hover:text-white border border-[#0088cc]/30"
            onClick={() => window.open('https://t.me/Ivan_517', '_blank')}
          >
            <Icon name="Send" className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
          </Button>
          <Button 
            size="icon" 
            className="md:hidden w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white border border-primary/30"
            onClick={() => window.open('tel:+74998403312', '_self')}
          >
            <Icon name="Phone" className="w-5 h-5" />
          </Button>
          <Button className="metal-shine ml-1 sm:ml-2 hidden sm:flex">
            <Icon name="Phone" size={18} className="mr-2" />
            +7(499)840-33-12
          </Button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <a 
              href="#about" 
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              О компании
            </a>
            <a 
              href="#services" 
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Услуги
            </a>
            <a 
              href="#quiz" 
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Расчет
            </a>
            <a 
              href="#gallery" 
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Галерея
            </a>
            <a 
              href="#contact" 
              className="py-2 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
            >
              Контакты
            </a>
            <Button className="metal-shine mt-2 w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Icon name="Phone" size={18} className="mr-2" />
              +7(499)840-33-12
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
