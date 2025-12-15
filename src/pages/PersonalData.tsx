import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const PersonalData = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://cdn.poehali.dev/files/лого5.png" 
              alt="Основа" 
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-xl">Основа</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Политика обработки персональных данных
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Последнее обновление: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="FileText" className="text-primary" size={24} />
                1. Общие положения
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Настоящая Политика обработки персональных данных (далее — Политика) разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».
                </p>
                <p>
                  Оператор персональных данных: ООО "Основа" (далее — Оператор, Компания).
                </p>
                <p>
                  Настоящая Политика определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="BookOpen" className="text-primary" size={24} />
                2. Основные понятия
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Персональные данные</strong> — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).</li>
                  <li><strong>Обработка персональных данных</strong> — любое действие с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, удаление, уничтожение.</li>
                  <li><strong>Оператор</strong> — организация, самостоятельно или совместно с другими лицами организующая и осуществляющая обработку персональных данных.</li>
                  <li><strong>Субъект персональных данных</strong> — физическое лицо, предоставившее свои персональные данные Оператору.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Database" className="text-primary" size={24} />
                3. Перечень обрабатываемых персональных данных
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Оператор осуществляет обработку следующих категорий персональных данных:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Фамилия, имя, отчество</li>
                  <li>Номер телефона</li>
                  <li>Адрес электронной почты</li>
                  <li>Название организации (для юридических лиц)</li>
                  <li>Адрес объекта (при необходимости выполнения работ)</li>
                  <li>Технические данные: IP-адрес, информация из cookies, данные о браузере и устройстве</li>
                  <li>Файлы, загруженные пользователем (чертежи, фотографии, техническая документация)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Target" className="text-primary" size={24} />
                4. Цели обработки персональных данных
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Персональные данные обрабатываются в следующих целях:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Обработка заявок и запросов субъектов персональных данных</li>
                  <li>Заключение и исполнение договоров на оказание услуг</li>
                  <li>Связь с клиентами по вопросам выполнения заказов</li>
                  <li>Предоставление технической поддержки</li>
                  <li>Информирование о новых услугах и специальных предложениях (при наличии согласия)</li>
                  <li>Улучшение качества услуг и работы сайта</li>
                  <li>Проведение статистических и аналитических исследований</li>
                  <li>Выполнение требований законодательства РФ</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Scale" className="text-primary" size={24} />
                5. Правовые основания обработки
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Правовыми основаниями обработки персональных данных являются:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Федеральный закон от 27.07.2006 №152-ФЗ «О персональных данных»</li>
                  <li>Согласие субъекта персональных данных на обработку его персональных данных</li>
                  <li>Договоры, заключаемые между Оператором и субъектом персональных данных</li>
                  <li>Федеральные законы и иные нормативно-правовые акты в области защиты персональных данных</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Clock" className="text-primary" size={24} />
                6. Сроки обработки персональных данных
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Персональные данные обрабатываются в течение срока, необходимого для достижения целей их обработки, либо до отзыва согласия субъектом персональных данных.
                </p>
                <p>
                  По истечении сроков обработки персональные данные уничтожаются или обезличиваются, за исключением случаев, предусмотренных законодательством РФ.
                </p>
                <p>Сроки хранения:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Данные по заключенным договорам — в течение срока действия договора и 3 года после его завершения</li>
                  <li>Данные из заявок без заключения договора — 1 год с момента последнего контакта</li>
                  <li>Технические данные (cookies, IP-адреса) — до 1 года</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Shield" className="text-primary" size={24} />
                7. Меры по защите персональных данных
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Назначение лица, ответственного за организацию обработки персональных данных</li>
                  <li>Применение организационных и технических мер по обеспечению безопасности персональных данных</li>
                  <li>Использование средств защиты информации (шифрование, SSL-сертификаты)</li>
                  <li>Ограничение доступа к персональным данным</li>
                  <li>Обучение сотрудников, работающих с персональными данными</li>
                  <li>Установление правил доступа к персональным данным</li>
                  <li>Контроль за принимаемыми мерами по обеспечению безопасности персональных данных</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Users" className="text-primary" size={24} />
                8. Передача персональных данных третьим лицам
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Оператор не осуществляет передачу персональных данных третьим лицам, за исключением следующих случаев:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Субъект персональных данных выразил согласие на такие действия</li>
                  <li>Передача необходима для выполнения договора со субъектом персональных данных</li>
                  <li>Передача предусмотрена законодательством РФ</li>
                  <li>Передача необходима для защиты жизни, здоровья или иных жизненно важных интересов субъекта</li>
                </ul>
                <p className="mt-3">
                  При передаче персональных данных третьим лицам Оператор обеспечивает соблюдение требований законодательства о защите персональных данных.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="UserCheck" className="text-primary" size={24} />
                9. Права субъекта персональных данных
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Субъект персональных данных имеет право:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Получать информацию, касающуюся обработки его персональных данных</li>
                  <li>Требовать уточнения своих персональных данных, их блокирования или уничтожения</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке</li>
                  <li>Получать информацию о предоставлении персональных данных третьим лицам</li>
                  <li>На защиту своих прав и законных интересов, в том числе на возмещение убытков и компенсацию морального вреда</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 10 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="FileX" className="text-primary" size={24} />
                10. Отзыв согласия на обработку персональных данных
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Субъект персональных данных имеет право отозвать свое согласие на обработку персональных данных.
                </p>
                <p>
                  Для отзыва согласия необходимо направить письменное заявление на адрес Оператора или на электронную почту.
                </p>
                <p>
                  Отзыв согласия не влияет на законность обработки персональных данных, осуществленной до его отзыва.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 11 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Cookie" className="text-primary" size={24} />
                11. Использование файлов cookies
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Сайт Оператора использует технологию cookies для сбора информации о посещении сайта, предпочтениях пользователей и улучшения качества работы сайта.
                </p>
                <p>
                  Пользователь может управлять использованием cookies в настройках своего браузера.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 12 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Mail" className="text-primary" size={24} />
                12. Контактная информация
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  По вопросам, связанным с обработкой персональных данных, субъект персональных данных может обратиться к Оператору:
                </p>
                <div className="space-y-2 ml-4 mt-4">
                  <p><strong>ООО "Основа"</strong></p>
                  <p className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <a href="tel:+74998403312" className="hover:text-primary transition-colors">+7 (499) 840-33-12</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-primary" />
                    <a href="mailto:info@osnova-msk.ru" className="hover:text-primary transition-colors">info@osnova-msk.ru</a>
                  </p>
                  <p className="flex items-start gap-2">
                    <Icon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>Москва, Россия</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 13 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="RefreshCw" className="text-primary" size={24} />
                13. Изменение политики
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Оператор имеет право вносить изменения в настоящую Политику. Новая редакция Политики вступает в силу с момента ее размещения на сайте.
                </p>
                <p>
                  Действующая редакция всегда находится на странице по адресу: <a href="/personal-data" className="text-primary hover:underline">https://osnova-msk.ru/personal-data</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={18} />
            Вернуться на главную
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Основа. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default PersonalData;
