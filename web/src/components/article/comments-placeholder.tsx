import * as React from "react";
import { MessageSquare } from "lucide-react";

export function CommentsPlaceholder() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 border-t border-gray-100 mt-8">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-5 h-5 text-brand" />
        <h3 className="text-xl font-bold">Comments</h3>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">Comments are temporarily disabled.</p>
        <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
          We are currently upgrading our community discussion platform to provide a better experience. 
          Check back soon to join the conversation!
        </p>
      </div>
    </div>
  );
}
