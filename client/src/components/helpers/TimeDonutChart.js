import React from "react";
import { Chart } from "react-google-charts";

export const TimeDonutChart = ({ timeCounts }) => {
  return (
    <Chart
      chartType="PieChart"
      width="400px"
      data={[
        ["Time", "Count"],
        ["Quick", timeCounts.quick],
        ["Average", timeCounts.average],
        ["Extended", timeCounts.extended],
      ]}
      options={{
        title: "Cook times breakdown",
        colors: ["#42A388", "#FFBC42", "#A53B2A"],
      }}
    />
  );
};
