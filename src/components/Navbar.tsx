import { motion } from "framer-motion";
import { GraduationCap, LogOut, BarChart3, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  user?: {
    name: string;
    role: 'teacher' | 'student';
  };
  onLogout?: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-card"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-gradient-hero p-2 rounded-xl shadow-elevated">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              GeoAt
            </h1>
          </motion.div>

          {/* Navigation Links & User Info */}
          <div className="flex items-center gap-6">
            {user && (
              <>
                <div className="hidden md:flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  {user.role === 'teacher' && (
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Attendance
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">Welcome, {user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  
                  <motion.div
                    className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </motion.div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onLogout}
                  className="hover:border-primary hover:text-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;