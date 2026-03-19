import RingScroll from './components/RingScroll'
import Navbar from './components/Navbar'
import ExploreSection from './components/ExploreSection'
import Footer from './components/Footer'

function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <RingScroll />
      <ExploreSection />
      <Footer />
    </main>
  )
}

export default App
