import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ChevronLeft,
  User,
  Trophy,
  BookOpen,
  Clock,
  Flame,
  Star,
  Award,
  Calendar,
  Settings
} from 'lucide-react';

interface ProfileProps {
  onNavigate: (page: Page) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const achievements = [
    { icon: Flame, name: 'Sequência de 10 Dias', color: 'bg-orange-500', unlocked: true },
    { icon: BookOpen, name: 'Primeiro Tratado', color: 'bg-blue-500', unlocked: true },
    { icon: Star, name: 'Nível 3 Alcançado', color: 'bg-purple-500', unlocked: true },
    { icon: Trophy, name: '50 Horas de Estudo', color: 'bg-amber-500', unlocked: true },
    { icon: Award, name: 'Mestre da Mishná', color: 'bg-green-500', unlocked: false },
    { icon: Flame, name: 'Sequência de 30 Dias', color: 'bg-red-500', unlocked: false }
  ];

  const studyHistory = [
    { text: 'Mishná Berachot 2', date: '12 Nov 2025', duration: '45 min', partner: 'Rafael M.' },
    { text: 'Parashat Bereshit', date: '11 Nov 2025', duration: '60 min', partner: 'Solo' },
    { text: 'Pirkei Avot 1:3', date: '10 Nov 2025', duration: '30 min', partner: 'Rafael M.' },
    { text: 'Rashi - Bereshit 1:1', date: '9 Nov 2025', duration: '40 min', partner: 'Solo' },
    { text: 'Mishná Berachot 1', date: '8 Nov 2025', duration: '50 min', partner: 'Rafael M.' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('dashboard')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl text-blue-950">Meu Perfil</h1>
                <p className="text-slate-600">Acompanhe sua jornada de aprendizado</p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 mb-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-4xl">
                  DS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl text-blue-950">David Silverman</h2>
                  <Badge className="bg-purple-100 text-purple-700">
                    <Star className="w-3 h-3 mr-1" />
                    Nível 3
                  </Badge>
                </div>
                <p className="text-slate-600 mb-4">São Paulo, Brasil • Membro desde Mar 2025</p>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-2xl text-blue-950">47</div>
                    <div className="text-sm text-slate-600">Horas de Estudo</div>
                  </div>
                  <div>
                    <div className="text-2xl text-blue-950">12</div>
                    <div className="text-sm text-slate-600">Dias de Sequência</div>
                  </div>
                  <div>
                    <div className="text-2xl text-blue-950">23</div>
                    <div className="text-sm text-slate-600">Sessões</div>
                  </div>
                  <div>
                    <div className="text-2xl text-blue-950">8</div>
                    <div className="text-sm text-slate-600">Conquistas</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progresso para Nível 4</span>
                    <span className="text-blue-950">650/1000 XP</span>
                  </div>
                  <Progress value={65} className="h-3" />
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="achievements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="achievements">
                <Trophy className="w-4 h-4 mr-2" />
                Conquistas
              </TabsTrigger>
              <TabsTrigger value="history">
                <BookOpen className="w-4 h-4 mr-2" />
                Histórico
              </TabsTrigger>
              <TabsTrigger value="stats">
                <Calendar className="w-4 h-4 mr-2" />
                Estatísticas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements">
              <Card className="p-6">
                <h3 className="text-xl text-blue-950 mb-6">Suas Conquistas</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {achievements.map((achievement, idx) => (
                    <Card 
                      key={idx}
                      className={`p-6 ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-slate-50 to-blue-50 border-blue-200' 
                          : 'bg-slate-50 border-slate-200 opacity-50'
                      }`}
                    >
                      <div className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center mb-4 mx-auto ${
                        !achievement.unlocked && 'grayscale'
                      }`}>
                        <achievement.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-center text-blue-950 mb-2">{achievement.name}</h4>
                      {achievement.unlocked ? (
                        <Badge className="w-full justify-center bg-green-100 text-green-700">
                          Desbloqueado
                        </Badge>
                      ) : (
                        <Badge className="w-full justify-center" variant="outline">
                          Bloqueado
                        </Badge>
                      )}
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-6">
                <h3 className="text-xl text-blue-950 mb-6">Histórico de Estudos</h3>
                <div className="space-y-3">
                  {studyHistory.map((session, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-blue-950">{session.text}</div>
                          <div className="text-sm text-slate-600">
                            {session.date} • {session.duration} • {session.partner}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl text-blue-950 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Tempo de Estudo
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Este Mês</span>
                        <span className="text-blue-950">47 horas</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Última Semana</span>
                        <span className="text-blue-950">12 horas</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Média Diária</span>
                        <span className="text-blue-950">1.5 horas</span>
                      </div>
                      <Progress value={75} />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl text-blue-950 mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Textos Favoritos
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🥇</div>
                        <div>
                          <div className="text-blue-950">Mishná Berachot</div>
                          <div className="text-sm text-slate-600">8 sessões</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🥈</div>
                        <div>
                          <div className="text-blue-950">Pirkei Avot</div>
                          <div className="text-sm text-slate-600">6 sessões</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🥉</div>
                        <div>
                          <div className="text-blue-950">Parashat Hashavua</div>
                          <div className="text-sm text-slate-600">5 sessões</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl text-blue-950 mb-6 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-600" />
                    Sequência de Estudo
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-5xl text-blue-950 mb-2">12</div>
                    <div className="text-slate-600">dias consecutivos</div>
                  </div>
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(7)].map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-8 h-8 rounded-lg ${
                          idx < 5 ? 'bg-orange-500' : 'bg-slate-200'
                        } flex items-center justify-center text-xs`}
                      >
                        {idx < 5 && <Flame className="w-4 h-4 text-white" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-center text-slate-600">
                    Continue estudando para manter sua sequência!
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl text-blue-950 mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-600" />
                    Próxima Meta
                  </h3>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-blue-950">Alcançar Nível 4</div>
                        <div className="text-sm text-slate-600">350 XP restantes</div>
                      </div>
                    </div>
                    <Progress value={65} />
                  </div>
                  <p className="text-sm text-slate-600">
                    Complete mais 5 sessões de estudo para desbloquear!
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
