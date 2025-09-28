import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Lottie from "lottie-react";

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (classData: { subject: string; date: string; time: string }) => void;
}

const CreateClassModal = ({ isOpen, onClose, onSubmit }: CreateClassModalProps) => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Simple Lottie-like animation variants
  const createAnimation = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !date || !time) return;

    setIsCreating(true);
    
    // Simulate API call with loading animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit({ subject, date, time });
    
    // Reset form
    setSubject("");
    setDate("");
    setTime("");
    setIsCreating(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-card border-0 shadow-elevated">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="bg-gradient-hero p-2 rounded-xl">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            Create New Class
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isCreating ? (
            // Loading State
            <motion.div
              key="loading"
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                className="bg-gradient-hero p-6 rounded-full mb-6"
                animate={{ scale: 1, rotate: 0 }}
                initial={{ scale: 0, rotate: -180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Creating your class...</h3>
                <p className="text-sm text-muted-foreground">Generating class code and setting up room</p>
              </motion.div>
            </motion.div>
          ) : (
            // Form State
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject Name
                  </Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="subject"
                      type="text"
                      placeholder="e.g., Advanced Mathematics"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="date" className="text-sm font-medium">
                    Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="time" className="text-sm font-medium">
                    Time
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full geovat-button-primary"
                    disabled={!subject || !date || !time}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create Class
                  </Button>
                </motion.div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;