import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { WeeklyCalendarWidget } from './WeeklyCalendarWidget';
import logo from "figma:asset/95773810f63523410c6487f3f4c240162a00d6bb.png";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Calendar,
  Clock,
  Flame,
  Star,
  TrendingUp,
  Video,
  LogOut,
  Play,
  MessageCircle,
  Radio
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-6 h-6 text-amber-600" />
            <span className="text-blue-950">Chavruta Digital</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost"
              onClick={() => onNavigate('library')}
            >
              Biblioteca
            </Button>
            <Button 
              variant="ghost"
              onClick={() => onNavigate('calendar')}
            >
              Calendário
            </Button>
            <Button 
              variant="ghost"
              onClick={() => onNavigate('matchmaking')}
            >
              Encontrar Chavruta
            </Button>
            <Button 
              variant="ghost"
              onClick={() => onNavigate('profile')}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-amber-500 text-white">DS</AvatarFallback>
              </Avatar>
            </Button>
            <Button 
              variant="ghost"
              size="icon"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl text-blue-950 mb-2">
            Shalom, David! 👋
          </h1>
          <p className="text-slate-600">Bem-vindo de volta ao seu espaço de estudo</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Sequência</span>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl text-blue-950 mb-1">12 dias</div>
            <p className="text-sm text-slate-500">Continue estudando!</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Horas Estudadas</span>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl text-blue-950 mb-1">47h</div>
            <p className="text-sm text-slate-500">Este mês</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Badges</span>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl text-blue-950 mb-1">8</div>
            <p className="text-sm text-slate-500">Conquistas desbloqueadas</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Nível</span>
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl text-blue-950 mb-1">3</div>
            <p className="text-sm text-slate-500">Intermediário</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Quiz Card */}
            <Card className="p-6 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                    <h2 className="text-xl text-blue-950">Quiz Diário</h2>
                    <Badge className="bg-amber-500 text-white">Disponível Hoje!</Badge>
                  </div>
                  <p className="text-slate-700">Teste seus conhecimentos e ganhe pontos</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-blue-950">5 perguntas sobre Torá e Mishná</div>
                      <div className="text-sm text-slate-600">Tempo estimado: 5 minutos</div>
                    </div>
                  </div>
                  <Flame className="w-8 h-8 text-orange-500" />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={() => onNavigate('daily-quiz')}
                >
                  Começar Quiz Agora
                </Button>
              </div>
            </Card>

            {/* Active Study Session */}
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl text-blue-950 mb-2">Sessão Agendada</h2>
                  <p className="text-slate-600">Próxima sessão com seu chavruta</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Hoje às 19:00</Badge>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-indigo-500 text-white">RM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-blue-950">Rafael Mendelsohn</div>
                    <div className="text-sm text-slate-600">Seu parceiro de estudo</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Mishná - Tratado Berachot, Capítulo 2</span>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => onNavigate('study-room')}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Entrar na Sala de Estudo
                </Button>
              </div>
            </Card>

            {/* Video Highlight */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl text-blue-950">Vídeo Aula em Destaque</h2>
                <Badge className="bg-purple-600 text-white">Novo!</Badge>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative aspect-video bg-slate-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-purple-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      45:30
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-blue-950 mb-1">Introdução ao Estudo da Torá</h3>
                  <p className="text-sm text-slate-600 mb-3">Rabino Yosef - Fundamentos da Torá #1</p>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Assistir Agora
                  </Button>
                </div>
              </div>
            </Card>

            {/* Continue Learning */}
            <Card className="p-6">
              <h2 className="text-xl text-blue-950 mb-4">Continue Aprendendo</h2>
              
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-blue-950 mb-1">Parashat Hashavua</h3>
                      <p className="text-sm text-slate-600">Bereshit - Comentários de Rashi</p>
                    </div>
                    <Badge variant="outline">68% completo</Badge>
                  </div>
                  <Progress value={68} className="mb-2" />
                  <p className="text-xs text-slate-500">3 de 7 seções concluídas</p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-blue-950 mb-1">Pirkei Avot</h3>
                      <p className="text-sm text-slate-600">Ética dos Pais - Capítulo 1</p>
                    </div>
                    <Badge variant="outline">25% completo</Badge>
                  </div>
                  <Progress value={25} className="mb-2" />
                  <p className="text-xs text-slate-500">2 de 8 seções concluídas</p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-blue-950 mb-1">Filosofia de Rambam</h3>
                      <p className="text-sm text-slate-600">Introdução ao pensamento maimonideano</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700">Novo</Badge>
                  </div>
                  <Progress value={0} className="mb-2" />
                  <p className="text-xs text-slate-500">Não iniciado</p>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => onNavigate('library')}
              >
                Ver Toda Biblioteca
              </Button>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-blue-950 mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:bg-amber-100"
                  onClick={() => onNavigate('daily-quiz')}
                >
                  <TrendingUp className="w-4 h-4 mr-2 text-amber-600" />
                  <span className="flex-1 text-left">Quiz Diário</span>
                  <Badge className="bg-amber-500 text-white text-xs">Novo!</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('matchmaking')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Encontrar Novo Chavruta
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('library')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explorar Textos
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('assessment')}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Avaliação de Nível
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('schedule-session')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Sessão
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:bg-blue-100"
                  onClick={() => onNavigate('rabbi-consultation')}
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="flex-1 text-left">Consulta com Rabino</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-gradient-to-r from-red-50 to-orange-50 border-red-200 hover:bg-red-100"
                  onClick={() => onNavigate('weekly-shiur')}
                >
                  <Radio className="w-4 h-4 mr-2 text-red-600" />
                  <span className="flex-1 text-left">Shiur Semanal</span>
                  <Badge className="bg-red-600 text-white text-xs">Ao Vivo</Badge>
                </Button>
              </div>
            </Card>

            {/* Weekly Calendar Widget */}
            <WeeklyCalendarWidget onNavigate={onNavigate} />

            {/* Recent Achievements */}
            <Card className="p-6">
              <h3 className="text-blue-950 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Conquistas Recentes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-950">Sequência de 10 Dias</div>
                    <div className="text-xs text-slate-600">Há 2 dias</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-950">Primeiro Tratado</div>
                    <div className="text-xs text-slate-600">Há 5 dias</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-950">5 Sessões Completas</div>
                    <div className="text-xs text-slate-600">Há 1 semana</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Progress This Week */}
            <Card className="p-6">
              <h3 className="text-blue-950 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Progresso da Semana
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Meta de Estudo</span>
                    <span className="text-blue-950">8/10h</span>
                  </div>
                  <Progress value={80} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Sessões de Chavruta</span>
                    <span className="text-blue-950">3/4</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Textos Estudados</span>
                    <span className="text-blue-950">5/7</span>
                  </div>
                  <Progress value={71} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}