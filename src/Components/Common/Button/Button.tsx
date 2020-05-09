import React from "react";
import "./Button.css";

/**
 * Компоненты рисующий кнопку.
 * @param {React.HTMLProps<HTMLButtonElement>} props Пропсы для передачи в кнопку.
 */
export const Button = (props: React.HTMLProps<HTMLButtonElement>) => {
  const className = "button " + (props.className ? props.className : "");
  return <button {...props} type="button" className={className} />;
};
