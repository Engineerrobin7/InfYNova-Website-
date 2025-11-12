"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Search, 
  Camera, 
  Settings, 
  Battery, 
  Wifi, 
  Signal,
  Clock,
  Sun,
  Moon,
  Zap,
  Brain,
  MessageCircle,
  Phone,
  Mail,
  Music,
  Video,
  Image as ImageIcon,
  Calendar,
  Map
} from "lucide-react";

export function NovaOSSimulator() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [isDark, setIsDark] = useState(true);
  const [time] = useState(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));

  const apps = [
    { icon: Phone, name: "Phone", color: "from-green-500 to-emerald-500" },
    { icon: MessageCircle, name: "Messages", color: "from-blue-500 to-cyan-500" },
    { icon: Camera, name: "Camera", color: "from-purple-500 to-pink-500" },
    { icon: Mail, name: "Mail", color: "from-red-500 to-orange-500" },
    { icon: Music, name: "Music", color: "from-pink-500 to-rose-500" },
    { icon: Video, name: "Videos", color: "from-indigo-500 to-purple-500" },
    { icon: ImageIcon, name: "Gallery", color: "from-yellow-500 to-amber-500" },
    { icon: Calendar, name: "Calendar", color: "from-teal-500 to-cyan-500" },
    { icon: Map, name: "Maps", color: "from-blue-500 to-indigo-500" },
    { icon: Settings, name: "Settings", color: "from-gray-500 to-slate-500" },
    { icon: Brain, name: "Nova AI", color: "from-primary to-accent" },
    { icon: Zap, name: "Power", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Phone Frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] p-4 shadow-2xl border-8 border-gray-800">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>
          
          {/* Screen */}
          <div className={`relative w-full h-full rounded-[45px] overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"}`}>
            {/* Status Bar */}
            <div className={`flex items-center justify-between px-8 pt-3 pb-2 ${isDark ? "text-white" : "text-black"}`}>
              <div className="text-sm font-semibold">{time}</div>
              <div className="flex items-center gap-1">
                <Signal className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Home Screen */}
            <AnimatePresence mode="wait">
              {currentScreen === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 pt-8 pb-24 h-full overflow-y-auto"
                >
                  {/* AI Widget */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-primary/30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="w-6 h-6 text-primary" />
                      <span className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
                        Nova AI
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Good morning! You have 3 meetings today. Traffic is light on your usual route.
                    </p>
                  </motion.div>

                  {/* Apps Grid */}
                  <div className="grid grid-cols-4 gap-6">
                    {apps.map((app, index) => (
                      <motion.button
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg`}>
                          <app.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className={`text-xs ${isDark ? "text-white" : "text-black"}`}>
                          {app.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/10 px-8 py-4">
              <div className="flex items-center justify-around">
                <button
                  onClick={() => setCurrentScreen("home")}
                  className={`p-3 rounded-full transition ${
                    currentScreen === "home" ? "bg-white/20" : ""
                  }`}
                >
                  <Home className="w-6 h-6 text-white" />
                </button>
                <button className="p-3 rounded-full">
                  <Search className="w-6 h-6 text-white" />
                </button>
                <button className="p-3 rounded-full">
                  <Camera className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-3 rounded-full"
                >
                  {isDark ? (
                    <Sun className="w-6 h-6 text-white" />
                  ) : (
                    <Moon className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Interactive NovaOS Demo • Tap icons to explore
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setIsDark(!isDark)}
              className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition text-sm"
            >
              Toggle Theme
            </button>
            <button
              onClick={() => setCurrentScreen("home")}
              className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
