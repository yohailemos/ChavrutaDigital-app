import { Button } from './ui/button';
import { Card } from './ui/card';
import { BookOpen, Users, Brain, Trophy, Video, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-amber-400" />
          <span className="text-white text-2xl">Chavruta Digital</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Sobre
          </Button>
          <Button onClick={onLogin} className="bg-amber-500 hover:bg-amber-600 text-blue-950">
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Plataforma Inteligente de Estudo Judaico Colaborativo</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-6">
            Estude a Torá com seu <span className="text-amber-400">Chavruta</span> ideal
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Conecte-se com parceiros de estudo compatíveis, acesse textos sagrados autênticos
            e aprenda com inteligência artificial adaptada ao seu nível.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onLogin}
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-blue-950"
            >
              Começar Gratuitamente
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Assistir Demo
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              alt="Estudo colaborativo"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl text-center text-white mb-12">
          Recursos Inovadores
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
            <Users className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl mb-2">Pareamento Inteligente</h3>
            <p className="text-blue-100">
              IA conecta você com chavrutas compatíveis por nível, interesse e disponibilidade.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
            <BookOpen className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl mb-2">Biblioteca Completa</h3>
            <p className="text-blue-100">
              Torá, Mishná, Guemará e comentários clássicos integrados e autênticos.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
            <Brain className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl mb-2">IA Educacional</h3>
            <p className="text-blue-100">
              Trilhas personalizadas, resumos inteligentes e perguntas adaptativas.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
            <Video className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl mb-2">Estudo em Tempo Real</h3>
            <p className="text-blue-100">
              Videochamadas integradas com textos sincronizados e chat em tempo real.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
            <Trophy className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl mb-2">Gamificação</h3>
            <p className="text-blue-100">
              Acompanhe seu progresso, conquiste badges e celebre marcos de aprendizado.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
            <Sparkles className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl mb-2">Para Todos os Níveis</h3>
            <p className="text-blue-100">
              Desde iniciantes até estudiosos avançados, baalei teshuvá e guiyorim.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl text-blue-950 mb-4">
            Pronto para transformar seu estudo da Torá?
          </h2>
          <p className="text-xl text-blue-900 mb-8">
            Junte-se a uma comunidade global de estudantes dedicados
          </p>
          <Button 
            onClick={onLogin}
            size="lg"
            className="bg-blue-950 hover:bg-blue-900 text-white"
          >
            Criar Conta Gratuita
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-blue-200">
          <p>© 2025 Chavruta Digital. Preservando tradições, construindo o futuro.</p>
        </div>
      </footer>
    </div>
  );
}
