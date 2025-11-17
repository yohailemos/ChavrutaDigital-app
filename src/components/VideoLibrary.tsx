import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { 
  ChevronLeft,
  Play,
  BookOpen,
  Clock,
  Search,
  Star,
  CheckCircle,
  Users,
  TrendingUp,
  Filter,
  X,
  Volume2,
  Maximize,
  Settings,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoLibraryProps {
  onNavigate: (page: Page) => void;
}

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  series?: string;
  episode?: number;
  views: number;
  rating: number;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  progress?: number;
  isNew?: boolean;
  topics: string[];
}

export function VideoLibrary({ onNavigate }: VideoLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const videos: Video[] = [
    {
      id: 1,
      title: 'Introdução ao Estudo da Torá',
      description: 'Uma visão geral sobre como abordar o estudo da Torá de forma sistemática e significativa. Aprenda os métodos tradicionais e modernos de interpretação.',
      thumbnail: 'https://images.unsplash.com/photo-1661827297445-dcf75ec07819',
      duration: '45:30',
      category: 'Torá',
      series: 'Fundamentos da Torá',
      episode: 1,
      views: 12500,
      rating: 4.9,
      level: 'Iniciante',
      progress: 75,
      topics: ['Métodos de Estudo', 'Pardes', 'Interpretação']
    },
    {
      id: 2,
      title: 'Parashat Bereshit - A Criação do Mundo',
      description: 'Estudo profundo da primeira porção da Torá, explorando os mistérios da criação segundo os grandes comentaristas.',
      thumbnail: 'https://images.unsplash.com/photo-1756998804788-74a21f2e968c',
      duration: '1:12:45',
      category: 'Torá',
      series: 'Parashat Hashavua',
      episode: 1,
      views: 8900,
      rating: 5.0,
      level: 'Intermediário',
      isNew: true,
      topics: ['Bereshit', 'Criação', 'Shabat']
    },
    {
      id: 3,
      title: 'Leis de Shabat - Parte 1',
      description: 'Fundamentos das leis do Shabat segundo a Halachá. Aprenda as 39 categorias de trabalho proibido e suas aplicações práticas.',
      thumbnail: 'https://images.unsplash.com/photo-1762554907633-e2f14e742413',
      duration: '58:20',
      category: 'Halachá',
      series: 'Hilchot Shabat',
      episode: 1,
      views: 15600,
      rating: 4.8,
      level: 'Intermediário',
      progress: 30,
      topics: ['Shabat', 'Melachot', 'Halachá Prática']
    },
    {
      id: 4,
      title: 'Pirkei Avot - Capítulo 1',
      description: 'Estudo verso a verso da Ética dos Pais, explorando a sabedoria milenar dos sábios sobre conduta moral e desenvolvimento espiritual.',
      thumbnail: 'https://images.unsplash.com/photo-1706528010331-0f12582db334',
      duration: '52:15',
      category: 'Ética',
      series: 'Pirkei Avot Completo',
      episode: 1,
      views: 20300,
      rating: 5.0,
      level: 'Iniciante',
      topics: ['Ética', 'Mussar', 'Sabedoria']
    },
    {
      id: 5,
      title: 'Rashi - Metodologia de Comentário',
      description: 'Entenda como Rashi revolucionou o estudo da Torá com seu método conciso e profundo de explicação.',
      thumbnail: 'https://images.unsplash.com/photo-1613322004370-cb676b3ff91b',
      duration: '1:05:30',
      category: 'Comentários',
      views: 6700,
      rating: 4.7,
      level: 'Avançado',
      isNew: true,
      topics: ['Rashi', 'Comentários', 'Exegese']
    },
    {
      id: 6,
      title: 'A Filosofia de Rambam',
      description: 'Explore o pensamento filosófico de Maimônides e sua influência na tradição judaica e mundial.',
      thumbnail: 'https://images.unsplash.com/photo-1719845853806-1c54b0ed37c5',
      duration: '1:28:40',
      category: 'Filosofia',
      series: 'Grandes Filósofos do Judaísmo',
      episode: 1,
      views: 9200,
      rating: 4.9,
      level: 'Avançado',
      topics: ['Rambam', 'Filosofia', 'Razão e Fé']
    },
    {
      id: 7,
      title: 'Bênçãos Diárias - Birchot Hashachar',
      description: 'Significado profundo e prático das bênçãos matinais que recitamos diariamente.',
      thumbnail: 'https://images.unsplash.com/photo-1762554907633-e2f14e742413',
      duration: '42:10',
      category: 'Tefillá',
      series: 'Guia de Oração',
      episode: 1,
      views: 11400,
      rating: 4.8,
      level: 'Iniciante',
      progress: 100,
      topics: ['Berachot', 'Tefillá', 'Kavanah']
    },
    {
      id: 8,
      title: 'Mesilat Yesharim - O Caminho dos Justos',
      description: 'Estudo clássico de Mussar sobre os degraus do desenvolvimento espiritual segundo o Ramchal.',
      thumbnail: 'https://images.unsplash.com/photo-1613322004370-cb676b3ff91b',
      duration: '1:15:25',
      category: 'Ética',
      series: 'Mesilat Yesharim',
      episode: 1,
      views: 7800,
      rating: 5.0,
      level: 'Intermediário',
      isNew: true,
      topics: ['Mussar', 'Ramchal', 'Desenvolvimento Espiritual']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen, count: videos.length },
    { id: 'Torá', name: 'Torá', icon: BookOpen, count: videos.filter(v => v.category === 'Torá').length },
    { id: 'Halachá', name: 'Halachá', icon: BookOpen, count: videos.filter(v => v.category === 'Halachá').length },
    { id: 'Ética', name: 'Ética', icon: BookOpen, count: videos.filter(v => v.category === 'Ética').length },
    { id: 'Filosofia', name: 'Filosofia', icon: BookOpen, count: videos.filter(v => v.category === 'Filosofia').length },
    { id: 'Comentários', name: 'Comentários', icon: BookOpen, count: videos.filter(v => v.category === 'Comentários').length },
    { id: 'Tefillá', name: 'Tefillá', icon: BookOpen, count: videos.filter(v => v.category === 'Tefillá').length }
  ];

  const continueWatching = videos.filter(v => v.progress && v.progress > 0 && v.progress < 100);
  const newReleases = videos.filter(v => v.isNew);
  const popular = [...videos].sort((a, b) => b.views - a.views).slice(0, 6);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-700';
      case 'Intermediário': return 'bg-blue-100 text-blue-700';
      case 'Avançado': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const VideoCard = ({ video, size = 'normal' }: { video: Video; size?: 'small' | 'normal' | 'large' }) => {
    const cardWidth = size === 'large' ? 'w-full' : size === 'small' ? 'min-w-[200px]' : 'min-w-[280px]';
    
    return (
      <Card 
        className={`${cardWidth} group cursor-pointer overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:z-10 flex-shrink-0`}
        onClick={() => setSelectedVideo(video)}
      >
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          <ImageWithFallback
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {video.isNew && (
              <Badge className="bg-red-600 text-white">Novo</Badge>
            )}
            <Badge className={getLevelColor(video.level)}>
              {video.level}
            </Badge>
          </div>

          {/* Duration */}
          <div className="absolute bottom-2 right-2">
            <Badge className="bg-black/70 text-white">
              <Clock className="w-3 h-3 mr-1" />
              {video.duration}
            </Badge>
          </div>

          {/* Progress Bar */}
          {video.progress && video.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
              <div 
                className="h-full bg-red-600 transition-all"
                style={{ width: `${video.progress}%` }}
              />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-blue-950 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
            {video.rating && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm text-slate-600">{video.rating}</span>
              </div>
            )}
          </div>

          {video.series && (
            <p className="text-sm text-slate-600 mb-2">
              {video.series} - Episódio {video.episode}
            </p>
          )}

          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {video.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Users className="w-3 h-3" />
              <span>{video.views.toLocaleString()} visualizações</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('dashboard')}
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl text-white">Vídeo Aulas</h1>
                <p className="text-slate-400">Rabino Yosef</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Buscar aulas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={
                    selectedCategory === cat.id
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }
                >
                  <cat.icon className="w-4 h-4 mr-2" />
                  {cat.name}
                  <Badge className="ml-2 bg-slate-700 text-slate-200" variant="secondary">
                    {cat.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">Continue Assistindo</h2>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                Ver Todos
              </Button>
            </div>
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {continueWatching.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* New Releases */}
        {newReleases.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-red-500" />
                Lançamentos Recentes
              </h2>
            </div>
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {newReleases.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Popular */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500" />
              Mais Populares
            </h2>
          </div>
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {popular.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* All Videos / Filtered */}
        <div>
          <h2 className="text-2xl text-white mb-6">
            {selectedCategory === 'all' ? 'Todas as Aulas' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl text-slate-400 mb-2">Nenhuma aula encontrada</h3>
              <p className="text-slate-500">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={selectedVideo !== null} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-6xl p-0 bg-slate-950 border-slate-800">
          {selectedVideo && (
            <div>
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <ImageWithFallback
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button 
                    size="lg"
                    className="w-20 h-20 rounded-full bg-white/90 hover:bg-white"
                  >
                    <Play className="w-10 h-10 text-blue-600 ml-1" />
                  </Button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <div className="mb-2">
                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600"
                        style={{ width: `${selectedVideo.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                        <Play className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                        <Volume2 className="w-5 h-5" />
                      </Button>
                      <span className="text-white text-sm">
                        00:00 / {selectedVideo.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                        <Settings className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl text-white">{selectedVideo.title}</h2>
                      <Badge className={getLevelColor(selectedVideo.level)}>
                        {selectedVideo.level}
                      </Badge>
                    </div>
                    {selectedVideo.series && (
                      <p className="text-slate-400 mb-2">
                        {selectedVideo.series} - Episódio {selectedVideo.episode}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      <ThumbsUp className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{selectedVideo.rating} / 5.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedVideo.views.toLocaleString()} visualizações</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">
                  {selectedVideo.description}
                </p>

                <div className="mb-4">
                  <h3 className="text-white mb-2">Tópicos Abordados</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.topics.map((topic, idx) => (
                      <Badge key={idx} variant="outline" className="border-slate-700 text-slate-300">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Assistir Agora
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Adicionar à Lista
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
