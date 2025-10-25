import { Button } from './ui/button';
import { FileText, Download } from 'lucide-react';

const materiais = [
  {
    titulo: 'Slides de Abertura',
    descricao: '10.2 Mb',
  },
  {
    titulo: 'Workshop DevOps',
    descricao: 'Materiais do curso',
  },
  {
    titulo: 'Guia de Tecnologias',
    descricao: 'PDF completo',
  },
];

export function Materiais() {
  return (
    <section id="palestras" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-black"></div>
          <h2>Materiais</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materiais.map((material, index) => (
            <div 
              key={index}
              className="border-2 border-black rounded-lg p-6 bg-white hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  <div>
                    <h3>{material.titulo}</h3>
                    <p className="text-slate-600">{material.descricao}</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-slate-400 group-hover:text-black transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
