import cn from "@/modules/ts/cn";
import React, { HTMLInputTypeAttribute } from "react";
import styles from "./CheckBox.module.scss";

type CheckBoxProps = Partial<JSX.IntrinsicElements['input']> & Required<Pick<JSX.IntrinsicElements['input'], 'id'>>;

const CheckBox = (props : CheckBoxProps) => {
  const defaultChecked = props.defaultChecked ?? true;
  const inputType = props.type ?? "checkbox" as HTMLInputTypeAttribute;
  const { children, ...inputArgs } = props;

  return <>
    <input type={inputType} className={cn(styles.checkboxInput, props.className)}  {...(props.checked ? {} : {defaultChecked: defaultChecked})} {...inputArgs} />
    <label className={styles.checkboxLabel} htmlFor={props.id}>{children}</label>
  </>;
}

export default React.memo(CheckBox);