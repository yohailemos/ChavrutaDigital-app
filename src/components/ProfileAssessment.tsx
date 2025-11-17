import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { 
  ChevronLeft,
  Star,
  BookOpen,
  GraduationCap,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Trophy,
  Languages
} from 'lucide-react';

interface ProfileAssessmentProps {
  onNavigate: (page: Page) => void;
}

interface AssessmentAnswer {
  questionId: number;
  answer: string | string[];
}

export function ProfileAssessment({ onNavigate }: ProfileAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'single' as const,
      title: 'Qual é seu nível atual de conhecimento judaico?',
      icon: GraduationCap,
      options: [
        { value: 'beginner', label: 'Iniciante', description: 'Pouco ou nenhum conhecimento formal' },
        { value: 'intermediate', label: 'Intermediário', description: 'Tenho conhecimento básico e experiência' },
        { value: 'advanced', label: 'Avançado', description: 'Estudo regularmente há anos' },
        { value: 'scholar', label: 'Estudioso', description: 'Conhecimento profundo e acadêmico' }
      ]
    },
    {
      id: 2,
      type: 'single' as const,
      title: 'Qual é seu nível de leitura em hebraico?',
      icon: Languages,
      options: [
        { value: 'none', label: 'Não leio hebraico', description: 'Preciso de transliteração' },
        { value: 'basic', label: 'Básico', description: 'Leio com dificuldade' },
        { value: 'intermediate', label: 'Intermediário', description: 'Leio com fluência moderada' },
        { value: 'fluent', label: 'Fluente', description: 'Leio e compreendo bem' }
      ]
    },
    {
      id: 3,
      type: 'multiple' as const,
      title: 'Quais áreas de estudo te interessam mais?',
      icon: BookOpen,
      options: [
        { value: 'torah', label: 'Torá e Chumash' },
        { value: 'mishna', label: 'Mishná' },
        { value: 'talmud', label: 'Talmud (Guemará)' },
        { value: 'halacha', label: 'Halachá (Lei Judaica)' },
        { value: 'kabbalah', label: 'Cabala e Misticismo' },
        { value: 'ethics', label: 'Ética (Pirkei Avot, Mussar)' },
        { value: 'philosophy', label: 'Filosofia Judaica' },
        { value: 'parasha', label: 'Parashat Hashavua' }
      ]
    },
    {
      id: 4,
      type: 'single' as const,
      title: 'Qual é seu objetivo principal de estudo?',
      icon: Target,
      options: [
        { value: 'personal', label: 'Crescimento Pessoal', description: 'Fortalecer conexão espiritual' },
        { value: 'conversion', label: 'Processo de Guiyur', description: 'Preparação para conversão' },
        { value: 'teshuva', label: 'Retorno (Baal Teshuva)', description: 'Aprofundar prática judaica' },
        { value: 'academic', label: 'Estudo Acadêmico', description: 'Conhecimento aprofundado e sistemático' },
        { value: 'community', label: 'Liderança Comunitária', description: 'Ensinar e guiar outros' }
      ]
    },
    {
      id: 5,
      type: 'single' as const,
      title: 'Quanto tempo você pode dedicar ao estudo diariamente?',
      icon: Star,
      options: [
        { value: '15min', label: '15-30 minutos', description: 'Estudo breve e focado' },
        { value: '30min', label: '30-60 minutos', description: 'Sessão de estudo regular' },
        { value: '1hour', label: '1-2 horas', description: 'Estudo aprofundado' },
        { value: '2hours', label: 'Mais de 2 horas', description: 'Dedicação intensiva' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;

  const handleSingleAnswer = (value: string) => {
    const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    newAnswers.push({ questionId: currentQuestion.id, answer: value });
    setAnswers(newAnswers);
  };

  const handleMultipleAnswer = (value: string, checked: boolean) => {
    const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
    let newAnswer: string[];

    if (existingAnswer) {
      newAnswer = Array.isArray(existingAnswer.answer) ? [...existingAnswer.answer] : [];
      if (checked) {
        newAnswer.push(value);
      } else {
        newAnswer = newAnswer.filter(v => v !== value);
      }
    } else {
      newAnswer = checked ? [value] : [];
    }

    const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    if (newAnswer.length > 0) {
      newAnswers.push({ questionId: currentQuestion.id, answer: newAnswer });
    }
    setAnswers(newAnswers);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id);
  };

  const isCurrentStepValid = () => {
    const answer = getCurrentAnswer();
    if (!answer) return false;
    if (Array.isArray(answer.answer)) {
      return answer.answer.length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateProfile = () => {
    const knowledgeAnswer = answers.find(a => a.questionId === 1)?.answer as string;
    const hebrewAnswer = answers.find(a => a.questionId === 2)?.answer as string;
    const interestsAnswer = answers.find(a => a.questionId === 3)?.answer as string[];
    const goalAnswer = answers.find(a => a.questionId === 4)?.answer as string;
    const timeAnswer = answers.find(a => a.questionId === 5)?.answer as string;

    let level = 'Iniciante';
    let levelColor = 'bg-green-500';
    
    if (knowledgeAnswer === 'advanced' || knowledgeAnswer === 'scholar') {
      level = 'Avançado';
      levelColor = 'bg-purple-500';
    } else if (knowledgeAnswer === 'intermediate') {
      level = 'Intermediário';
      levelColor = 'bg-blue-500';
    }

    const recommendations = [];
    
    if (interestsAnswer?.includes('torah') || interestsAnswer?.includes('parasha')) {
      recommendations.push('Estudo Semanal da Parashat Hashavua');
    }
    if (interestsAnswer?.includes('ethics')) {
      recommendations.push('Pirkei Avot com Chavrutas');
    }
    if (interestsAnswer?.includes('mishna')) {
      recommendations.push('Programa de Mishná Estruturado');
    }
    if (goalAnswer === 'conversion' || goalAnswer === 'teshuva') {
      recommendations.push('Trilha de Fundamentos do Judaísmo');
    }

    return { level, levelColor, recommendations };
  };

  if (completed) {
    const profile = calculateProfile();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <h1 className="text-2xl text-blue-950">Avaliação Completa!</h1>
                <p className="text-slate-600">Seu perfil foi criado com sucesso</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl text-blue-950 mb-2">Perfil Criado!</h2>
                <p className="text-lg text-slate-600">
                  Analisamos suas respostas e criamos um plano personalizado para você
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-blue-950">Seu Nível</h3>
                  <Badge className={`${profile.levelColor} text-white`}>
                    <Star className="w-4 h-4 mr-1" />
                    {profile.level}
                  </Badge>
                </div>
                <p className="text-slate-600">
                  Com base nas suas respostas, identificamos você como estudante de nível {profile.level.toLowerCase()}.
                  Recomendamos começar com textos e chavrutas compatíveis com este nível.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="text-xl text-blue-950 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Recomendações Personalizadas
                </h3>
                <div className="space-y-3">
                  {profile.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span className="text-slate-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl text-blue-950 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Próximos Passos
                </h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      1
                    </div>
                    <span className="text-slate-700">Encontre um chavruta compatível com seu nível</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      2
                    </div>
                    <span className="text-slate-700">Explore a biblioteca de textos recomendados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      3
                    </div>
                    <span className="text-slate-700">Faça o quiz diário para manter consistência</span>
                  </li>
                </ol>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => onNavigate('matchmaking')}
              >
                Encontrar Chavruta
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('dashboard')}
              >
                Ir para Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
              <h1 className="text-2xl text-blue-950">Avaliação de Nivelamento</h1>
              <p className="text-slate-600">Ajude-nos a personalizar sua experiência</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600">
                Etapa {currentStep + 1} de {totalSteps}
              </span>
              <span className="text-sm text-blue-950">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}% completo
              </span>
            </div>
            <Progress value={((currentStep + 1) / totalSteps) * 100} />
          </div>

          {/* Question Card */}
          <Card className="p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <currentQuestion.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl text-blue-950 flex-1">
                {currentQuestion.title}
              </h2>
            </div>

            {currentQuestion.type === 'single' ? (
              <RadioGroup 
                value={getCurrentAnswer()?.answer as string || ''}
                onValueChange={handleSingleAnswer}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                        getCurrentAnswer()?.answer === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        <div className="text-blue-950 mb-1">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-slate-600">{option.description}</div>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const currentAnswer = getCurrentAnswer();
                  const isChecked = Array.isArray(currentAnswer?.answer) && 
                    currentAnswer.answer.includes(option.value);
                  
                  return (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                        isChecked
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <Checkbox
                        id={option.value}
                        checked={isChecked}
                        onCheckedChange={(checked) => 
                          handleMultipleAnswer(option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer text-blue-950">
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {currentStep < totalSteps - 1 ? (
                <>
                  Próxima
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Finalizar
                  <CheckCircle2 className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
