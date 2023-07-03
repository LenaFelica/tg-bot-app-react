import React from "react";
import './Button.css';

const Button = (props) => {
   return (
      <button {...props} className={'button ' + props.className } /> // здесь оязательно отступ 'button ' !
   )
}

export default Button;