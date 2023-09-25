import cn from "@/modules/ts/cn";
import React from "react";
import styles from "./CheckBox.module.scss";

type CheckBoxProps = Partial<
  Exclude<JSX.IntrinsicElements["input"], "defalutChecked">
> &
  Required<Pick<JSX.IntrinsicElements["input"], "id">>;

const CheckBox = (props: CheckBoxProps) => {
  const {
    type,
    className: cln,
    checked = true,
    children,
    ...inputArgs
  } = props;
  const className = cn(styles.checkboxInput, cln);
  const inputType = type ?? "checkbox";

  return (
    <>
      <input
        type={inputType}
        className={className}
        checked={checked}
        {...inputArgs}
      />
      <label className={styles.checkboxLabel} htmlFor={props.id}>
        {children}
      </label>
    </>
  );
};

export default React.memo(CheckBox);
