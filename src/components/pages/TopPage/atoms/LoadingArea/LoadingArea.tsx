import React, { useMemo } from "react";
import styles from "./LoadingArea.module.scss";
import cn from "@/modules/ts/cn";

type LoadingIconProps = Partial<JSX.IntrinsicElements["div"]>;

const LoadingIcon = (props: LoadingIconProps) => {
  const { className: cln, ...divProps } = props;
  const className = cn(styles.loadingIconWrapper, cln);
  const divCountList = useMemo(() => Array.from({ length: 5 },() => null), []);
  return (
    <div className={className} {...divProps}>
      {divCountList.map((_, i) => <div key={i}/>)}
    </div>
  );
}

export default React.memo(LoadingIcon);