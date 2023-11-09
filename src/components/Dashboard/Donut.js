import React from "react";
import Chart from "react-apexcharts";

function Donut() {
  const title = "Orders";
  const options = {
    labels: ["Pizza", "Burgers", "Drinks"],
    title: {
      text: title,
      style: { color: "#C7C7C7", fontSize: "20px" },
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
  };
  const series = [30, 40, 45];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            width='100%'
            height={450}
            options={options}
            series={series}
            type="donut"
            sx={{ backgroundColor: "red" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Donut;
