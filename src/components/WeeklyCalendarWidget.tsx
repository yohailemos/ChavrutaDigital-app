import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, Video, MessageCircle, BookOpen, ChevronRight } from "lucide-react";
import { Page } from "../App";

interface WeeklyCalendarWidgetProps {
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
}

// Mock data - próximos 7 dias
const getWeekEvents = (): Event[] => {
  const today = new Date();
  const events: Event[] = [
    {
      id: "1",
      title: "Chavruta com Moshe",
      date: new Date(2025, 10, 16, 19, 0),
      startTime: "19:00",
      endTime: "20:30",
      type: "chavruta",
      partner: "Moshe Cohen"
    },
    {
      id: "2",
      title: "Consulta Rabino",
      date: new Date(2025, 10, 17, 15, 0),
      startTime: "15:00",
      endTime: "15:30",
      type: "rabbi"
    },
    {
      id: "3",
      title: "Shiur Semanal",
      date: new Date(2025, 10, 18, 20, 0),
      startTime: "20:00",
      endTime: "21:00",
      type: "shiur"
    },
    {
      id: "4",
      title: "Chavruta com Sarah",
      date: new Date(2025, 10, 19, 18, 0),
      startTime: "18:00",
      endTime: "19:30",
      type: "chavruta",
      partner: "Sarah Levy"
    },
    {
      id: "5",
      title: "Aula: Intro Talmud",
      date: new Date(2025, 10, 20, 21, 0),
      startTime: "21:00",
      endTime: "22:00",
      type: "video-class"
    },
    {
      id: "6",
      title: "Chavruta com Moshe",
      date: new Date(2025, 10, 20, 19, 0),
      startTime: "19:00",
      endTime: "20:30",
      type: "chavruta",
      partner: "Moshe Cohen"
    }
  ];

  return events;
};

export function WeeklyCalendarWidget({ onNavigate }: WeeklyCalendarWidgetProps) {
  const weekEvents = getWeekEvents();
  
  // Agrupar eventos por dia
  const eventsByDay = weekEvents.reduce((acc, event) => {
    const dateKey = event.date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short' 
    });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case "chavruta":
        return <Users className="w-3 h-3" />;
      case "shiur":
        return <Video className="w-3 h-3" />;
      case "rabbi":
        return <MessageCircle className="w-3 h-3" />;
      case "video-class":
        return <BookOpen className="w-3 h-3" />;
    }
  };

  const getEventColor = (type: Event['type']) => {
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

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear();
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Hoje";
    if (isTomorrow(date)) return "Amanhã";
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-blue-950">Esta Semana</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onNavigate("calendar")}
        >
          Ver Tudo
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {weekEvents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500 mb-4">Nenhum evento agendado esta semana</p>
          <Button 
            variant="outline"
            onClick={() => onNavigate("schedule-session")}
          >
            Agendar Sessão
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(eventsByDay).map(([dateKey, events]) => {
            const firstEvent = events[0];
            return (
              <div key={dateKey} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isToday(firstEvent.date) ? 'bg-blue-500' : 'bg-slate-300'
                  }`}></div>
                  <span className={`text-sm ${
                    isToday(firstEvent.date) ? 'text-blue-600 font-medium' : 'text-slate-600'
                  }`}>
                    {getDateLabel(firstEvent.date)}
                  </span>
                </div>
                
                <div className="ml-4 space-y-2">
                  {events.map((event) => (
                    <div 
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
                    >
                      <div className={`p-1.5 rounded ${getEventColor(event.type)} text-white mt-0.5`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-blue-950 truncate">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-600">
                            {event.startTime} - {event.endTime}
                          </span>
                          {event.partner && (
                            <>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-600 truncate">
                                {event.partner}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {weekEvents.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Total esta semana:</span>
            <Badge variant="secondary">{weekEvents.length} eventos</Badge>
          </div>
        </div>
      )}
    </Card>
  );
}
