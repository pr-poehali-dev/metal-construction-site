import { useState } from 'react';
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
    dimensions: '',
    quantity: ''
  });

  const handleQuizNext = () => {
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      toast.success('Спасибо! Мы рассчитаем стоимость и свяжемся с вами.');
      setQuizStep(0);
      setQuizData({ type: '', material: '', dimensions: '', quantity: '' });
    }
  };

  const handleCallRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка принята! Мы свяжемся с вами в ближайшее время.');
  };

  const services = [
    { icon: 'Building2', title: 'Металлокаркасы зданий', description: 'Прочные конструкции для промышленных и коммерческих объектов' },
    { icon: 'Container', title: 'Ангары и навесы', description: 'Быстровозводимые конструкции любой сложности' },
    { icon: 'Grid3x3', title: 'Лестницы и перила', description: 'Надежные металлические лестничные конструкции' },
    { icon: 'Fence', title: 'Ограждения и заборы', description: 'Долговечные металлические ограждения' },
    { icon: 'Truck', title: 'Выездная сварка', description: 'Оперативный ремонт и монтаж на вашем объекте' },
    { icon: 'Wrench', title: 'Нестандартные изделия', description: 'Индивидуальные решения по вашим чертежам' }
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
            <span className="text-2xl font-bold">МеталлПром</span>
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
                d="M 50,0 Q 30,25 45,50 Q 30,75 50,100" 
                fill="url(#curveGradient)" 
                className="animate-wave"
                style={{ transformOrigin: 'center' }}
              />
              <path 
                d="M 50,0 Q 30,25 45,50 Q 30,75 50,100" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="0.4"
                opacity="0.7"
                className="drop-shadow-lg"
              />
              <path 
                d="M 50,0 Q 30,25 45,50 Q 30,75 50,100" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="0.1"
                opacity="0.3"
                className="blur-sm"
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
                  Заказать звонок
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
                <span className="text-primary font-bold">МеталлПром</span> — это команда профессионалов с более чем 15-летним опытом в производстве металлоконструкций и выездной сварке.
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
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all metal-shine group">
                <CardHeader>
                  <Icon name={service.icon as any} size={48} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Калькулятор стоимости
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Ответьте на несколько вопросов для предварительного расчета
          </p>
          
          <Card className="metal-texture border-border/50">
            <CardHeader>
              <CardTitle>Шаг {quizStep + 1} из 4</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {quizStep === 0 && (
                <div className="space-y-4">
                  <Label className="text-lg">Тип конструкции</Label>
                  <RadioGroup value={quizData.type} onValueChange={(value) => setQuizData({...quizData, type: value})}>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="каркас" id="каркас" />
                      <Label htmlFor="каркас" className="cursor-pointer flex-1">Металлокаркас здания</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="ангар" id="ангар" />
                      <Label htmlFor="ангар" className="cursor-pointer flex-1">Ангар/Навес</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="лестница" id="лестница" />
                      <Label htmlFor="лестница" className="cursor-pointer flex-1">Лестница</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="ограждение" id="ограждение" />
                      <Label htmlFor="ограждение" className="cursor-pointer flex-1">Ограждение/Забор</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="другое" id="другое" />
                      <Label htmlFor="другое" className="cursor-pointer flex-1">Другое</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {quizStep === 1 && (
                <div className="space-y-4">
                  <Label className="text-lg">Материал</Label>
                  <RadioGroup value={quizData.material} onValueChange={(value) => setQuizData({...quizData, material: value})}>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="черная сталь" id="черная" />
                      <Label htmlFor="черная" className="cursor-pointer flex-1">Черная сталь</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="нержавейка" id="нержавейка" />
                      <Label htmlFor="нержавейка" className="cursor-pointer flex-1">Нержавеющая сталь</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="оцинковка" id="оцинковка" />
                      <Label htmlFor="оцинковка" className="cursor-pointer flex-1">Оцинкованная сталь</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="алюминий" id="алюминий" />
                      <Label htmlFor="алюминий" className="cursor-pointer flex-1">Алюминий</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-4">
                  <Label className="text-lg" htmlFor="dimensions">Примерные размеры (м)</Label>
                  <Input 
                    id="dimensions"
                    placeholder="Например: 10x20x5"
                    value={quizData.dimensions}
                    onChange={(e) => setQuizData({...quizData, dimensions: e.target.value})}
                    className="text-lg p-6"
                  />
                  <p className="text-sm text-muted-foreground">Укажите длину х ширину х высоту</p>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-4">
                  <Label className="text-lg" htmlFor="quantity">Количество / Дополнительная информация</Label>
                  <Input 
                    id="quantity"
                    placeholder="Например: 1 шт, срочно"
                    value={quizData.quantity}
                    onChange={(e) => setQuizData({...quizData, quantity: e.target.value})}
                    className="text-lg p-6"
                  />
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
                    (quizStep === 1 && !quizData.material) ||
                    (quizStep === 2 && !quizData.dimensions)
                  }
                  className="flex-1 metal-shine"
                >
                  {quizStep === 3 ? 'Получить расчет' : 'Далее'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 metal-texture">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Наши работы
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <Card key={index} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group">
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="p-4 text-white font-medium">{item.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Этапы работы
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                    <p className="text-muted-foreground">{work.description}</p>
                  </div>
                </div>
                {index < works.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%+1rem)] w-8 h-0.5 bg-primary/30"></div>
                )}
              </div>
            ))}
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
                  <p className="text-lg">+7 (999) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Работаем 24/7</p>
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
      <footer className="py-8 px-4 border-t border-border/50 metal-texture">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Hammer" size={24} className="text-primary" />
            <span className="text-xl font-bold">МеталлПром</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 МеталлПром. Производство металлоконструкций и выездная сварка.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;