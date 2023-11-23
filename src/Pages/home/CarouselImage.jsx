import React from 'react';
import workImg from '../../assets/work.png';

const baseColor = '#070644';

// const gradientColors = `
//   radial-gradient(
//     circle,
//     ${baseColor},
//     #192b6b,
//     #234ea0,
//     #2d72d6,
//     #83a5e6,
//     #bcd7f7,
//     #ffffff,
//     #bcd7f7,
//     #83a5e6,
//     #2d72d6,
//     #234ea0,
//     #192b6b,
//     ${baseColor}
//   )
// `;
export default function CarouselImage({ text, subtext }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-black h-96 rounded-lg overflow-hidden"
      // style={{ background: gradientColors }}
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
