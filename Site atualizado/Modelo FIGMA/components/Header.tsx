import { Button } from './ui/button';
import { Square } from 'lucide-react';

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5" />
            <span>Semana Integrada de Tecnologia</span>
          </div>
          
          <nav className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => scrollToSection('programacao')}
            >
              Programação
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => scrollToSection('palestrantes')}
            >
              Palestrantes
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => scrollToSection('palestras')}
            >
              Palestras
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => scrollToSection('videos')}
            >
              Vídeos
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => scrollToSection('fotos')}
            >
              Fotos
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full"
            >
              Inscrição
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
