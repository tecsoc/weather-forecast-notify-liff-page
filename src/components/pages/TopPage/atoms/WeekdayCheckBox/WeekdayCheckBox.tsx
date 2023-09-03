import CheckBox from "@/components/atoms/CheckBox/CheckBox";
import React, { ComponentProps, useCallback } from "react";
import { TargetWeekdayReducerActionType } from "../../TopPage";

type WeekdayCheckBoxProps = Exclude<
  ComponentProps<typeof CheckBox> & {},
  "onChange" | "defaultChecked"
> & {
  onChangeDispatch: React.Dispatch<TargetWeekdayReducerActionType>;
  id: string;
};

const WeekdayCheckBox = ({
  onChangeDispatch: onChangeDispatch,
  ...props
}: WeekdayCheckBoxProps) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeDispatch({
        type: "setCheck",
        payload: [
          {
            id: props.id,
            value: e.currentTarget.checked,
          },
        ],
      });
    },
    [onChangeDispatch, props.id],
  );

  return <CheckBox onChange={onChange} {...props} />;
};

export default React.memo(WeekdayCheckBox);
