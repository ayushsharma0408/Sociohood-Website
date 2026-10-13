import { Link } from "react-router-dom";
import sociohoodLogo from "../../assets/logos/sociohood-logo.png";

const Logo = ({ className = "", onClick, link = true }) => {
  const image = (
    <img
      className="official-brand-logo"
      src={sociohoodLogo}
      alt="SocioHood"
      width={670}
      height={376}
      decoding="async"
    />
  );

  if (!link) {
    return className ? <span className={className}>{image}</span> : image;
  }

  return (
    <Link to="/" className={`logo ${className}`.trim()} aria-label="SocioHood home" onClick={onClick}>
      {image}
    </Link>
  );
};

export default Logo;
