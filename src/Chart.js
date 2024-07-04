import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useLocation } from 'react-router';
export default function Chart() {



const [chartData, setChartData] = useState({});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const location=useLocation()
const coin=location.state.coin
useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.coingecko.com/api/v3/coins/'+coin.id+'/market_chart', {
          params: {
            vs_currency: 'usd',
            days: '30',
            interval: 'daily'
          }
        });

        console.log('API result:', result); // Log the entire result

        const prices = result.data.prices;
        if (!Array.isArray(prices)) {
          throw new Error('Invalid data structure');
        }

        const dates = prices.map(price => new Date(price[0]).toLocaleDateString());
        const values = prices.map(price => price[1]);

        console.log('Dates:', dates); // Debugging log for dates
        console.log('Values:', values); // Debugging log for values

        setChartData({
          labels: dates,
          datasets: [
            {
              label: coin.name+' Price (USD)',
              data: values,
              fill: false,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
            }
          ]
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h2>{coin.name} Price Over the Last 30 Days</h2>
      <div style={{ width: '100vw', height: '80vh' }} className='flex justify-center'>
  {Object.keys(chartData).length ? <Line data={chartData} /> : null}
</div>

    </div>
  );
  
}
