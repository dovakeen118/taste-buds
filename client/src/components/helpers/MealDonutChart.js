import React from "react";
import { Chart } from "react-google-charts";

export const MealDonutChart = ({ mealCounts }) => {
  return (
    <Chart
      chartType="PieChart"
      width="400px"
      data={[
        ["Meal", "Count"],
        ["Breakfast", mealCounts.breakfast],
        ["Lunch", mealCounts.lunch],
        ["Dinner", mealCounts.dinner],
        ["Snack", mealCounts.snack],
        ["Dessert", mealCounts.dessert],
      ]}
      options={{
        title: "Meals breakdown",
        colors: ["#FFBC42", "#9DC183", "#A53B2A", "#42A388", "#F29F97"],
      }}
    />
  );
};
