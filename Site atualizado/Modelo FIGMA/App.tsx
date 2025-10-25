import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Programacao } from './components/Programacao';
import { Palestrantes } from './components/Palestrantes';
import { Materiais } from './components/Materiais';
import { Videos } from './components/Videos';
import { Fotos } from './components/Fotos';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Programacao />
      <Palestrantes />
      <Materiais />
      <Videos />
      <Fotos />
    </div>
  );
}
