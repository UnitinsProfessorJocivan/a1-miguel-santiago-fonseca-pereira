import { Button } from './ui/button';
import { Calendar, MapPin } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const eventos = [
  {
    data: '10/03',
    evento: 'Abertura e Keynote — Futuro da IA',
    horario: '19:00–21:00',
    trilha: 'Presencial',
    local: 'Auditório Principal',
  },
  {
    data: '11/03',
    evento: 'Workshop — DevOps na Prática',
    horario: '14:00–17:30',
    trilha: 'Online',
    local: 'Sala Virtual 2',
  },
  {
    data: '12/03',
    evento: 'Mesa redonda — Tecnologias e Aprendizagem',
    horario: '09:00–12:00',
    trilha: 'Híbrida',
    local: 'Sala 301',
  },
  {
    data: '13/03',
    evento: 'Hackathon — Desafio Inovação 2025',
    horario: '08:00–18:00',
    trilha: 'Presencial',
    local: 'Lab de Inovação',
  },
  {
    data: '14/03',
    evento: 'Encerramento e Premiação',
    horario: '18:00–20:00',
    trilha: 'Híbrida',
    local: 'Auditório Principal',
  },
];

export function Programacao() {
  return (
    <section id="programacao" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-black"></div>
          <h2>Programação</h2>
        </div>

        <div className="border-2 border-black rounded-lg p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Trilha</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos.map((evento, index) => (
                <TableRow key={index}>
                  <TableCell>{evento.data}</TableCell>
                  <TableCell>{evento.evento}</TableCell>
                  <TableCell>{evento.horario}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-300">
                      <MapPin className="w-3 h-3" />
                      {evento.trilha}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Detalhes
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Calendar className="w-3 h-3 mr-1" />
                        Google Calendar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
