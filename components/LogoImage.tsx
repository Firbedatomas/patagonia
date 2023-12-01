// LogoImage.tsx
import Image from 'next/image';

const LogoImage = () => {
  return (
    <div className="mx-auto w-10">
      <Image
        src="/logo.png"
        alt="Your Company"
        width={42}
        height={55}
        loading="lazy" 
      />
    </div>
  );
};

export default LogoImage;
