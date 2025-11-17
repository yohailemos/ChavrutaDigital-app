import { useState } from "react";
import { Page } from "../App";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar as CalendarIcon, BookOpen, Users, Video, MessageCircle, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { Calendar } from "./ui/calendar";
import logo from "figma:asset/95773810f63523410c6487f3f4c240162a00d6bb.png";

interface CalendarViewProps {
  onNavigate: (page: Page) => void;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "chavruta" | "shiur" | "rabbi" | "video-class";
  partner?: string;
  location?: string;
  description?: string;
}

// Mock data de eventos
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Chavruta com Moshe Cohen",
    date: new Date(2025, 10, 16, 19, 0),
    startTime: "19:00",
    endTime: "20:30",
    type: "chavruta",
    partner: "Moshe Cohen",
    location: "Sala Virtual",
    description: "Estudo de Pirkei Avot - Capítulo 2"
  },
  {
    id: "2",
    title: "Shiur Semanal - Parashat Vayera",
    date: new Date(2025, 10, 18, 20, 0),
    startTime: "20:00",
    endTime: "21:00",
    type: "shiur",
    location: "Transmissão Ao Vivo",
    description: "Com Rabino Yosef"
  },
  {
    id: "3",
    title: "Consulta com Rabino",
    date: new Date(2025, 10, 17, 15, 0),
    startTime: "15:00",
    endTime: "15:30",
    type: "rabbi",
    location: "Videochamada",
    description: "Dúvidas sobre kashrut"
  },
  {
    id: "4",
    title: "Chavruta com Sarah Levy",
    date: new Date(2025, 10, 19, 18, 0),
    startTime: "18:00",
    endTime: "19:30",
    type: "chavruta",
    partner: "Sarah Levy",
    location: "Sala Virtual",
    description: "Estudo de Talmud - Tratado Berachot"
  },
  {
    id: "5",
    title: "Aula: Introdução ao Talmud",
    date: new Date(2025, 10, 20, 21, 0),
    startTime: "21:00",
    endTime: "22:00",
    type: "video-class",
    location: "Vídeo Aula",
    description: "Série Fundamentos - Episódio 3"
  },
  {
    id: "6",
    title: "Chavruta com Moshe Cohen",
    date: new Date(2025, 10, 20, 19, 0),
    startTime: "19:00",
    endTime: "20:30",
    type: "chavruta",
    partner: "Moshe Cohen",
    location: "Sala Virtual",
    description: "Continuação Pirkei Avot"
  },
  {
    id: "7",
    title: "Shiur Semanal - Chayei Sarah",
    date: new Date(2025, 10, 25, 20, 0),
    startTime: "20:00",
    endTime: "21:00",
    type: "shiur",
    location: "Transmissão Ao Vivo",
    description: "Com Rabino Yosef"
  },
];

export function CalendarView({ onNavigate }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Função para pegar eventos de uma data específica
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Função para pegar todos os eventos do mês
  const getEventsForMonth = (month: number, year: number) => {
    return mockEvents.filter(event => 
      event.date.getMonth() === month &&
      event.date.getFullYear() === year
    );
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const monthEvents = getEventsForMonth(currentMonth.getMonth(), currentMonth.getFullYear());

  // Determinar quais dias têm eventos
  const daysWithEvents = monthEvents.map(event => event.date.getDate());

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case "chavruta":
        return <Users className="w-4 h-4" />;
      case "shiur":
        return <Video className="w-4 h-4" />;
      case "rabbi":
        return <MessageCircle className="w-4 h-4" />;
      case "video-class":
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case "chavruta":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "shiur":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "rabbi":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "video-class":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getEventBadgeColor = (type: Event['type']) => {
    switch (type) {
      case "chavruta":
        return "bg-blue-500";
      case "shiur":
        return "bg-purple-500";
      case "rabbi":
        return "bg-amber-500";
      case "video-class":
        return "bg-green-500";
    }
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate("dashboard")}
            >
              ← Voltar
            </Button>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Chavruta Digital" className="w-10 h-10" />
              <span className="text-blue-950 text-lg">Chavruta Digital</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => onNavigate("schedule-session")}>
              + Agendar Sessão
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-blue-950">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={previousMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border w-full"
                classNames={{
                  months: "flex flex-col w-full",
                  month: "w-full space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-lg font-medium",
                  nav: "space-x-1 flex items-center",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex w-full",
                  head_cell: "text-slate-600 rounded-md w-full font-medium text-base text-center py-3",
                  row: "flex w-full mt-2",
                  cell: "text-center text-base p-0 relative flex-1",
                  day: "h-14 w-full text-base p-0 font-normal hover:bg-blue-50 rounded-md transition-colors",
                  day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white",
                  day_today: "bg-amber-50 text-amber-900 font-semibold border-2 border-amber-400",
                  day_outside: "text-slate-300",
                  day_disabled: "text-slate-300 opacity-50",
                }}
                modifiers={{
                  hasEvent: (date) => daysWithEvents.includes(date.getDate()) && 
                    date.getMonth() === currentMonth.getMonth()
                }}
                modifiersClassNames={{
                  hasEvent: "bg-blue-50 font-bold hover:bg-blue-100"
                }}
              />

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-slate-600">Chavruta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-slate-600">Shiur Semanal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-slate-600">Consulta Rabino</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-slate-600">Vídeo Aula</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Events for Selected Date */}
          <div>
            <Card className="p-6">
              <h3 className="text-lg text-blue-950 mb-4">
                Eventos - {selectedDate?.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
              </h3>

              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500">Nenhum evento agendado para este dia</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => onNavigate("schedule-session")}
                  >
                    Agendar Sessão
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border ${getEventColor(event.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded ${getEventBadgeColor(event.type)} text-white mt-1`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{event.title}</h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-3 h-3" />
                              <span>{event.startTime} - {event.endTime}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            {event.partner && (
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-3 h-3" />
                                <span>{event.partner}</span>
                              </div>
                            )}
                          </div>
                          {event.description && (
                            <p className="text-sm mt-2 opacity-80">{event.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg text-blue-950 mb-4">Próximos Eventos</h3>
              <div className="space-y-3">
                {mockEvents
                  .filter(event => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className={`p-1.5 rounded ${getEventBadgeColor(event.type)} text-white`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-slate-600">
                          {event.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} às {event.startTime}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
