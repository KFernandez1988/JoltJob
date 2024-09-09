import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/NAME AND LOGO.svg"
        alt="AdminPro Logo"
        width={150} 
        height={50}  
      />
    </Link>
  );
};

export default Logo;
