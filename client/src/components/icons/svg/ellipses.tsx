// Ellipses Icon:

import React from "react";

type Props = {
  fill?: string;
};

const Ellipses = ({ fill }: Props) => (
  <svg
    width="3"
    viewBox="0 0 4 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2" cy="2" r="2" className={fill} />
    <circle cx="2" cy="9" r="2" className={fill} />
    <circle cx="2" cy="16" r="2" className={fill} />
  </svg>
);

export default Ellipses;
