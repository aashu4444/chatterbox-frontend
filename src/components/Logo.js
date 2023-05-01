import Image from "next/image"
import LogoImage from '../../public/Logo.png';

const Logo = ({width=43, height=43, className}) => {
  return (
    <Image src={LogoImage} width={width} height={height} className={className}/>

  )
}

export default Logo