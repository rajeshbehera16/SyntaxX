"use client";

import {
  getExecutionResult,
  useCodeEditorStore,
} from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="btn-base btn-sm sm:btn-md lg:btn-lg group relative overflow-hidden mobile-touch-target disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    >
      {/* Enhanced premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-xl opacity-100 transition-all duration-300 group-hover:opacity-90" />

      {/* Enhanced glow effect with mobile optimization */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300" />

      {/* Premium glass overlay */}
      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center gap-2 sm:gap-3">
        {isRunning ? (
          <>
            {/* Enhanced loading animation with mobile optimization */}
            <div className="relative">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <div
                className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 border-2 border-transparent border-t-blue-200 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "0.8s",
                }}
              />
            </div>
            <span className="text-xs sm:text-sm lg:text-base font-bold text-white tracking-wide">
              <span className="hidden sm:inline">Executing</span>
              <span className="sm:hidden">Running</span>
              <span className="hidden lg:inline"> Code</span>...
            </span>
          </>
        ) : (
          <>
            {/* Enhanced play icon with mobile optimization */}
            <div className="relative flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
              <Play
                className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
                fill="currentColor"
              />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xs sm:text-sm lg:text-base font-bold text-white tracking-wide group-hover:text-blue-100 transition-colors duration-300">
              <span className="sm:hidden">Run</span>
              <span className="hidden sm:inline lg:hidden">Run Code</span>
              <span className="hidden lg:inline">Execute Code</span>
            </span>
          </>
        )}
      </div>

      {/* Enhanced premium border */}
      <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/30 transition-colors duration-300" />

      {/* Mobile-specific pulse effect */}
      <div className="sm:hidden absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
    </motion.button>
  );
}
export default RunButton;
