import CheckBox from "@/components/atoms/CheckBox/CheckBox";
import { useMemo, memo } from "react";
import Button from "@/components/atoms/Button/Button";

const TopPage = () => {
  const weekDaysArray = useMemo(() => [
    {
      id: 'Monday',
      text: '月',
    },
    {
      id: 'Tuesday',
      text: '火',
    },
    {
      id: 'Wednesday',
      text: '水',
    },
    {
      id: 'Thursday',
      text: '木',
    },
    {
      id: 'Friday',
      text: '金',
    },
    {
      id: 'Saturday',
      text: '土',
    },
    {
      id: 'Sunday',
      text: '日',
    },
    {
      id: 'Holiday',
      text: '祝日',
    },
  ], []);

  return (
    <main>
    <h1>毎日5時に天気予報</h1>
    <div>
      <h2>通知設定</h2>
      <h3>通知したい曜日</h3>
      <form>
        {weekDaysArray.map(({id, text}) => <CheckBox key={id} id={`checkbox${id}`} >{text}</CheckBox>)}
        <div>
          <Button>全て選択</Button>
          <Button>全て選択解除</Button>
          <Button>平日のみ選択</Button>
        </div>
        <Button>設定を更新</Button>
      </form>
    </div>
    </main>
  );
};

export default memo(TopPage);