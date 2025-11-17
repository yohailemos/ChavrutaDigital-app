import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { 
  ChevronLeft,
  Users,
  MapPin,
  Clock,
  BookOpen,
  Heart,
  X,
  Sparkles,
  Languages,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface MatchmakingProps {
  onNavigate: (page: Page) => void;
}

export function Matchmaking({ onNavigate }: MatchmakingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const potentialChavrutas = [
    {
      name: 'Sarah Cohen',
      initials: 'SC',
      location: 'São Paulo, Brasil',
      level: 'Intermediário',
      interests: ['Mishná', 'Pirkei Avot', 'Halachá'],
      languages: ['Português', 'Inglês', 'Hebraico'],
      availability: ['Seg 19h-21h', 'Qua 20h-22h', 'Dom 10h-12h'],
      matchScore: 95,
      bio: 'Baala teshuvá há 3 anos, apaixonada por Pirkei Avot e buscando aprofundar estudo de Mishná.',
      completedTexts: 12
    },
    {
      name: 'Moshe Levi',
      initials: 'ML',
      location: 'Rio de Janeiro, Brasil',
      level: 'Avançado',
      interests: ['Guemará', 'Rashi', 'Tosafot'],
      languages: ['Português', 'Hebraico', 'Aramaico'],
      availability: ['Ter 18h-20h', 'Qui 19h-21h', 'Sáb após shabat'],
      matchScore: 87,
      bio: 'Estudante de yeshivá procurando chavruta para Daf Yomi e estudo aprofundado de Guemará.',
      completedTexts: 24
    },
    {
      name: 'Rebecca Goldstein',
      initials: 'RG',
      location: 'Belo Horizonte, Brasil',
      level: 'Iniciante',
      interests: ['Torá', 'Parashat Hashavua', 'Ética Judaica'],
      languages: ['Português', 'Inglês'],
      availability: ['Seg 20h-21h', 'Sex 16h-18h'],
      matchScore: 92,
      bio: 'Em processo de guiyur, buscando parceira de estudo para aprender fundamentos da Torá.',
      completedTexts: 5
    },
    {
      name: 'Daniel Schwartz',
      initials: 'DS',
      location: 'Curitiba, Brasil',
      level: 'Intermediário',
      interests: ['Mishná', 'Rambam', 'Filosofia Judaica'],
      languages: ['Português', 'Espanhol', 'Hebraico'],
      availability: ['Qua 19h-21h', 'Sex 20h-22h', 'Dom 15h-17h'],
      matchScore: 89,
      bio: 'Professor de história judaica buscando aprofundar conhecimento em textos clássicos.',
      completedTexts: 18
    }
  ];

  const currentChavruta = potentialChavrutas[currentIndex];

  const handleLike = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (currentIndex < potentialChavrutas.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);
  };

  const handlePass = () => {
    if (currentIndex < potentialChavrutas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('dashboard')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl text-blue-950">Encontre seu Chavruta</h1>
              <p className="text-slate-600">Pareamento inteligente por IA</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* AI Matching Info */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-blue-950 mb-2">
                  Pareamento Inteligente Ativado
                </h3>
                <p className="text-slate-700 mb-3">
                  Nossa IA analisou seu perfil, nível de conhecimento e preferências para encontrar os melhores parceiros de estudo compatíveis com você.
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-purple-100 text-purple-700">Nível compatível</Badge>
                  <Badge className="bg-blue-100 text-blue-700">Interesses similares</Badge>
                  <Badge className="bg-green-100 text-green-700">Horários alinhados</Badge>
                </div>
              </div>
            </div>
          </Card>

          {showSuccess ? (
            <Card className="p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CheckCircle2 className="w-24 h-24 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl text-blue-950 mb-3">Solicitação Enviada!</h2>
              <p className="text-lg text-slate-700 mb-6">
                Enviamos sua solicitação para {currentChavruta.name}. Você receberá uma notificação quando ela responder.
              </p>
              <Button onClick={() => onNavigate('dashboard')} size="lg">
                Voltar ao Dashboard
              </Button>
            </Card>
          ) : currentIndex < potentialChavrutas.length ? (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Perfil {currentIndex + 1} de {potentialChavrutas.length}</span>
                  <span>{potentialChavrutas.length - currentIndex} restantes</span>
                </div>
                <Progress value={((currentIndex + 1) / potentialChavrutas.length) * 100} />
              </div>

              {/* Profile Card */}
              <Card className="overflow-hidden">
                {/* Match Score Banner */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm">Compatibilidade IA</span>
                    </div>
                    <div className="text-2xl">{currentChavruta.matchScore}%</div>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${currentChavruta.matchScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                        {currentChavruta.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-3xl text-blue-950 mb-2">{currentChavruta.name}</h2>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-1 text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{currentChavruta.location}</span>
                        </div>
                        <Badge variant="outline" className="border-blue-500 text-blue-700">
                          {currentChavruta.level}
                        </Badge>
                      </div>
                      <p className="text-slate-700">{currentChavruta.bio}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-slate-900 mb-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span>Áreas de Interesse</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentChavruta.interests.map((interest, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-700">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-900 mb-3">
                        <Languages className="w-5 h-5 text-purple-600" />
                        <span>Idiomas</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentChavruta.languages.map((lang, idx) => (
                          <Badge key={idx} className="bg-purple-100 text-purple-700">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-900 mb-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span>Disponibilidade</span>
                      </div>
                      <div className="space-y-1">
                        {currentChavruta.availability.map((time, idx) => (
                          <div key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-slate-900 mb-3">
                        <BookOpen className="w-5 h-5 text-amber-600" />
                        <span>Textos Completados</span>
                      </div>
                      <div className="text-3xl text-blue-950">{currentChavruta.completedTexts}</div>
                      <p className="text-sm text-slate-600">tratados estudados</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-slate-200">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 border-2 hover:bg-red-50 hover:border-red-300"
                      onClick={handlePass}
                    >
                      <X className="w-5 h-5 mr-2" />
                      Pular
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={handleLike}
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Conectar
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <Users className="w-24 h-24 text-slate-300 mx-auto mb-6" />
              <h2 className="text-3xl text-blue-950 mb-3">Você viu todos os perfis!</h2>
              <p className="text-lg text-slate-600 mb-6">
                Novas sugestões serão disponibilizadas em breve com base em suas preferências.
              </p>
              <Button onClick={() => onNavigate('dashboard')} size="lg">
                Voltar ao Dashboard
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
