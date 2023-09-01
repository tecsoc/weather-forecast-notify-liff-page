import React from "react";

type ButtonAsTypeButtonProps =  Partial<Exclude<JSX.IntrinsicElements['button'], 'type'>>;

const ButtonAsTypeButton = (props: ButtonAsTypeButtonProps) => {
  return <button type='button' {...props} />;
};

export default React.memo(ButtonAsTypeButton);