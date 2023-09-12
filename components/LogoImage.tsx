// LogoImage.tsx
import Image from 'next/image';

const LogoImage = () => {
  return (
    <Image
      className="mx-auto h-14 w-14"
      src="/logo.png"
      alt="Your Company"
      width={62}
      height={55}
      layout="responsive"
    />
  );
};

export default LogoImage;
