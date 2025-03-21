import GameContainer from "@/components/game-container"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F13] text-white flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col md:flex-row p-4 gap-4 max-w-[1400px] mx-auto w-full">
        <GameContainer />
        <Sidebar />
      </main>
      <Footer />
    </div>
  )
}

