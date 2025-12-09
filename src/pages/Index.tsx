import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Assistant from '@/components/Assistant';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import QuizSection from '@/components/sections/QuizSection';
import Footer from '@/components/sections/Footer';

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
  
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(2);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuizTransitioning, setIsQuizTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  const isWeldingFlow = quizData.type === 'выездная';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const totalSteps = isWeldingFlow ? 5 : 6;

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
    
    setTimeout(() => {
      if (quizStep < totalSteps - 1) {
        setQuizStep(quizStep + 1);
        setIsQuizTransitioning(false);
        
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
    { title: 'Металлоконструкции', description: 'Металлоконструкции', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/491e11c5-2b4e-49a1-8541-44600cef5812.jpg' },
    { title: 'Ограждения', description: 'Заборы, перила, барьеры', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/f3cf71ee-dcce-4504-b474-a49ebbf19770.jpg' },
    { title: 'Антресольные этажи', description: 'Изготовление под ключ', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/f90cb058-f64b-4847-963d-61b80ab0b3ef.jpg' },
    { title: 'Конструкции для дачи', description: 'Беседки, навесы, козырьки', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/615adba9-d99b-48eb-8826-bee065ce039b.jpg' },
    { title: 'Выездные сварочные работы', description: 'Профессиональная аргонодуговая сварка', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/8ffb09ce-dc74-4edf-9227-4dc0c10d3fcb.jpg' },
    { title: 'Порошковая покраска', description: 'Прочное и долговечное покрытие', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/0fc0183d-d180-4cb6-ac18-804254b3eea1.jpg' }
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
    { title: 'Металлокаркас производственного цеха', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/0696cc2a-f54c-4a1f-8c07-49f706517e2e.jpg' },
    { title: 'Ангар для сельхозтехники', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/869a3b03-68bd-4f14-8749-fc9c26d0f50f.jpg' },
    { title: 'Металлическая лестница на второй этаж', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/2a5a9fe8-27fe-4f4e-8ba0-c55d15bb6397.jpg' },
    { title: 'Навес для автомобилей', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/456f9748-2124-461d-b788-a1a259553f2c.jpg' },
    { title: 'Ограждение промышленной территории', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/f526d998-8af1-469f-b8b4-f0c04f84f2f6.jpg' },
    { title: 'Нестандартная металлоконструкция', image: 'https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/d9095538-0347-4d00-9caa-1edf9ced5a80.jpg' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <HeroSection parallaxOffset={parallaxOffset} />

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

          <QuizSection
            quizStep={quizStep}
            quizData={quizData}
            setQuizData={setQuizData}
            totalSteps={totalSteps}
            isWeldingFlow={isWeldingFlow}
            isQuizTransitioning={isQuizTransitioning}
            quizRef={quizRef}
            handleRadioSelect={handleRadioSelect}
            handleServiceToggle={handleServiceToggle}
            handleWeldingServiceToggle={handleWeldingServiceToggle}
            handleQuizNext={handleQuizNext}
            setQuizStep={setQuizStep}
          />
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Почему Основа?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <Card className="metal-texture border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Award" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Опыт и надежность</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Более 10 лет успешной работы на рынке металлоконструкций. 500+ реализованных проектов различной сложности.
                </p>
              </CardContent>
            </Card>

            <Card className="metal-texture border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Гарантия качества</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Строгий контроль на каждом этапе производства. Гарантийное обслуживание и техническая поддержка.
                </p>
              </CardContent>
            </Card>

            <Card className="metal-texture border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Современное оборудование</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Высокоточное оборудование для резки, сварки и обработки металла. Производство полного цикла.
                </p>
              </CardContent>
            </Card>

            <Card className="metal-texture border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Соблюдение сроков</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Четкое планирование и организация работ. Выполняем проекты в установленные сроки без задержек.
                </p>
              </CardContent>
            </Card>

            <Card className="metal-texture border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Профессиональная команда</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Квалифицированные сварщики и инженеры с многолетним опытом. Регулярное повышение квалификации.
                </p>
              </CardContent>
            </Card>

            <Card className="metal-texture border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="TrendingDown" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Оптимальные цены</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Собственное производство без посредников. Гибкая ценовая политика и индивидуальный подход.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Наши услуги
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{service.description}</p>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <Button className="w-full metal-shine">
                    Подробнее
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Как мы работаем
          </h2>
          <div className="max-w-5xl mx-auto">
            {works.map((work, index) => {
              const icons = ['MessageSquare', 'Calculator', 'Factory', 'Truck', 'Wrench', 'Shield'];
              return (
                <div key={index} className="relative">
                  {index !== works.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-primary/20 hidden md:block"></div>
                  )}
                  <div className="flex gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary relative z-10">
                        <Icon name={icons[index]} size={24} className="text-primary" />
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

      <section id="gallery" className="py-12 sm:py-16 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Наши работы
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="relative" ref={galleryRef}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {gallery.map((item, index) => (
                  <Card 
                    key={index}
                    className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setCurrentGalleryIndex(index)}
                  >
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-semibold text-sm sm:text-base">{item.title}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Заказать звонок
          </h2>
          <p className="text-center text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12">
            Оставьте заявку и мы свяжемся с вами в ближайшее время
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
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
                  <Button type="submit" className="w-full metal-shine h-12 text-base mt-auto">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border/50 overflow-hidden h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-56 sm:h-72 overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=faces,top"
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

      <Footer />

      <Assistant />
    </div>
  );
};

export default Index;