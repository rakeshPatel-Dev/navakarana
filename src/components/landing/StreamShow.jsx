import StreamSlideshow from '../slideshow';
import { streams } from "@/components/landing/data/streams";

const StreamShow = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center max-w-7xl mx-auto px-6 rounded-4xl overflow-hidden bg-transparent'>
      <StreamSlideshow streams={streams}/>
    </div>
  )
}

export default StreamShow
