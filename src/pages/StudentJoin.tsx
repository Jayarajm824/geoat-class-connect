import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Hash, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface StudentJoinProps {
  user: { name: string; role: 'teacher' | 'student' };
  onLogout: () => void;
  onJoinClass: (classCode: string) => void;
}

const StudentJoin = ({ user, onLogout, onJoinClass }: StudentJoinProps) => {
  const { toast } = useToast();
  const [classCode, setClassCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationState, setValidationState] = useState<'idle' | 'success' | 'error'>('idle');

  // Valid class codes for demo
  const validCodes = ['ABX123', 'CDY456', 'EFZ789'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!classCode.trim()) return;

    setIsValidating(true);
    setValidationState('idle');
    
    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isValid = validCodes.includes(classCode.toUpperCase());
    
    if (isValid) {
      setValidationState('success');
      toast({
        title: "🎉 Class Found!",
        description: `Joining ${classCode.toUpperCase()}...`,
      });
      
      // Wait for success animation then join
      setTimeout(() => {
        onJoinClass(classCode.toUpperCase());
      }, 1000);
    } else {
      setValidationState('error');
      toast({
        title: "❌ Invalid Class Code",
        description: "Please check the code and try again",
        variant: "destructive"
      });
    }
    
    setIsValidating(false);
  };

  const formatClassCode = (value: string) => {
    // Remove any non-alphanumeric characters and convert to uppercase
    return value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatClassCode(e.target.value);
    setClassCode(formatted);
    setValidationState('idle');
  };

  return (
    <div className="min-h-screen bg-gradient-classroom">
      <Navbar user={user} onLogout={onLogout} />
      
      <main className="pt-20 px-6 pb-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join a Class 📚
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter your class code to join the session
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-elevated border-0 bg-gradient-card">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-hero p-4 rounded-2xl inline-block mb-4">
                  <Hash className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">Enter Class Code</h2>
                <p className="text-sm text-muted-foreground">
                  Get the 6-character code from your teacher
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="class-code" className="text-base font-medium">
                      Class Code
                    </Label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="class-code"
                        type="text"
                        placeholder="ABC123"
                        value={classCode}
                        onChange={handleCodeChange}
                        className={`pl-12 py-4 text-lg font-mono tracking-wider text-center ${
                          validationState === 'success' ? 'border-attendance-success' :
                          validationState === 'error' ? 'border-destructive' : ''
                        }`}
                        disabled={isValidating}
                        required
                      />
                      
                      {/* Validation Icons */}
                      {validationState === 'success' && (
                        <motion.div
                          className="absolute right-4 top-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="h-5 w-5 text-attendance-success" />
                        </motion.div>
                      )}
                      
                      {validationState === 'error' && (
                        <motion.div
                          className="absolute right-4 top-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Validation Messages */}
                    {validationState === 'success' && (
                      <motion.p
                        className="text-sm text-attendance-success font-medium"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        ✅ Valid class code! Joining class...
                      </motion.p>
                    )}
                    
                    {validationState === 'error' && (
                      <motion.p
                        className="text-sm text-destructive font-medium"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        ❌ Class code not found. Please check and try again.
                      </motion.p>
                    )}
                  </div>

                  <motion.div
                    whileHover={!isValidating ? { scale: 1.02 } : {}}
                    whileTap={!isValidating ? { scale: 0.98 } : {}}
                  >
                    <Button
                      type="submit"
                      className="w-full geovat-button-primary py-4 text-lg"
                      disabled={!classCode || isValidating || validationState === 'success'}
                    >
                      {isValidating ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Validating Code...
                        </div>
                      ) : validationState === 'success' ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Joining Class...
                        </div>
                      ) : (
                        <>
                          Join Class
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Demo Codes Helper */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Demo Mode - Try these codes:
                  </p>
                  <div className="flex justify-center gap-2">
                    {validCodes.map(code => (
                      <button
                        key={code}
                        onClick={() => setClassCode(code)}
                        className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                        disabled={isValidating}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Classes */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-muted/30 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Recent Classes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                    <div>
                      <p className="font-medium text-foreground">Advanced Mathematics</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 10:00 AM</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setClassCode('ABX123')}
                      disabled={isValidating}
                    >
                      Rejoin
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                    <div>
                      <p className="font-medium text-foreground">Physics Laboratory</p>
                      <p className="text-sm text-muted-foreground">Last week</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setClassCode('EFZ789')}
                      disabled={isValidating}
                    >
                      Rejoin
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default StudentJoin;