import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, User, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginProps {
  onLogin: (user: { name: string; role: 'teacher' | 'student' }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("teacher");

  const handleSubmit = (e: React.FormEvent, role: 'teacher' | 'student') => {
    e.preventDefault();
    
    // Mock authentication
    const userData = {
      teacher: { name: "Kavin", role: "teacher" as const },
      student: { name: "Jayaraj", role: "student" as const }
    };
    
    onLogin(userData[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-classroom flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.4, 0, 0.2, 1],
          staggerChildren: 0.1
        }}
      >
        {/* Logo Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-gradient-hero p-4 rounded-2xl inline-block shadow-elevated mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            GeoAt
          </h1>
          <p className="text-muted-foreground">
            Professional Online Class & Attendance
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="shadow-elevated border-0 bg-gradient-card">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-semibold text-foreground">Welcome Back</h2>
              <p className="text-sm text-muted-foreground">Sign in to continue to GeoAt</p>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="teacher" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger value="student" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Student
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="teacher">
                  <form onSubmit={(e) => handleSubmit(e, 'teacher')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher-email">Email</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="teacher-email"
                          type="email"
                          placeholder="kavin@geovat.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="teacher-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="teacher-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full geovat-button-primary">
                        Sign in as Teacher
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>

                <TabsContent value="student">
                  <form onSubmit={(e) => handleSubmit(e, 'student')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="jayaraj@student.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="student-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full geovat-button-primary">
                        Sign in as Student
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  Demo Mode: Use any email/password to login
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;