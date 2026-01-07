import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    type: 'title',
    content: null
  },
  {
    id: 2,
    type: 'photo',
    content: null
  },
  {
    id: 3,
    type: 'program',
    content: null
  },
  {
    id: 4,
    type: 'map',
    content: null
  },
  {
    id: 5,
    type: 'thanks',
    content: null
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-background to-cream relative overflow-hidden">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        
        {currentSlide === 0 && (
          <div className="text-center animate-fade-in">
            <div className="mb-12">
              <h1 className="text-[120px] md:text-[180px] font-bold text-gold tracking-wider">
                В & С
              </h1>
            </div>
            <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />
            <p className="text-4xl md:text-5xl text-beige font-light tracking-wide">
              12.02.2026
            </p>
          </div>
        )}

        {currentSlide === 1 && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center animate-fade-in">
            <div className="relative">
              <div className="border-4 border-gold rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Фото пары" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-4xl md:text-5xl text-beige leading-relaxed">
                Ждём вас на нашей свадьбе<br />
                <span className="text-gold font-semibold">12.02.2026</span>
              </p>
            </div>
          </div>
        )}

        {currentSlide === 2 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-bold text-gold text-center mb-16">
              Программа вечера
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent mb-12" />
            <div className="space-y-8">
              {[
                { time: '15:00', event: 'Встреча гостей' },
                { time: '16:00', event: 'Торжественная часть' },
                { time: '17:00', event: 'Ужин и танцы' },
                { time: '18:00', event: 'Конкурсы' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-6 text-3xl text-beige"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="text-gold text-4xl">●</span>
                  <span className="text-gold font-semibold min-w-[120px]">{item.time}</span>
                  <span className="text-2xl text-gold/30">—</span>
                  <span>{item.event}</span>
                </div>
              ))}
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent mt-12" />
          </div>
        )}

        {currentSlide === 3 && (
          <div className="max-w-4xl mx-auto animate-fade-in text-center">
            <div className="border-4 border-gold rounded-lg overflow-hidden shadow-2xl mb-8">
              <img 
                src="/placeholder.svg" 
                alt="Карта проезда" 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="bg-gold/10 border-2 border-gold rounded-lg p-8">
              <p className="text-3xl text-beige leading-relaxed">
                Дом г. Новосибирск<br />
                С. Новолуговое<br />
                ул. Железнодорожная, 10
              </p>
            </div>
          </div>
        )}

        {currentSlide === 4 && (
          <div className="text-center animate-fade-in">
            <div className="mb-12">
              <Icon name="Heart" className="w-32 h-32 text-gold mx-auto mb-8 animate-pulse" />
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-beige mb-8">
              Спасибо за внимание!
            </h2>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="rounded-full border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-background disabled:opacity-30"
        >
          <Icon name="ChevronLeft" className="w-6 h-6" />
        </Button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'bg-gold w-8' 
                  : 'bg-gold/30 hover:bg-gold/50'
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="rounded-full border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-background disabled:opacity-30"
        >
          <Icon name="ChevronRight" className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute bottom-8 right-8 text-gold/50 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Index;
