import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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
          Политика конфиденциальности
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Последнее обновление: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Info" className="text-primary" size={24} />
                1. Общие положения
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта компании "Основа".
                </p>
                <p>
                  Используя наш сайт, вы даете согласие на обработку ваших персональных данных в соответствии с условиями данной Политики.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Database" className="text-primary" size={24} />
                2. Какие данные мы собираем
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Мы можем собирать следующую информацию:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Имя и контактные данные (телефон, email)</li>
                  <li>Информацию о заказах и запросах</li>
                  <li>IP-адрес и данные о браузере</li>
                  <li>Файлы cookie для улучшения работы сайта</li>
                  <li>Прикрепленные файлы (чертежи, фото) при оформлении заявки</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Target" className="text-primary" size={24} />
                3. Как мы используем данные
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Собранные данные используются для:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Обработки заявок и предоставления услуг</li>
                  <li>Связи с вами по вопросам заказа</li>
                  <li>Улучшения качества обслуживания</li>
                  <li>Отправки информации о новых услугах (с вашего согласия)</li>
                  <li>Анализа посещаемости и улучшения сайта</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Cookie" className="text-primary" size={24} />
                4. Использование cookies
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Наш сайт использует cookies — небольшие текстовые файлы, которые сохраняются на вашем устройстве для улучшения работы сайта.
                </p>
                <p>
                  Вы можете отключить cookies в настройках браузера, однако это может ограничить функциональность сайта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Shield" className="text-primary" size={24} />
                5. Защита данных
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Мы принимаем необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
                </p>
                <p>
                  Данные хранятся на защищенных серверах с ограниченным доступом. Передача данных осуществляется по защищенному протоколу HTTPS.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Users" className="text-primary" size={24} />
                6. Передача данных третьим лицам
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, когда это необходимо для:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Выполнения ваших заказов (например, службы доставки)</li>
                  <li>Соблюдения требований законодательства</li>
                  <li>Защиты наших прав и безопасности</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="UserCheck" className="text-primary" size={24} />
                7. Ваши права
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Вы имеете право:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Получить информацию о ваших данных, которые мы храним</li>
                  <li>Запросить исправление неточных данных</li>
                  <li>Запросить удаление ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                  <li>Подать жалобу в надзорный орган</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Mail" className="text-primary" size={24} />
                8. Контактная информация
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:
                </p>
                <div className="space-y-2 ml-4">
                  <p className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <a href="tel:+74998403312" className="hover:text-primary transition-colors">+7 (499) 840-33-12</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-primary" />
                    <a href="mailto:info@osnova-msk.ru" className="hover:text-primary transition-colors">info@osnova-msk.ru</a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="FileText" className="text-primary" size={24} />
                9. Изменения в политике
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице.
                </p>
                <p>
                  Существенные изменения вступают в силу после их публикации на сайте.
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

export default Privacy;
