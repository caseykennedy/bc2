import FastMarquee from "react-fast-marquee";

type Props = {
  children: React.ReactNode;
  autoFill?: boolean;
  direction?: "left" | "right";
  speed?: number;
};

const Marquee = ({
  children,
  autoFill = true,
  direction = "left",
  speed = 40,
}: Props) => {
  const MarqueeProps = {
    direction,
    autoFill,
    gradient: false,
    pauseOnHover: true,
    speed,
  };
  return (
    <FastMarquee {...MarqueeProps}>
      {children}
    </FastMarquee>
  );
};

export default Marquee;
