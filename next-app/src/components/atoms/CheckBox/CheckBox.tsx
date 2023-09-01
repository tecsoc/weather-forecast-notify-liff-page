import cn from "@/modules/ts/cn";
import { HTMLInputTypeAttribute, memo } from "react";
import styles from "./CheckBox.module.scss";

type CheckBoxProps = Partial<JSX.IntrinsicElements['input']> & {
  id: string;
};

const CheckBox = (props : CheckBoxProps) => {
  const defaultChecked = props.defaultChecked ?? true;
  const inputType = props.type ?? "checkbox" as HTMLInputTypeAttribute;
  const { children, ...inputArgs } = props;

  return <>
    <input type={inputType} className={cn(styles.checkboxInput, props.className)} defaultChecked={defaultChecked} {...inputArgs} />
    <label className={styles.checkboxLabel} htmlFor={props.id}>{children}</label>
  </>;
}

export default memo(CheckBox);