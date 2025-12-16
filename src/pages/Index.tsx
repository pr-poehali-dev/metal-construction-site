import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Assistant from '@/components/Assistant';

const Index = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({
    type: '',
    material: '',
    complexity: '',
    services: [] as string[],
    deadline: '',
    weldingType: '',
    weldingServices: [] as string[],
    name: '',
    phone: '',
    email: '',
    files: [] as File[],
    fileUrls: [] as string[]
  });
  
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuizTransitioning, setIsQuizTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  const isWeldingFlow = quizData.type === 'выездная';

  // Check if user already accepted cookies
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      setShowCookieNotice(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieNotice(false);
  };

  // Detect mobile for gallery positioning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const totalSteps = isWeldingFlow ? 5 : 6;

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setParallaxOffset(scrolled * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizNext = async () => {
    const currentScrollPos = quizRef.current?.offsetTop;
    
    if (quizStep < totalSteps - 1) {
      setQuizStep(quizStep + 1);
      
      setTimeout(() => {
        if (currentScrollPos && window.scrollY !== currentScrollPos - 100) {
          window.scrollTo({ top: currentScrollPos - 100, behavior: 'smooth' });
        }
      }, 50);
    } else {
      try {
        let fileUrls: string[] = [];
        
        if (quizData.files.length > 0) {
          toast.loading('Загружаем файлы...');
          
          const uploadPromises = quizData.files.map(async (file) => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = async () => {
                try {
                  const base64 = (reader.result as string).split(',')[1];
                  const response = await fetch('https://functions.poehali.dev/bab5b9b0-7b4a-4610-9bb2-eb97014079bf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      fileContent: base64,
                      fileName: file.name,
                      contentType: file.type
                    })
                  });
                  const data = await response.json();
                  resolve(`${file.name}: ${data.url}`);
                } catch (error) {
                  reject(error);
                }
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          });
          
          fileUrls = await Promise.all(uploadPromises);
          toast.dismiss();
        }
        
        const formType = isWeldingFlow ? 'Выездная сварка' : 'Металлоконструкции';
        const message = isWeldingFlow 
          ? `Тип сварки: ${quizData.weldingType}, Услуги: ${quizData.weldingServices.join(', ') || 'не выбрано'}`
          : `Тип: ${quizData.type}, Материал: ${quizData.material}, Сложность: ${quizData.complexity}, Услуги: ${quizData.services.join(', ') || 'не выбрано'}, Срок: ${quizData.deadline}`;
        
        const filesInfo = fileUrls.length > 0 ? `\n\n📎 Файлы (${fileUrls.length}):\n${fileUrls.join('\n')}` : '';
        
        await fetch('https://functions.poehali.dev/3c8616f4-22e9-4475-9645-373886ca46e1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: quizData.name,
            phone: quizData.phone,
            message: message + (quizData.email ? `\n\nКомментарий: ${quizData.email}` : '') + filesInfo,
            formType: `Калькулятор стоимости: ${formType}`
          })
        });
        
        toast.success('Спасибо! Мы рассчитаем стоимость и свяжемся с вами.');
        setQuizStep(0);
        setQuizData({ 
          type: '', 
          material: '', 
          complexity: '', 
          services: [], 
          deadline: '',
          weldingType: '',
          weldingServices: [],
          name: '',
          phone: '',
          email: '',
          files: [],
          fileUrls: []
        });
      } catch (error) {
        console.error('Submission failed:', error);
        toast.error('Произошла ошибка. Попробуйте снова.');
      }
    }
  };

  const handleRadioSelect = (field: string, value: string) => {
    const currentScrollPos = quizRef.current?.offsetTop;
    
    setQuizData({...quizData, [field]: value});
    setIsQuizTransitioning(true);
    
    // Автоматический переход к следующему шагу
    setTimeout(() => {
      if (quizStep < totalSteps - 1) {
        setQuizStep(quizStep + 1);
        setIsQuizTransitioning(false);
        
        // Сохраняем позицию прокрутки
        setTimeout(() => {
          if (currentScrollPos && window.scrollY !== currentScrollPos - 100) {
            window.scrollTo({ top: currentScrollPos - 100, behavior: 'smooth' });
          }
        }, 50);
      } else {
        setIsQuizTransitioning(false);
      }
    }, 400);
  };

  const handleServiceToggle = (service: string) => {
    setQuizData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleWeldingServiceToggle = (service: string) => {
    setQuizData(prev => ({
      ...prev,
      weldingServices: prev.weldingServices.includes(service)
        ? prev.weldingServices.filter(s => s !== service)
        : [...prev.weldingServices, service]
    }));
  };

  const handleCallRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      await fetch('https://functions.poehali.dev/3c8616f4-22e9-4475-9645-373886ca46e1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('contact-name'),
          phone: formData.get('contact-phone'),
          message: formData.get('contact-message') || 'Заказ обратного звонка',
          formType: 'Обратный звонок'
        })
      });
      toast.success('Заявка принята! Мы свяжемся с вами в ближайшее время.');
      form.reset();
    } catch (error) {
      console.error('Form submission failed:', error);
      toast.success('Заявка принята! Мы свяжемся с вами в ближайшее время.');
    }
  };

  const services = [
    { title: 'Металлоконструкции', description: 'Металлоконструкции', image: 'https://cdn.poehali.dev/files/2.jpg' },
    { title: 'Ограждения', description: 'Заборы, перила, барьеры', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/f3cf71ee-dcce-4504-b474-a49ebbf19770.jpg' },
    { title: 'Антресольные этажи', description: 'Изготовление под ключ', image: 'https://cdn.poehali.dev/files/3.jpg' },
    { title: 'Конструкции для дачи', description: 'Беседки, навесы, козырьки', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/615adba9-d99b-48eb-8826-bee065ce039b.jpg' },
    { title: 'Выездные сварочные работы', description: 'Профессиональная аргонодуговая сварка', image: 'https://cdn.poehali.dev/files/4.jpg' },
    { title: 'Порошковая покраска', description: 'Прочное и долговечное покрытие', image: 'https://cdn.poehali.dev/files/п.jpg' }
  ];

  const works = [
    { title: 'Консультация', description: 'Обсуждение проекта и технических требований' },
    { title: 'Расчет и смета', description: 'Точный расчет материалов и стоимости работ' },
    { title: 'Производство', description: 'Изготовление конструкций на современном оборудовании' },
    { title: 'Доставка', description: 'Транспортировка готовых изделий на объект' },
    { title: 'Монтаж', description: 'Профессиональная установка с соблюдением технологии' },
    { title: 'Гарантия', description: 'Гарантийное обслуживание и техподдержка' }
  ];

  const gallery = [
    { title: 'Ангар для сельхозтехники', image: 'https://cdn.poehali.dev/files/2.jpg' },
    { title: 'Металлокаркас производственного цеха', image: 'https://cdn.poehali.dev/files/ее.jpg' },
    { title: 'Металлическая лестница на второй этаж', image: 'https://cdn.poehali.dev/files/3.jpg' },
    { title: 'Навес для автомобилей', image: 'https://cdn.poehali.dev/files/навес.jpg' },
    { title: 'Ограждение промышленной территории', image: 'https://cdn.poehali.dev/files/00.png' },
    { title: 'Нестандартная металлоконструкция', image: 'https://cdn.poehali.dev/files/а.jpg' },
    { title: 'Ограждение лестницы', image: 'https://cdn.poehali.dev/files/8.jpg' },
    { title: 'Изделия из нержавейки', image: 'https://cdn.poehali.dev/files/stainless-seat-large.jpg' },
    { title: 'Козырек для здания', image: 'https://cdn.poehali.dev/files/к.jpg' },
    { title: 'Каркас предприятия', image: 'https://cdn.poehali.dev/files/г.jpg' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 metal-texture border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 sm:py-4 flex items-center justify-between rounded-[0.25rem] py-0.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <img 
              src="https://cdn.poehali.dev/files/лого5.png" 
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
        
        {/* Mobile Menu */}
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

      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left Side - Metal Texture Background */}
          <div className="flex-1 metal-texture relative">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-primary/10"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            ></div>
          </div>
          
          {/* Right Side - Image with Parallax */}
          <div className="flex-1 relative">
            <img 
              src="https://cdn.poehali.dev/files/gemini-image-2_сделать_реалистичное_фото_для_обложки_сайт-0 (1).jpg"
              alt="Металлоконструкции"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20"></div>
          </div>

          {/* Curved Divider */}
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

        {/* Content Overlay */}
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

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 animate-fade-in">
            О компании
          </h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="animate-slide-up">
              <p className="text-base sm:text-lg mb-4 text-muted-foreground leading-relaxed">
                <span className="text-primary font-bold">Основа</span> — это команда профессионалов с более чем 10-летним опытом в производстве металлоконструкций и выездной сварке.
              </p>
              <p className="text-base sm:text-lg mb-4 text-muted-foreground leading-relaxed">
                Мы специализируемся на изготовлении металлокаркасов зданий, ангаров, навесов, лестниц, ограждений и нестандартных металлических изделий любой сложности.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Современное оборудование, квалифицированные сварщики и контроль качества на каждом этапе гарантируют надежность наших конструкций.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card className="metal-texture border-border/50">
                <CardContent className="py-5 sm:pt-6 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1.5 sm:mb-2">10+</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">лет опыта</p>
                </CardContent>
              </Card>
              <Card className="metal-texture border-border/50">
                <CardContent className="py-5 sm:pt-6 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1.5 sm:mb-2">500+</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">проектов</p>
                </CardContent>
              </Card>
              <Card className="metal-texture border-border/50">
                <CardContent className="py-5 sm:pt-6 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1.5 sm:mb-2">24/7</div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-tight">выездная<br />сварка</p>
                </CardContent>
              </Card>
              <Card className="metal-texture border-border/50">
                <CardContent className="py-5 sm:pt-6 text-center flex flex-col items-center justify-center h-full">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1.5 sm:mb-2">100%</div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-tight">гарантия<br />качества</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Director Comment */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <Card className="metal-texture border-primary/30 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src="https://cdn.poehali.dev/files/bcaf8d50-0a16-4cce-b05d-e7cf807bcd02.jpg"
                        alt="Михаил Соколов"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Icon name="Quote" className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50 mb-4" />
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                      <span className="text-primary font-bold">«Основа»</span> — современное производство полного цикла. Мы создаем надежную основу для ваших проектов: от крупных промышленных конструкций до срочных выездных работ.
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed mb-3">
                      <span className="text-foreground font-semibold">Наши ключевые направления:</span>
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground"><span className="text-foreground font-medium">Производство:</span> Каркасы зданий, ангары, а также лестницы, ограждения и другие изделия по вашим чертежам.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground"><span className="text-foreground font-medium">Выездные услуги:</span> Сварка, монтаж и ремонт конструкций непосредственно на вашей площадке.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground"><span className="text-foreground font-medium">Поддержка:</span> Проектирование (КМ/КМД), доставка и гарантия.</span>
                      </li>
                    </ul>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      Наше отличие — <span className="text-primary font-semibold">гибкость</span>: одинаково ответственно беремся и за масштабный проект, и за срочный заказ.
                    </p>
                    <div className="border-t border-border/50 pt-4">
                      <p className="text-foreground font-semibold text-lg">Михаил Соколов</p>
                      <p className="text-sm text-muted-foreground">Директор по производству</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Section - moved here after Director Comment */}
          <div id="quiz" className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <div className="mb-8 sm:mb-12 metal-texture border border-border/50 rounded-lg p-4 sm:p-6 md:p-8">
              <div className="grid md:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                    Расчет стоимости металлоконструкций
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6">
                    Ответьте на несколько вопросов и получите точный расчет стоимости вашего проекта
                  </p>
                  <div className="space-y-2 sm:space-y-3 hidden sm:block">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Icon name="CheckCircle2" className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-foreground">Пройдите короткий опрос</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Icon name="CheckCircle2" className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-foreground">Заполните основные параметры</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Icon name="CheckCircle2" className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-foreground">Укажите ключевые данные</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg mx-auto mb-2 sm:mb-3">
                    <img 
                      src="https://cdn.poehali.dev/files/b6b780d9-3b7f-42d3-af9d-5b721bdb61fd.jpg"
                      alt="Владислав"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-foreground font-semibold">Владислав</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">менеджер по продажам</p>
                </div>
              </div>
            </div>
            
            <Card className="metal-texture border-border/50" ref={quizRef}>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Шаг {quizStep + 1} из {totalSteps}</CardTitle>
                <div className="mt-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6 relative">
                {isQuizTransitioning && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-muted-foreground">Загрузка...</p>
                    </div>
                  </div>
                )}
                {quizStep === 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">Какой тип конструкции вам нужен?</Label>
                    <RadioGroup value={quizData.type} className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-start space-x-2 p-3 sm:p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'каркас')}>
                        <RadioGroupItem value="каркас" id="каркас" className="mt-1 flex-shrink-0" />
                        <Label htmlFor="каркас" className="cursor-pointer flex-1">
                          <div className="text-sm sm:text-base font-semibold mb-1">Каркас здания</div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-snug">промышленные цеха, склады, торговые центры, ангары</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-3 sm:p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'антресоль')}>
                        <RadioGroupItem value="антресоль" id="антресоль" className="mt-1 flex-shrink-0" />
                        <Label htmlFor="антресоль" className="cursor-pointer flex-1">
                          <div className="text-sm sm:text-base font-semibold mb-1">Антресольные этажи</div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-snug">межэтажные перекрытия, технологические площадки, балконы</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-3 sm:p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'лестницы')}>
                        <RadioGroupItem value="лестницы" id="лестницы" className="mt-1 flex-shrink-0" />
                        <Label htmlFor="лестницы" className="cursor-pointer flex-1">
                          <div className="text-sm sm:text-base font-semibold mb-1">Лестницы и ограждения</div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-snug">внутренние и наружные лестницы, перила, поручни</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-3 sm:p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'мелкие')}>
                        <RadioGroupItem value="мелкие" id="мелкие" className="mt-1 flex-shrink-0" />
                        <Label htmlFor="мелкие" className="cursor-pointer flex-1">
                          <div className="text-sm sm:text-base font-semibold mb-1">Мелкие конструкции</div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-snug">козырьки, навесы, стеллажи, индивидуальные изделия</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-3 sm:p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'другое')}>
                        <RadioGroupItem value="другое" id="другое" className="mt-1 flex-shrink-0" />
                        <Label htmlFor="другое" className="cursor-pointer flex-1">
                          <div className="text-sm sm:text-base font-semibold mb-1">Другое</div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-snug">специальные конструкции, нестандартные решения</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-3 sm:p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'выездная')}>
                        <RadioGroupItem value="выездная" id="выездная" className="mt-1 flex-shrink-0" />
                        <Label htmlFor="выездная" className="cursor-pointer flex-1">
                          <div className="text-sm sm:text-base font-semibold mb-1">Выездные сварочные работы</div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-snug">сварка на объекте, ремонт, монтаж конструкций</div>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src="https://cdn.poehali.dev/files/b6b780d9-3b7f-42d3-af9d-5b721bdb61fd.jpg"
                            alt="Владислав"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          <span className="text-foreground font-medium">Не переживайте за точность формулировок!</span> Главное — чтобы я понял суть. Все технические нюансы и детали мы обязательно уточним и обсудим.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {quizStep === 1 && !isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Какой тип металла требуется?</Label>
                    <RadioGroup value={quizData.material}>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('material', 'конструкционная')}>
                        <RadioGroupItem value="конструкционная" id="конструкционная" />
                        <Label htmlFor="конструкционная" className="cursor-pointer flex-1">
                          <div className="font-semibold">Конструкционная (черная) сталь</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('material', 'нержавеющая')}>
                        <RadioGroupItem value="нержавеющая" id="нержавеющая" />
                        <Label htmlFor="нержавеющая" className="cursor-pointer flex-1">
                          <div className="font-semibold">Нержавеющая сталь</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('material', 'цветные')}>
                        <RadioGroupItem value="цветные" id="цветные" />
                        <Label htmlFor="цветные" className="cursor-pointer flex-1">
                          <div className="font-semibold">Цветные металлы</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {quizStep === 1 && isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Какой тип сварки вам нужен?</Label>
                    <RadioGroup value={quizData.weldingType}>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'ручная')}>
                        <RadioGroupItem value="ручная" id="ручная" className="mt-1" />
                        <Label htmlFor="ручная" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Ручная дуговая сварка (MMA)</div>
                          <div className="text-sm text-muted-foreground">универсальный метод для большинства задач</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'полуавтомат')}>
                        <RadioGroupItem value="полуавтомат" id="полуавтомат" className="mt-1" />
                        <Label htmlFor="полуавтомат" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Полуавтоматическая (MIG/MAG)</div>
                          <div className="text-sm text-muted-foreground">быстрая сварка тонких металлов</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'аргон')}>
                        <RadioGroupItem value="аргон" id="аргон" className="mt-1" />
                        <Label htmlFor="аргон" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Аргонодуговая (TIG)</div>
                          <div className="text-sm text-muted-foreground">высокоточная сварка нержавейки и алюминия</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'незнаю')}>
                        <RadioGroupItem value="незнаю" id="незнаю" className="mt-1" />
                        <Label htmlFor="незнаю" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Не знаю, нужна консультация</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {quizStep === 2 && !isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Какой уровень сложности проекта?</Label>
                    <RadioGroup value={quizData.complexity}>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('complexity', 'простой')}>
                        <RadioGroupItem value="простой" id="простой" />
                        <Label htmlFor="простой" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Простой (типовые решения, стандартные чертежи)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('complexity', 'средний')}>
                        <RadioGroupItem value="средний" id="средний" />
                        <Label htmlFor="средний" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Средний (адаптация типовых решений, индивидуальные размеры)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('complexity', 'сложный')}>
                        <RadioGroupItem value="сложный" id="сложный" />
                        <Label htmlFor="сложный" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Сложный (индивидуальное проектирование, сложные расчеты)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('complexity', 'экспертный')}>
                        <RadioGroupItem value="экспертный" id="экспертный" />
                        <Label htmlFor="экспертный" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Экспертный (уникальные конструкции, инженерный анализ)</div>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src="https://cdn.poehali.dev/files/b6b780d9-3b7f-42d3-af9d-5b721bdb61fd.jpg"
                            alt="Владислав"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground font-semibold mb-1">Владислав</p>
                          <p className="text-xs text-muted-foreground mb-2">Менеджер</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-medium">Оценим сложность вашего проекта и сразу подготовим персональное решение!</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizStep === 2 && isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Какие дополнительные услуги требуются?</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleWeldingServiceToggle('резка')}>
                        <input type="checkbox" checked={quizData.weldingServices.includes('резка')} readOnly className="w-5 h-5" />
                        <Label className="cursor-pointer flex-1">
                          <div className="font-semibold">Резка металла</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleWeldingServiceToggle('подготовка')}>
                        <input type="checkbox" checked={quizData.weldingServices.includes('подготовка')} readOnly className="w-5 h-5" />
                        <Label className="cursor-pointer flex-1">
                          <div className="font-semibold">Подготовка поверхностей</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleWeldingServiceToggle('монтаж')}>
                        <input type="checkbox" checked={quizData.weldingServices.includes('монтаж')} readOnly className="w-5 h-5" />
                        <Label className="cursor-pointer flex-1">
                          <div className="font-semibold">Монтаж конструкций</div>
                        </Label>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">*Отметьте один или несколько вариантов</p>
                  </div>
                )}

                {quizStep === 3 && !isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Какие дополнительные услуги требуются?</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleServiceToggle('проектирование')}>
                        <input type="checkbox" checked={quizData.services.includes('проектирование')} readOnly className="w-5 h-5" />
                        <Label className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Проектирование</div>
                          <div className="text-xs text-muted-foreground">(разработка КМ и КМД чертежей)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleServiceToggle('доставка')}>
                        <input type="checkbox" checked={quizData.services.includes('доставка')} readOnly className="w-5 h-5" />
                        <Label className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Доставка</div>
                          <div className="text-xs text-muted-foreground">(транспортировка до Вашего объекта)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleServiceToggle('монтаж')}>
                        <input type="checkbox" checked={quizData.services.includes('монтаж')} readOnly className="w-5 h-5" />
                        <Label className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Монтаж</div>
                          <div className="text-xs text-muted-foreground">(профессиональная сборка на месте)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleServiceToggle('полный')}>
                        <input type="checkbox" checked={quizData.services.includes('полный')} readOnly className="w-5 h-5" />
                        <Label className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Полный цикл</div>
                          <div className="text-xs text-muted-foreground">(проектирование, изготовление, доставка и монтаж)</div>
                        </Label>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">*Отметьте один или несколько вариантов</p>
                    <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src="https://cdn.poehali.dev/files/b6b780d9-3b7f-42d3-af9d-5b721bdb61fd.jpg"
                            alt="Владислав"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground font-semibold mb-1">Владислав</p>
                          <p className="text-xs text-muted-foreground mb-2">Менеджер</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-medium">Чтобы мы могли сформировать для вас комплексное предложение, отметьте, какие этапы работ взять на себя нам.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizStep === 3 && isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Укажите ориентировочные сроки</Label>
                    <RadioGroup value={quizData.deadline}>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'срочно')}>
                        <RadioGroupItem value="срочно" id="срочно" />
                        <Label htmlFor="срочно" className="cursor-pointer flex-1">
                          <div className="font-semibold">Срочно (24-48 часов)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'гибкие')}>
                        <RadioGroupItem value="гибкие" id="гибкие" />
                        <Label htmlFor="гибкие" className="cursor-pointer flex-1">
                          <div className="font-semibold">Гибкие сроки</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'стандарт')}>
                        <RadioGroupItem value="стандарт" id="стандарт" />
                        <Label htmlFor="стандарт" className="cursor-pointer flex-1">
                          <div className="font-semibold">Стандартные (3-7 дней)</div>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src="https://cdn.poehali.dev/files/b6b780d9-3b7f-42d3-af9d-5b721bdb61fd.jpg"
                            alt="Владислав"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground font-semibold mb-1">Владислав</p>
                          <p className="text-xs text-muted-foreground mb-2">Менеджер</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-medium">Понимаю, что сроки — это важно!</span> Укажите ваш ориентир, и я сразу уточню дату исполнения заказа под ваш график.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizStep === 4 && !isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Укажите ориентировочные сроки</Label>
                    <RadioGroup value={quizData.deadline}>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'срочно')}>
                        <RadioGroupItem value="срочно" id="срочно-prod" />
                        <Label htmlFor="срочно-prod" className="cursor-pointer flex-1">
                          <div className="font-semibold">Срочно (24-48 часов)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'гибкие')}>
                        <RadioGroupItem value="гибкие" id="гибкие-prod" />
                        <Label htmlFor="гибкие-prod" className="cursor-pointer flex-1">
                          <div className="font-semibold">Гибкие сроки</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'стандарт')}>
                        <RadioGroupItem value="стандарт" id="стандарт-prod" />
                        <Label htmlFor="стандарт-prod" className="cursor-pointer flex-1">
                          <div className="font-semibold">Стандартные (3-7 дней)</div>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src="https://cdn.poehali.dev/files/edited_image_20251215102416.png"
                            alt="Владислав"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground font-semibold mb-1">Владислав</p>
                          <p className="text-xs text-muted-foreground mb-2">Менеджер</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-medium">Понимаю, что сроки — это важно!</span> Укажите ваш ориентир, и я сразу уточню дату исполнения заказа под ваш график.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {((quizStep === 5 && !isWeldingFlow) || (quizStep === 4 && isWeldingFlow)) && (
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold">Оставьте контакты для связи</h3>
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="name" className="text-sm mb-1.5 block">Ваше имя</Label>
                          <Input 
                            id="name"
                            placeholder="Иван"
                            value={quizData.name}
                            onChange={(e) => setQuizData({...quizData, name: e.target.value})}
                            className="h-11"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm mb-1.5 block">Ваш телефон</Label>
                          <Input 
                            id="phone"
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={quizData.phone}
                            onChange={(e) => setQuizData({...quizData, phone: e.target.value})}
                            className="h-11"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm mb-1.5 block">Комментарий</Label>
                        <Input 
                          id="email"
                          placeholder="Дополнительная информация о проекте"
                          value={quizData.email}
                          onChange={(e) => setQuizData({...quizData, email: e.target.value})}
                          className="h-11"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <Label htmlFor="files" className="text-sm block mb-1">Прикрепить ТЗ или чертеж</Label>
                            <p className="text-xs text-muted-foreground">Любой формат (не более 10)</p>
                          </div>
                          <Button variant="outline" size="sm" className="flex-shrink-0" onClick={() => document.getElementById('file-upload')?.click()}>
                            <Icon name="Upload" size={16} className="mr-2" />
                            Выбрать файлы
                          </Button>
                          <input 
                            id="file-upload"
                            type="file" 
                            multiple 
                            accept="*/*"
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              const currentFilesCount = quizData.files.length;
                              
                              if (currentFilesCount + files.length > 10) {
                                toast.error('Максимум 10 файлов');
                                return;
                              }
                              
                              setQuizData({...quizData, files: [...quizData.files, ...files]});
                              toast.success(`Прикреплено файлов: ${files.length}`);
                              
                              if (e.target) {
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                        {quizData.files.length > 0 && (
                          <div className="space-y-2">
                            {quizData.files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-lg border border-border/50">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <Icon name="File" size={16} className="text-primary flex-shrink-0" />
                                  <span className="text-sm text-foreground truncate">{file.name}</span>
                                  <span className="text-xs text-muted-foreground flex-shrink-0">({Math.round(file.size / 1024)} КБ)</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0 flex-shrink-0"
                                  onClick={() => {
                                    const newFiles = quizData.files.filter((_, i) => i !== index);
                                    setQuizData({...quizData, files: newFiles});
                                    toast.success('Файл удалён');
                                  }}
                                >
                                  <Icon name="X" size={14} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                          <img 
                            src="https://cdn.poehali.dev/files/b6b780d9-3b7f-42d3-af9d-5b721bdb61fd.jpg"
                            alt="Владислав"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground font-semibold mb-1">Владислав</p>
                          <p className="text-xs text-muted-foreground mb-2">Менеджер</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-medium">Файлы можно не прикреплять</span> — мы сможем все уточнить в ходе беседы. Однако, если у вас есть эскизы, ТЗ или чертежи — их наличие <span className="text-foreground font-medium">существенно ускорит</span> процесс обработки заявки.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizStep === totalSteps - 1 && (
                  <p className="text-xs text-muted-foreground text-center mb-4">
                    Нажимая на кнопку "Отправить", вы соглашаетесь с{' '}
                    <a href="/personal-data" className="text-primary hover:underline">
                      Политикой обработки персональных данных
                    </a>
                  </p>
                )}
                <div className="flex gap-4">
                  {quizStep > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setQuizStep(quizStep - 1)}
                      className="flex-1"
                    >
                      Назад
                    </Button>
                  )}
                  <Button 
                    onClick={handleQuizNext}
                    disabled={
                      (quizStep === 0 && !quizData.type) ||
                      (quizStep === 1 && !isWeldingFlow && !quizData.material) ||
                      (quizStep === 1 && isWeldingFlow && !quizData.weldingType) ||
                      (quizStep === 2 && !isWeldingFlow && !quizData.complexity) ||
                      (quizStep === 3 && !isWeldingFlow && quizData.services.length === 0) ||
                      (quizStep === 4 && !isWeldingFlow && !quizData.deadline) ||
                      (quizStep === 3 && isWeldingFlow && !quizData.deadline) ||
                      (quizStep === 5 && !isWeldingFlow && (!quizData.name || !quizData.phone)) ||
                      (quizStep === 4 && isWeldingFlow && (!quizData.name || !quizData.phone))
                    }
                    className="flex-1 metal-shine"
                  >
                    {quizStep === totalSteps - 1 ? 'Отправить' : 'Далее'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Наши преимущества
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1 - Top Left (2 cols wide) */}
            <div className="sm:col-span-2 group relative overflow-hidden rounded-2xl h-64 sm:h-80 animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/files/Construction manager for metal buildings.jpg"
                alt="Надежный партнер"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  Вы получаете надежного партнера
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-normal">
                  Опытные инженеры и сварщики гарантируют качество
                </p>
              </div>
            </div>

            {/* Card 2 - Top Right (1 col) */}
            <div className="group relative overflow-hidden rounded-2xl h-64 sm:h-80 bg-[#527a94] animate-scale-in" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="absolute inset-0 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                  Вы экономите время и ресурсы
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-100 leading-tight sm:leading-normal">
                  Мы берем на себя все задачи "под ключ"
                </p>
              </div>
            </div>

            {/* Card 3 - Top Far Right (1 col) */}
            <div className="group relative overflow-hidden rounded-2xl h-64 sm:h-80 bg-[#446580] animate-scale-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="absolute inset-0 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                  Вы застрахованы от ошибок
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-100 leading-tight sm:leading-normal">
                  Наш многолетний опыт — Ваша уверенность
                </p>
              </div>
            </div>

            {/* Card 4 - Bottom Left (1 col) */}
            <div className="group relative overflow-hidden rounded-2xl h-64 sm:h-80 animate-scale-in" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
              <img 
                src="https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/f2e393da-c868-40e8-91d5-db3c39afe690.jpg"
                alt="Выгода"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  Вы получаете выгоду
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-normal">
                  Оптимальные решения и конкурентные цены
                </p>
              </div>
            </div>

            {/* Card 5 - Bottom Right (3 cols wide) */}
            <div className="sm:col-span-2 md:col-span-3 group relative overflow-hidden rounded-2xl h-64 sm:h-80 animate-scale-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
              <img 
                src="https://cdn.poehali.dev/files/x.jpg"
                alt="Современное производство"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  Собственное современное производство
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-normal">
                  Полный контроль над сроками и качеством
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 px-4 metal-texture">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Наши услуги
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group animate-scale-in" style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 leading-tight">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-tight">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - kept here for navigation anchor */}
      <section id="quiz"></section>

      {/* Welding Services Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden relative">
        {/* Креативный элемент - декоративные искры */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left: Сварка металлоконструкций */}
            <div className="relative group flex">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl flex flex-col w-full">
                <div className="relative h-[550px] sm:h-[600px]">
                  <img 
                    src="https://cdn.poehali.dev/files/а.jpg"
                    alt="Сварка металлоконструкций"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20"></div>
                  
                  {/* Креативный элемент - диагональная полоса */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent transform rotate-45 translate-x-16 -translate-y-16"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 pt-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/30 backdrop-blur-md border border-primary/40 self-start">
                      <Icon name="Flame" size={16} className="text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                        Сварка металлоконструкций
                      </h3>
                      <p className="text-base text-gray-200 font-medium leading-relaxed mb-5">
                        Полный цикл изготовления металлоконструкций на производстве. От простых изделий до сложных промышленных конструкций.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="Building2" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">Каркасы зданий</p>
                        </div>
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="Layers" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">Антресольные этажи</p>
                        </div>
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="Home" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">Навесы и козырьки</p>
                        </div>
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="Fence" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">Заборы и ограждения</p>
                        </div>
                      </div>

                      <Button size="lg" className="w-full metal-shine text-base px-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        <Icon name="MessageSquare" size={18} className="mr-2" />
                        Получить расчёт
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Выездные сварочные работы */}
            <div className="relative group flex">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl flex flex-col w-full">
                <div className="relative h-[550px] sm:h-[600px]">
                  <img 
                    src="https://cdn.poehali.dev/files/5.jpg"
                    alt="Выездные сварочные работы"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20"></div>
                  
                  {/* Креативный элемент - искра сварки */}
                  <div className="absolute top-10 right-10 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                  <div className="absolute top-10 right-10 w-3 h-3 bg-primary rounded-full"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 pt-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/30 backdrop-blur-md border border-primary/40 self-start">
                      <Icon name="Sparkles" size={16} className="text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                        Выездные сварочные работы
                      </h3>
                      <p className="text-base text-gray-200 font-medium leading-relaxed mb-5">
                        Профессиональная аргонодуговая сварка с выездом на ваш объект. Работаем со всеми типами металлов круглосуточно.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="Clock" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">Быстрый выезд</p>
                        </div>
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="Zap" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">24/7 доступность</p>
                        </div>
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="ShieldCheck" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">Все типы сварки</p>
                        </div>
                        <div className="flex items-start gap-2 text-white">
                          <div className="w-9 h-9 rounded-lg bg-primary/30 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Icon name="MapPin" size={18} className="text-white" />
                          </div>
                          <p className="font-bold text-sm leading-tight mt-1">Москва и МО</p>
                        </div>
                      </div>

                      <Button size="lg" className="w-full metal-shine text-base px-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        <Icon name="Phone" size={18} className="mr-2" />
                        Вызвать сварщика
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Carousel */}
      <section id="gallery" className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Наши работы
          </h2>
          <p className="text-center text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12">
            Проекты, которыми мы гордимся
          </p>
          
          <div className="relative max-w-[1400px] mx-auto">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={galleryRef}>
              <div 
                className="flex items-center gap-4 sm:gap-8 transition-transform duration-700 ease-in-out py-6 sm:py-8"
                style={{
                  transform: isMobile
                    ? `translateX(calc(50vw - ${currentGalleryIndex * (85 + 1.5)}vw - 42.5vw))` 
                    : `translateX(calc(50% - ${currentGalleryIndex * 632}px - 300px))`
                }}
              >
                {gallery.map((item, index) => {
                  const offset = index - currentGalleryIndex;
                  const isCenter = offset === 0;
                  const isNear = Math.abs(offset) === 1;
                  
                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentGalleryIndex(index)}
                      className={`relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
                        isCenter 
                          ? 'w-[85vw] max-w-[400px] h-[350px] sm:w-[600px] sm:h-[400px] sm:max-w-[600px] scale-100 sm:scale-105 z-30 shadow-2xl' 
                          : isNear 
                          ? 'w-[85vw] max-w-[400px] h-[350px] sm:w-[600px] sm:h-[400px] sm:max-w-[600px] scale-90 z-20 opacity-40' 
                          : 'w-[85vw] max-w-[400px] h-[350px] sm:w-[600px] sm:h-[400px] sm:max-w-[600px] scale-75 z-10 opacity-20'
                      }`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                        isCenter ? 'opacity-0' : 'opacity-70'
                      }`}></div>
                      {isCenter && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex items-end">
                          <div className="p-5 sm:p-6 md:p-8 w-full">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                            <div className="h-1 w-20 bg-primary rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation Buttons - Always visible on all screens */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur border-primary/50 hover:bg-primary hover:border-primary shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setCurrentGalleryIndex(Math.max(0, currentGalleryIndex - 1))}
              disabled={currentGalleryIndex === 0}
            >
              <Icon name="ChevronLeft" size={22} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur border-primary/50 hover:bg-primary hover:border-primary shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setCurrentGalleryIndex(Math.min(gallery.length - 1, currentGalleryIndex + 1))}
              disabled={currentGalleryIndex === gallery.length - 1}
            >
              <Icon name="ChevronRight" size={22} />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentGalleryIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2.5'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              Что говорят наши <span className="text-primary">клиенты</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Более 500 успешных проектов и довольных заказчиков
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Testimonial 1 */}
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  Заказывали металлокаркас для склада. Работу выполнили качественно и в срок. Особенно порадовала оперативность менеджеров.
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    АС
                  </div>
                  <div>
                    <p className="font-bold text-xs text-foreground">Алексей Смирнов</p>
                    <p className="text-[10px] text-muted-foreground">ООО "СтройТехМонтаж"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  Выездная сварка — настоящее спасение! Приехали в течение 3 часов. Работают аккуратно, профессионально. Рекомендую!
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    МК
                  </div>
                  <div>
                    <p className="font-bold text-xs text-foreground">Марина Королёва</p>
                    <p className="text-[10px] text-muted-foreground">ИП Королёва М.В.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  Делали антресольный этаж на производстве. Проект сложный, но ребята справились на отлично. Качество на высоте.
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    ДП
                  </div>
                  <div>
                    <p className="font-bold text-xs text-foreground">Дмитрий Петров</p>
                    <p className="text-[10px] text-muted-foreground">Завод "Технопром"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 4 */}
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Заказывали навес для парковки. От замера до монтажа всё прошло гладко. Понравилось, что менеджер всегда держал в курсе, не надо было выпытывать информацию.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    ЕН
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Елена Новикова</p>
                    <p className="text-xs text-muted-foreground">Частный заказчик</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 5 */}
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Сотрудничаем уже второй год. Изготавливают металлоконструкции для наших объектов. Всегда точно в срок, качество стабильное. Надёжные партнёры.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    ИГ
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Игорь Григорьев</p>
                    <p className="text-xs text-muted-foreground">ГК "СтройРесурс"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 6 */}
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Нужна была аргонная сварка нержавейки. Сделали аккуратно, швы ровные. Мастер работал профессионально, объяснял каждый этап. Очень доволен результатом!
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    СВ
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Сергей Волков</p>
                    <p className="text-xs text-muted-foreground">Кафе "Гурман"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 rounded-xl bg-card border border-border/50">
              <div className="text-3xl font-bold text-primary mb-1">98%</div>
              <p className="text-xs text-muted-foreground">Повторных обращений</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border/50">
              <div className="text-3xl font-bold text-primary mb-1">4.9</div>
              <p className="text-xs text-muted-foreground">Средняя оценка</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border/50">
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <p className="text-xs text-muted-foreground">Довольных клиентов</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border/50">
              <div className="text-3xl font-bold text-primary mb-1">10</div>
              <p className="text-xs text-muted-foreground">Лет на рынке</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Creative Block */}
      <section className="py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">
                  Почему <span className="text-primary">Основа</span>?
                </h2>
                <p className="text-base sm:text-xl text-muted-foreground">
                  Мы не просто выполняем заказы — мы создаём надёжность
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Feature 1 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <Card className="relative border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon name="Award" size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">10+ лет опыта</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Сотни успешно реализованных проектов любой сложности
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Промышленные объекты</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Коммерческая недвижимость</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Частное строительство</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Feature 2 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <Card className="relative border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon name="Shield" size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Гарантия качества</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Строгий контроль на каждом этапе производства
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Сертифицированные материалы</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Аттестованные сварщики</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Гарантия до 5 лет</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Feature 3 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <Card className="relative border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon name="Zap" size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Скорость + точность</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Современное оборудование и отлаженные процессы
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Станки с ЧПУ</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Срочное производство</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Соблюдение сроков 99%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Stats Section */}
              <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Завершённых проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-5xl font-bold text-primary mb-2">10</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-5xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-5xl font-bold text-primary mb-2">с 9 до 21</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Техподдержка</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section - Horizontal Timeline */}
      <section className="py-12 sm:py-16 px-4 metal-texture relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
              Этапы <span className="text-primary">работы</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              От первого звонка до сдачи объекта
            </p>
          </div>
          
          {/* Horizontal Timeline for Desktop */}
          <div className="hidden lg:block relative">
            {/* Horizontal line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
            
            <div className="grid grid-cols-6 gap-4">
              {works.map((work, index) => {
                const icons: ('Phone' | 'FileText' | 'Factory' | 'Truck' | 'CheckCircle2' | 'Star')[] = ['Phone', 'FileText', 'Factory', 'Truck', 'CheckCircle2', 'Star'];
                
                return (
                  <div key={index} className="relative group">
                    {/* Icon Circle */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon name={icons[index]} size={24} className="text-white" />
                        </div>
                        <div className="absolute -inset-2 rounded-full bg-primary/20 blur-lg group-hover:bg-primary/30 transition-colors"></div>
                        {/* Step number badge */}
                        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-sm font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                        {work.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                    
                    {/* Connecting line */}
                    {index < works.length - 1 && (
                      <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-0.5 bg-transparent"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile/Tablet View */}
          <div className="lg:hidden space-y-8">
            {works.map((work, index) => {
              const icons: ('Phone' | 'FileText' | 'Factory' | 'Truck' | 'CheckCircle2' | 'Star')[] = ['Phone', 'FileText', 'Factory', 'Truck', 'CheckCircle2', 'Star'];
              
              return (
                <div key={index} className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20"></div>
                  
                  <div className="ml-12 relative">
                    <div className="absolute -left-14 top-0">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                          <Icon name={icons[index]} size={20} className="text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {work.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {work.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Заказать звонок
          </h2>
          <p className="text-center text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12">
            Оставьте заявку и мы свяжемся с вами в ближайшее время
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Form */}
            <Card className="border-border/50 shadow-xl h-full">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <form onSubmit={handleCallRequest} className="space-y-6 flex-1 flex flex-col">
                  <div>
                    <Label htmlFor="contact-name" className="text-base">Ваше имя</Label>
                    <Input id="contact-name" name="contact-name" placeholder="Иван Иванов" required className="h-12 text-base mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone" className="text-base">Телефон</Label>
                    <Input id="contact-phone" name="contact-phone" type="tel" placeholder="+7 (999) 123-45-67" required className="h-12 text-base mt-2" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="contact-message" className="text-base">Сообщение (необязательно)</Label>
                    <Input id="contact-message" name="contact-message" placeholder="Опишите ваш проект" className="h-12 text-base mt-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Нажимая на кнопку "Отправить заявку", вы соглашаетесь с{' '}
                    <a href="/personal-data" className="text-primary hover:underline">
                      Политикой обработки персональных данных
                    </a>
                  </p>
                  <Button type="submit" className="w-full metal-shine h-12 text-base mt-auto">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Manager Card */}
            <Card className="border-border/50 overflow-hidden h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-56 sm:h-72 overflow-hidden flex-shrink-0">
                  <img 
                    src="https://cdn.poehali.dev/files/фото менеджера.jpg"
                    alt="Вероника - Менеджер"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <p className="text-white font-bold text-lg sm:text-xl mb-1">Вероника</p>
                    <p className="text-gray-300 text-xs sm:text-sm">Менеджер по работе с клиентами</p>
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-card flex-1 flex flex-col justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name="Clock" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Быстрая обработка заявок</p>
                        <p className="text-sm text-muted-foreground">Свяжемся с вами в течение 15 минут в рабочее время</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name="CheckCircle2" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Бесплатная консультация</p>
                        <p className="text-sm text-muted-foreground">Ответим на все вопросы и поможем с выбором</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Messenger Buttons */}
                  <div className="flex gap-3 justify-center mt-4 pt-4 border-t border-border/50">
                    <Button 
                      size="icon"
                      className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90"
                      onClick={() => window.open('https://wa.me/79773804500', '_blank')}
                    >
                      <Icon name="MessageCircle" size={24} className="text-white" />
                    </Button>
                    <Button 
                      size="icon"
                      className="w-14 h-14 rounded-full bg-[#0088cc] hover:bg-[#0088cc]/90"
                      onClick={() => window.open('https://t.me/Ivan_517', '_blank')}
                    >
                      <Icon name="Send" size={24} className="text-white" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 sm:py-6 px-4 border-t border-border/50 metal-texture">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/лого5.png" 
                  alt="Основа" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-muted-foreground mb-4">
                Производство металлоконструкций и выездная сварка. Более 10 лет на рынке.
              </p>
            </div>
            
            {/* Contacts */}
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <div className="space-y-3">
                <a href="tel:+74998403312" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Phone" size={18} />
                  <span>+7(499)840-33-12</span>
                </a>
                <a href="mailto:info@metallprom.ru" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Mail" size={18} />
                  <span>osnova-steel@mail.ru</span>
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={18} />
                  <span>г. Москва, Егорьевский проезд 35</span>
                </div>
              </div>
            </div>
            
            {/* Messengers - Compact Icons */}
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
            <p>© 2025 Основа. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Assistant Widget */}
      <Assistant />

      {/* Cookie Notice */}
      {showCookieNotice && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300">
          <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Icon name="Cookie" size={24} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Мы используем cookies для улучшения работы сайта и персонализации сервиса. Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                <a href="/privacy" className="text-primary hover:underline">политикой конфиденциальности</a>.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCookieNotice(false)}
                className="whitespace-nowrap"
              >
                Отклонить
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptCookies}
                className="whitespace-nowrap"
              >
                Принять
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;