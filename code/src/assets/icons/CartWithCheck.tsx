import { ComponentProps } from "react";

const CartWithCheck = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    height="28px"
    width="28px"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <circle
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0.5}
        strokeMiterlimit={10}
        cx="8.2"
        cy="9.8"
        r="0.8"
      />
      <circle
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0.5}
        strokeMiterlimit={10}
        cx="3.8"
        cy="9.8"
        r="0.8"
      />
      <path
        d="M0.6,1.4c-0.1,0.2,0,0.4,0.2,0.5l0.1,0l0.2-0.7l-0.1,0C0.9,1.1,0.7,1.2,0.6,1.4z"
        fill="currentColor"
      />
      <path
        d="M10.7,3.1c-0.1-0.2-0.3-0.2-0.4-0.3c-0.2-0.1-0.3-0.1-0.5-0.1c-0.3,0-0.8,0-1.2,0v0.4h0V2.7H2.8c0,0,0,0,0-0.1
		c0-0.2-0.1-0.5-0.2-0.7C2.5,1.7,2.3,1.6,2.1,1.5C1.8,1.4,1.6,1.3,1.3,1.2L1.1,1.5L1,1.9C1.3,2,1.6,2.1,1.7,2.2
		C1.9,2.2,1.9,2.3,2,2.4l0,0c0,0.1,0.1,0.2,0.1,0.3c0,0.2,0,0.4,0,0.8v1.4c0,0.7,0,1.2,0.1,1.7c0.1,0.4,0.2,0.7,0.5,1
		C3,7.9,3.3,8,3.8,8.1c0.4,0.1,1,0.1,1.7,0.1l0-0.6h0v0.6h2.7V7.5h0v0.6c0.4,0,0.7,0,1,0c0.3,0,0.5-0.1,0.7-0.3
		c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.2,0.1-0.6,0.2-0.9l0,0L10.7,5l0,0l0,0L10.4,5l0,0L10.7,5c0.1-0.4,0.2-0.8,0.2-1.1
		C10.9,3.7,10.9,3.4,10.7,3.1z M8,4.8L6.3,6.6c-0.2,0.2-0.5,0.2-0.6,0c0,0,0,0,0,0L5,5.8C4.8,5.7,4.8,5.4,5,5.2C5.1,5,5.4,5,5.6,5.2
		c0,0,0,0,0,0L6,5.6l1.4-1.5C7.6,4,7.8,3.9,8,4.1C8.2,4.3,8.2,4.6,8,4.8z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default CartWithCheck;
