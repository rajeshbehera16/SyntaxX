import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced responsive background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />
        {/* Responsive floating orbs */}
        <div className="absolute top-10 left-4 sm:top-0 sm:left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-4 sm:bottom-0 sm:right-1/4 w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-pink-500/8 rounded-full blur-3xl animate-float delay-2000" />
      </div>

      {/* Enhanced content container with responsive spacing */}
      <div className="relative z-10 container-responsive mobile-padding">
        <div className="fade-in-up">
          <Header />
        </div>

        {/* Enhanced main content with responsive layout */}
        <div className="mobile-stack mt-6 sm:mt-8 lg:mt-12">
          {/* Editor Panel with enhanced responsive container */}
          <div className="relative group flex-1 bounce-in">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative hover-lift">
              <EditorPanel />
            </div>
          </div>

          {/* Output Panel with enhanced responsive container */}
          <div
            className="relative group flex-1 bounce-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative hover-lift">
              <OutputPanel />
            </div>
          </div>
        </div>

        {/* Enhanced footer section with responsive design */}
        <div
          className="mt-8 sm:mt-12 lg:mt-16 text-center fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 glass rounded-full border border-white/10 hover-glow mobile-touch-target">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              Ready to execute your code
            </span>
            <div className="hidden sm:block w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500" />
          </div>

          {/* Mobile-specific quick actions */}
          <div className="mt-6 sm:hidden flex justify-center gap-3">
            <div className="glass rounded-xl px-3 py-2 border border-white/10">
              <span className="text-xs text-gray-500">
                Swipe to switch panels
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced mobile navigation hint */}
        <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="glass rounded-full px-4 py-2 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Mobile optimized</span>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced ambient lighting effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Mobile-specific decorative elements */}
      <div className="sm:hidden absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="sm:hidden absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse delay-1000" />
    </div>
  );
}
