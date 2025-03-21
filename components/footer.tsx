import { Facebook, Twitter, Link } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t border-[#00F3FF]/20 bg-[#0F0F13] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#00F3FF] hover:text-[#0F0F13] hover:bg-[#00F3FF]">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#00F3FF] hover:text-[#0F0F13] hover:bg-[#00F3FF]">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#00F3FF] hover:text-[#0F0F13] hover:bg-[#00F3FF]">
              <Link className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400">
            Made with <span className="text-[#FF4657]">♥</span> by <span className="text-[#00F3FF]">HighwayTraffic</span>
          </div>

          <div className="text-xs text-gray-500">© {new Date().getFullYear()} Highway Traffic</div>
        </div>
      </div>
    </footer>
  )
}

