import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiPlayCircleLine, RiSendPlaneLine, RiArrowLeftLine, RiQuestionAnswerLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Initial mock chat messages
const INITIAL_CHAT = [
  { id: 1, name: "Lucas Vance", text: "Namaste everyone! Excited for this class.", time: "13:02" },
  { id: 2, name: "Maria Garcia", text: "Is this suitable for beginners?", time: "13:03" },
  { id: 3, name: "Arjun Mehta (Teacher)", text: "Welcome Maria! Yes, I will provide modifications for beginners. Keep blocks handy.", time: "13:04" },
  { id: 4, name: "David Chen", text: "Ready to flow from SF!", time: "13:04" },
  { id: 5, name: "Sarah Connor", text: "The audio alignment is perfect today.", time: "13:05" },
  { id: 6, name: "Emma Watson", text: "I've been looking forward to this sequencing all week.", time: "13:06" }
];

export default function WatchPage() {
  const { uuid } = useParams();
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [inputText, setInputText] = useState("");

  const chatEndRef = useRef(null);

  // Auto scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      name: "Jane Doe (You)",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  // Determine if stream is recording based on uuid mock
  const isRecording = uuid && uuid.startsWith("ended-");

  return (
    <div className="bg-card text-foreground min-h-screen flex flex-col h-screen overflow-hidden">
      {/* Top Header Row */}
      <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to={`/streams/${uuid || "live-stream-1"}`}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-card"
          >
            <RiArrowLeftLine className="size-5" />
          </Link>
          <div>
            <h1 className="text-sm font-bold truncate max-w-60 md:max-w-md">
              Navakarana Yoga Vinyasa: Strength and Alignment
            </h1>
            <p className="text-[10px] text-muted-foreground">Instructor: Arjun Mehta</p>
          </div>
        </div>

        <div>
          {isRecording ? (
            <span className="bg-card text-muted-foreground px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              🎥 Recording
            </span>
          ) : (
            <span className="bg-red-600/20 text-red-400 border border-red-900/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
              🔴 Live
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Video Player (70%) */}
        <div className="flex-1 bg-black flex flex-col justify-center items-center p-8 relative group">
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none z-10" />

          {/* Video Player Placeholder Elements */}
          <div className="z-10 text-center space-y-4 max-w-sm">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto w-16 h-16 bg-background/10 hover:bg-background/20 border border-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-xl backdrop-blur-sm"
            >
              <RiPlayCircleLine className="size-10 text-foreground" />
            </motion.button>
            <div>
              <p className="text-sm font-semibold">Yoga Class Player</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isRecording ? "Click play to start recording playback" : "Class room initialized. Waiting for the instructor to go live..."}
              </p>
            </div>
          </div>

          {/* Audio/Video overlay controls indicator */}
          <div className="absolute bottom-4 left-4 z-20 text-[10px] text-muted-foreground bg-background/80 px-2 py-1 rounded border border-border">
            {isRecording ? "REPLAY MODE" : "LIVE CLASS CONNECTED"}
          </div>
        </div>

        {/* Right Side: Chat Panel (30%) */}
        <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-border bg-background flex flex-col shrink-0 overflow-hidden h-75 md:h-auto">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-background shrink-0 text-foreground">
            <RiQuestionAnswerLine className="text-brand size-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Class Chat</h2>
          </div>

          {/* Scrollable messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 select-text">
            {messages.map((msg) => (
              <div key={msg.id} className="text-xs space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className={`font-bold ${msg.name.includes("Teacher") ? "text-brand" : "text-stone-300"}`}>
                    {msg.name}
                  </span>
                  <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-muted-foreground wrap-break-word leading-relaxed">{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-background border-t border-border flex gap-2 items-center shrink-0"
          >
            <Input
              type="text"
              placeholder="Share a question or intention..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground text-sm h-11 rounded-xl focus:bg-card/50"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-brand hover:bg-brand-light size-11 rounded-xl shrink-0 cursor-pointer text-white"
            >
              <RiSendPlaneLine className="size-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
