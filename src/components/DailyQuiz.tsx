import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  ChevronLeft,
  Brain,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  Calendar,
  Flame,
  ArrowRight
} from 'lucide-react';

interface DailyQuizProps {
  onNavigate: (page: Page) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

export function DailyQuiz({ onNavigate }: DailyQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Qual é o primeiro mandamento (mitzvá) dado na Torá?',
      options: [
        'Não matarás',
        'Honra teu pai e tua mãe',
        'Sejam frutíferos e multipliquem-se',
        'Guardar o Shabat'
      ],
      correctAnswer: 2,
      explanation: 'O primeiro mandamento dado na Torá é "Sejam frutíferos e multipliquem-se" (פְּרוּ וּרְבוּ), dado a Adão e Eva em Bereshit 1:28.',
      category: 'Torá',
      difficulty: 'Médio'
    },
    {
      id: 2,
      question: 'Quantas bênçãos são recitadas diariamente na Amidá em dias de semana?',
      options: [
        '7 bênçãos',
        '13 bênçãos',
        '18 bênçãos',
        '19 bênçãos'
      ],
      correctAnswer: 3,
      explanation: 'A Amidá (Shemoná Esrê) contém 19 bênçãos em dias de semana. Originalmente eram 18, mas uma 19ª foi adicionada posteriormente.',
      category: 'Tefillá',
      difficulty: 'Médio'
    },
    {
      id: 3,
      question: 'Segundo Pirkei Avot, quem é considerado rico?',
      options: [
        'Quem possui muitas terras',
        'Quem se alegra com sua porção',
        'Quem tem muitos filhos',
        'Quem conhece toda a Torá'
      ],
      correctAnswer: 1,
      explanation: 'Em Pirkei Avot 4:1, ensina-se: "Quem é rico? Aquele que se alegra com sua porção" (איזהו עשיר? השמח בחלקו).',
      category: 'Ética',
      difficulty: 'Fácil'
    },
    {
      id: 4,
      question: 'Qual é o nome hebraico para o Êxodo?',
      options: [
        'Bereshit',
        'Shemot',
        'Vayikra',
        'Devarim'
      ],
      correctAnswer: 1,
      explanation: 'Shemot (שְׁמוֹת) significa "nomes" e é o nome hebraico do segundo livro da Torá, conhecido em português como Êxodo.',
      category: 'Torá',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      question: 'Quantas porções (sidrot) de leitura da Torá existem no ciclo anual?',
      options: [
        '50',
        '52',
        '54',
        '56'
      ],
      correctAnswer: 2,
      explanation: 'Existem 54 porções semanais (parashat hashavua) no ciclo anual de leitura da Torá, embora algumas sejam combinadas em certos anos.',
      category: 'Torá',
      difficulty: 'Difícil'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return 'Perfeito! Você é um verdadeiro estudioso! 🎉';
    if (percentage >= 80) return 'Excelente! Continue assim! 🌟';
    if (percentage >= 60) return 'Muito bom! Continue estudando! 📚';
    if (percentage >= 40) return 'Bom começo! Pratique mais! 💪';
    return 'Continue estudando e você melhorará! 📖';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-700';
      case 'Médio': return 'bg-blue-100 text-blue-700';
      case 'Difícil': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (quizCompleted) {
    const percentage = (score / totalQuestions) * 100;
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
                <h1 className="text-2xl text-blue-950">Quiz Diário Completo!</h1>
                <p className="text-slate-600">Parabéns por completar o desafio</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl text-blue-950 mb-4">
                {getScoreMessage()}
              </h2>

              <div className="mb-8">
                <div className="text-6xl text-blue-950 mb-2">
                  {score}/{totalQuestions}
                </div>
                <p className="text-xl text-slate-600">
                  {percentage}% de acertos
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="text-blue-950 mb-4">Conquistas Desbloqueadas</h3>
                <div className="grid grid-cols-3 gap-4">
                  {percentage >= 80 && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-xs text-slate-600">Mestre do Quiz</p>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs text-slate-600">Quiz Completo</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs text-slate-600">Dia de Estudo</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setQuizCompleted(false);
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setAnsweredQuestions([]);
                  }}
                >
                  Fazer Novamente
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate('dashboard')}
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <h1 className="text-2xl text-blue-950">Quiz Diário</h1>
                <p className="text-slate-600">Teste seus conhecimentos judaicos</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-700">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600">
                Pergunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
              <span className="text-sm text-blue-950">
                Pontuação: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
              </span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} />
          </div>

          {/* Question Card */}
          <Card className="p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="border-blue-500 text-blue-700">
                    {currentQuestion.category}
                  </Badge>
                  <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <h2 className="text-2xl text-blue-950 mb-6">
                  {currentQuestion.question}
                </h2>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const showCorrectAnswer = showResult && isCorrect;
                  const showWrongAnswer = showResult && isSelected && !isCorrect;

                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                        showCorrectAnswer
                          ? 'border-green-500 bg-green-50'
                          : showWrongAnswer
                          ? 'border-red-500 bg-red-50'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showResult} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-blue-950"
                      >
                        {option}
                      </Label>
                      {showCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {showWrongAnswer && <XCircle className="w-5 h-5 text-red-600" />}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-blue-950 mb-2">Explicação</h4>
                    <p className="text-slate-700">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!showResult ? (
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={selectedAnswer === null}
                onClick={handleSubmitAnswer}
              >
                Verificar Resposta
              </Button>
            ) : (
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <>
                    Próxima Pergunta
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Ver Resultado Final
                    <Trophy className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
