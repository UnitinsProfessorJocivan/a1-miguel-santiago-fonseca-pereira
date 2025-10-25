import { Play } from 'lucide-react';

const videos = [
  { titulo: 'Abertura do Evento', duracao: '15:30' },
  { titulo: 'Workshop DevOps', duracao: '45:20' },
  { titulo: 'Mesa Redonda', duracao: '1:20:15' },
];

export function Videos() {
  return (
    <section id="videos" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-black"></div>
          <h2>Vídeos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div 
              key={index}
              className="border-2 border-black rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_20px)]"></div>
                <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-slate-700 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="p-4">
                <h3>{video.titulo}</h3>
                <p className="text-slate-600">{video.duracao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
