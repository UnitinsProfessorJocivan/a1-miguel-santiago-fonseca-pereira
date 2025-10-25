import { User } from 'lucide-react';

const palestrantes = [
  {
    nome: 'Nome do(a) Palestrante',
    especialidade: 'Instituição',
    area: 'Área — Organização',
  },
  {
    nome: 'Outro(a) Palestrante',
    especialidade: 'Empresa',
    area: 'Área — Organização',
  },
  {
    nome: 'Convidado(a)',
    especialidade: 'Universidade',
    area: 'Área — Organização',
  },
];

export function Palestrantes() {
  return (
    <section id="palestrantes" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-black"></div>
          <h2>Palestrantes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palestrantes.map((palestrante, index) => (
            <div 
              key={index}
              className="border-2 border-black rounded-lg p-8 bg-white flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="mb-2">{palestrante.nome}</h3>
              <p className="text-slate-600">{palestrante.especialidade}</p>
              <p className="text-slate-500">{palestrante.area}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
