import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  BookOpen,
  ChevronLeft,
  Maximize2,
  Settings,
  Sparkles,
  Send,
  Heart
} from 'lucide-react';

interface StudyRoomProps {
  onNavigate: (page: Page) => void;
}

export function StudyRoom({ onNavigate }: StudyRoomProps) {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chatMessages] = useState([
    { user: 'Rafael', message: 'Shalom! Pronto para começar?', time: '18:55' },
    { user: 'Você', message: 'Sim! Vamos estudar Berachot 2a?', time: '18:56' },
    { user: 'Rafael', message: 'Perfeito! Vou compartilhar o texto.', time: '18:56' }
  ]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-700"
              onClick={() => onNavigate('dashboard')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white">Sessão de Estudo - Mishná Berachot</h1>
              <p className="text-sm text-slate-400">Com Rafael Mendelsohn</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Em andamento - 00:23:45
            </Badge>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-700">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <div className="bg-slate-800 p-4 border-b border-slate-700">
            <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
              {/* Partner Video */}
              <Card className="bg-slate-900 border-slate-700 overflow-hidden relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-indigo-600 text-white text-2xl">RM</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <Badge className="bg-slate-900/80 text-white">Rafael Mendelsohn</Badge>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Card>

              {/* Your Video */}
              <Card className="bg-slate-900 border-slate-700 overflow-hidden relative aspect-video">
                {videoEnabled ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-amber-600 text-white text-2xl">DS</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                    <VideoOff className="w-12 h-12 text-slate-600" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2">
                  <Badge className="bg-slate-900/80 text-white">Você</Badge>
                </div>
              </Card>
            </div>

            {/* Video Controls */}
            <div className="flex justify-center gap-3 mt-4">
              <Button
                variant={audioEnabled ? "secondary" : "destructive"}
                size="icon"
                className="rounded-full w-12 h-12"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>
              <Button
                variant={videoEnabled ? "secondary" : "destructive"}
                size="icon"
                className="rounded-full w-12 h-12"
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>
              <Button
                variant="destructive"
                className="px-6"
                onClick={() => onNavigate('dashboard')}
              >
                Encerrar Sessão
              </Button>
            </div>
          </div>

          {/* Study Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="text" className="h-full flex flex-col">
              <div className="bg-slate-800 px-4 border-b border-slate-700">
                <TabsList className="bg-slate-900">
                  <TabsTrigger value="text">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Texto Sagrado
                  </TabsTrigger>
                  <TabsTrigger value="ai">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Assistente IA
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="text" className="flex-1 m-0 p-6 overflow-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-2xl text-white mb-2">מסכת ברכות - פרק ב׳</h2>
                    <p className="text-slate-400">Mishná Berachot - Capítulo 2</p>
                  </div>

                  <Card className="bg-slate-800 border-slate-700 p-6 mb-6">
                    <div className="text-right mb-4" dir="rtl">
                      <p className="text-xl text-white leading-loose">
                        מֵאֵימָתַי קוֹרִין אֶת שְׁמַע בְּעַרְבִית. מִשָּׁעָה שֶׁהַכֹּהֲנִים נִכְנָסִים לֶאֱכֹל בִּתְרוּמָתָן, עַד סוֹף הָאַשְׁמוּרָה הָרִאשׁוֹנָה
                      </p>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                      <p className="text-slate-300 mb-4">
                        <strong className="text-amber-400">Tradução:</strong><br />
                        Desde quando se recita o Shemá à noite? Desde a hora em que os sacerdotes entram para comer sua terumá, até o final da primeira vigília...
                      </p>
                    </div>
                  </Card>

                  <Card className="bg-blue-900/30 border-blue-700 p-6">
                    <h3 className="text-amber-400 mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Comentário de Rashi
                    </h3>
                    <p className="text-slate-200 leading-relaxed">
                      <strong>משעה שהכהנים נכנסים:</strong> Desde o momento em que os sacerdotes que se tornaram impuros durante o dia mergulham no mikveh e aguardam o pôr do sol. Este é o tempo inicial para a recitação do Shemá da noite, pois marca o início da noite segundo a halachá.
                    </p>
                  </Card>

                  <div className="mt-6 flex gap-2">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      <Heart className="w-4 h-4 mr-2" />
                      Marcar como Importante
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      <Maximize2 className="w-4 h-4 mr-2" />
                      Expandir Texto
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="flex-1 m-0 p-6 overflow-auto">
                <div className="max-w-4xl mx-auto">
                  <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-700 p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white mb-2">Assistente IA de Estudo</h3>
                        <p className="text-purple-200">
                          Estou aqui para ajudar com perguntas, explicações e insights sobre o texto que vocês estão estudando.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-4">
                    <Card className="bg-slate-800 border-slate-700 p-4">
                      <div className="text-sm text-amber-400 mb-2">Pergunta Sugerida</div>
                      <p className="text-white">
                        Por que a Mishná usa especificamente o momento em que os sacerdotes comem terumá como referência temporal?
                      </p>
                      <Button variant="outline" size="sm" className="mt-3 border-slate-600 text-slate-300">
                        Ver Resposta
                      </Button>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700 p-4">
                      <div className="text-sm text-amber-400 mb-2">Conceito Chave</div>
                      <p className="text-white mb-2">
                        <strong>Terumá (תרומה):</strong> Porção da colheita separada para os sacerdotes (kohanim). Possui santidade especial e só pode ser consumida em estado de pureza ritual.
                      </p>
                      <p className="text-slate-300 text-sm">
                        Este conceito é fundamental para entender a referência temporal da Mishná.
                      </p>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700 p-4">
                      <div className="text-sm text-amber-400 mb-2">Ponto de Discussão</div>
                      <p className="text-white">
                        Como este ensinamento sobre o tempo do Shemá se relaciona com nossa vida moderna, onde não temos mais o Templo e o sistema de terumá?
                      </p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat
            </h3>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={msg.user === 'Você' ? 'text-right' : ''}>
                  <div className="text-xs text-slate-400 mb-1">{msg.user} • {msg.time}</div>
                  <div className={`inline-block p-3 rounded-lg ${
                    msg.user === 'Você' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite uma mensagem..."
                className="flex-1 bg-slate-900 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
              />
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
