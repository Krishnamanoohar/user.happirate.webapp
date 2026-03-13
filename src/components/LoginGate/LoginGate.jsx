import { Lock, LogIn, ChevronRight } from "lucide-react";

export default function LoginGate({
  title = "Login Required",
  description = "Please login to continue.",
  redirectPath = "/",
  buttonText = "Login",
}) {

  const handleLogin = () => {
    sessionStorage.setItem("redirectAfterLogin", redirectPath);
    window.location.pathname = "/sign-in";
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-6 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

        {/* Icon */}
        <div className="relative mx-auto w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center">
          <Lock className="w-10 h-10 text-violet-600" strokeWidth={1.5} />
          <div className="absolute inset-0 rounded-full border-4 border-purple-50 border-t-violet-500 animate-spin-slow" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">
            {title}
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="group w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all shadow-lg shadow-slate-200"
        >
          <LogIn className="w-4 h-4" />
          <span>{buttonText}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-medium pt-4 border-t border-slate-100">
          Secure Access Required
        </p>

      </div>
    </div>
  );
}