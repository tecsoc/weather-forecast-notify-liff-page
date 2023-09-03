"use client";
import styles from "./TopPage.module.scss";
import React, {
  useReducer,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import ButtonAsTypeButton from "@/components/atoms/ButtonAsTypeButton/ButtonAsTypeButton";
import cn from "@/modules/ts/cn";
import liff from "@line/liff";
import { defalutTargetWeekdays } from "@/modules/ts/const";
import WeekdayCheckBox from "./atoms/WeekdayCheckBox/WeekdayCheckBox";


const LiffStateObject = {
  notApplicable: 0,
  login: 1,
  isLiff: 2,
} as const;
type LiffStateType = typeof LiffStateObject[keyof typeof LiffStateObject];

type WeekdayObjType = {
  id: string;
  text: string;
  value: boolean;
};

export type TargetWeekdayReducerActionType =
  | {
      type: "setCheck";
      payload: {
        id: string;
        value: boolean;
      }[];
    }
  | {
      type: "setCheckAll";
      payload: {
        value: boolean;
      };
    }
  | {
      type: "setCheckWeekdays";
    };

const targetWeekdaysReducer = (
  state: WeekdayObjType[],
  action: TargetWeekdayReducerActionType,
): WeekdayObjType[] => {
  const nextState = [...state];
  if (action.type === "setCheck") {
    action.payload.forEach(({ id, value }) => {
      const targetIndex = nextState.findIndex(
        (weekdayObj) => weekdayObj.id === id,
      );
      if (targetIndex === -1) return;
      nextState[targetIndex] = { ...nextState[targetIndex], value };
    });
  }
  if (action.type === "setCheckAll") {
    for (const weekdayObj of nextState) {
      weekdayObj.value = action.payload.value;
    }
  }
  // 平日のみ選択
  if (action.type === "setCheckWeekdays") {
    for (const weekdayObj of nextState) {
      if (["Saturday", "Sunday", "Holiday"].includes(weekdayObj.id)) {
        weekdayObj.value = false;
      } else {
        weekdayObj.value = true;
      }
    }
  }
  return nextState;
};

const TopPage = () => {
  const [liffState, setLiffState] = useState<LiffStateType>(LiffStateObject.notApplicable);
  const [userName, setUserName] = useState("");

  const [targetWeekdays, dispatchTargetWeekdays] = useReducer<
    React.Reducer<WeekdayObjType[], TargetWeekdayReducerActionType>
  >(targetWeekdaysReducer, defalutTargetWeekdays);

  const formRef = useRef<HTMLFormElement | null>(null);
  const setFormRef = useCallback((node: HTMLFormElement) => {
    if (!node) return;
    formRef.current = node;
  }, []);

  const allCheckHandler = useCallback(
    () =>
      dispatchTargetWeekdays({
        type: "setCheckAll",
        payload: {
          value: true,
        },
      }),
    [],
  );

  const allNotCheckHandler = useCallback(
    () =>
      dispatchTargetWeekdays({
        type: "setCheckAll",
        payload: {
          value: false,
        },
      }),
    [],
  );

  const weekdaysCheckHandler = useCallback(
    () =>
      dispatchTargetWeekdays({
        type: "setCheckWeekdays",
      }),
    [],
  );

  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const notifyWeekdayArray = Array.from(
        formRef?.current?.getElementsByTagName("input") ?? [],
      ).map(({ checked }) => Number(checked));
      const message = `@詳細設定\n${notifyWeekdayArray.join(",")}`;
      try {
        await liff.sendMessages([
          {
            type: "text",
            text: message,
          },
        ]);
        alert("設定を更新しました。ウィンドウを閉じます");
        liff.closeWindow();
      } catch (error) {
        console.error("failed to send message", error);
        alert("設定の更新に失敗しました。");
      }
      e.preventDefault();
    },
    [],
  );

  useLayoutEffect(() => {
    (async () => {
      await liff.init({
        liffId: "2000603396-QBE1npvl",
        withLoginOnExternalBrowser: true,
      });
      let liffEnum = 0;
      if (liff.isLoggedIn()) {
        liffEnum += 1;
        const userName = (await liff.getProfile()).displayName;
        setUserName(userName);
        if (liff.isInClient()) {
          liffEnum += 1;
        }
      }
      setLiffState(liffEnum as LiffStateType);
    })();
  }, []);

  return (
    <main>
      <h1>毎日5時に天気予報</h1>
      {userName && <h3>{userName}さんようこそ</h3>}
      {liffState > LiffStateObject.notApplicable && (
        <div>
          <h2>通知設定</h2>
          <h3>通知したい曜日</h3>
          <form ref={setFormRef} onSubmit={submitHandler}>
            <div className={cn(styles.flexBox, styles.checkboxWrapper)}>
              {targetWeekdays.map(({ id, text, value }) => (
                <WeekdayCheckBox
                  key={id}
                  checked={value}
                  id={id}
                  onChangeDispatch={dispatchTargetWeekdays}
                >
                  {text}
                </WeekdayCheckBox>
              ))}
            </div>
            <div className={cn(styles.flexBox, styles.handleButtonWrapper)}>
              <ButtonAsTypeButton
                className={styles.selectionButton}
                onClick={allCheckHandler}
              >
                全て選択
              </ButtonAsTypeButton>
              <ButtonAsTypeButton
                className={styles.selectionButton}
                onClick={allNotCheckHandler}
              >
                全て選択解除
              </ButtonAsTypeButton>
              <ButtonAsTypeButton
                className={styles.selectionButton}
                onClick={weekdaysCheckHandler}
              >
                平日のみ選択
              </ButtonAsTypeButton>
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={liffState < LiffStateObject.isLiff}
            >
              設定を更新
            </button>
            {liffState < LiffStateObject.isLiff && (
              <p>LIFFブラウザから開いてください</p>
            )}
            {liffState === LiffStateObject.login && (
              <p>
                ※LIFFブラウザから開かないと設定の更新はできませんが、設定を確認することはできます。
              </p>
            )}
          </form>
        </div>
      )}
    </main>
  );
};

export default React.memo(TopPage);
