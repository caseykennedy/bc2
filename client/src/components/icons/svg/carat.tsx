// Carat Icon:

import React from "react";

type Props = {
  stroke?: string;
  strokeWidth?: string;
  size?: number;
};

const Carat = ({
  size = 20,
  stroke = "stroke-zinc-100",
  strokeWidth = "2px",
}: Props) => (
  <svg
    width={size}
    viewBox="0 0 38.24 12.87"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      className={stroke}
      fill="none"
      strokeMiterlimit="10"
      strokeWidth={strokeWidth}
      points="0.49 0.81 18.39 11.78 37.78 0.81"
    />
  </svg>
);

export default Carat;
