import { useState } from "react";

export function MainContent() {
  const userName = localStorage.getItem("Username");

  const [TotalLeads, setTotalLeads] = useState(0)

  const leadData = () => {
    fetch("https://hackathonmodule-2.herokuapp.com/lead", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setTotalLeads(data.length))
  };
  leadData()

  return (
    <section className="mainContent">
      <article>
        <p>Welcome {userName}</p>
      </article>
      <article>
        <div>
          <p>Total leads currently</p>
          <p>{TotalLeads}</p>
        </div>
        <div>
          <p>Revenue This Month</p>
          <p>Rs. 35,000.00 ⬆️ 100%</p>
          <p>Last Month: 0</p>
        </div>
        <div>
          <p>Deals Closing This Month</p>
          <p>10</p>
        </div>
        <div>
          <p>Overdue Tasks</p>
          <p>9</p>
        </div>
      </article>
      <article>
        <div>
          <p>Last 4 Quarter Performance Overview</p>
        </div>
        <div>
          <p>Anomaly In Leads Creation This Quarter</p>
        </div>
        <div>
          <p>Leads By Source This Month</p>
        </div>
        <div>
          <p>Anomaly In Deals Closure Amount This Quarter</p>
        </div>
      </article>
    </section>
  );
}
