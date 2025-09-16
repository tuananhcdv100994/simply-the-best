import React from 'react';

interface HeroProps {
    title: string;
    slogan: string;
    subtitle: string;
    imageUrl: string;
    isEditing?: boolean;
}

const EditableField: React.FC<{id: string, children: React.ReactNode, isEditing?: boolean, className: string}> = ({ id, children, isEditing, className }) => {
    return (
        <div
            id={id}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            className={`${className} ${isEditing ? 'ring-2 ring-yellow-400 ring-dashed p-2 rounded-md focus:outline-none focus:ring-solid' : ''}`}
        >
            {children}
        </div>
    );
};


const Hero: React.FC<HeroProps> = ({ title, slogan, subtitle, imageUrl, isEditing }) => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{backgroundImage: `url('${imageUrl}')`}}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 px-4">
        <EditableField id="hero-title-editable" isEditing={isEditing} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </EditableField>
         <EditableField id="hero-slogan-editable" isEditing={isEditing} className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-yellow-400 font-medium">
          {slogan}
        </EditableField>
        <EditableField id="hero-subtitle-editable" isEditing={isEditing} className="mt-2 max-w-3xl mx-auto text-md md:text-lg text-gray-300">
          {subtitle}
        </EditableField>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#community" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-3 px-8 rounded-full text-lg">
            Khám Phá Câu Chuyện
          </a>
          <a href="#leaderboard" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 font-bold py-3 px-8 rounded-full text-lg">
            Xem Bảng Xếp Hạng
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;