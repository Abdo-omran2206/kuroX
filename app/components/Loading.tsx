export default function LoadingModel() {
  return (
    <div className="min-h-screen w- flex flex-col items-center justify-center text-white">
      {/* Logo with gradient animation */}
      <div className="relative mb-12">
        <h1 className="text-6xl font-bold tracking-tight">
          Kuro
          <span className="text-7xl bg-purple-800 bg-clip-text text-transparent animate-pulse">
            X
          </span>
        </h1>
        
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 -z-10 animate-pulse"></div>
      </div>

      {/* Modern spinner with multiple rings */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
        
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
        
        {/* Inner ring - slower spin */}
        <div className="absolute inset-4 border-4 border-transparent border-t-pink-400 border-l-purple-400 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        
        {/* Center dot with pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
          <div className="absolute w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>
        
    </div>
  );
}