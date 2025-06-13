import React from "react";
export const Button = ({
  children,
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type={type} className={className} {...props}>
    {" "}
    {children}{" "}
  </button>
);
