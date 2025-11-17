import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Search,
  ChevronLeft,
  Star,
  Clock,
  TrendingUp,
  Bookmark,
  Filter
} from 'lucide-react';

interface TextLibraryProps {
  onNavigate: (page: Page) => void;
}

export function TextLibrary({ onNavigate }: TextLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const textCategories = [
    {
      title: 'Torá',
      icon: '📜',
      texts: [
        { name: 'Bereshit (Gênesis)', chapters: 50, level: 'Iniciante' },
        { name: 'Shemot (Êxodo)', chapters: 40, level: 'Iniciante' },
        { name: 'Vayikra (Levítico)', chapters: 27, level: 'Intermediário' },
        { name: 'Bamidbar (Números)', chapters: 36, level: 'Intermediário' },
        { name: 'Devarim (Deuteronômio)', chapters: 34, level: 'Iniciante' }
      ]
    },
    {
      title: 'Mishná',
      icon: '📖',
      texts: [
        { name: 'Berachot', chapters: 9, level: 'Iniciante', popular: true },
        { name: 'Shabat', chapters: 24, level: 'Intermediário' },
        { name: 'Pirkei Avot', chapters: 6, level: 'Iniciante', popular: true },
        { name: 'Pesachim', chapters: 10, level: 'Intermediário' },
        { name: 'Yoma', chapters: 8, level: 'Avançado' }
      ]
    },
    {
      title: 'Halachá (Lei Judaica)',
      icon: '⚖️',
      texts: [
        { name: 'Shulchan Aruch - Orach Chaim', chapters: '697 Seções', level: 'Avançado', popular: true },
        { name: 'Shulchan Aruch - Yoreh Deah', chapters: '403 Seções', level: 'Avançado' },
        { name: 'Mishné Torá - Rambam', chapters: '14 Livros', level: 'Avançado' },
        { name: 'Kitzur Shulchan Aruch', chapters: '221 Capítulos', level: 'Intermediário', popular: true },
        { name: 'Hilchot Shabat', chapters: 'Compilação', level: 'Intermediário' }
      ]
    },
    {
      title: 'Ética e Mussar',
      icon: '💎',
      texts: [
        { name: 'Pirkei Avot', chapters: 6, level: 'Iniciante', popular: true },
        { name: 'Mesilat Yesharim', chapters: 26, level: 'Intermediário', popular: true },
        { name: 'Orchot Tzadikim', chapters: 28, level: 'Intermediário' },
        { name: 'Chovot HaLevavot', chapters: 10, level: 'Avançado' },
        { name: 'Shaarei Teshuvá', chapters: 4, level: 'Intermediário' }
      ]
    },
    {
      title: 'Comentários da Torá',
      icon: '✨',
      texts: [
        { name: 'Rashi sobre Torá', chapters: 'Completo', level: 'Iniciante', popular: true },
        { name: 'Ramban (Nachmanides)', chapters: 'Completo', level: 'Intermediário' },
        { name: 'Ibn Ezra', chapters: 'Completo', level: 'Intermediário' },
        { name: 'Sforno', chapters: 'Completo', level: 'Intermediário' },
        { name: 'Or HaChaim', chapters: 'Completo', level: 'Avançado' }
      ]
    },
    {
      title: 'Filosofia Judaica',
      icon: '🌟',
      texts: [
        { name: 'Moreh Nevuchim (Guia dos Perplexos)', chapters: 3, level: 'Avançado', popular: true },
        { name: 'Kuzari', chapters: 5, level: 'Intermediário', popular: true },
        { name: 'Emunot VeDeot', chapters: 10, level: 'Avançado' },
        { name: 'Derech Hashem', chapters: 4, level: 'Intermediário' },
        { name: 'Sefer HaIkkarim', chapters: 4, level: 'Avançado' }
      ]
    }
  ];

  const recentTexts = [
    { name: 'Mishná Berachot 2', category: 'Mishná', lastRead: 'Hoje' },
    { name: 'Parashat Bereshit', category: 'Torá', lastRead: 'Ontem' },
    { name: 'Pirkei Avot 1', category: 'Mishná', lastRead: 'Há 2 dias' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('dashboard')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl text-blue-950">Biblioteca de Textos Sagrados</h1>
              <p className="text-slate-600">Explore a sabedoria milenar do judaísmo</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar textos, comentários ou tópicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">
              <BookOpen className="w-4 h-4 mr-2" />
              Explorar
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="w-4 h-4 mr-2" />
              Recentes
            </TabsTrigger>
            <TabsTrigger value="popular">
              <TrendingUp className="w-4 h-4 mr-2" />
              Populares
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="w-4 h-4 mr-2" />
              Salvos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-8">
            {textCategories.map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl text-blue-950">{category.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.texts.map((text, textIdx) => (
                    <Card 
                      key={textIdx}
                      className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-blue-950 group-hover:text-blue-600 transition-colors">
                          {text.name}
                        </h3>
                        {text.popular && (
                          <Badge className="bg-amber-100 text-amber-700">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <BookOpen className="w-4 h-4" />
                          <span>
                            {text.chapters !== undefined 
                              ? typeof text.chapters === 'number' 
                                ? `${text.chapters} capítulos` 
                                : text.chapters
                              : `${text.pages} páginas`
                            }
                          </span>
                        </div>
                        <Badge 
                          variant="outline"
                          className={
                            text.level === 'Iniciante' 
                              ? 'border-green-500 text-green-700'
                              : text.level === 'Intermediário'
                              ? 'border-blue-500 text-blue-700'
                              : 'border-purple-500 text-purple-700'
                          }
                        >
                          {text.level}
                        </Badge>
                      </div>

                      <Button className="w-full" variant="outline">
                        Iniciar Estudo
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="recent">
            <div className="max-w-3xl">
              <h2 className="text-2xl text-blue-950 mb-6">Textos Recentes</h2>
              <div className="space-y-4">
                {recentTexts.map((text, idx) => (
                  <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-blue-950">{text.name}</h3>
                          <p className="text-sm text-slate-600">{text.category} • Lido {text.lastRead}</p>
                        </div>
                      </div>
                      <Button variant="outline">Continuar</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <h2 className="text-2xl text-blue-950 mb-6">Textos Mais Estudados</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🏆</div>
                  <Badge className="bg-amber-500 text-white">Top 1</Badge>
                </div>
                <h3 className="text-xl text-blue-950 mb-2">Pirkei Avot</h3>
                <p className="text-slate-600 mb-4">Ética dos Pais - sabedoria atemporal</p>
                <div className="text-sm text-slate-500 mb-4">12.5k estudantes esta semana</div>
                <Button className="w-full">Começar a Estudar</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🥈</div>
                  <Badge className="bg-slate-400 text-white">Top 2</Badge>
                </div>
                <h3 className="text-xl text-blue-950 mb-2">Mishná Berachot</h3>
                <p className="text-slate-600 mb-4">Bênçãos e orações fundamentais</p>
                <div className="text-sm text-slate-500 mb-4">9.2k estudantes esta semana</div>
                <Button className="w-full">Começar a Estudar</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🥉</div>
                  <Badge className="bg-orange-400 text-white">Top 3</Badge>
                </div>
                <h3 className="text-xl text-blue-950 mb-2">Rashi sobre Bereshit</h3>
                <p className="text-slate-600 mb-4">Comentários fundamentais sobre Gênesis</p>
                <div className="text-sm text-slate-500 mb-4">7.8k estudantes esta semana</div>
                <Button className="w-full">Começar a Estudar</Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl text-slate-600 mb-2">Nenhum texto salvo ainda</h3>
              <p className="text-slate-500 mb-6">
                Salve seus textos favoritos para acesso rápido
              </p>
              <Button onClick={() => onNavigate('library')}>
                Explorar Biblioteca
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
