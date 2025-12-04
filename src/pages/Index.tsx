import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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
    files: [] as string[]
  });
  
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(2);
  const galleryRef = useRef<HTMLDivElement>(null);

  const isWeldingFlow = quizData.type === 'выездная';
  const totalSteps = isWeldingFlow ? 5 : 6;

  const handleQuizNext = () => {
    if (quizStep < totalSteps - 1) {
      setQuizStep(quizStep + 1);
    } else {
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
        files: []
      });
    }
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

  const handleCallRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка принята! Мы свяжемся с вами в ближайшее время.');
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
      {/* Header */}
      <header className="sticky top-0 z-50 metal-texture border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Hammer" size={32} className="text-primary" />
            <span className="text-2xl font-bold">Основа</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="hover:text-primary transition-colors">О компании</a>
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#quiz" className="hover:text-primary transition-colors">Расчет</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Галерея</a>
            <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="metal-shine">
            <Icon name="Phone" size={18} className="mr-2" />
            +7 (999) 123-45-67
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left Side - Metal Texture Background */}
          <div className="flex-1 metal-texture relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-primary/10"></div>
          </div>
          
          {/* Right Side - Image */}
          <div className="flex-1 relative">
            <img 
              src="https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/4ea4c64f-c726-4453-8227-e4d18ec3d3a9.jpg"
              alt="Металлоконструкции"
              className="w-full h-full object-cover"
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
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-slide-right">
                Производство<br />
                <span className="text-primary">Металлоконструкций</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-slide-right" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                Профессиональная сварка и монтаж любой сложности
              </p>
              <div className="flex gap-4 flex-wrap animate-scale-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
                <Button size="lg" className="metal-shine text-lg px-8">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-white">
                  <Icon name="Phone" size={20} className="mr-2" />
                  +7(499)840-33-12
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-6 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                  onClick={() => window.open('https://wa.me/79773804500', '_blank')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-6 border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc] hover:text-white"
                  onClick={() => window.open('https://t.me/Ivan_517', '_blank')}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
            О компании
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-up">
              <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
                <span className="text-primary font-bold">Основа</span> — это команда профессионалов с более чем 15-летним опытом в производстве металлоконструкций и выездной сварке.
              </p>
              <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
                Мы специализируемся на изготовлении металлокаркасов зданий, ангаров, навесов, лестниц, ограждений и нестандартных металлических изделий любой сложности.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Современное оборудование, квалифицированные сварщики и контроль качества на каждом этапе гарантируют надежность наших конструкций.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="metal-texture border-border/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-sm text-muted-foreground">лет опыта</p>
                </CardContent>
              </Card>
              <Card className="metal-texture border-border/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">проектов</p>
                </CardContent>
              </Card>
              <Card className="metal-texture border-border/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground">выездная сварка</p>
                </CardContent>
              </Card>
              <Card className="metal-texture border-border/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">гарантия качества</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Director Comment */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="metal-texture border-primary/30 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src="https://cdn.poehali.dev/files/bcaf8d50-0a16-4cce-b05d-e7cf807bcd02.jpg"
                        alt="Михаил Соколов"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Icon name="Quote" size={32} className="text-primary/50 mb-4" />
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
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
                        <span className="text-muted-foreground"><span className="text-foreground font-medium">Поддержка:</span> Проектирование (КМ/КМД), доставка и антикоррозийная обработка.</span>
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
          <div className="mt-16">
            <div className="mb-12 metal-texture border border-border/50 rounded-lg p-8">
              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Расчет стоимости металлоконструкций
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Ответьте на несколько вопросов и получите точный расчет стоимости вашего проекта с учетом всех особенностей и требований
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0" />
                      <span className="text-foreground">Пройдите короткий опрос</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0" />
                      <span className="text-foreground">Заполните основные параметры</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0" />
                      <span className="text-foreground">Укажите ключевые данные</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg mx-auto mb-3">
                    <img 
                      src="https://cdn.poehali.dev/files/b6b780d9-3b7f-42d3-af9d-5b721bdb61fd.jpg"
                      alt="Владислав"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-foreground font-semibold">Владислав</p>
                  <p className="text-sm text-muted-foreground">менеджер по продажам</p>
                </div>
              </div>
            </div>
            
            <Card className="metal-texture border-border/50">
              <CardHeader>
                <CardTitle>Шаг {quizStep + 1} из {totalSteps}</CardTitle>
                <div className="mt-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {quizStep === 0 && (
                  <div className="space-y-4">
                    <Label className="text-lg">Какой тип конструкции вам нужен?</Label>
                    <RadioGroup value={quizData.type} onValueChange={(value) => setQuizData({...quizData, type: value})}>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, type: 'каркас'})}>
                        <RadioGroupItem value="каркас" id="каркас" className="mt-1" />
                        <Label htmlFor="каркас" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Каркас здания</div>
                          <div className="text-sm text-muted-foreground">промышленные цеха, склады, торговые центры, ангары</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, type: 'антресоль'})}>
                        <RadioGroupItem value="антресоль" id="антресоль" className="mt-1" />
                        <Label htmlFor="антресоль" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Антресольные этажи</div>
                          <div className="text-sm text-muted-foreground">межэтажные перекрытия, технологические площадки, балконы</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, type: 'лестницы'})}>
                        <RadioGroupItem value="лестницы" id="лестницы" className="mt-1" />
                        <Label htmlFor="лестницы" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Лестницы и ограждения</div>
                          <div className="text-sm text-muted-foreground">внутренние и наружные лестницы, перила, поручни</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, type: 'мелкие'})}>
                        <RadioGroupItem value="мелкие" id="мелкие" className="mt-1" />
                        <Label htmlFor="мелкие" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Мелкие конструкции</div>
                          <div className="text-sm text-muted-foreground">козырьки, навесы, стеллажи, индивидуальные изделия</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, type: 'другое'})}>
                        <RadioGroupItem value="другое" id="другое" className="mt-1" />
                        <Label htmlFor="другое" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Другое</div>
                          <div className="text-sm text-muted-foreground">специальные конструкции, нестандартные решения</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, type: 'выездная'})}>
                        <RadioGroupItem value="выездная" id="выездная" className="mt-1" />
                        <Label htmlFor="выездная" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Выездные сварочные работы</div>
                          <div className="text-sm text-muted-foreground">сварка на объекте, ремонт, монтаж конструкций</div>
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
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, material: 'конструкционная'})}>
                        <img src="https://cdn.poehali.dev/files/dbf0f0d2-320e-41f7-8fc4-1303ab8384c4.png" alt="Конструкционная сталь" className="w-full h-32 object-cover rounded mb-3" />
                        <div className="font-semibold mb-2">Конструкционная (черная) сталь</div>
                        {quizData.material === 'конструкционная' && <Icon name="CheckCircle" size={20} className="text-primary" />}
                      </div>
                      <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, material: 'нержавеющая'})}>
                        <img src="https://cdn.poehali.dev/files/dbf0f0d2-320e-41f7-8fc4-1303ab8384c4.png" alt="Нержавеющая сталь" className="w-full h-32 object-cover rounded mb-3" />
                        <div className="font-semibold mb-2">Нержавеющая сталь</div>
                        {quizData.material === 'нержавеющая' && <Icon name="CheckCircle" size={20} className="text-primary" />}
                      </div>
                      <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => setQuizData({...quizData, material: 'цветные'})}>
                        <img src="https://cdn.poehali.dev/files/dbf0f0d2-320e-41f7-8fc4-1303ab8384c4.png" alt="Цветные металлы" className="w-full h-32 object-cover rounded mb-3" />
                        <div className="font-semibold mb-2">Цветные металлы (алюминий и сплавы)</div>
                        {quizData.material === 'цветные' && <Icon name="CheckCircle" size={20} className="text-primary" />}
                      </div>
                    </div>
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
                            <span className="text-foreground font-medium">Чтобы подобрать идеальный тип металла, давайте вместе разберемся:</span>
                            <br/>
                            • <span className="text-foreground font-medium">Конструкционная сталь</span> — лучший выбор для несущих конструкций, каркасов зданий и промышленных объектов. Максимальная прочность по доступной цене.
                            <br/>
                            • <span className="text-foreground font-medium">Нержавеющая сталь</span> — идеальное решение для агрессивных сред, пищевого производства и архитектурных элементов. Не требует дополнительной защиты.
                            <br/>
                            • <span className="text-foreground font-medium">Алюминий и сплавы</span> — оптимален когда важны легкость, коррозионная стойкость и простота монтажа.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizStep === 1 && isWeldingFlow && (
                  <div className="space-y-4">
                    <Label className="text-lg">Какой тип сварки вам нужен?</Label>
                    <RadioGroup value={quizData.weldingType} onValueChange={(value) => setQuizData({...quizData, weldingType: value})}>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="ручная" id="ручная" className="mt-1" />
                        <Label htmlFor="ручная" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Ручная дуговая сварка (MMA)</div>
                          <div className="text-sm text-muted-foreground">универсальный метод для большинства задач</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="полуавтомат" id="полуавтомат" className="mt-1" />
                        <Label htmlFor="полуавтомат" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Полуавтоматическая (MIG/MAG)</div>
                          <div className="text-sm text-muted-foreground">быстрая сварка тонких металлов</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="аргон" id="аргон" className="mt-1" />
                        <Label htmlFor="аргон" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Аргонодуговая (TIG)</div>
                          <div className="text-sm text-muted-foreground">высокоточная сварка нержавейки и алюминия</div>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
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
                    <RadioGroup value={quizData.complexity} onValueChange={(value) => setQuizData({...quizData, complexity: value})}>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="простой" id="простой" />
                        <Label htmlFor="простой" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Простой (типовые решения, стандартные чертежи)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="средний" id="средний" />
                        <Label htmlFor="средний" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Средний (адаптация типовых решений, индивидуальные размеры)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="сложный" id="сложный" />
                        <Label htmlFor="сложный" className="cursor-pointer flex-1">
                          <div className="font-semibold mb-1">Сложный (индивидуальное проектирование, сложные расчеты)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
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
                    <RadioGroup value={quizData.deadline} onValueChange={(value) => setQuizData({...quizData, deadline: value})}>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="срочно" id="срочно" />
                        <Label htmlFor="срочно" className="cursor-pointer flex-1">
                          <div className="font-semibold">Срочно (24-48 часов)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="гибкие" id="гибкие" />
                        <Label htmlFor="гибкие" className="cursor-pointer flex-1">
                          <div className="font-semibold">Гибкие сроки</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
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
                    <RadioGroup value={quizData.deadline} onValueChange={(value) => setQuizData({...quizData, deadline: value})}>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="срочно" id="срочно-prod" />
                        <Label htmlFor="срочно-prod" className="cursor-pointer flex-1">
                          <div className="font-semibold">Срочно (24-48 часов)</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
                        <RadioGroupItem value="гибкие" id="гибкие-prod" />
                        <Label htmlFor="гибкие-prod" className="cursor-pointer flex-1">
                          <div className="font-semibold">Гибкие сроки</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors">
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

                {((quizStep === 5 && !isWeldingFlow) || (quizStep === 4 && isWeldingFlow)) && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Оставьте контакты для связи</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-base mb-2 block">Ваше имя</Label>
                        <Input 
                          id="name"
                          placeholder="Иван"
                          value={quizData.name}
                          onChange={(e) => setQuizData({...quizData, name: e.target.value})}
                          className="text-lg p-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-base mb-2 block">Ваш телефон</Label>
                        <Input 
                          id="phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={quizData.phone}
                          onChange={(e) => setQuizData({...quizData, phone: e.target.value})}
                          className="text-lg p-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base mb-2 block">Ваш email</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="example@mail.ru"
                          value={quizData.email}
                          onChange={(e) => setQuizData({...quizData, email: e.target.value})}
                          className="text-lg p-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="files" className="text-base mb-2 block">Прикрепить ТЗ или чертеж</Label>
                        <p className="text-sm text-muted-foreground mb-2">Любой формат (не более 10)</p>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                          <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Нажмите для загрузки файлов</p>
                        </div>
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
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Наши преимущества
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Card 1 - Top Left (2 cols wide) */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-2xl h-80 animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/4e7663e3-7955-426e-af78-f7af02052a0a.jpg"
                alt="Надежный партнер"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Вы получаете надежного партнера
                </h3>
                <p className="text-gray-200 text-lg">
                  Опытные инженеры и сварщики гарантируют качество и точное соответствие чертежам.
                </p>
              </div>
            </div>

            {/* Card 2 - Top Right (1 col) */}
            <div className="group relative overflow-hidden rounded-2xl h-80 bg-[#527a94] animate-scale-in" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="absolute inset-0 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Вы экономите время и ресурсы
                </h3>
                <p className="text-gray-100">
                  Мы берем на себя все задачи "под ключ" — от проектирования до монтажа.
                </p>
              </div>
            </div>

            {/* Card 3 - Top Far Right (1 col) */}
            <div className="group relative overflow-hidden rounded-2xl h-80 bg-[#446580] animate-scale-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="absolute inset-0 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Вы застрахованы от ошибок
                </h3>
                <p className="text-gray-100">
                  Наш многолетний опыт — это Ваша уверенность в успехе проекта.
                </p>
              </div>
            </div>

            {/* Card 4 - Bottom Left (1 col) */}
            <div className="group relative overflow-hidden rounded-2xl h-80 animate-scale-in" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
              <img 
                src="https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/f2e393da-c868-40e8-91d5-db3c39afe690.jpg"
                alt="Выгода"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Вы получаете выгоду
                </h3>
                <p className="text-gray-200 text-lg">
                  Оптимальные решения и конкурентные цены за счет грамотного проектирования.
                </p>
              </div>
            </div>

            {/* Card 5 - Bottom Right (3 cols wide) */}
            <div className="md:col-span-3 group relative overflow-hidden rounded-2xl h-80 animate-scale-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
              <img 
                src="https://cdn.poehali.dev/projects/cbf1034a-431b-4f0d-b734-d7ed016f4fe3/files/e4bdbcad-4666-434e-8bdd-e0c70943b60e.jpg"
                alt="Современное производство"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Собственное современное производство
                </h3>
                <p className="text-gray-200 text-lg">
                  Полный контроль над сроками и качеством на всех этапах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 metal-texture">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Наши услуги
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group animate-scale-in" style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-300">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - kept here for navigation anchor */}
      <section id="quiz"></section>

      {/* Gallery Section - Carousel */}
      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Наши работы
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Проекты, которыми мы гордимся
          </p>
          
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={galleryRef}>
              <div 
                className="flex items-center justify-start gap-8 transition-transform duration-700 ease-out py-8 px-[50%]"
                style={{
                  transform: `translateX(-${currentGalleryIndex * (600 + 32)}px)`
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
                      className={`relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                        isCenter 
                          ? 'w-[600px] h-[400px] scale-100 z-30 shadow-2xl' 
                          : isNear 
                          ? 'w-[450px] h-[320px] scale-95 z-20 opacity-50' 
                          : 'w-[350px] h-[260px] scale-90 z-10 opacity-25'
                      }`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                        isCenter ? 'opacity-0' : 'opacity-60'
                      }`}></div>
                      {isCenter && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end">
                          <div className="p-8 w-full">
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <div className="h-1 w-20 bg-primary rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-background/80 backdrop-blur border-primary/50 hover:bg-primary hover:border-primary"
              onClick={() => setCurrentGalleryIndex(Math.max(0, currentGalleryIndex - 1))}
              disabled={currentGalleryIndex === 0}
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-background/80 backdrop-blur border-primary/50 hover:bg-primary hover:border-primary"
              onClick={() => setCurrentGalleryIndex(Math.min(gallery.length - 1, currentGalleryIndex + 1))}
              disabled={currentGalleryIndex === gallery.length - 1}
            >
              <Icon name="ChevronRight" size={24} />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentGalleryIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Creative Block */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-4">
                  Почему <span className="text-primary">Основа</span>?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Мы не просто выполняем заказы — мы создаём надёжность
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <Card className="relative border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon name="Award" size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">15+ лет опыта</h3>
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
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Завершённых проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">15</div>
                  <div className="text-muted-foreground">Лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Техподдержка</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section - Interactive Timeline */}
      <section className="py-20 px-4 metal-texture relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-primary rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border-2 border-primary rounded-full"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Этапы <span className="text-primary">работы</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              От первого звонка до сдачи объекта — каждый шаг продуман до мелочей
            </p>
          </div>
          
          {/* Vertical Timeline for Desktop */}
          <div className="hidden lg:block relative">
            {/* Central vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 -translate-x-1/2"></div>
            
            <div className="space-y-24">
              {works.map((work, index) => {
                const isEven = index % 2 === 0;
                const icons: ('Phone' | 'FileText' | 'Factory' | 'Truck' | 'CheckCircle2' | 'Star')[] = ['Phone', 'FileText', 'Factory', 'Truck', 'CheckCircle2', 'Star'];
                
                return (
                  <div key={index} className="relative">
                    {/* Central Circle */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl">
                          <Icon name={icons[index]} size={32} className="text-white" />
                        </div>
                        <div className="absolute -inset-3 rounded-full bg-primary/30 blur-xl"></div>
                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className={`flex items-start ${isEven ? 'justify-end pr-[55%]' : 'justify-start pl-[55%]'}`}>
                      <div className="group relative max-w-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <Card className="relative border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                          <CardContent className="p-8">
                            <div className={`flex items-start gap-4 ${isEven ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                  {work.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                  {work.description}
                                </p>
                                <div className={`flex gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Connecting line to central circle */}
                        <div className={`absolute top-10 ${isEven ? '-right-16' : '-left-16'} w-16 h-0.5 bg-gradient-to-${isEven ? 'l' : 'r'} from-primary/50 to-transparent`}></div>
                      </div>
                    </div>
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
      <section id="contact" className="py-20 px-4 metal-texture">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Заказать звонок
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Оставьте заявку</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCallRequest} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Input id="message" placeholder="Опишите ваш проект" />
                  </div>
                  <Button type="submit" className="w-full metal-shine">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" size={24} className="text-primary" />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+74998403312" className="text-lg hover:text-primary transition-colors block mb-1">+7(499)840-33-12</a>
                  <p className="text-sm text-muted-foreground">Работаем 24/7</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={24} className="text-[#25D366]" />
                    WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="https://wa.me/79773804500" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg hover:text-[#25D366] transition-colors flex items-center gap-2"
                  >
                    <span>+7 (977) 380-45-00</span>
                    <Icon name="ExternalLink" size={16} />
                  </a>
                  <p className="text-sm text-muted-foreground">Быстрый ответ</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Send" size={24} className="text-[#0088cc]" />
                    Telegram
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="https://t.me/Ivan_517" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg hover:text-[#0088cc] transition-colors flex items-center gap-2"
                  >
                    <span>@Ivan_517</span>
                    <Icon name="ExternalLink" size={16} />
                  </a>
                  <p className="text-sm text-muted-foreground">Онлайн консультация</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={24} className="text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">info@metallprom.ru</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">г. Москва, ул. Промышленная, 15</p>
                  <p className="text-sm text-muted-foreground">Производственная база</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 metal-texture">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Hammer" size={24} className="text-primary" />
                <span className="text-xl font-bold">Основа</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Производство металлоконструкций и выездная сварка. Более 15 лет на рынке.
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
                  <span>info@metallprom.ru</span>
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={18} />
                  <span>г. Москва, ул. Промышленная, 15</span>
                </div>
              </div>
            </div>
            
            {/* Messengers */}
            <div>
              <h3 className="font-bold mb-4">Мессенджеры</h3>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/79773804500" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-[#25D366] transition-colors"
                >
                  <Icon name="MessageCircle" size={18} />
                  <span>WhatsApp: +7 (977) 380-45-00</span>
                </a>
                <a 
                  href="https://t.me/Ivan_517" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-[#0088cc] transition-colors"
                >
                  <Icon name="Send" size={18} />
                  <span>Telegram: @Ivan_517</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-6 text-center text-muted-foreground">
            <p>© 2024 Основа. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;