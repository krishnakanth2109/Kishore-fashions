import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, Sparkles, Store } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("kishorfashions1@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Store the token and navigate to the admin dashboard
      localStorage.setItem("authToken", data.token);
      
      toast({
        title: "Welcome Back!",
        description: "Successfully logged in to your boutique dashboard",
        variant: "default",
      });
      
      setTimeout(() => navigate("/admin"), 1000);

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Fashion Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-rose-200/60 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/60 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/60 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-10 right-10 w-6 h-6 bg-rose-300/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-purple-300/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-32 right-40 w-3 h-3 bg-pink-300/40 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Enhanced Floating Icons */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="relative">
          <Sparkles className="w-10 h-10 text-rose-400/80 drop-shadow-lg" />
          <div className="absolute inset-0 animate-ping opacity-20">
            <Sparkles className="w-10 h-10 text-rose-400" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 right-20 animate-float delay-1000">
        <div className="relative">
          <Store className="w-10 h-10 text-purple-400/80 drop-shadow-lg" />
          <div className="absolute inset-0 animate-pulse opacity-30">
            <Store className="w-10 h-10 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <Card className="w-full backdrop-blur-lg bg-white/90 border-0 shadow-2xl rounded-3xl overflow-hidden border border-white/40">
          {/* Enhanced Header with Gradient Overlay */}
          <CardHeader className="text-center pb-8 pt-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-purple-500 to-pink-500"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb25c5d1c7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80')] opacity-10 bg-cover"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="relative bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                  <Store className="w-12 h-12 text-white drop-shadow-lg" />
                  <Sparkles className="w-6 h-6 absolute -top-2 -right-2 text-yellow-300 animate-spin-slow drop-shadow-lg" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-white drop-shadow-lg tracking-wide">
                Kishor Fashions
              </CardTitle>
              <p className="text-rose-100/90 text-sm mt-3 font-light tracking-wider">
                Premium Boutique Management
              </p>
            </div>
            
            {/* Decorative elements in header */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/40 rounded-full"></div>
          </CardHeader>
          
          <CardContent className="p-8 pt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Enhanced Email Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-500" />
                  Email Address
                </label>
                <div className="relative group">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all duration-300 rounded-2xl bg-white/50 group-hover:bg-white/70 shadow-sm"
                    placeholder="your@email.com"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-rose-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Enhanced Password Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-500" />
                  Password
                </label>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 pr-12 py-4 border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 rounded-2xl bg-white/50 group-hover:bg-white/70 shadow-sm"
                    placeholder="Enter your password"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors duration-200 p-1 rounded-lg hover:bg-purple-50"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Enhanced Login Button */}
              <Button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border-0 relative overflow-hidden group"
                disabled={isLoading}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                    <span>Access Dashboard</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Enhanced Footer Note */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-purple-50 rounded-full border border-rose-100/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-gray-600 font-medium">
                  Secure access to your boutique management system
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add custom styles for enhanced animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-bounce {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;