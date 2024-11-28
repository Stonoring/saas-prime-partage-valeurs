"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import ChatbotInput from "@/components/app/ChatbotInput";

export default function Chatbot() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        {/* Ajout d'un DialogTitle obligatoire */}
        <DialogTitle>
          <span className="sr-only">Chatbot</span>
        </DialogTitle>
        <ChatbotInput />
      </SheetContent>
    </Sheet>
  );
}
