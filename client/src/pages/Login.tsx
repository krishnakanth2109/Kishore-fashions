import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, Sparkles, ShoppingBag } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dynamic background images for boutique theme
  const backgrounds = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  ];

  // Rotate backgrounds every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ 
        title: "Welcome Back! 👋", 
        description: "Login successful. Managing your boutique with style!",
        className: "border-green-200 bg-green-50 text-green-800"
      });
      navigate("/admin");
    } catch (error) {
      toast({
        title: "Access Denied 💫",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to reset password.",
        variant: "destructive",
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Magic Link Sent! ✨",
        description: "Check your inbox for password reset instructions.",
        className: "border-blue-200 bg-blue-50 text-blue-800"
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      className="flex min-h-screen items-center justify-center p-4 transition-all duration-1000 ease-in-out"
      style={{ 
        background: backgrounds[currentBackground],
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Floating decorative elements */}
      <div className="fixed top-10 left-10 floating-element opacity-20">
        <ShoppingBag size={40} className="text-white" />
      </div>
      <div className="fixed bottom-10 right-10 floating-element opacity-20" style={{ animationDelay: '2s' }}>
        <Sparkles size={40} className="text-white" />
      </div>
      <div className="fixed top-10 right-10 floating-element opacity-20" style={{ animationDelay: '4s' }}>
        <Lock size={40} className="text-white" />
      </div>

      <Card 
        className="w-full max-w-md bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl transform transition-all duration-500 hover:shadow-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0px) scale(1)',
        }}
      >
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
                <Lock className="text-white transform -rotate-12" size={28} />
              </div>
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400" size={20} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            kishor Boutique Admin
          </CardTitle>
          <p className="text-gray-600 mt-2 text-sm">Manage your fashion empire with elegance</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 pr-4 py-3 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                  placeholder="your@email.com"
                />
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-12 py-3 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border-0 text-white font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Unlocking Dashboard...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles size={18} />
                  Access Dashboard
                </div>
              )}
            </Button>

            {/* Forgot Password */}
            <div className="text-center pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300 hover:underline font-medium"
              >
                Forgot your password?
              </button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              🔒 Secure admin access for authorized personnel only
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;