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
    'Металлокаркас производственного цеха',
    'Ангар для сельхозтехники',
    'Металлическая лестница на второй этаж',
    'Навес для автомобилей',
    'Ограждение промышленной территории',
    'Нестандартная металлоконструкция'
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
      <section className="relative h-[600px] metal-texture flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-primary/20"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Производство<br />
            <span className="text-primary">Металлоконструкций</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Профессиональная сварка и монтаж любой сложности
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
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
                <div className="h-64 bg-gradient-to-br from-muted to-secondary flex items-center justify-center relative overflow-hidden">
                  <Icon name="Image" size={64} className="text-muted-foreground/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="p-4 text-white font-medium">{item}</p>
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
