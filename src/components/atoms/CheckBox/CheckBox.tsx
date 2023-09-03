import cn from "@/modules/ts/cn";
import React from "react";
import styles from "./CheckBox.module.scss";

type CheckBoxProps = Partial<JSX.IntrinsicElements["input"]> &
  Required<Pick<JSX.IntrinsicElements["input"], "id">>;

const CheckBox = (props: CheckBoxProps) => {
  const { type, defaultChecked: defalutChk, className: cln, children, ...inputArgs } = props;
  const className = cn(styles.checkboxInput, cln);
  const inputType = type ?? "checkbox";
  const defalutChecked = defalutChk ?? true;

  return (
    <>
      <input
        type={inputType}
        className={className}
        defaultChecked={defalutChecked}
        {...inputArgs}
      />
      <label className={styles.checkboxLabel} htmlFor={props.id}>
        {children}
      </label>
    </>
  );
};

export default React.memo(CheckBox);
