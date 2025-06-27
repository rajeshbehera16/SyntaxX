import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      {/* Enhanced premium header with mobile-first design */}
      <div className="relative glass rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl mobile-optimized">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-pink-500/8 rounded-xl sm:rounded-2xl animate-pulse" />

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Mobile-optimized Logo Section */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            {/* Premium Logo - Always visible */}
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-4 group relative hover-lift"
            >
              {/* Enhanced logo hover effect */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

              {/* Logo container with mobile optimization */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-xl">
                <Blocks className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-all duration-500 drop-shadow-lg" />
              </div>

              {/* Enhanced responsive logo text */}
              <div className="space-y-0.5 sm:space-y-1">
                <span className="block text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  SyntaxX                </span>
                <span className="block text-xs sm:text-sm text-blue-400/80 font-medium tracking-wide">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* Mobile menu indicator */}
            <div className="sm:hidden flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300" />
              <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-500" />
            </div>
          </div>

          {/* Enhanced Navigation - Hidden on mobile, shown on larger screens */}
          <nav className="hidden lg:flex items-center space-x-3">
            <Link
              href="/snippets"
              className="btn-base btn-md btn-secondary group relative overflow-hidden hover-lift"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Code2 className="w-5 h-5 relative z-10 text-blue-400 group-hover:rotate-6 transition-transform duration-300" />
              <span className="relative z-10 ml-2">Snippets</span>
            </Link>
          </nav>

          {/* Enhanced Controls Section with mobile optimization */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto">
            {/* Mobile-optimized Theme and Language Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="btn-base btn-sm btn-ghost p-2 border border-white/10 rounded-lg">
                <ThemeSelector />
              </div>
              <div className="btn-base btn-sm btn-ghost p-2 border border-white/10 rounded-lg">
                <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
              </div>
            </div>

            {/* Enhanced Premium Pro Button */}
            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="btn-base btn-sm sm:btn-md group relative overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 transition-all duration-300 shadow-xl hover-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 animate-pulse-glow" />
                <span className="text-xs sm:text-sm font-bold text-amber-400/95 group-hover:text-amber-300 transition-colors duration-300 relative z-10 ml-2">
                  <span className="hidden sm:inline">Upgrade </span>Pro
                </span>
              </Link>
            )}

            {/* Enhanced Run Button */}
            <SignedIn>
              <div className="hidden sm:block">
                <RunButton />
              </div>
            </SignedIn>

            {/* Profile Section with divider */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:block w-px h-6 sm:h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <HeaderProfileBtn />
            </div>
          </div>
        </div>

        {/* Mobile-specific bottom section */}
        <div className="sm:hidden mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            {/* Mobile navigation */}
            <Link
              href="/snippets"
              className="btn-base btn-sm btn-secondary flex-1 mr-3 group relative overflow-hidden"
            >
              <Code2 className="w-4 h-4 text-blue-400 group-hover:rotate-6 transition-transform duration-300" />
              <span className="ml-2">Snippets</span>
            </Link>

            {/* Mobile Run Button */}
            <SignedIn>
              <div className="flex-shrink-0">
                <RunButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
