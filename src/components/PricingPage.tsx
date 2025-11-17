import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  BookOpen,
  Users,
  Brain,
  Video,
  Trophy,
  Sparkles,
  Check,
  X,
  Star,
  Globe,
  Smartphone,
  MessageSquare,
  Calendar,
  Shield,
  Zap,
  Heart,
  ChevronDown,
  Play,
  Menu,
  ArrowRight,
  Search,
  Flame,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PricingPageProps {
  onGetStarted: () => void;
}

export function PricingPage({
  onGetStarted,
}: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<
    "monthly" | "annual"
  >("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Pareamento Inteligente",
      description:
        "IA conecta você com chavrutas ideais baseado em nível, interesses e disponibilidade",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: BookOpen,
      title: "Biblioteca Completa",
      description:
        "Acesso ilimitado a Torá, Mishná, Guemará e comentários clássicos autênticos",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Brain,
      title: "Assistente IA Especializado",
      description:
        "Explicações personalizadas, perguntas sugeridas e insights em tempo real",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Video,
      title: "Sala de Estudo Virtual",
      description:
        "Videochamadas integradas com textos sincronizados e chat em tempo real",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Trophy,
      title: "Gamificação Motivadora",
      description:
        "Conquistas, badges e sistema de níveis para manter você engajado",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Calendar,
      title: "Agendamento Flexível",
      description:
        "Calendário inteligente para coordenar sessões com seu chavruta",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  const plans = [
    {
      name: "Gratuito",
      subtitle: "Para começar sua jornada",
      priceMonthly: 0,
      priceAnnual: 0,
      popular: false,
      features: [
        {
          included: true,
          text: "Acesso a textos básicos da Torá",
        },
        {
          included: true,
          text: "3 sessões de chavruta por mês",
        },
        { included: true, text: "Assistente IA básico" },
        { included: true, text: "Gamificação e badges" },
        { included: false, text: "Biblioteca completa" },
        { included: false, text: "Sessões ilimitadas" },
        { included: false, text: "IA avançada" },
        { included: false, text: "Prioridade no pareamento" },
      ],
    },
    {
      name: "Premium",
      subtitle: "Para estudantes dedicados",
      priceMonthly: 77.0,
      priceAnnual: 61.70,
      popular: true,
      features: [
        {
          included: true,
          text: "Biblioteca completa de textos",
        },
        {
          included: true,
          text: "Sessões ilimitadas de chavruta",
        },
        { included: true, text: "Assistente IA avançado" },
        { included: true, text: "Gamificação completa" },
        { included: true, text: "Prioridade no pareamento" },
        { included: true, text: "Trilhas personalizadas" },
        { included: true, text: "Suporte prioritário" },
        { included: true, text: "Consultoria com rabinos" },
      ],
    },
    {
      name: "Institucional",
      subtitle: "Para comunidades e yeshivot",
      priceMonthly: 277.0,
      priceAnnual: 227.70,
      popular: false,
      features: [
        { included: true, text: "Tudo do plano Premium" },
        { included: true, text: "Até 50 usuários incluídos" },
        { included: true, text: "Dashboard administrativo" },
        { included: true, text: "Consultoria com rabinos" },
        { included: true, text: "Conteúdo personalizado" },
        { included: true, text: "Relatórios de progresso" },
        { included: true, text: "Integração com eventos" },
        { included: true, text: "Suporte dedicado 24/7" },
      ],
    },
  ];

  const testimonials = [
    {
      name: "Rabbi David Cohen",
      role: "Rabino e Educador",
      community: "Comunidade Shalom, SP",
      text: "A Chavruta Digital revolucionou a forma como nossa comunidade estuda Torá. O pareamento por IA é incrivelmente preciso e os recursos educacionais são autênticos e profundos.",
      rating: 5,
      image: "DC",
    },
    {
      name: "Sarah Goldstein",
      role: "Baala Teshuvá",
      community: "Rio de Janeiro",
      text: "Como alguém em processo de retorno, encontrar um chavruta adequado ao meu nível era impossível. Esta plataforma mudou minha vida judaica completamente!",
      rating: 5,
      image: "SG",
    },
    {
      name: "Moshe Levi",
      role: "Estudante de Yeshivá",
      community: "Beit Midrash Online",
      text: "A biblioteca de textos é impressionante e o assistente de IA realmente entende os conceitos do Talmud. Uma ferramenta essencial para qualquer estudioso.",
      rating: 5,
      image: "ML",
    },
  ];

  const faqs = [
    {
      question: "Como funciona o pareamento de chavruta?",
      answer:
        "Nossa IA analisa seu perfil, nível de conhecimento, interesses e disponibilidade para sugerir os parceiros de estudo mais compatíveis. Você pode aceitar, recusar ou ajustar preferências a qualquer momento.",
    },
    {
      question: "Os textos são autênticos e confiáveis?",
      answer:
        "Sim! Trabalhamos com rabinos e estudiosos para garantir que todos os textos, traduções e comentários sejam autênticos e fiéis às fontes originais. Nossa biblioteca inclui edições certificadas e aprovadas.",
    },
    {
      question: "Posso usar em dispositivos móveis?",
      answer:
        "Absolutamente! A Chavruta Digital é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Em breve lançaremos apps nativos para iOS e Android.",
    },
    {
      question: "O assistente de IA substitui um rabino?",
      answer:
        "Não. O assistente de IA é uma ferramenta educacional complementar que ajuda com explicações, perguntas e insights. Para questões halachicas ou orientação religiosa, sempre consulte um rabino qualificado.",
    },
    {
      question: "Como funciona a privacidade dos dados?",
      answer:
        "Levamos a privacidade muito a sério. Seus dados são criptografados, nunca compartilhados com terceiros, e você tem controle total sobre o que aparece em seu perfil. Não coletamos informações sensíveis ou pessoais além do necessário.",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim! Não há contratos de longo prazo. Você pode cancelar sua assinatura a qualquer momento e continuará tendo acesso até o final do período pago.",
    },
  ];

  const stats = [
    { number: "12,000+", label: "Estudantes Ativos" },
    { number: "45,000+", label: "Sessões Realizadas" },
    { number: "98%", label: "Satisfação" },
    { number: "150+", label: "Comunidades" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              <span className="text-xl text-blue-950">
                Chavruta Digital
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Recursos
              </a>
              <a
                href="#screenshots"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Aplicativo
              </a>
              <a
                href="#pricing"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Preços
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Depoimentos
              </a>
              <a
                href="#faq"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={onGetStarted}>
                Entrar
              </Button>
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-blue-950"
                onClick={onGetStarted}
              >
                Começar Grátis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col gap-3">
                <a
                  href="#features"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2"
                >
                  Recursos
                </a>
                <a
                  href="#screenshots"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2"
                >
                  Aplicativo
                </a>
                <a
                  href="#pricing"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2"
                >
                  Preços
                </a>
                <a
                  href="#testimonials"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2"
                >
                  Depoimentos
                </a>
                <a
                  href="#faq"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2"
                >
                  FAQ
                </a>
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-blue-950 w-full mt-2"
                  onClick={onGetStarted}
                >
                  Começar Grátis
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6bS0yIDJ2LTJoLTJ2Mmgyem0wLTR2Mmgydi0yaC0yem0tMiAwdi0yaC0ydjJoMnptMCAyaC0ydjJoMnYtMnptLTQgMHYyaDJ2LTJoLTJ6bTAgNGgydi0yaC0ydjJ6bTItNGgtMnYtMmgydjJ6bTAtNHYyaDJ2LTJoLTJ6bS0yLTJ2Mmgydi0yaC0yem0wIDRoLTJ2LTJoMnYyem0tNCAwdjJoMnYtMmgtMnptMC00aDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Plataforma Líder em Estudo Judaico Digital
            </Badge>

            <h1 className="text-5xl md:text-6xl text-white mb-6">
              Transforme seu Estudo da Torá com{" "}
              <span className="text-amber-400">
                Tecnologia de IA
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-8">
              A única plataforma que une o método tradicional
              chavruta com inteligência artificial avançada.
              Estude mais, aprenda melhor, conecte-se
              profundamente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-blue-950 text-lg px-8"
                onClick={onGetStarted}
              >
                Começar Gratuitamente
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl text-amber-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl text-blue-950 mb-4">
              Tudo que você precisa para estudar Torá
            </h2>
            <p className="text-xl text-slate-600">
              Recursos desenvolvidos especificamente para o
              aprendizado judaico autêntico
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${feature.color}`}
                  />
                </div>
                <h3 className="text-xl text-blue-950 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshots Section */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
        id="screenshots"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              <Smartphone className="w-4 h-4 mr-2" />
              Conheça o Aplicativo
            </Badge>
            <h2 className="text-4xl text-blue-950 mb-4">
              Interface Intuitiva e Moderna
            </h2>
            <p className="text-xl text-slate-600">
              Experiência de usuário cuidadosamente projetada
              para facilitar seu estudo
            </p>
          </div>

          <Tabs
            defaultValue="dashboard"
            className="max-w-6xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="dashboard">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="library">
                Biblioteca
              </TabsTrigger>
              <TabsTrigger value="study">
                Sala de Estudo
              </TabsTrigger>
              <TabsTrigger value="matchmaking">
                Pareamento
              </TabsTrigger>
              <TabsTrigger value="profile">Perfil</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-0">
              <Card className="overflow-hidden bg-white shadow-2xl">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-white text-sm">
                    Dashboard - Chavruta Digital
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50">
                  <div className="mb-6">
                    <h3 className="text-2xl text-blue-950 mb-2">
                      Shalom, David! 👋
                    </h3>
                    <p className="text-slate-600">
                      Bem-vindo de volta ao seu espaço de estudo
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      {
                        label: "Sequência",
                        value: "12 dias",
                        icon: Flame,
                        color: "orange",
                      },
                      {
                        label: "Horas",
                        value: "47h",
                        icon: Clock,
                        color: "blue",
                      },
                      {
                        label: "Badges",
                        value: "8",
                        icon: Trophy,
                        color: "amber",
                      },
                      {
                        label: "Nível",
                        value: "3",
                        icon: Star,
                        color: "purple",
                      },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-600">
                            {stat.label}
                          </span>
                          <stat.icon
                            className={`w-4 h-4 text-${stat.color}-500`}
                          />
                        </div>
                        <div className="text-xl text-blue-950">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-blue-950 mb-1">
                          Sessão Agendada
                        </h4>
                        <p className="text-sm text-slate-600">
                          Próxima sessão com seu chavruta
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        Hoje às 19:00
                      </Badge>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                          RM
                        </div>
                        <div>
                          <div className="text-sm text-blue-950">
                            Rafael Mendelsohn
                          </div>
                          <div className="text-xs text-slate-600">
                            Mishná - Tratado Berachot
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Video className="w-4 h-4 mr-2" />
                        Entrar na Sala de Estudo
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              <p className="text-center text-slate-600 mt-6">
                Dashboard completo com métricas, conquistas e
                sessões agendadas
              </p>
            </TabsContent>

            <TabsContent value="library" className="mt-0">
              <Card className="overflow-hidden bg-white shadow-2xl">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-white text-sm">
                    Biblioteca de Textos Sagrados
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-purple-50">
                  <div className="mb-6">
                    <h3 className="text-2xl text-blue-950 mb-2">
                      Biblioteca Completa
                    </h3>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Search className="w-5 h-5" />
                        <span className="text-sm">
                          Buscar textos, comentários ou
                          tópicos...
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { title: "Torá", icon: "📜", texts: 5 },
                      {
                        title: "Mishná",
                        icon: "📖",
                        texts: 63,
                      },
                      {
                        title: "Guemará",
                        icon: "📚",
                        texts: 37,
                      },
                      {
                        title: "Rashi",
                        icon: "✨",
                        texts: "Completo",
                      },
                      {
                        title: "Rambam",
                        icon: "⭐",
                        texts: "14 Livros",
                      },
                      {
                        title: "Pirkei Avot",
                        icon: "💎",
                        texts: "6 Cap.",
                      },
                    ].map((category, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="text-3xl mb-2">
                          {category.icon}
                        </div>
                        <h4 className="text-blue-950 mb-1">
                          {category.title}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {category.texts} textos
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
                        >
                          Explorar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              <p className="text-center text-slate-600 mt-6">
                Acesso completo a todos os textos sagrados com
                comentários autênticos
              </p>
            </TabsContent>

            <TabsContent value="study" className="mt-0">
              <Card className="overflow-hidden bg-white shadow-2xl">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-white text-sm">
                    Sala de Estudo Virtual
                  </div>
                </div>
                <div className="p-8 bg-slate-900">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg p-6 aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl">
                          RM
                        </div>
                        <div className="text-white text-sm">
                          Rafael Mendelsohn
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl">
                          DS
                        </div>
                        <div className="text-white text-sm">
                          Você
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-6">
                    <div className="text-right mb-3" dir="rtl">
                      <p className="text-lg text-white">
                        מֵאֵימָתַי קוֹרִין אֶת שְׁמַע
                        בְּעַרְבִית
                      </p>
                    </div>
                    <div className="text-slate-300 text-sm">
                      Desde quando se recita o Shemá à noite?
                      Desde a hora em que os sacerdotes...
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-500 text-amber-400"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Assistente IA
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500 text-blue-400"
                      >
                        Comentários
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              <p className="text-center text-slate-600 mt-6">
                Videochamada integrada com textos sincronizados
                e assistente de IA
              </p>
            </TabsContent>

            <TabsContent value="matchmaking" className="mt-0">
              <Card className="overflow-hidden bg-white shadow-2xl">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-white text-sm">
                    Encontre seu Chavruta
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-amber-50">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6 border border-purple-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-blue-950 mb-1">
                          Pareamento Inteligente Ativado
                        </h4>
                        <p className="text-sm text-slate-600 mb-2">
                          Nossa IA analisou seu perfil para
                          encontrar os melhores parceiros
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-purple-100 text-purple-700 text-xs">
                            Compatibilidade: 95%
                          </Badge>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Horários alinhados
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-lg -m-6 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Compatibilidade IA
                        </span>
                        <span className="text-2xl">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                        SC
                      </div>
                      <div>
                        <h4 className="text-xl text-blue-950">
                          Sarah Cohen
                        </h4>
                        <p className="text-sm text-slate-600">
                          São Paulo, Brasil • Intermediário
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mb-4">
                      Baala teshuvá há 3 anos, apaixonada por
                      Pirkei Avot e buscando aprofundar estudo
                      de Mishná.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-700">
                        Mishná
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        Pirkei Avot
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700">
                        Português
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="border-2"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Pular
                      </Button>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Heart className="w-4 h-4 mr-1" />
                        Conectar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              <p className="text-center text-slate-600 mt-6">
                Encontre parceiros de estudo perfeitos com
                inteligência artificial
              </p>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <Card className="overflow-hidden bg-white shadow-2xl">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-white text-sm">
                    Meu Perfil
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-indigo-50">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl">
                      DS
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl text-blue-950">
                          David Silverman
                        </h3>
                        <Badge className="bg-purple-100 text-purple-700">
                          <Star className="w-3 h-3 mr-1" />
                          Nível 3
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        São Paulo, Brasil • Membro desde Mar
                        2025
                      </p>
                      <div className="grid grid-cols-4 gap-4">
                        {[
                          { label: "Horas", value: "47" },
                          { label: "Sequência", value: "12d" },
                          { label: "Sessões", value: "23" },
                          { label: "Badges", value: "8" },
                        ].map((stat, idx) => (
                          <div key={idx}>
                            <div className="text-xl text-blue-950">
                              {stat.value}
                            </div>
                            <div className="text-xs text-slate-600">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="text-blue-950 mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      Conquistas Recentes
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          icon: Flame,
                          name: "Sequência 10 Dias",
                          color: "bg-orange-500",
                        },
                        {
                          icon: BookOpen,
                          name: "Primeiro Tratado",
                          color: "bg-blue-500",
                        },
                        {
                          icon: Star,
                          name: "Nível 3",
                          color: "bg-purple-500",
                        },
                      ].map((achievement, idx) => (
                        <div key={idx} className="text-center">
                          <div
                            className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                          >
                            <achievement.icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-xs text-slate-600">
                            {achievement.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              <p className="text-center text-slate-600 mt-6">
                Acompanhe seu progresso, conquistas e
                estatísticas detalhadas
              </p>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onGetStarted}
            >
              Experimentar Gratuitamente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl text-blue-950 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-slate-600">
              Em 3 passos simples você estará estudando com seu
              chavruta ideal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl text-blue-950 mb-3">
                Crie seu Perfil
              </h3>
              <p className="text-slate-600">
                Informe seu nível de conhecimento, interesses e
                disponibilidade. Nossa IA analisará seu perfil.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl text-blue-950 mb-3">
                Encontre seu Chavruta
              </h3>
              <p className="text-slate-600">
                Receba sugestões personalizadas de parceiros de
                estudo compatíveis com você.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl text-blue-950 mb-3">
                Comece a Estudar
              </h3>
              <p className="text-slate-600">
                Agende sessões, acesse textos sagrados e estude
                com orientação de IA em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl text-blue-950 mb-4">
              Planos para Todos os Níveis
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Escolha o plano ideal para sua jornada de estudo
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-md">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === "annual"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                Anual
                <Badge className="ml-2 bg-green-500 text-white">
                  -20%
                </Badge>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 relative ${
                  plan.popular
                    ? "border-2 border-amber-500 shadow-2xl scale-105"
                    : "shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl text-blue-950 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {plan.subtitle}
                  </p>

                  <div className="mb-2">
                    <span className="text-5xl text-blue-950">
                      R${" "}
                      {billingCycle === "monthly"
                        ? plan.priceMonthly
                        : plan.priceAnnual}
                    </span>
                    <span className="text-slate-600">/mês</span>
                  </div>

                  {billingCycle === "annual" &&
                    plan.priceAnnual > 0 && (
                      <p className="text-sm text-green-600">
                        Economize R${" "}
                        {(
                          (plan.priceMonthly -
                            plan.priceAnnual) *
                          12
                        ).toFixed(2)}
                        /ano
                      </p>
                    )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <div
                      key={featureIdx}
                      className="flex items-start gap-3"
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-slate-700"
                            : "text-slate-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                  size="lg"
                  onClick={onGetStarted}
                >
                  {plan.priceMonthly === 0
                    ? "Começar Grátis"
                    : "Assinar Agora"}
                </Button>
              </Card>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-8">
            💳 Aceitamos cartão de crédito, PIX e boleto
            bancário • 🔒 Pagamento 100% seguro
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
        id="testimonials"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl text-blue-950 mb-4">
              O Que Dizem Nossos Usuários
            </h2>
            <p className="text-xl text-slate-600">
              Milhares de pessoas já transformaram seu estudo da
              Torá
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 bg-white">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ),
                  )}
                </div>

                <p className="text-slate-700 mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="text-blue-950">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-slate-500">
                      {testimonial.community}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="text-blue-950 mb-1">
                Seguro e Privado
              </h4>
              <p className="text-sm text-slate-600">
                Dados criptografados
              </p>
            </div>
            <div>
              <Globe className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="text-blue-950 mb-1">Global</h4>
              <p className="text-sm text-slate-600">
                50+ países
              </p>
            </div>
            <div>
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h4 className="text-blue-950 mb-1">Autêntico</h4>
              <p className="text-sm text-slate-600">
                Aprovado por rabinos
              </p>
            </div>
            <div>
              <Zap className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h4 className="text-blue-950 mb-1">Rápido</h4>
              <p className="text-sm text-slate-600">
                Suporte 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" id="faq">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl text-blue-950 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-slate-600">
              Tire suas dúvidas sobre a plataforma
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="overflow-hidden">
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === idx ? null : idx)
                  }
                  className="w-full p-6 flex justify-between items-center hover:bg-slate-50 transition-colors text-left"
                >
                  <span className="text-blue-950 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Pronto para Transformar seu Estudo da Torá?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Junte-se a milhares de estudantes que já
              descobriram uma nova forma de aprender
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 text-lg px-12"
              onClick={onGetStarted}
            >
              Começar Gratuitamente Agora
            </Button>
            <p className="text-sm text-blue-200 mt-4">
              ✨ Sem cartão de crédito necessário • Cancele
              quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-amber-400" />
                <span className="text-white text-lg">
                  Chavruta Digital
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Conectando pessoas ao estudo sagrado da Torá
                através da tecnologia.
              </p>
            </div>

            <div>
              <h4 className="text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-amber-400"
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Demonstração
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Comunidade</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Parceiros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Rabinos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>
              © 2025 Chavruta Digital. Todos os direitos
              reservados.
            </p>
            <p className="mt-2">
              Desenvolvido com ❤️ para fortalecer a identidade e
              educação judaica
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}