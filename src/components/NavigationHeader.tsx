import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 glass backdrop-blur-2xl">
      {/* Enhanced background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-pink-500/8 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Premium Logo */}
            <Link href="/" className="flex items-center gap-4 group relative">
              {/* Enhanced logo hover effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

              {/* Logo container with enhanced styling */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-xl">
                <Blocks className="w-7 h-7 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-all duration-500 drop-shadow-lg" />
              </div>

              {/* Enhanced logo text */}
              <div className="space-y-1">
                <span className="block text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  SyntaxX                </span>
                <span className="block text-sm text-blue-400/80 font-medium tracking-wide">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* Enhanced Navigation */}
            <nav className="flex items-center space-x-2">
              <Link
                href="/snippets"
                className="relative group flex items-center gap-3 px-6 py-3 rounded-xl glass-hover border border-white/10 transition-all duration-300 shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Code2 className="w-5 h-5 relative z-10 text-blue-400 group-hover:rotate-6 transition-transform duration-300" />
                <span className="text-sm font-semibold relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                  Snippets
                </span>
              </Link>
            </nav>
          </div>

          {/* Enhanced right section */}
          <div className="flex items-center gap-6">
            <SignedOut>
              <Link
                href="/pricing"
                className="relative group flex items-center gap-3 px-6 py-3 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 animate-pulse-glow" />
                <span className="text-sm font-bold text-amber-400/95 group-hover:text-amber-300 transition-colors duration-300 relative z-10">
                  Upgrade Pro
                </span>
              </Link>
            </SignedOut>

            {/* Profile section with divider */}
            <div className="flex items-center gap-4">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
