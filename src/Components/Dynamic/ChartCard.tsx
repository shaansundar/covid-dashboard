import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { defaultChartListState } from "../Pages/Home";

export default function ChartCard(props:any) {
  let x:any[] = [];
  const [data, setData] = useState([]);

  props.data.forEach((e:any) => {
    x.push(e);
  });

  const options = {
    title: {
      text: "Total Cases by the Day",
    },
    series: [
      {
        data: x,
      },
    ],
  };
  return (
      <HighchartsReact highcharts={Highcharts} options={options} />
  );
}
