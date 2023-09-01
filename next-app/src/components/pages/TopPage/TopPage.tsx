'use client';
import styles from './TopPage.module.scss';
import CheckBox from "@/components/atoms/CheckBox/CheckBox";
import React,{ useReducer, useCallback } from "react";
import ButtonAsTypeButton from '@/components/atoms/ButtonAsTypeButton/ButtonAsTypeButton';
import cn from '@/modules/ts/cn';

type WeekDayObjType = {
  id: string;
  text: string;
  value: boolean;
};

type TargetWeekDayReducerActionType = {
  type: 'setCheck';
  payload: {
    id: string;
    value: boolean;
  }[];
} | {
  type : 'setCheckAll';
  payload: {
    value: boolean;
  }
};

const targetWeekDaysReducer = (state: WeekDayObjType[], action: TargetWeekDayReducerActionType): WeekDayObjType[] => {
  const nextState = [...state];
  if (action.type === 'setCheck') {
    action.payload.forEach(({id, value}) => {
      const targetIndex = nextState.findIndex((weekDayObj) => weekDayObj.id === id);
      if (targetIndex === -1) return;
      nextState[targetIndex] = {...nextState[targetIndex], value};
    });
  }
  if (action.type === 'setCheckAll') {
    for (const weekDayObj of nextState) {
      weekDayObj.value = action.payload.value;
    }
  }
  return nextState;
};

const TopPage = () => {
  const [targetWeekDays, dispatchTargetWeekDays] = useReducer<React.Reducer<WeekDayObjType[], TargetWeekDayReducerActionType>>(targetWeekDaysReducer, (() => {
    const defaultValue = {
      value: true
    };
    return [
      {
        id: 'Monday',
        text: '月',
        ...defaultValue
      },
      {
        id: 'Tuesday',
        text: '火',
        ...defaultValue
      },
      {
        id: 'Wednesday',
        text: '水',
        ...defaultValue
      },
      {
        id: 'Thursday',
        text: '木',
        ...defaultValue
      },
      {
        id: 'Friday',
        text: '金',
        ...defaultValue
      },
      {
        id: 'Saturday',
        text: '土',
        ...defaultValue
      },
      {
        id: 'Sunday',
        text: '日',
        ...defaultValue
      },
      {
        id: 'Holiday',
        text: '祝日',
        ...defaultValue
      }
    ];
  })());

  
  const checkboxHandler = useCallback((id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchTargetWeekDays({
      type: 'setCheck',
      payload: [
        {
          id,
          value: event.target.checked
        }
      ]
    })
  }, []);



  const allCheckboxHandler = useCallback((value: boolean) => {
    dispatchTargetWeekDays({
      type: 'setCheck',
      payload: targetWeekDays.map(({id}) => ({
        id,
        value
      }))
    });
  }, [targetWeekDays]);

  const allCheckHandler = useCallback(() => dispatchTargetWeekDays({
    type: 'setCheckAll',
    payload: {
      value: false
    }
  }), []);

  const allNotCheckHandler = useCallback(() => dispatchTargetWeekDays({
    type: 'setCheckAll',
    payload: {
      value: false
    }
  }), []);

  // 平日のみ選択
  const weekdaysCheckHandler = useCallback(() => {
    const payload = targetWeekDays.map((item) => {
      const returnObj = item;
      if (['Saturday', 'Sunday', 'Holiday'].includes(item.id)) {
        returnObj.value = false;
      } else {
        returnObj.value = true;
      }
      return returnObj;
    });
    dispatchTargetWeekDays({
      type: 'setCheck',
      payload
    })
  }, [targetWeekDays]);

  const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit');
    e.preventDefault();
  }, []);

  return (
    <main>
    <h1>毎日5時に天気予報</h1>
    <div>
      <h2>通知設定</h2>
      <h3>通知したい曜日</h3>
      <form onSubmit={submitHandler}>
        <div className={cn(styles.flexBox, styles.checkboxWrapper)}>
          {targetWeekDays.map(({id, text, value}) => <CheckBox key={id} checked={value} id={`checkbox${id}`} onChange={checkboxHandler(id)} >{text}</CheckBox>)}
        </div>
        <div className={cn(styles.flexBox, styles.handleButtonWrapper)}>
          <ButtonAsTypeButton className={styles.selectionButton} onClick={allCheckHandler}>全て選択</ButtonAsTypeButton>
          <ButtonAsTypeButton className={styles.selectionButton} onClick={allNotCheckHandler}>全て選択解除</ButtonAsTypeButton>
          <ButtonAsTypeButton className={styles.selectionButton} onClick={weekdaysCheckHandler}>平日のみ選択</ButtonAsTypeButton>
        </div><button type="submit" className={styles.submitButton}>設定を更新</button>
      </form>
    </div>
    </main>
  );
};

export default React.memo(TopPage);