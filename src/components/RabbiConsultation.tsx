import { useState } from 'react';
import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Avatar } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  ArrowLeft,
  Check,
  Video,
  MessageSquare,
  Heart,
  Scale,
  GraduationCap,
  Users,
  Star
} from 'lucide-react';
import rabbiPhoto from 'figma:asset/ce6f517a94c8da975ac49a914db2458f36447aec.png';

interface RabbiConsultationProps {
  onNavigate: (page: Page) => void;
}

type ConsultationType = 'spiritual' | 'halacha' | 'counseling' | 'conversion' | 'study' | 'general';
type Duration = '30' | '45' | '60';
type MeetingType = 'video' | 'phone' | 'in-person';

const consultationTypes = [
  { 
    id: 'spiritual' as ConsultationType, 
    label: 'Orientação Espiritual', 
    icon: Heart,
    description: 'Crescimento espiritual e conexão com a Torá'
  },
  { 
    id: 'halacha' as ConsultationType, 
    label: 'Questões de Halachá', 
    icon: Scale,
    description: 'Dúvidas sobre lei judaica e práticas'
  },
  { 
    id: 'counseling' as ConsultationType, 
    label: 'Aconselhamento', 
    icon: MessageSquare,
    description: 'Orientação pessoal e familiar'
  },
  { 
    id: 'conversion' as ConsultationType, 
    label: 'Processo de Guiyur', 
    icon: Users,
    description: 'Acompanhamento de conversão ao judaísmo'
  },
  { 
    id: 'study' as ConsultationType, 
    label: 'Orientação de Estudos', 
    icon: GraduationCap,
    description: 'Direcionamento e plano de estudos'
  },
  { 
    id: 'general' as ConsultationType, 
    label: 'Consulta Geral', 
    icon: BookOpen,
    description: 'Outras questões e orientações'
  }
];

const durations = [
  { id: '30' as Duration, label: '30 min', description: 'Consulta rápida' },
  { id: '45' as Duration, label: '45 min', description: 'Consulta padrão' },
  { id: '60' as Duration, label: '60 min', description: 'Consulta estendida' }
];

const meetingTypes = [
  { id: 'video' as MeetingType, label: 'Videochamada', icon: Video, available: true },
  { id: 'phone' as MeetingType, label: 'Telefone', icon: MessageSquare, available: true },
  { id: 'in-person' as MeetingType, label: 'Presencial', icon: Users, available: false }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '19:00', '20:00', '21:00'
];

export function RabbiConsultation({ onNavigate }: RabbiConsultationProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [consultationType, setConsultationType] = useState<ConsultationType | null>(null);
  const [duration, setDuration] = useState<Duration>('45');
  const [meetingType, setMeetingType] = useState<MeetingType>('video');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

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
        return consultationType !== null;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return true; // Notes são opcionais
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Rabbi Profile Header */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0 border-4 border-white">
              <ImageWithFallback 
                src={rabbiPhoto}
                alt="Rabino Yosef Yitzchak Solomon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl text-blue-950">Rabino Yosef Yitzchak Solomon</h1>
                <Badge className="bg-amber-500 text-white">Disponível</Badge>
              </div>
              <p className="text-slate-700 mb-4">
                Rabino Ortodoxo | Especialista em Torá, Halachá e Orientação Espiritual
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>15+ anos de experiência</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>500+ estudantes atendidos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Avaliação 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

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
                        ? 'bg-blue-600 border-blue-600'
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
                    {s === 3 && 'Detalhes'}
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

        {/* Step 1: Tipo de Consulta */}
        {step === 1 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Tipo de Consulta</h2>
              <p className="text-slate-600">Como o Rabino pode ajudá-lo?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {consultationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setConsultationType(type.id)}
                    className={`p-6 rounded-lg border-2 transition-all hover:shadow-md text-left ${
                      consultationType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        consultationType === type.id ? 'bg-blue-600' : 'bg-slate-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          consultationType === type.id ? 'text-white' : 'text-slate-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-blue-950 mb-1">{type.label}</div>
                        <p className="text-sm text-slate-600">{type.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-blue-950 mb-3 block">
                  Duração da Consulta
                </Label>
                <div className="space-y-2">
                  {durations.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDuration(d.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        duration === d.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-blue-950">{d.label}</div>
                          <div className="text-sm text-slate-600">{d.description}</div>
                        </div>
                        <Clock className="w-5 h-5 text-slate-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-blue-950 mb-3 block">
                  Tipo de Atendimento
                </Label>
                <div className="space-y-2">
                  {meetingTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => type.available && setMeetingType(type.id)}
                        disabled={!type.available}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          !type.available 
                            ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50' 
                            : meetingType === type.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-slate-600" />
                            <span className="text-blue-950">{type.label}</span>
                          </div>
                          {!type.available && (
                            <Badge variant="outline" className="text-xs">Em breve</Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Data e Horário */}
        {step === 2 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Data e Horário</h2>
              <p className="text-slate-600">Escolha a melhor data e horário para sua consulta</p>
            </div>

            <div className="mb-6">
              <Label className="text-blue-950 mb-3 block">Selecione a Data</Label>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {dates.map((date) => {
                  const dateStr = formatDate(date);
                  const display = formatDateDisplay(date);
                  const isToday = formatDate(new Date()) === dateStr;
                  const isFriday = date.getDay() === 5;
                  const isSaturday = date.getDay() === 6;
                  const isUnavailable = isSaturday; // Shabat não disponível
                  
                  return (
                    <button
                      key={dateStr}
                      onClick={() => !isUnavailable && setSelectedDate(dateStr)}
                      disabled={isUnavailable}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isUnavailable
                          ? 'opacity-40 cursor-not-allowed border-slate-200 bg-slate-50'
                          : selectedDate === dateStr
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-xs text-slate-600 mb-1">{display.day}</div>
                      <div className="text-lg text-blue-950">{display.date}</div>
                      <div className="text-xs text-slate-600">{display.month}</div>
                      {isToday && !isUnavailable && (
                        <Badge className="bg-green-500 text-white text-xs mt-1">Hoje</Badge>
                      )}
                      {isFriday && (
                        <Badge variant="outline" className="text-xs mt-1">Shabat</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label className="text-blue-950 mb-3 block">Selecione o Horário</Label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTime === time
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
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

        {/* Step 3: Detalhes */}
        {step === 3 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Informações Adicionais</h2>
              <p className="text-slate-600">Compartilhe detalhes sobre sua consulta (opcional)</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="notes" className="text-blue-950 mb-2 block">
                  Descreva brevemente o motivo da consulta
                </Label>
                <textarea
                  id="notes"
                  placeholder="Ex: Gostaria de orientação sobre minha jornada espiritual e como aprofundar meus estudos de Torá..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-sm text-slate-500 mt-2">
                  Esta informação ajudará o Rabino a se preparar melhor para o atendimento
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-950 mb-1">
                      Privacidade e Confidencialidade
                    </p>
                    <p className="text-sm text-slate-700">
                      Todas as consultas são estritamente confidenciais. Suas informações e conversas são protegidas e nunca serão compartilhadas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Confirmação */}
        {step === 4 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl text-blue-950 mb-2">Confirmar Consulta</h2>
              <p className="text-slate-600">Revise os detalhes da sua consulta com o Rabino</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-md flex-shrink-0 border-2 border-white">
                    <ImageWithFallback 
                      src={rabbiPhoto}
                      alt="Rabino Yosef Yitzchak Solomon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-blue-950 mb-1">Rabino Yosef Yitzchak Solomon</h3>
                    <p className="text-sm text-slate-600">Consulta Individual</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    {consultationType && (
                      (() => {
                        const Icon = consultationTypes.find(t => t.id === consultationType)?.icon || BookOpen;
                        return <Icon className="w-6 h-6 text-white" />;
                      })()
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 mb-1">Tipo de Consulta</h3>
                    <p className="text-slate-700">
                      {consultationTypes.find((t) => t.id === consultationType)?.label}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Duração: {durations.find((d) => d.id === duration)?.label} • {meetingTypes.find((m) => m.id === meetingType)?.label}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
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

              {notes && (
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-blue-950 mb-2">Suas Observações</h3>
                  <p className="text-slate-700 text-sm">{notes}</p>
                </div>
              )}

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-900">
                      Você receberá um e-mail de confirmação com o link para a {meetingTypes.find((m) => m.id === meetingType)?.label.toLowerCase()} e instruções para se preparar para a consulta
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
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              Continuar
            </Button>
          ) : (
            <Button
              onClick={handleSchedule}
              className="px-6 bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Consulta
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
