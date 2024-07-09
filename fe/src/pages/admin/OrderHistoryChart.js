// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";

// const OrderHistoryChart = () => {
//   const [data, setData] = useState([]);

  
//   useEffect(() => {
//     // Fetch order history data
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/order-history'); // Replace with your API endpoint
//         const result = await response.json();
//         setData(result.data); // Assuming the data is in result.data
//       } catch (error) {
//         console.error('Error fetching order history:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const config = {
//     data,
//     xField: 'date',
//     yField: 'orderCount',
//     xAxis: {
//       type: 'timeCat', 
//       tickCount: 5, // Number of ticks on the x-axis
//     },
//     yAxis: {
//       label: {
//         formatter: (v) => `${v}`, // Custom formatter for the y-axis labels
//       },
//     },
//     point: {
//       size: 5,
//       shape: 'diamond',
//     },
//     tooltip: {
//       showMarkers: true,
//     },
//     state: {
//       active: {
//         style: {
//           shadowBlur: 4,
//           stroke: '#000',
//           fill: 'red',
//         },
//       },
//     },
//     interactions: [{ type: 'marker-active' }],
//   };

//   return <Line {...config} />;
// };

// export default OrderHistoryChart;
