import Carat from "./svg/carat";
import Ellipses from "./svg/ellipses";
// import Chevron from './SVG/Chevron'
// import Checkmark from './SVG/Checkmark'
// import Document from './SVG/Document'
// import Download from './SVG/Download'
// import ExternalLink from './SVG/ExternalLink'
// import Facebook from './SVG/Facebook'
// import GridView from './SVG/GridView'
// import Handshake from './SVG/Handshake'
// import Instagram from './SVG/Instagram'
// import ListView from './SVG/ListView'
// import NextArrow from './SVG/NextArrow'
// import Pdf from './SVG/Pdf'
// import Plus from './SVG/Plus'
// import Pin from './SVG/Pin'
// import Twitter from './SVG/Twitter'
// import Youtube from './SVG/Youtube'

// ___________________________________________________________________

type Props = {
  name:
    | "arrow"
    | "carat"
    | "chevron"
    | "checkmark"
    | "document"
    | "download"
    | "ellipses"
    | "external-link"
    | "facebook"
    | "grid-view"
    | "handshake"
    | "instagram"
    | "list-view"
    | "pdf"
    | "plus"
    | "pin"
    | "twitter"
    | "youtube";
  className?: string;
  fill?: string;
  size?: number;
  stroke?: string;
  strokeWidth?: string;
};

const Icon = ({ name, className, fill, size, stroke, strokeWidth }: Props) => {
  switch (name) {
    // case "arrow":
    //   return (
    //     <S.Icon color={color} className={className}>
    //       <NextArrow />
    //     </S.Icon>
    //   );
    case "carat":
      return (
        <span className={className}>
          <Carat size={size} stroke={stroke} strokeWidth={strokeWidth} />
        </span>
      );
    case "ellipses":
      return (
        <span className={className}>
          <Ellipses fill={fill} />
        </span>
      );
    default:
      return <div className="ico">ico</div>;
  }
};

export default Icon;

// ___________________________________________________________________
