"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Enhanced premium panel with mobile optimization */}
      <div className="relative glass rounded-xl sm:rounded-2xl border border-white/10 mobile-padding shadow-2xl mobile-optimized">
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-xl sm:rounded-2xl" />

        {/* Enhanced responsive header */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Enhanced language icon with mobile optimization */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg sm:rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 mobile-touch-target">
                <Image
                  src={"/" + language + ".png"}
                  alt="Logo"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                />
              </div>
            </div>
            <div className="space-y-1 flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <span className="mobile-text">Code Editor</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Write and execute your code with style
              </p>
            </div>
          </div>

          {/* Enhanced responsive controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Mobile-optimized font size control */}
            <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg sm:rounded-xl border border-white/10 mobile-touch-target">
              <TypeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex items-center gap-2 sm:gap-4 flex-1">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) =>
                    handleFontSizeChange(parseInt(e.target.value))
                  }
                  className="flex-1 sm:w-20 lg:w-24 h-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg cursor-pointer appearance-none slider"
                  style={{
                    background: `linear-gradient(to right, #667eea 0%, #667eea ${((fontSize - 12) / 12) * 100}%, #374151 ${((fontSize - 12) / 12) * 100}%, #374151 100%)`,
                  }}
                />
                <span className="text-xs sm:text-sm font-medium text-white min-w-[1.5rem] sm:min-w-[2rem] text-center bg-gray-800/50 px-2 py-1 rounded-md">
                  {fontSize}
                </span>
              </div>
            </div>

            {/* Enhanced responsive control buttons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Premium refresh button */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="btn-base btn-sm sm:btn-md btn-ghost mobile-touch-target group"
                aria-label="Reset to default code"
              >
                <RotateCcwIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.button>

              {/* Enhanced share button with mobile optimization */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsShareDialogOpen(true)}
                className="btn-base btn-sm sm:btn-md btn-primary group relative overflow-hidden mobile-touch-target"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10 ml-2 text-xs sm:text-sm">
                  <span className="hidden sm:inline">Share</span>
                  <span className="sm:hidden">Share</span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced responsive editor container */}
        <div className="relative group">
          {/* Enhanced glow effect for editor */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700" />

          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Enhanced editor header bar with mobile optimization */}
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-white/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="ml-2 sm:ml-4 text-2xs sm:text-xs text-gray-400 font-mono">
                  {language}.{LANGUAGE_CONFIG[language].extension || "txt"}
                </div>
              </div>

              {/* Mobile file info */}
              <div className="hidden sm:flex items-center gap-2 text-2xs sm:text-xs text-gray-500">
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                <span>Ready to code</span>
              </div>
            </div>

            {/* Enhanced Monaco Editor with mobile optimization */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90">
              {clerk.loaded && (
                <Editor
                  height={
                    window.innerWidth < 768
                      ? "400px"
                      : window.innerWidth < 1024
                        ? "500px"
                        : "600px"
                  }
                  language={LANGUAGE_CONFIG[language].monacoLanguage}
                  onChange={handleEditorChange}
                  theme={theme}
                  beforeMount={defineMonacoThemes}
                  onMount={(editor) => setEditor(editor)}
                  options={{
                    minimap: { enabled: window.innerWidth >= 1024 },
                    fontSize:
                      window.innerWidth < 768
                        ? Math.max(fontSize - 2, 12)
                        : fontSize,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: {
                      top: window.innerWidth < 768 ? 12 : 20,
                      bottom: window.innerWidth < 768 ? 12 : 20,
                    },
                    renderWhitespace: "selection",
                    fontFamily:
                      '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    contextmenu: true,
                    renderLineHighlight: "all",
                    lineHeight: window.innerWidth < 768 ? 1.5 : 1.7,
                    letterSpacing: window.innerWidth < 768 ? 0.2 : 0.3,
                    roundedSelection: true,
                    cursorSmoothCaretAnimation: "on",
                    selectionHighlight: false,
                    wordWrap: window.innerWidth < 768 ? "on" : "off",
                    scrollbar: {
                      verticalScrollbarSize: window.innerWidth < 768 ? 6 : 8,
                      horizontalScrollbarSize: window.innerWidth < 768 ? 6 : 8,
                      useShadows: false,
                    },
                    overviewRulerLanes: 0,
                    hideCursorInOverviewRuler: true,
                    overviewRulerBorder: false,
                    suggest: {
                      showIcons: window.innerWidth >= 768,
                    },
                  }}
                />
              )}

              {!clerk.loaded && <EditorPanelSkeleton />}
            </div>

            {/* Mobile-specific editor footer */}
            <div className="sm:hidden flex items-center justify-between px-3 py-2 bg-gradient-to-r from-gray-800/30 to-gray-900/30 border-t border-white/5">
              <div className="flex items-center gap-2 text-2xs text-gray-500">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                <span>Mobile optimized</span>
              </div>
              <div className="text-2xs text-gray-500 font-mono">
                Lines: Auto
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}
export default EditorPanel;
