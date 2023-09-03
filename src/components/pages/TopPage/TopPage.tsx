"use client";
import styles from "./TopPage.module.scss";
import React, {
  useReducer,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import ButtonAsTypeButton from "@/components/atoms/ButtonAsTypeButton/ButtonAsTypeButton";
import cn from "@/modules/ts/cn";
import liff from "@line/liff";
import { allCheckPayload, allNotCheckPayload, defalutTargetWeekdays, settingApiEndpoint } from "@/modules/ts/const";
import WeekdayCheckBox from "./atoms/WeekdayCheckBox/WeekdayCheckBox";
import { getFetchUrl } from "@/modules/ts/fetch";
import LoadingArea from "./atoms/LoadingArea/LoadingArea";

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
      }[];
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
    Object.values(nextState).forEach((weekdayObj, i) => {
      nextState[i] = { ...weekdayObj, value: action.payload[i].value };
    });
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
  const [userName, setUserName] = useState("");
  const isLoggedIn = useMemo(() => userName === '' ? null : Boolean(userName), [userName]);
  const [isLoading, setIsLoading] = useState(true);

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
        payload: allCheckPayload,
      }),
    [],
  );

  const allNotCheckHandler = useCallback(
    () =>
      dispatchTargetWeekdays({
        type: "setCheckAll",
        payload: allNotCheckPayload,
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
      e.preventDefault();
      const notifyWeekdayArray = Array.from<HTMLInputElement>(
        formRef?.current?.getElementsByTagName("input") ?? [],
      ).map(({checked}) => Number(checked));
      const { userId } = await liff.getProfile();
      const body = {
        type: "updateSetting",
        userId,
        settings: notifyWeekdayArray,
      };
      try {
        const url = getFetchUrl(settingApiEndpoint, body);      
        const response = await (await fetch(url)).json();
        if (response.result) {
          let commonMessage = "設定を設定を更新しました。";
          if (liff.isInClient()) {
            alert(`${commonMessage}\nウィンドウを閉じます`);
            liff.closeWindow();
          } else {
            alert(commonMessage);
          }
        } else {
          throw new Error("Server Error");
        }
      } catch (error) {
        console.error(error);
        alert(`設定の更新に失敗しました。\n${error}`);
      }
    },
    [],
  );

  useLayoutEffect(() => {
    (async () => {
      await liff.init({
        liffId: "2000603396-QBE1npvl",
        withLoginOnExternalBrowser: true,
      });
      if (liff.isLoggedIn()) {
        const {displayName: userName, userId} = await liff.getProfile();
        setUserName(userName);
        const url = getFetchUrl(settingApiEndpoint, {
          userId
        });
        const { settings }: {settings: number[]} = await (await fetch(url)).json();
        const payload = settings.map(value => ({value: Boolean(value)}));
        dispatchTargetWeekdays({
          type: "setCheckAll",
          payload,
        });
        setIsLoading(false);
      }
    })();
  }, []);

  const loadingArea = useMemo(() => (
    <LoadingArea className={styles.loadingArea} />
  ), []);

  return (
    <main className={styles.mainArea}>
      <h1>毎日5時に天気予報</h1>
            {!isLoggedIn && isLoading && loadingArea}
      {isLoggedIn && (
        <div>
          <h3>{userName}さんようこそ</h3>
          {isLoading ? loadingArea : (
            <>
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
                >
                  設定を更新
                </button>
              </form>
            </>
          )}
        </div>
      )}
      {isLoggedIn === false && (
       <p>LIFFブラウザから開くか、ログインしてください</p> 
      )}
    </main>
  );
};

export default React.memo(TopPage);
