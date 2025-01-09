// components/navbar/Logo.tsx
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => (
  <Link href="/">
    <Image
      src="/steemx.png"
      alt="logo"
      width={150}
      height={50}
      className="cursor-pointer mt-1 "
      priority
    />
  </Link>
);

export default Logo;
