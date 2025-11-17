import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { 
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  Users,
  ArrowLeft,
  Check,
  Video,
  FileText,
  Sparkles
} from 'lucide-react';

interface ScheduleSessionProps {
  onNavigate: (page: Page) => void;
}

type StudyType = 'torah' | 'mishna' | 'talmud' | 'pirkei-avot' | 'halacha' | 'free';
type Duration = '30' | '60' | '90' | '120';
type PartnerOption = 'ai' | 'specific';

const studyTypes = [
  { id: 'torah' as StudyType, label: 'Torá', icon: '📖' },
  { id: 'mishna' as StudyType, label: 'Mishná', icon: '📚' },
  { id: 'talmud' as StudyType, label: 'Talmud', icon: '📜' },
  { id: 'pirkei-avot' as StudyType, label: 'Pirkei Avot', icon: '💭' },
  { id: 'halacha' as StudyType, label: 'Halachá', icon: '⚖️' },
  { id: 'free' as StudyType, label: 'Livre', icon: '✨' }
];

const durations = [
  { id: '30' as Duration, label: '30 min' },
  { id: '60' as Duration, label: '1 hora' },
  { id: '90' as Duration, label: '1h 30min' },
  { id: '120' as Duration, label: '2 horas' }
];

const suggestedPartners = [
  { id: '1', name: 'Rafael Mendelsohn', initials: 'RM', level: 'Intermediário', color: 'indigo' },
  { id: '2', name: 'Sarah Cohen', initials: 'SC', level: 'Avançado', color: 'purple' },
  { id: '3', name: 'Daniel Levy', initials: 'DL', level: 'Intermediário', color: 'blue' },
  { id: '4', name: 'Miriam Goldstein', initials: 'MG', level: 'Iniciante', color: 'green' }
];

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00', '22:00'
];

export function ScheduleSession({ onNavigate }: ScheduleSessionProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [studyType, setStudyType] = useState<StudyType | null>(null);
  const [duration, setDuration] = useState<Duration>('60');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [partnerOption, setPartnerOption] = useState<PartnerOption>('ai');
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>('');

  const handleContinue = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    } else {
      onNavigate('dashboard');
    }
  };

  const handleSchedule = () => {
    // Aqui seria a lógica para salvar o agendamento
    onNavigate('dashboard');
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return studyType !== null;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return partnerOption === 'ai' || (partnerOption === 'specific' && selectedPartner);
      case 4:
        return true;
      default:
        return false;
    }
  };

  // Gerar próximos 14 dias
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateDisplay = (date: Date) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const dates = generateDates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600" />
            <span className="text-blue-950">Chavruta Digital</span>
          </div>
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      s < step
                        ? 'bg-green-500 border-green-500'
                        : s === step
                        ? 'bg-amber-500 border-amber-500'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {s < step ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={`${
                          s === step ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {s}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-600 mt-2">
                    {s === 1 && 'Tipo'}
                    {s === 2 && 'Data/Hora'}
                    {s === 3 && 'Parceiro'}
                    {s === 4 && 'Confirmar'}
                  </span>
                </div>
                {s < 4 && (
                  <div
                    className={`h-0.5 flex-1 -mt-8 ${
                      s < step ? 'bg-green-500' : 'bg-slate-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Tipo de Estudo */}
        {step === 1 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Tipo de Estudo</h2>
              <p className="text-slate-600">Escolha o que você gostaria de estudar</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {studyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setStudyType(type.id)}
                  className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                    studyType === type.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <div className="text-blue-950">{type.label}</div>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <Label className="text-blue-950 mb-2 block">
                Duração da Sessão
              </Label>
              <div className="grid grid-cols-4 gap-3">
                {durations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      duration === d.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1 text-slate-600" />
                    <span className="text-sm text-blue-950">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="topic" className="text-blue-950 mb-2 block">
                Tópico Específico (Opcional)
              </Label>
              <input
                id="topic"
                type="text"
                placeholder="Ex: Bereshit 1:1-5, Berachot 2a, etc."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-sm text-slate-500 mt-1">
                Deixe em branco para escolher durante a sessão
              </p>
            </div>
          </Card>
        )}

        {/* Step 2: Data e Horário */}
        {step === 2 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Data e Horário</h2>
              <p className="text-slate-600">Quando você gostaria de estudar?</p>
            </div>

            <div className="mb-6">
              <Label className="text-blue-950 mb-3 block">Selecione a Data</Label>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {dates.map((date) => {
                  const dateStr = formatDate(date);
                  const display = formatDateDisplay(date);
                  const isToday = formatDate(new Date()) === dateStr;
                  
                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedDate === dateStr
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-xs text-slate-600 mb-1">{display.day}</div>
                      <div className="text-lg text-blue-950">{display.date}</div>
                      <div className="text-xs text-slate-600">{display.month}</div>
                      {isToday && (
                        <Badge className="bg-green-500 text-white text-xs mt-1">Hoje</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label className="text-blue-950 mb-3 block">Selecione o Horário</Label>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTime === time
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1 text-slate-600" />
                    <span className="text-sm text-blue-950">{time}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Parceiro */}
        {step === 3 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Parceiro de Estudo</h2>
              <p className="text-slate-600">Com quem você gostaria de estudar?</p>
            </div>

            <div className="space-y-4 mb-6">
              <button
                onClick={() => {
                  setPartnerOption('ai');
                  setSelectedPartner(null);
                }}
                className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                  partnerOption === 'ai'
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-blue-950">Deixar a IA Escolher</h3>
                      <Badge className="bg-amber-500 text-white">Recomendado</Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      Nossa IA encontrará o melhor parceiro baseado no seu nível, interesses e disponibilidade
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPartnerOption('specific')}
                className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                  partnerOption === 'specific'
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 mb-2">Escolher Parceiro Específico</h3>
                    <p className="text-sm text-slate-600">
                      Selecione um dos seus parceiros favoritos ou recentes
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {partnerOption === 'specific' && (
              <div className="space-y-3">
                <Label className="text-blue-950 mb-2 block">
                  Parceiros Sugeridos
                </Label>
                {suggestedPartners.map((partner) => (
                  <button
                    key={partner.id}
                    onClick={() => setSelectedPartner(partner.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPartner === partner.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={`bg-${partner.color}-500 text-white`}>
                          {partner.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-blue-950">{partner.name}</div>
                        <div className="text-sm text-slate-600">{partner.level}</div>
                      </div>
                      {selectedPartner === partner.id && (
                        <Check className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Step 4: Confirmação */}
        {step === 4 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Confirmar Agendamento</h2>
              <p className="text-slate-600">Revise os detalhes da sua sessão</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 mb-1">Tipo de Estudo</h3>
                    <p className="text-slate-700">
                      {studyTypes.find((t) => t.id === studyType)?.label} - {durations.find((d) => d.id === duration)?.label}
                    </p>
                    {topic && (
                      <p className="text-sm text-slate-600 mt-1">Tópico: {topic}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 mb-1">Data e Horário</h3>
                    <p className="text-slate-700">
                      {selectedDate && new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-slate-700">Às {selectedTime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 mb-1">Parceiro</h3>
                    {partnerOption === 'ai' ? (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <p className="text-slate-700">IA escolherá o melhor parceiro</p>
                      </div>
                    ) : (
                      <p className="text-slate-700">
                        {suggestedPartners.find((p) => p.id === selectedPartner)?.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-900">
                      Um link para a sala de estudo virtual será enviado por e-mail e estará disponível no seu dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 1 ? 'Cancelar' : 'Voltar'}
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleContinue}
              disabled={!canContinue()}
              className="px-6 bg-amber-600 hover:bg-amber-700"
            >
              Continuar
            </Button>
          ) : (
            <Button
              onClick={handleSchedule}
              className="px-6 bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Agendamento
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
