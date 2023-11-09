import Area from "./Area";
import Donut from "./Donut";
import "./Dashboard.css";
import Risk from "./Risk";

const DashboardContainer = () => {

  return (
    <div className="charts container-fluid">
      <div className="donut">
        {<Donut name={"Orders"} />}
        <div className="donut-header">{"Orders by Category"}</div>
      </div>
      {<Area />}
      <div className="risk">
        {
          <Risk
            name={"Assigned risks"}
            desc={"There are no action items assigned"}
          />
        }
      </div>
      <div className="risk2">
        {
          <Risk
            name={"Assigned action items"}
            desc={"There are no action items assigned"}
          />
        }
      </div>
    </div>
  );
};

export default DashboardContainer;
