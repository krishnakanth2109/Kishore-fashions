import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentGradient, setCurrentGradient] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dynamic gradient backgrounds
  const gradients = [
    "from-emerald-50 via-cyan-50 to-blue-50",
    "from-violet-50 via-fuchsia-50 to-rose-50",
    "from-amber-50 via-orange-50 to-red-50",
    "from-teal-50 via-sky-50 to-indigo-50"
  ];

  // Rotate gradients
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        // Store session info in localStorage (without token)
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("adminEmail", email);
        
        toast({ title: "Login Successful", description: "Welcome back!" });
        navigate("/admin");
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-gradient-to-br ${gradients[currentGradient]} transition-all duration-2000 ease-in-out relative overflow-hidden`}>
      
      {/* Animated Background Elements with Mouse Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)`
          }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div 
        className="relative z-10 w-full max-w-md transform transition-all duration-500"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) rotate3d(${mousePosition.y / 100}, ${mousePosition.x / 100}, 0, 1deg)`
        }}
      >
        <Card className="w-full backdrop-blur-lg bg-white/70 border border-white/20 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:bg-white/80">
          
          {/* Header with Dynamic Gradient */}
          <div className="bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 p-6 text-center relative overflow-hidden">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
            
            <div className="flex items-center justify-center space-x-3 mb-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Kishor Boutique
              </h1>
            </div>
            <CardHeader className="p-0 relative z-10">
              <CardTitle className="text-center text-xl text-white/90 font-semibold">
                Admin Portal
              </CardTitle>
            </CardHeader>
          </div>

          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email Input - FIXED: Removed overlapping gradient div */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    className={`w-full px-4 py-3 border-2 transition-all duration-300 rounded-xl font-medium relative z-10 ${
                      isFocused.email 
                        ? 'border-purple-500 ring-4 ring-purple-100 shadow-lg bg-white' 
                        : 'border-gray-200 hover:border-gray-300 bg-white/70 hover:bg-white'
                    } backdrop-blur-sm`}
                    placeholder="Enter your email"
                  />
                  {/* Background gradient that doesn't interfere with input */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-all duration-300 ${
                    isFocused.email ? 'opacity-5' : ''
                  } -z-10`}></div>
                </div>
              </div>

              {/* Password Input - FIXED: Removed overlapping gradient div */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"} // <-- Changed type based on state
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    required
                    className={`w-full px-4 py-3 pr-10 border-2 transition-all duration-300 rounded-xl font-medium relative z-10 ${ // <-- Added right padding
                      isFocused.password 
                        ? 'border-blue-500 ring-4 ring-blue-100 shadow-lg bg-white' 
                        : 'border-gray-200 hover:border-gray-300 bg-white/70 hover:bg-white'
                    } backdrop-blur-sm`}
                    placeholder="Enter your password"
                  />
                  {/* START: Show/Hide Password Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 z-20"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243l-4.243-4.243zM8.45 8.45L19 19m-1.42-1.42A9.97 9.97 0 0021.543 12c-1.274 4.057-5.064 7-9.543 7a9.97 9.97 0 01-2.262-.3zM1 1l22 22" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {/* END: Show/Hide Password Button */}

                  {/* Background gradient that doesn't interfere with input */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-all duration-300 ${
                    isFocused.password ? 'opacity-5' : ''
                  } -z-10`}></div>
                </div>
              </div>

              {/* Enhanced Login Button */}
              <Button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl border-0 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 relative overflow-hidden group"
                disabled={loading}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {loading ? (
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      Access Dashboard
                    </span>
                  </div>
                )}
              </Button>
            </form>

            {/* Enhanced Security Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 backdrop-blur-sm rounded-xl border border-amber-200/50 hover:border-amber-300/50 transition-all duration-300">
              <div className="flex items-center space-x-3 text-sm text-amber-800">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="font-medium">Secure admin access only. Keep credentials confidential.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Floating Elements */}
      <div 
        className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-r from-emerald-300/40 to-cyan-300/40 rounded-full animate-float backdrop-blur-sm border border-white/20"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
        }}
      ></div>
      <div 
        className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-violet-300/40 to-fuchsia-300/40 rounded-full animate-float animation-delay-1000 backdrop-blur-sm border border-white/20"
        style={{
          transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`
        }}
      ></div>
    </div>
  );
};

export default Login;