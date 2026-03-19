import RingScroll from './components/RingScroll'
import Navbar from './components/Navbar'
import { ReactLenis } from '@studio-freight/react-lenis'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-[#050505] text-white">
        <Navbar />
        <RingScroll />
      </main>
    </ReactLenis>
  )
}

export default App
