"use client";
import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/components/StarButton";

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteSnippet({ snippetId: snippet._id });
    } catch (error) {
      console.log("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Premium glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500" />

      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <div className="relative h-full glass rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden shadow-2xl">
          {/* Subtle animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />

          <div className="relative p-8">
            {/* Enhanced Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Premium language icon */}
                <div className="relative group/icon">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur-sm opacity-0 group-hover/icon:opacity-100 transition-all duration-500" />
                  <div className="relative p-3 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 group-hover/icon:border-white/20 transition-all duration-500">
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-7 h-7 object-contain relative z-10"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-blue-400 rounded-xl text-sm font-semibold border border-blue-500/20">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Premium action buttons */}
              <div
                className="absolute top-6 right-6 z-10 flex gap-3 items-center"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />

                {user?.id === snippet.userId && (
                  <div className="z-10" onClick={(e) => e.preventDefault()}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`
                        group/delete flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 border
                        ${
                          isDeleting
                            ? "bg-red-500/20 text-red-400 border-red-500/30 cursor-not-allowed"
                            : "glass-hover border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30"
                        }
                      `}
                    >
                      {isDeleting ? (
                        <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 group-hover/delete:rotate-12 transition-transform duration-300" />
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-gradient transition-all duration-300">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg glass border border-white/10">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="truncate max-w-[200px] font-medium">
                      {snippet.userName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium code preview */}
              <div className="relative group/code">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover/code:opacity-100 transition-all duration-500" />
                <div className="relative code-premium rounded-xl p-5 overflow-hidden border border-white/5">
                  <pre className="text-sm text-gray-300 font-mono line-clamp-4 leading-relaxed">
                    {snippet.code}
                  </pre>

                  {/* Code language indicator */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-xs text-gray-400 rounded-md font-mono">
                    .{snippet.language}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
export default SnippetCard;
