"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GameContainer() {
  const [isLoading, setIsLoading] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIframeLoaded(true)
    setIsLoading(false)
  }

  // Handle iframe error event
  const handleIframeError = () => {
    setLoadError(true)
    setIsLoading(false)
  }

  // Simulate loading state for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])
  
  // Add window event listener for iframe errors
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'error') {
        setLoadError(true)
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-[1200px] aspect-[16/9] relative rounded-lg overflow-hidden shadow-inner bg-gradient-to-b from-[#1A1A24] to-[#0F0F13]">
        {/* Game iframe - only show if no error */}
        {!loadError && (
          <iframe
            src="https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html"
            className={cn(
              "w-full h-full border-0",
              isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500",
            )}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        
        {/* Error message */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#1A1A24]/90 text-white">
            <AlertTriangle className="w-16 h-16 text-[#FF4657] mb-4" />
            <h3 className="text-xl font-bold mb-2">Game Failed to Load</h3>
            <p className="text-center mb-6 max-w-md">Unable to connect to the game server. This may be due to network issues or the server being temporarily unavailable.</p>
            <Button 
              variant="outline" 
              className="border-[#00F3FF] text-[#00F3FF] hover:bg-[#00F3FF]/10"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-20">
            <h2 className="text-4xl font-bold text-[#00F3FF] mb-8 font-heading">Highway Traffic</h2>
            <div className="w-16 h-16 border-4 border-[#00F3FF] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Loading game...</p>
          </div>
        )}

        {/* Controls hint */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-sm text-center text-sm text-gray-300 z-10">
          ↑ speed up | ← → Arrow keys to control | SPACE for emergency brake
        </div>
      </div>
    </div>
  )
}

