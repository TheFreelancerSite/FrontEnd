import React from 'react';
import workImg from '../../assets/work.png';

const gradientColors = ': radial-gradient(circle, #ffffff, #e7e6f7, #cccff0, #aeb9ea, #8ba4e3, #7699e2, #5e8fe1, #3e85e0, #3480e4, #2a7be8, #2275eb, #1d6fee)';

export default function CarouselImage({ text, subtext }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-black h-96 rounded-lg overflow-hidden"
      style={{ background: gradientColors }}
    >
      <img src={workImg} alt={text} className="w-60 h-60 object-cover rounded-full mb-4" />

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Add any overlay content here */}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">{text}</h3>
        <p className="text-sm">{subtext}</p>
      </div>
    </div>
  );
}
