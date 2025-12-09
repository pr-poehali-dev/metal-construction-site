import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  parallaxOffset: number;
}

const HeroSection = ({ parallaxOffset }: HeroSectionProps) => {
  return (
    <section className="relative h-[500px] sm:h-[600px] overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="flex-1 metal-texture relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-primary/10"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          ></div>
        </div>
        
        <div className="flex-1 relative">
          <img 
            src="https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/4ea4c64f-c726-4453-8227-e4d18ec3d3a9.jpg"
            alt="Металлоконструкции"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path 
              d="M 50,0 Q 42,50 50,100" 
              fill="url(#curveGradient)"
            />
            <path 
              d="M 50,0 Q 42,50 50,100" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="0.3"
              opacity="0.6"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-start z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-white animate-slide-right">
              Производство<br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg">Металлоконструкций</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300 animate-slide-right" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              Профессиональная сварка и монтаж любой сложности
            </p>
            <div className="flex gap-2 sm:gap-4 flex-wrap animate-scale-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
              <Button 
                size="lg" 
                className="metal-shine text-sm sm:text-lg px-4 sm:px-8 h-11 sm:h-12"
                onClick={() => {
                  const quizSection = document.getElementById('quiz');
                  if (quizSection) {
                    quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <Icon name="Calculator" className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                Рассчитать стоимость
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-sm sm:text-lg px-4 sm:px-8 h-11 sm:h-12 border-white text-white hover:bg-white hover:text-background"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Phone" className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
