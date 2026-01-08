import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const weddingDate = new Date('2026-02-12T00:00:00');

const guestsList = [
  { name: 'Ольга', category: 'Родители невесты' },
  { name: 'Людмила и Пётр', category: 'Родители жениха' },
  { name: 'Евгения и Сергей', category: 'Гости' },
  { name: 'Наталья и Евгений', category: 'Гости' },
  { name: 'Алёна и Александр', category: 'Гости' },
  { name: 'Оксана и Сергей', category: 'Гости' },
  { name: 'Елизавета и Артём', category: 'Гости' },
  { name: 'Андрей', category: 'Гости' },
  { name: 'Лидия', category: 'Гости' },
  { name: 'Никита', category: 'Гости' }
];

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    attendance: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Autoplay prevented:', err);
        });
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
      >
        <source src="/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-white/90 backdrop-blur-sm border-2 border-gold rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300 flex items-center justify-center group"
        aria-label={isPlaying ? 'Пауза' : 'Воспроизвести музыку'}
      >
        {isPlaying ? (
          <Icon name="Pause" className="w-6 h-6 text-gold group-hover:text-white" />
        ) : (
          <Icon name="Play" className="w-6 h-6 text-gold group-hover:text-white" />
        )}
      </button>
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <p className="text-lg md:text-xl text-gray-600 mb-4 tracking-widest uppercase font-light">
                Приглашаем на нашу свадьбу
              </p>
            </div>
            
            <h1 className="text-7xl md:text-9xl lg:text-[180px] font-bold text-gray-900 mb-8 leading-none tracking-tight">
              Александр
              <span className="block text-gold my-2">&</span>
              Виктория
            </h1>

            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

            <p className="text-2xl md:text-4xl text-gray-700 font-light tracking-wide">
              12 февраля 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-fade-in">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl border-4 border-gray-100">
                <img 
                  src="https://cdn.poehali.dev/files/IMG_9317.jpeg" 
                  alt="Александр и Виктория" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-gold rounded-lg -z-10" />
            </div>

            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                Наша история
              </h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                <p className="text-xl italic">
                  Наша история началась с алой розы и моря в ночи.
                </p>
                <p className="text-lg">
                  Мы прошли через звёздные обрывы, разлуку и возвращение — и нашли в себе смелость выбрать «навсегда».
                </p>
                <p className="text-lg">
                  Это не конец сказки.<br />
                  Это первая запятая в самом долгом и счастливом предложении нашей жизни.
                </p>
                <p className="text-xl font-semibold text-gold mt-8">
                  Приглашаем вас разделить с нами день,<br />
                  когда «я» и «ты» станут «мы».
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12">
            До свадьбы осталось
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: timeLeft.days, label: 'дней' },
              { value: timeLeft.hours, label: 'часов' },
              { value: timeLeft.minutes, label: 'минут' },
              { value: timeLeft.seconds, label: 'секунд' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-100 hover:border-gold transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-600">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Icon name="MapPin" className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Место проведения
            </h2>
            <div className="space-y-3 text-xl text-gray-700">
              <p className="font-semibold text-2xl">12 февраля 2026</p>
              <p>г. Новосибирск, Новосибирская область</p>
              <p>с. Новолуговое</p>
              <p className="text-gold font-semibold">ул. Железнодорожная, 10/1</p>
            </div>
          </div>

          <Card className="p-8 bg-gray-50 border-2 border-gray-100">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=82.920430,55.030199&mode=search&oid=1234567890&ol=biz&z=16"
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
                title="Карта проезда"
              />
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Icon name="Users" className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Дорогие гости
            </h2>
            <p className="text-xl text-gray-600">
              Мы рады пригласить вас разделить с нами этот особенный день
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {guestsList.map((guest, idx) => (
              <Card 
                key={idx}
                className="p-6 bg-white border-2 border-gray-100 hover:border-gold transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Heart" className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{guest.name}</h3>
                    <p className="text-sm text-gray-600">{guest.category}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <Icon name="Mail" className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Подтверждение
            </h2>
            <p className="text-xl text-gray-600">
              Пожалуйста, подтвердите своё присутствие
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя
                </label>
                <Input
                  value={rsvpForm.name}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  placeholder="Введите ваше имя"
                  required
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Сможете ли вы присутствовать?
                </label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={rsvpForm.attendance === 'yes' ? 'default' : 'outline'}
                    onClick={() => setRsvpForm({ ...rsvpForm, attendance: 'yes' })}
                    className="flex-1 h-14 text-lg"
                  >
                    Буду!
                  </Button>
                  <Button
                    type="button"
                    variant={rsvpForm.attendance === 'no' ? 'default' : 'outline'}
                    onClick={() => setRsvpForm({ ...rsvpForm, attendance: 'no' })}
                    className="flex-1 h-14 text-lg"
                  >
                    Не смогу
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пожелания молодожёнам
                </label>
                <Textarea
                  value={rsvpForm.message}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                  placeholder="Напишите что-нибудь приятное..."
                  rows={4}
                  className="text-lg"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg"
                disabled={!rsvpForm.name || !rsvpForm.attendance}
              >
                Отправить
              </Button>
            </form>
          ) : (
            <Card className="p-12 text-center bg-gray-50 border-2 border-gold">
              <Icon name="CheckCircle" className="w-20 h-20 text-gold mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Спасибо!
              </h3>
              <p className="text-xl text-gray-600">
                Ваш ответ принят. Ждём вас на нашем празднике! 💕
              </p>
            </Card>
          )}
        </div>
      </section>

      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <Icon name="Heart" className="w-12 h-12 text-gold mx-auto animate-pulse" />
          </div>
          <h3 className="text-4xl font-bold mb-4">
            Александр & Виктория
          </h3>
          <p className="text-lg text-gray-400">
            12.02.2026 • Новосибирск
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;