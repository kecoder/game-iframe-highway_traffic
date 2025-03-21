"use client"

import { useState } from "react"
import { Gauge, Info, Trophy, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true)
        })
        .catch((err) => {
          console.error("Error attempting to enable fullscreen:", err)
        })
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false)
          })
          .catch((err) => {
            console.error("Error attempting to exit fullscreen:", err)
          })
      }
    }
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b border-[#00F3FF]/20 bg-gradient-to-r from-[#0F0F13] to-[#1A1A24] shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Gauge className="h-6 w-6 text-[#00F3FF]" />
          <span className="text-xl font-bold font-heading">Highway Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#00F3FF] hover:text-[#0F0F13] hover:bg-[#00F3FF]">
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F0F13] border border-[#00F3FF]/50 text-white">
              <DialogHeader>
                <DialogTitle className="font-heading">Game Instructions</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Avoid oncoming traffic and survive as long as possible!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p>Use the left and right arrow keys to move your car between lanes.</p>
                <p>Press SPACE for emergency brake (slows down time briefly).</p>
                <p>The longer you survive, the faster the traffic becomes!</p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#00F3FF] hover:text-[#0F0F13] hover:bg-[#00F3FF]">
                <Trophy className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F0F13] border border-[#00F3FF]/50 text-white">
              <DialogHeader>
                <DialogTitle className="font-heading">Leaderboard</DialogTitle>
                <DialogDescription className="text-gray-300">Top players this week</DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                {[
                  { name: "RoadWarrior", score: 12450, time: "3:42" },
                  { name: "SpeedDemon", score: 10820, time: "3:15" },
                  { name: "DriftKing", score: 9340, time: "2:58" },
                  { name: "NightRider", score: 8750, time: "2:45" },
                  { name: "AsphaltLegend", score: 7600, time: "2:30" },
                ].map((player, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00F3FF] font-bold">{index + 1}</span>
                      <span>{player.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">{player.time}</span>
                      <span className="text-[#00F3FF] font-bold">{player.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#00F3FF] hover:text-[#0F0F13] hover:bg-[#00F3FF]"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}

