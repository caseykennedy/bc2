type Props = {
  children: React.ReactNode;
  bg?: string;
  border?: string;
  color?: string;
  className?: string;
  py?: string;
  px?: string;
  maxWidth?: string;
  overflow?: string;
};

const Section = ({
  children,
  className = "",
  py = "gutter-y",
  px = "gutter-x",
  maxWidth = "w-full",
}: Props) => {
  return (
    <section className={`relative w-full ${className} ${py}`}>
      <div className={`mx-auto w-full md:max-w-[1440px] ${px} ${maxWidth}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
