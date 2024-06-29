import React from 'react';

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div 
      className="relative bg-primary-dark py-16 sm:py-24"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-6 text-xl text-white max-w-3xl">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Banner;