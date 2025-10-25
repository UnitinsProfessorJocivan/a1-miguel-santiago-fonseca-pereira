import { ImageIcon } from 'lucide-react';

const fotos = [
  { alt: 'Foto do evento 1' },
  { alt: 'Foto do evento 2' },
  { alt: 'Foto do evento 3' },
  { alt: 'Foto do evento 4' },
  { alt: 'Foto do evento 5' },
  { alt: 'Foto do evento 6' },
  { alt: 'Foto do evento 7' },
  { alt: 'Foto do evento 8' },
];

export function Fotos() {
  return (
    <section id="fotos" className="py-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-black"></div>
          <h2>Fotos</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fotos.map((foto, index) => (
            <div 
              key={index}
              className="aspect-square border-2 border-black rounded-lg overflow-hidden bg-slate-100 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_20px)]"></div>
                <ImageIcon className="w-12 h-12 text-slate-300 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
