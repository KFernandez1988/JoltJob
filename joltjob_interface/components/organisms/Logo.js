import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/NAME AND LOGO.svg"
        alt="AdminPro Logo"
        width={150}  // Specify the appropriate width
        height={50}  // Specify the appropriate height
      />
    </Link>
  );
};

export default Logo;
