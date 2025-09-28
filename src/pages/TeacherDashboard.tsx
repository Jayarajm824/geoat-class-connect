import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Clock, Users, Play, Copy, CheckCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import CreateClassModal from "@/components/CreateClassModal";
import { useToast } from "@/hooks/use-toast";

interface Class {
  id: string;
  subject: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'ended';
  code: string;
  studentCount: number;
}

interface TeacherDashboardProps {
  user: { name: string; role: 'teacher' | 'student' };
  onLogout: () => void;
  onJoinClassroom: (classData: Class) => void;
}

const TeacherDashboard = ({ user, onLogout, onJoinClassroom }: TeacherDashboardProps) => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      subject: 'Advanced Mathematics',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'live',
      code: 'ABX123',
      studentCount: 24
    },
    {
      id: '2',
      subject: 'Computer Science Fundamentals',
      date: '2024-01-15',
      time: '2:00 PM',
      status: 'upcoming',
      code: 'CDY456',
      studentCount: 18
    },
    {
      id: '3',
      subject: 'Physics Laboratory',
      date: '2024-01-14',
      time: '11:00 AM',
      status: 'ended',
      code: 'EFZ789',
      studentCount: 16
    }
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCodeFor, setShowCodeFor] = useState<string | null>(null);

  const handleCreateClass = (classData: { subject: string; date: string; time: string }) => {
    const newClass: Class = {
      id: Math.random().toString(36).substr(2, 9),
      ...classData,
      status: 'upcoming',
      code: generateClassCode(),
      studentCount: 0
    };
    
    setClasses(prev => [newClass, ...prev]);
    setShowCreateModal(false);
    
    toast({
      title: "Class Created Successfully! 🎉",
      description: `${classData.subject} scheduled for ${classData.date} at ${classData.time}`,
    });
  };

  const generateClassCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied! 📋",
      description: `Class code ${code} copied to clipboard`,
    });
  };

  const getStatusColor = (status: Class['status']) => {
    switch (status) {
      case 'live': return 'bg-attendance-success text-white';
      case 'upcoming': return 'bg-attendance-pending text-black';
      case 'ended': return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-classroom">
      <Navbar user={user} onLogout={onLogout} />
      
      <main className="pt-20 px-6 pb-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-lg text-muted-foreground">
                  Manage your classes and track attendance seamlessly
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="geovat-button-primary"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Class
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="class-card">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {classes.filter(c => c.status === 'live').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Live Classes</p>
                </div>
              </div>
            </div>
            
            <div className="class-card">
              <div className="flex items-center gap-3">
                <div className="bg-attendance-pending/10 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-attendance-pending" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {classes.filter(c => c.status === 'upcoming').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Upcoming Classes</p>
                </div>
              </div>
            </div>
            
            <div className="class-card">
              <div className="flex items-center gap-3">
                <div className="bg-attendance-success/10 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-attendance-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {classes.reduce((acc, c) => acc + c.studentCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {classes.map((classItem, index) => (
                <motion.div
                  key={classItem.id}
                  className="class-card group"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getStatusColor(classItem.status)} px-3 py-1`}>
                      {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                    </Badge>
                    {classItem.status === 'live' && (
                      <div className="flex items-center gap-1 text-attendance-success text-sm font-medium">
                        <div className="w-2 h-2 bg-attendance-success rounded-full animate-pulse" />
                        Live
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {classItem.subject}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {classItem.date} at {classItem.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {classItem.studentCount} students enrolled
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Show Code Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCodeFor(showCodeFor === classItem.id ? null : classItem.id)}
                      className="w-full"
                    >
                      {showCodeFor === classItem.id ? 'Hide Code' : 'Show Class Code'}
                    </Button>

                    {/* Class Code Display */}
                    <AnimatePresence>
                      {showCodeFor === classItem.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-primary/5 border border-primary/20 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">Class Code</p>
                              <p className="font-mono font-bold text-lg text-primary">{classItem.code}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyCode(classItem.code)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onJoinClassroom(classItem)}
                        className="flex-1 geovat-button-primary"
                        disabled={classItem.status === 'ended'}
                      >
                        {classItem.status === 'live' ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Join Live
                          </>
                        ) : classItem.status === 'upcoming' ? (
                          <>
                            <Clock className="h-4 w-4 mr-2" />
                            Prepare
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Ended
                          </>
                        )}
                      </Button>
                      
                      {classItem.status === 'ended' && (
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Create Class Modal */}
      <CreateClassModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateClass}
      />
    </div>
  );
};

export default TeacherDashboard;