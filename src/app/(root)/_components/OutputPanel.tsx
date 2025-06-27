"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Premium panel with glass morphism */}
      <div className="relative glass rounded-2xl border border-white/10 p-8 shadow-2xl">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl" />

        {/* Header with enhanced styling */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Terminal icon with premium styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10">
                <Terminal className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                Output Console
                {isRunning && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                )}
                {hasContent && !isRunning && (
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                )}
              </h2>
              <p className="text-sm text-gray-400">
                Execution results and console output
              </p>
            </div>
          </div>

          {/* Premium copy button */}
          {hasContent && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 glass-hover rounded-xl border border-white/10 group transition-all duration-300"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    Copy
                  </span>
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Premium output container */}
        <div className="relative group">
          {/* Enhanced glow effect for output */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700" />

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Output header bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="ml-4 text-xs text-gray-400 font-mono">
                console.output
              </div>
              {isRunning && (
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-400">Executing...</span>
                </div>
              )}
            </div>

            {/* Output content area with enhanced styling */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 h-[600px] overflow-auto">
              <div className="p-6">
                {isRunning ? (
                  <RunningCodeSkeleton />
                ) : error ? (
                  <div className="space-y-4">
                    {/* Premium error styling */}
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-red-400 mb-1">
                          Execution Error
                        </div>
                        <div className="text-sm text-red-400/80">
                          Something went wrong during code execution
                        </div>
                      </div>
                    </div>
                    <div className="code-premium rounded-xl p-4">
                      <pre className="whitespace-pre-wrap text-red-300 font-mono text-sm leading-relaxed">
                        {error}
                      </pre>
                    </div>
                  </div>
                ) : output ? (
                  <div className="space-y-4">
                    {/* Premium success styling */}
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-400 mb-1">
                          Execution Successful
                        </div>
                        <div className="text-sm text-emerald-400/80">
                          Your code ran without errors
                        </div>
                      </div>
                    </div>
                    <div className="code-premium rounded-xl p-4">
                      <pre className="whitespace-pre-wrap text-gray-200 font-mono text-sm leading-relaxed">
                        {output}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    {/* Premium empty state */}
                    <div className="relative group mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500" />
                      <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10">
                        <Clock className="w-10 h-10 text-gray-400 animate-float" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Ready to Execute
                    </h3>
                    <p className="text-gray-400 max-w-sm">
                      Run your code to see the output here. Results will appear
                      in real-time with syntax highlighting.
                    </p>
                    <div className="mt-6 px-4 py-2 glass rounded-full border border-white/10">
                      <span className="text-sm text-gray-500">
                        Waiting for execution...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;
