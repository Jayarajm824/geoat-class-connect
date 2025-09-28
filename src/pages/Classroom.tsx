import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  UserCheck, 
  Clock, 
  Play, 
  Square,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  avatar?: string;
  isPresent: boolean;
  joinedAt?: string;
  micEnabled: boolean;
  videoEnabled: boolean;
}

interface ClassroomProps {
  user: { name: string; role: 'teacher' | 'student' };
  classData: {
    id: string;
    subject: string;
    code: string;
    date: string;
    time: string;
  };
  onLogout: () => void;
  onLeaveClassroom: () => void;
}

const Classroom = ({ user, classData, onLogout, onLeaveClassroom }: ClassroomProps) => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Jayaraj',
      isPresent: true,
      joinedAt: '10:05 AM',
      micEnabled: true,
      videoEnabled: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      isPresent: true,
      joinedAt: '10:03 AM',
      micEnabled: false,
      videoEnabled: true
    },
    {
      id: '3',
      name: 'Arjun Kumar',
      isPresent: true,
      joinedAt: '10:07 AM',
      micEnabled: true,
      videoEnabled: false
    },
    {
      id: '4',
      name: 'Ananya Reddy',
      isPresent: true,
      joinedAt: '10:02 AM',
      micEnabled: true,
      videoEnabled: true
    },
    {
      id: '5',
      name: 'Rahul Gupta',
      isPresent: true,
      joinedAt: '10:09 AM',
      micEnabled: false,
      videoEnabled: true
    }
  ]);
  
  const [attendanceActive, setAttendanceActive] = useState(false);
  const [classStarted, setClassStarted] = useState(true);
  const [userMediaEnabled, setUserMediaEnabled] = useState({
    mic: true,
    video: true
  });

  const handleStartAttendance = () => {
    setAttendanceActive(true);
    toast({
      title: "📋 Attendance Started",
      description: "Students can now mark their attendance",
    });
    
    // Auto-end attendance after 30 seconds (demo)
    setTimeout(() => {
      setAttendanceActive(false);
      toast({
        title: "✅ Attendance Completed",
        description: `${students.filter(s => s.isPresent).length} students marked present`,
      });
    }, 30000);
  };

  const handleEndAttendance = () => {
    setAttendanceActive(false);
    toast({
      title: "✅ Attendance Ended",
      description: `${students.filter(s => s.isPresent).length}/${students.length} students present`,
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  const toggleUserMedia = (type: 'mic' | 'video') => {
    setUserMediaEnabled(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Add current user to students list if they're a student
  const allParticipants = user.role === 'teacher' 
    ? [{ 
        id: 'teacher', 
        name: user.name + ' (Teacher)', 
        isPresent: true, 
        micEnabled: userMediaEnabled.mic, 
        videoEnabled: userMediaEnabled.video 
      }, ...students]
    : students.map(s => s.id === '1' ? { ...s, micEnabled: userMediaEnabled.mic, videoEnabled: userMediaEnabled.video } : s);

  return (
    <div className="min-h-screen bg-gradient-classroom">
      <Navbar user={user} onLogout={onLogout} />
      
      <main className="pt-20 px-6 pb-6">
        <div className="container mx-auto max-w-7xl">
          {/* Classroom Header */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-card rounded-2xl p-6 shadow-elevated border border-border/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{classData.subject}</h1>
                    {classStarted && (
                      <Badge className="bg-attendance-success text-white px-3 py-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {classData.date} at {classData.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {allParticipants.length} participants
                    </div>
                    <div className="font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                      {classData.code}
                    </div>
                  </div>
                </div>

                {user.role === 'teacher' && (
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={attendanceActive ? handleEndAttendance : handleStartAttendance}
                      className={attendanceActive 
                        ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
                        : "geovat-button-primary"
                      }
                    >
                      {attendanceActive ? (
                        <>
                          <Square className="h-4 w-4 mr-2" />
                          End Attendance
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Start Attendance
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Records
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Attendance Status for Students */}
          {user.role === 'student' && attendanceActive && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-r from-attendance-success/10 to-primary/10 border-attendance-success/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-attendance-success p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-attendance-success">Attendance Active</h3>
                      <p className="text-sm text-muted-foreground">Your attendance has been marked automatically</p>
                    </div>
                  </div>
                  <Badge className="bg-attendance-success text-white">
                    ✅ Present at 10:05 AM
                  </Badge>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Participants Grid */}
          <motion.div 
            className="classroom-grid mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence>
              {allParticipants.map((participant, index) => (
                <motion.div
                  key={participant.id}
                  className={`student-tile ${attendanceActive && user.role === 'teacher' ? 'attendance-pulse' : ''}`}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300 
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="aspect-video bg-gradient-classroom rounded-xl overflow-hidden relative">
                    {participant.videoEnabled ? (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          {getInitials(participant.name)}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <VideoOff className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Media Controls Overlay */}
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      {participant.micEnabled ? (
                        <div className="bg-black/50 p-1 rounded">
                          <Mic className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="bg-destructive p-1 rounded">
                          <MicOff className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Attendance Status */}
                    {participant.isPresent && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-attendance-success p-1 rounded-full">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <h3 className="font-medium text-foreground truncate">
                      {participant.name}
                    </h3>
                    {participant.joinedAt && (
                      <p className="text-xs text-muted-foreground">
                        Joined at {participant.joinedAt}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Control Panel */}
          <motion.div 
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-card/95 backdrop-blur-sm shadow-elevated border-border/50 p-4">
              <div className="flex items-center gap-3">
                <Button
                  variant={userMediaEnabled.mic ? "default" : "destructive"}
                  size="sm"
                  onClick={() => toggleUserMedia('mic')}
                  className="w-12 h-12 rounded-full p-0"
                >
                  {userMediaEnabled.mic ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  variant={userMediaEnabled.video ? "default" : "destructive"}
                  size="sm"
                  onClick={() => toggleUserMedia('video')}
                  className="w-12 h-12 rounded-full p-0"
                >
                  {userMediaEnabled.video ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <VideoOff className="h-5 w-5" />
                  )}
                </Button>

                <div className="h-8 w-px bg-border mx-2" />

                <Button
                  variant="destructive"
                  onClick={onLeaveClassroom}
                  className="px-6"
                >
                  Leave Class
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Classroom;