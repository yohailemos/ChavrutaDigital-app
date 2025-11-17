import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { PricingPage } from "./components/PricingPage";
import { Dashboard } from "./components/Dashboard";
import { StudyRoom } from "./components/StudyRoom";
import { TextLibrary } from "./components/TextLibrary";
import { Matchmaking } from "./components/Matchmaking";
import { Profile } from "./components/Profile";
import { DailyQuiz } from "./components/DailyQuiz";
import { ProfileAssessment } from "./components/ProfileAssessment";
import { VideoLibrary } from "./components/VideoLibrary";
import { ScheduleSession } from "./components/ScheduleSession";
import { RabbiConsultation } from "./components/RabbiConsultation";
import { WeeklyShiur } from "./components/WeeklyShiur";
import { CalendarView } from "./components/CalendarView";

export type Page =
  | "landing"
  | "pricing"
  | "dashboard"
  | "study-room"
  | "library"
  | "matchmaking"
  | "profile"
  | "daily-quiz"
  | "assessment"
  | "schedule-session"
  | "rabbi-consultation"
  | "weekly-shiur"
  | "calendar";

function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("pricing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("pricing");
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated && currentPage === "landing") {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (!isAuthenticated && currentPage === "pricing") {
    return <PricingPage onGetStarted={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {currentPage === "dashboard" && (
        <Dashboard
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}
      {currentPage === "study-room" && (
        <StudyRoom onNavigate={navigateTo} />
      )}
      {currentPage === "library" && (
        <TextLibrary onNavigate={navigateTo} />
      )}
      {currentPage === "matchmaking" && (
        <Matchmaking onNavigate={navigateTo} />
      )}
      {currentPage === "profile" && (
        <Profile onNavigate={navigateTo} />
      )}
      {currentPage === "daily-quiz" && (
        <DailyQuiz onNavigate={navigateTo} />
      )}
      {currentPage === "assessment" && (
        <ProfileAssessment onNavigate={navigateTo} />
      )}
      {currentPage === "schedule-session" && (
        <ScheduleSession onNavigate={navigateTo} />
      )}
      {currentPage === "rabbi-consultation" && (
        <RabbiConsultation onNavigate={navigateTo} />
      )}
      {currentPage === "weekly-shiur" && (
        <WeeklyShiur onNavigate={navigateTo} />
      )}
      {currentPage === "calendar" && (
        <CalendarView onNavigate={navigateTo} />
      )}
    </div>
  );
}

export default App;