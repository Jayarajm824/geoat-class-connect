import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentJoin from "./pages/StudentJoin";
import Classroom from "./pages/Classroom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  name: string;
  role: 'teacher' | 'student';
}

interface ClassData {
  id: string;
  subject: string;
  code: string;
  date: string;
  time: string;
  status?: 'upcoming' | 'live' | 'ended';
  studentCount?: number;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentClass, setCurrentClass] = useState<ClassData | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentClass(null);
  };

  const handleJoinClassroom = (classData: ClassData) => {
    setCurrentClass(classData);
  };

  const handleJoinClass = (classCode: string) => {
    // Mock class data lookup
    const mockClassData: ClassData = {
      id: '1',
      subject: classCode === 'ABX123' ? 'Advanced Mathematics' : 
              classCode === 'CDY456' ? 'Computer Science Fundamentals' :
              'Physics Laboratory',
      code: classCode,
      date: '2024-01-15',
      time: '10:00 AM'
    };
    
    setCurrentClass(mockClassData);
  };

  const handleLeaveClassroom = () => {
    setCurrentClass(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {!user ? (
              // Not logged in - show login
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            ) : currentClass ? (
              // In a classroom
              <Route 
                path="*" 
                element={
                  <Classroom 
                    user={user}
                    classData={currentClass}
                    onLogout={handleLogout}
                    onLeaveClassroom={handleLeaveClassroom}
                  />
                } 
              />
            ) : (
              // Logged in but not in class - show role-based dashboard
              <>
                <Route 
                  path="/" 
                  element={
                    user.role === 'teacher' ? (
                      <TeacherDashboard 
                        user={user}
                        onLogout={handleLogout}
                        onJoinClassroom={handleJoinClassroom}
                      />
                    ) : (
                      <StudentJoin 
                        user={user}
                        onLogout={handleLogout}
                        onJoinClass={handleJoinClass}
                      />
                    )
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
