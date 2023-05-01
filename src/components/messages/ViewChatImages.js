import { useState } from 'react';
import Image from 'next/image';

const images = [
  'https://picsum.photos/800/600',
  'https://picsum.photos/800/601',
  'https://picsum.photos/800/602',
  'https://picsum.photos/800/603',
];

const ViewChatImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((activeIndex + images.length - 1) % images.length);
  };

  return (
    <div className="fixed top-0 left-0 h-screen z-10 w-screen">
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-gray-800 font-bold py-2 px-4 rounded-l"
        onClick={prevImage}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-gray-800 font-bold py-2 px-4 rounded-r"
        onClick={nextImage}
      >
        Next
      </button>
      <Image
        className="object-cover w-full h-full"
        src={images[activeIndex]}
        alt="Slider Image"
        width={1920}
        height={1080}
      />

      <div id="ImageNavigator" className='fixed bottom-[10%] flex gap-x-2 w-screen justify-center'> 
        {
            images.map((image, index) => 
            
            <Image 
                src={image}
                width={60}
                height={60}
                onClick={e => setActiveIndex(index)}
            
            />
            
            )
        }
      </div>
    </div>
  );
};

export default ViewChatImages;
