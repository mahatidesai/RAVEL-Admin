import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {userDetailsUrl, vehicleDetailsUrl, rentDetailsUrl}  from '../urls';

Chart.register(...registerables);

export default function GenerateReports() {
    const [rentDetail, setRentData] = useState([]);
    const [vehicleData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartTitle, setChartTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rentResponse = await fetch(rentDetailsUrl);
                if (!rentResponse.ok) throw new Error('Network response was not ok');
                const rentResult = await rentResponse.json();
                setRentData(rentResult.rented);

                const vehicleResponse = await fetch(vehicleDetailsUrl);
                if (!vehicleResponse.ok) throw new Error('Network response was not ok');
                const vehicleResult = await vehicleResponse.json();
                setData(vehicleResult.vehicle);

                const renterResponse = await fetch(userDetailsUrl);
                if (!renterResponse.ok) throw new Error('Failed to fetch renters');
                const renterResult = await renterResponse.json();
                setUserData(renterResult.response);

            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const generateChartData = (type) => {
        let data, labels;

        switch (type){
            case 'monthlyUser':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                const monthlyUserCounts = Array(12).fill(0);
                userData.forEach(user => {
                    const month = new Date(user.registrationDate).getMonth(); // Assuming registrationDate is in ISO format
                    monthlyUserCounts[month]++;
                });
                data = monthlyUserCounts;
                setChartTitle("Monthly Users Registered");
                break;

            case 'yearlyUser':
                labels = ['2021', '2022', '2023', '2024', '2025'];
                const yearlyUserCounts = Array(5).fill(0);
                userData.forEach(user => {
                    const year = new Date(user.registrationDate).getFullYear();
                    const index = year - 2021; 
                    if (index >= 0 && index < yearlyUserCounts.length) {
                        yearlyUserCounts[index]++;
                    }
                });
                data = yearlyUserCounts;
                setChartTitle("Yearly Users Registered");
                break;

            case 'monthlyVehicle':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                const monthlyVehicleCounts = Array(12).fill(0);
                vehicleData.forEach(vehicle => {
                    const month = new Date(vehicle.registrationDate).getMonth(); 
                    monthlyVehicleCounts[month]++;
                });
                data = monthlyVehicleCounts;
                setChartTitle("Monthly Vehicles Registered");
                break;

            case 'yearlyVehicle':
                labels = ['2021', '2022', '2023', '2024', '2025'];
                const yearlyVehicleCounts = Array(5).fill(0);
                vehicleData.forEach(vehicle => {
                    const year = new Date(vehicle.registrationDate).getFullYear();
                    const index = year - 2021;
                    if (index >= 0 && index < yearlyVehicleCounts.length) {
                        yearlyVehicleCounts[index]++;
                    }
                });
                data = yearlyVehicleCounts;
                setChartTitle("Yearly Vehicles Registered");
                break;

            case 'monthlyRents':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                const monthlyRentCounts = Array(12).fill(0);
                rentDetail.forEach(rent => {
                    const month = new Date(rent.bookedDate).getMonth(); 
                    monthlyRentCounts[month]++;
                });
                data = monthlyRentCounts;
                setChartTitle("Monthly Rents");
                break;

            case 'yearlyRents':
                labels = ['2021', '2022', '2023', '2024', '2025'];
                const yearlyRentCounts = Array(5).fill(0);
                rentDetail.forEach(rent => {
                    const year = new Date(rent.bookedDate).getFullYear();
                    const index = year - 2021;
                    if (index >= 0 && index < yearlyRentCounts.length) {
                        yearlyRentCounts[index]++;
                    }
                });
                data = yearlyRentCounts;
                setChartTitle("Yearly Rents");
                break;
            
            default:
        }

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: chartTitle,
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(255,255,255,1)',
                },
            ],
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar />
            <div id="details">
                <h3>REPORTS</h3>
                <div className="reportoptions">
                    <button onClick={() => generateChartData('monthlyUser')}>Monthly User</button>
                    <button onClick={() => generateChartData('yearlyUser')}>Yearly User</button>
                    <button onClick={() => generateChartData('monthlyVehicle')}>Monthly Vehicle</button>
                    <button onClick={() => generateChartData('yearlyVehicle')}>Yearly Vehicle</button>
                    <button onClick={() => generateChartData('monthlyRents')}>Monthly Rents</button>
                    <button onClick={() => generateChartData('yearlyRents')}>Yearly Rents</button>
                </div>
                <div id="bargraph">
                {chartData.labels && (
                    <div id="Bar">
                        <h4>{chartTitle}</h4>
                        <Bar  data={chartData} options={{ responsive: true,scales: {
            x: {
                ticks: {
                    color: 'white', // Change x-axis labels color
                },
            },
            y: {
                ticks: {
                    color: 'white', // Change y-axis labels color
                },
            },
        },}} />
                    </div>
                )}
            </div>
            </div>
        </>
    );
}
