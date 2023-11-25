import React from "react";
import Chart from "react-apexcharts";
import { categoryAPI } from "../../api/category";

function Donut() {
  const [category, setCategory] = React.useState([]);
  const [series, setSeries] = React.useState([30, 40, 45]); // Initialize with default values

  const [cat, setCat] = React.useState("All");

  React.useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await categoryAPI(); 
      // Prepare data for the chart
      const categories = category.map((item) => item.name);
      const seriesData = category.map((item) => item.someDataProperty); // Replace 'someDataProperty' with the property containing numerical data
  
      setCategory(categories);
      setSeries(seriesData);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching categories:", error);
    }
  };

   

  const title = "Orders";
  const options = {
    labels: category,
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

  // const series = seriesData;

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
