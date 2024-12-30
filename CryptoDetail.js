import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";

function CryptoDetail() {
  const { id } = useParams();
  const [chartData, setChartData] = useState({});
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setCrypto(response.data);
      })
      .catch((error) => console.error("Error fetching coin data:", error));

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: { vs_currency: "usd", days: 7 },
      })
      .then((response) => {
        const prices = response.data.prices.map((price) => price[1]);
        const dates = response.data.prices.map((price) =>
          new Date(price[0]).toLocaleDateString()
        );

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              borderColor: "blue",
              backgroundColor: "lightblue",
              fill: true,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{crypto ? crypto.name : "Loading..."}</h1>
      {chartData.labels && <Line data={chartData} />}
    </div>
  );
}

export default CryptoDetail;
