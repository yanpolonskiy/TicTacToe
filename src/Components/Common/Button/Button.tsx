import React from "react";
import "./Button.css";

/**
 *
 * @param props
 * @constructor
 */
export const Button = (props: React.HTMLProps<HTMLButtonElement>) => {
  const className = "button " + (props.className ? props.className : "");
  return <button {...props} type="button" className={className} />;
};
