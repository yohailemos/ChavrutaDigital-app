import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import {
  BookOpen,
  ArrowLeft,
  Radio,
  Users,
  Clock,
  Calendar as CalendarIcon,
  MessageCircle,
  Send,
  Play,
  ThumbsUp,
  Bell,
  BellOff,
  Download,
  Share2,
  Eye
} from 'lucide-react';

interface WeeklyShiurProps {
  onNavigate: (page: Page) => void;
}

// Mock data para os shiurim
const upcomingShiurim = [
  {
    id: 1,
    title: 'Parashat Vayera - A Hospitalidade de Avraham',
    date: new Date(2025, 10, 20, 20, 0), // Nov 20, 2025 20:00
    duration: '60 minutos',
    topic: 'Parashat Hashavua',
    description: 'Análise profunda da hospitalidade de Avraham Avinu e suas lições para nós hoje.'
  },
  {
    id: 2,
    title: 'Halachá Prática: Berachot',
    date: new Date(2025, 10, 23, 19, 30), // Nov 23, 2025 19:30
    duration: '45 minutos',
    topic: 'Halachá',
    description: 'Leis práticas sobre bênçãos no dia a dia.'
  },
  {
    id: 3,
    title: 'Pirkei Avot - Sabedoria dos Sábios',
    date: new Date(2025, 10, 27, 20, 0), // Nov 27, 2025 20:00
    duration: '60 minutos',
    topic: 'Ética',
    description: 'Explorando as máximas éticas dos nossos sábios.'
  }
];

const recordedShiurim = [
  {
    id: 1,
    title: 'Parashat Lech Lecha - A Jornada de Avraham',
    date: '13 de Novembro, 2025',
    duration: '58:42',
    views: 234,
    topic: 'Parashat Hashavua'
  },
  {
    id: 2,
    title: 'Introdução ao Talmud Bavli',
    date: '10 de Novembro, 2025',
    duration: '52:15',
    views: 189,
    topic: 'Talmud'
  },
  {
    id: 3,
    title: 'Shabat: Santidade no Tempo',
    date: '6 de Novembro, 2025',
    duration: '1:05:30',
    views: 312,
    topic: 'Halachá'
  },
  {
    id: 4,
    title: 'Rambam: Os 13 Princípios da Fé',
    date: '3 de Novembro, 2025',
    duration: '1:12:18',
    views: 278,
    topic: 'Filosofia'
  },
  {
    id: 5,
    title: 'Tehilim: A Poesia dos Salmos',
    date: '30 de Outubro, 2025',
    duration: '48:25',
    views: 156,
    topic: 'Tanach'
  },
  {
    id: 6,
    title: 'Chassidut: Alegria no Serviço Divino',
    date: '27 de Outubro, 2025',
    duration: '55:33',
    views: 198,
    topic: 'Chassidut'
  }
];

const chatMessages = [
  { id: 1, user: 'David S.', message: 'Shalom Rabino! Muito feliz por estar aqui hoje', time: '20:05' },
  { id: 2, user: 'Sarah L.', message: 'Excelente explicação sobre Rashi!', time: '20:12' },
  { id: 3, user: 'Moshe K.', message: 'Poderia repetir o último ponto sobre Avraham?', time: '20:18' },
  { id: 4, user: 'Rabino Yosef', message: 'Com prazer! Vou retomar esse ponto agora.', time: '20:19' },
  { id: 5, user: 'Rachel M.', message: 'Toda raba Rabino! Muito esclarecedor', time: '20:25' },
];

export function WeeklyShiur({ onNavigate }: WeeklyShiurProps) {
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(87);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'Você',
        message: newMessage,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-600" />
                <span className="text-blue-950">Chavruta Digital</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isLive && (
                <Badge className="bg-red-600 text-white animate-pulse">
                  <Radio className="w-3 h-3 mr-1" />
                  AO VIVO
                </Badge>
              )}
              <Button
                variant={isNotificationEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
              >
                {isNotificationEnabled ? (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Notificações Ativas
                  </>
                ) : (
                  <>
                    <BellOff className="w-4 h-4 mr-2" />
                    Ativar Notificações
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl text-blue-950">
              Shiur Semanal com Rabino Yosef
            </h1>
            {isLive && (
              <Badge className="bg-red-600 text-white">
                <Radio className="w-3 h-3 mr-1" />
                AO VIVO AGORA
              </Badge>
            )}
          </div>
          <p className="text-slate-600">
            Aulas ao vivo toda semana com conteúdo profundo e autêntico
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Card */}
            <Card className="overflow-hidden">
              {/* Video Player */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  {isLive ? (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                        <Radio className="w-10 h-10 text-red-500 animate-pulse" />
                      </div>
                      <p className="text-white/90 text-lg">Transmissão ao vivo em andamento</p>
                      <p className="text-white/70 text-sm mt-2">
                        {viewerCount} pessoas assistindo
                      </p>
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  )}
                </div>
                
                {/* Live Badge Overlay */}
                {isLive && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white">
                      <Radio className="w-3 h-3 mr-1" />
                      AO VIVO
                    </Badge>
                  </div>
                )}

                {/* Viewer Count Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {viewerCount}
                  </div>
                </div>

                {/* Duration Overlay */}
                {!isLive && (
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      58:42
                    </Badge>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl text-blue-950 mb-2">
                      Parashat Vayera - A Hospitalidade de Avraham
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        16 de Novembro, 2025
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        20:00 - 21:00
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {viewerCount} assistindo
                      </div>
                    </div>
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-600 text-white">RY</AvatarFallback>
                  </Avatar>
                </div>

                <div className="mb-4">
                  <Badge className="bg-amber-100 text-amber-700">Parashat Hashavua</Badge>
                </div>

                <p className="text-slate-700 mb-4">
                  Análise profunda da hospitalidade de Avraham Avinu e suas lições para nós hoje. 
                  Exploramos como os valores de chesed (bondade) e hachnasat orchim (acolhimento de hóspedes) 
                  são fundamentais na tradição judaica.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Gostei (42)
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                  {!isLive && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Tabs for Content */}
            <Card>
              <Tabs defaultValue="recordings" className="w-full">
                <div className="border-b border-slate-200">
                  <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                    <TabsTrigger 
                      value="recordings" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent"
                    >
                      Gravações Anteriores
                    </TabsTrigger>
                    <TabsTrigger 
                      value="schedule" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent"
                    >
                      Próximos Shiurim
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="recordings" className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {recordedShiurim.map((shiur) => (
                      <div
                        key={shiur.id}
                        className="border border-slate-200 rounded-lg overflow-hidden hover:border-amber-500 transition-colors cursor-pointer group"
                      >
                        <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 text-blue-600 ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-black/70 text-white text-xs">
                              {shiur.duration}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <Badge className="bg-amber-100 text-amber-700 mb-2 text-xs">
                            {shiur.topic}
                          </Badge>
                          <h3 className="text-blue-950 mb-1 line-clamp-2">
                            {shiur.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>{shiur.date}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {shiur.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="p-6">
                  <div className="space-y-4">
                    {upcomingShiurim.map((shiur) => (
                      <div
                        key={shiur.id}
                        className="border border-slate-200 rounded-lg p-4 hover:border-amber-500 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-blue-950 mb-1">{shiur.title}</h3>
                            <p className="text-sm text-slate-600 mb-2">
                              {shiur.description}
                            </p>
                            <Badge className="bg-amber-100 text-amber-700 text-xs">
                              {shiur.topic}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {shiur.date.toLocaleDateString('pt-BR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {shiur.date.toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {shiur.duration}
                          </div>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Bell className="w-4 h-4 mr-2" />
                          Adicionar Lembrete
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Chat */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-950 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  Chat ao Vivo
                </h3>
                {isLive && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {viewerCount} online
                  </Badge>
                )}
              </div>

              <ScrollArea className="h-96 mb-4 pr-4">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-slate-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-blue-950">{msg.user}</span>
                        <span className="text-xs text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-slate-700">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {isLive && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Digite sua mensagem ou pergunta..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="resize-none"
                    rows={3}
                  />
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              )}

              {!isLive && (
                <div className="text-center text-sm text-slate-500 py-4">
                  Chat disponível apenas durante transmissões ao vivo
                </div>
              )}
            </Card>

            {/* Calendar */}
            <Card className="p-6">
              <h3 className="text-blue-950 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-600" />
                Calendário de Shiurim
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-slate-700">Ao vivo agora</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Shiurim agendados</span>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="text-blue-950 mb-4">Sua Participação</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Shiurim Assistidos</span>
                    <span className="text-blue-950">24</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Presença Ao Vivo</span>
                    <span className="text-blue-950">18/24</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Perguntas Feitas</span>
                    <span className="text-blue-950">12</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-950">Membro Ativo</div>
                    <div className="text-xs text-slate-600">3 meses consecutivos</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
