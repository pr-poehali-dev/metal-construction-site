import { RefObject } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface QuizData {
  type: string;
  material: string;
  complexity: string;
  services: string[];
  deadline: string;
  weldingType: string;
  weldingServices: string[];
  name: string;
  phone: string;
  email: string;
  files: File[];
  fileUrls: string[];
}

interface QuizSectionProps {
  quizStep: number;
  quizData: QuizData;
  setQuizData: (data: QuizData) => void;
  totalSteps: number;
  isWeldingFlow: boolean;
  isQuizTransitioning: boolean;
  quizRef: RefObject<HTMLDivElement>;
  handleRadioSelect: (field: string, value: string) => void;
  handleServiceToggle: (service: string) => void;
  handleWeldingServiceToggle: (service: string) => void;
  handleQuizNext: () => void;
  setQuizStep: (step: number) => void;
}

const QuizSection = ({
  quizStep,
  quizData,
  setQuizData,
  totalSteps,
  isWeldingFlow,
  isQuizTransitioning,
  quizRef,
  handleRadioSelect,
  handleServiceToggle,
  handleWeldingServiceToggle,
  handleQuizNext,
  setQuizStep
}: QuizSectionProps) => {
  return (
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
        <CardContent className="p-4 sm:p-6">
          <div className={`transition-opacity duration-300 ${isQuizTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            {quizStep === 0 && (
              <div className="space-y-4">
                <Label className="text-lg">Что вам нужно?</Label>
                <RadioGroup value={quizData.type}>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'производство')}>
                    <RadioGroupItem value="производство" id="производство" />
                    <Label htmlFor="производство" className="cursor-pointer flex-1">
                      <div className="font-semibold">Производство металлоконструкций</div>
                      <div className="text-sm text-muted-foreground">Ангары, навесы, лестницы, ограждения</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('type', 'выездная')}>
                    <RadioGroupItem value="выездная" id="выездная" />
                    <Label htmlFor="выездная" className="cursor-pointer flex-1">
                      <div className="font-semibold">Выездная сварка</div>
                      <div className="text-sm text-muted-foreground">Сварочные работы на объекте</div>
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
                        <span className="text-foreground font-medium">Здравствуйте!</span> Рад помочь вам с расчетом. Давайте определим, что именно вам нужно, и я сразу подготовлю точное коммерческое предложение.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {quizStep === 1 && !isWeldingFlow && (
              <div className="space-y-4">
                <Label className="text-lg">Из какого материала?</Label>
                <RadioGroup value={quizData.material}>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('material', 'чермет')}>
                    <RadioGroupItem value="чермет" id="чермет" />
                    <Label htmlFor="чермет" className="cursor-pointer flex-1">
                      <div className="font-semibold">Черный металл (сталь)</div>
                      <div className="text-sm text-muted-foreground">Прочный и доступный материал</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('material', 'нержавейка')}>
                    <RadioGroupItem value="нержавейка" id="нержавейка" />
                    <Label htmlFor="нержавейка" className="cursor-pointer flex-1">
                      <div className="font-semibold">Нержавеющая сталь</div>
                      <div className="text-sm text-muted-foreground">Коррозионностойкий материал</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('material', 'не_знаю')}>
                    <RadioGroupItem value="не_знаю" id="не_знаю" />
                    <Label htmlFor="не_знаю" className="cursor-pointer flex-1">
                      <div className="font-semibold">Не уверен / нужна консультация</div>
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
                        <span className="text-foreground font-medium">Выбор материала влияет на цену.</span> Если не уверены — выберите последний вариант, и я подскажу оптимальный материал для вашей задачи.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {quizStep === 1 && isWeldingFlow && (
              <div className="space-y-4">
                <Label className="text-lg">Какой тип сварки нужен?</Label>
                <RadioGroup value={quizData.weldingType}>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'аргонодуговая')}>
                    <RadioGroupItem value="аргонодуговая" id="аргонодуговая" />
                    <Label htmlFor="аргонодуговая" className="cursor-pointer flex-1">
                      <div className="font-semibold">Аргонодуговая сварка</div>
                      <div className="text-sm text-muted-foreground">TIG-сварка для нержавейки и алюминия</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'полуавтомат')}>
                    <RadioGroupItem value="полуавтомат" id="полуавтомат" />
                    <Label htmlFor="полуавтомат" className="cursor-pointer flex-1">
                      <div className="font-semibold">Полуавтоматическая сварка</div>
                      <div className="text-sm text-muted-foreground">MIG/MAG для черного металла</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'электродуговая')}>
                    <RadioGroupItem value="электродуговая" id="электродуговая" />
                    <Label htmlFor="электродуговая" className="cursor-pointer flex-1">
                      <div className="font-semibold">Электродуговая сварка</div>
                      <div className="text-sm text-muted-foreground">ММА для базовых работ</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('weldingType', 'не_знаю_сварка')}>
                    <RadioGroupItem value="не_знаю_сварка" id="не_знаю_сварка" />
                    <Label htmlFor="не_знаю_сварка" className="cursor-pointer flex-1">
                      <div className="font-semibold">Не уверен / нужна консультация</div>
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
                        <span className="text-foreground font-medium">Тип сварки зависит от материала и задачи.</span> Если не уверены — опишите работу в конце, и я подберу оптимальный метод.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {quizStep === 2 && !isWeldingFlow && (
              <div className="space-y-4">
                <Label className="text-lg">Уровень сложности конструкции</Label>
                <RadioGroup value={quizData.complexity}>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('complexity', 'простая')}>
                    <RadioGroupItem value="простая" id="простая" />
                    <Label htmlFor="простая" className="cursor-pointer flex-1">
                      <div className="font-semibold">Простая конструкция</div>
                      <div className="text-sm text-muted-foreground">Типовые решения, стандартные узлы</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('complexity', 'средняя')}>
                    <RadioGroupItem value="средняя" id="средняя" />
                    <Label htmlFor="средняя" className="cursor-pointer flex-1">
                      <div className="font-semibold">Средней сложности</div>
                      <div className="text-sm text-muted-foreground">Нестандартные элементы, индивидуальный проект</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('complexity', 'сложная')}>
                    <RadioGroupItem value="сложная" id="сложная" />
                    <Label htmlFor="сложная" className="cursor-pointer flex-1">
                      <div className="font-semibold">Сложная конструкция</div>
                      <div className="text-sm text-muted-foreground">Уникальный проект, сложные узлы</div>
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
                        <span className="text-foreground font-medium">Сложность влияет на сроки и стоимость.</span> Чем сложнее конструкция, тем больше времени уйдет на проектирование и изготовление.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {quizStep === 2 && isWeldingFlow && (
              <div className="space-y-4">
                <Label className="text-lg">Какие работы нужны? (можно выбрать несколько)</Label>
                <div className="space-y-3">
                  {['Ремонт конструкций', 'Изготовление элементов', 'Монтаж', 'Усиление конструкций', 'Врезка и подключение'].map((service) => (
                    <div 
                      key={service}
                      className={`flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-colors ${
                        quizData.weldingServices.includes(service) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleWeldingServiceToggle(service)}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        quizData.weldingServices.includes(service) 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {quizData.weldingServices.includes(service) && (
                          <Icon name="Check" size={14} className="text-white" />
                        )}
                      </div>
                      <Label className="cursor-pointer flex-1 font-normal">{service}</Label>
                    </div>
                  ))}
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
                        <span className="text-foreground font-medium">Выберите все необходимые услуги.</span> Это поможет мне точнее рассчитать стоимость и время выполнения работ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {quizStep === 3 && !isWeldingFlow && (
              <div className="space-y-4">
                <Label className="text-lg">Дополнительные услуги (опционально)</Label>
                <div className="space-y-3">
                  {['Проектирование (КМ/КМД)', 'Порошковая покраска', 'Доставка', 'Монтаж', 'Гарантийное обслуживание'].map((service) => (
                    <div 
                      key={service}
                      className={`flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-colors ${
                        quizData.services.includes(service) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleServiceToggle(service)}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        quizData.services.includes(service) 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {quizData.services.includes(service) && (
                          <Icon name="Check" size={14} className="text-white" />
                        )}
                      </div>
                      <Label className="cursor-pointer flex-1 font-normal">{service}</Label>
                    </div>
                  ))}
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
                        <span className="text-foreground font-medium">Можно не выбирать ничего</span> — это опциональные услуги. Но с ними мы возьмем весь процесс на себя от проекта до установки.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {quizStep === 3 && isWeldingFlow && (
              <div className="space-y-4">
                <Label className="text-lg">Где находится объект?</Label>
                <RadioGroup value={quizData.deadline}>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'москва')}>
                    <RadioGroupItem value="москва" id="москва-welding" />
                    <Label htmlFor="москва-welding" className="cursor-pointer flex-1">
                      <div className="font-semibold">Москва</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'область')}>
                    <RadioGroupItem value="область" id="область-welding" />
                    <Label htmlFor="область-welding" className="cursor-pointer flex-1">
                      <div className="font-semibold">Московская область (до 50 км от МКАД)</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md hover:border-primary transition-colors cursor-pointer" onClick={() => handleRadioSelect('deadline', 'удаленно')}>
                    <RadioGroupItem value="удаленно" id="удаленно-welding" />
                    <Label htmlFor="удаленно-welding" className="cursor-pointer flex-1">
                      <div className="font-semibold">Более 50 км от МКАД</div>
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
                        <span className="text-foreground font-medium">Расстояние влияет на стоимость выезда.</span> Точный адрес уточним при звонке — пока выберите примерную зону.
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
                className="flex-1 metal-shine"
                disabled={
                  (quizStep === 0 && !quizData.type) ||
                  (quizStep === 1 && !isWeldingFlow && !quizData.material) ||
                  (quizStep === 1 && isWeldingFlow && !quizData.weldingType) ||
                  (quizStep === 2 && !isWeldingFlow && !quizData.complexity) ||
                  (quizStep === 3 && isWeldingFlow && !quizData.deadline) ||
                  (quizStep === 4 && !isWeldingFlow && !quizData.deadline) ||
                  (((quizStep === 5 && !isWeldingFlow) || (quizStep === 4 && isWeldingFlow)) && (!quizData.name || !quizData.phone))
                }
              >
                {quizStep === totalSteps - 1 ? 'Отправить' : 'Далее'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSection;
