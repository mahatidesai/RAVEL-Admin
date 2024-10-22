import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import deleteimg from '../images/deleteimg.png';
import { userDetailsUrl, vehicleDetailsUrl, vehicleDeleteUrl } from '../urls';

export default function CarDetails() {
    const [vehicledata, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userdata, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(vehicleDetailsUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.vehicle);

                const renterResponse = await fetch(userDetailsUrl);
                if (!renterResponse.ok) throw new Error('Failed to fetch renters');
                const renterResult = await renterResponse.json();
                setUserData(renterResult.response);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteVehicle = async (vehicleId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');

        if (!confirmDelete) {
            return; // Exit the function if the user cancels
        }

        console.log('Deleting vehicle with ID:', vehicleId);
        try {
            const response = await fetch(`${vehicleDeleteUrl}/${vehicleId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete vehicle');
            }
            
            setData((prevData) => prevData.filter(vehicle => vehicle._id !== vehicleId));
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const combinedData = vehicledata.map(vehicle => ({
        ...vehicle,
        renter: userdata.find(user => user.firebaseID === vehicle.firebaseID)
    }));

    return (
        <>
            <Navbar />
            <div id="details">
                <h2>VEHICLE DETAILS</h2>
                <p>Total Vehicles Registered: {combinedData.length}</p>
                <div className="vehicleCategory">
                    {['SCOOTER', 'CAR', 'BIKE', 'CYCLE'].map(type => (
                        <div className="Type" key={type}>
                            <div className="CategoryName">{type}</div>
                            <p className="CategoryName">Number of {type}: {vehicledata.filter(vehicle => vehicle.vehicleType === type).length}</p>
                            {combinedData.length > 0 ? (
                                combinedData.filter(vehicle => vehicle.vehicleType === type).map(vehicle => (
                                    <div className="vehicleCard" key={vehicle._id}>
                                        <div id="vehicleName">{vehicle.vehicleName}</div>
                                        <img className="vehicleImage" src={vehicle.vehicleImage} alt={vehicle.vehicleName} />
                                        <div id="vehicleCompanyName">{vehicle.vehicleCompanyName}</div>
                                        <div id="vehicleRent">RENT: {vehicle.vehicleRent}/day</div>
                                        <div id="vehicleRenterName">Renter: {vehicle.renter?.name || 'N/A'}</div>
                                        <div id="vehicleRenterPhone">Renter Phone: {vehicle.renter?.phone || 'N/A'}</div>
                                        <div className="options">
                                            <img
                                                className="optionimg2"
                                                src={deleteimg}
                                                alt="Delete"
                                                onClick={() => deleteVehicle(vehicle._id)}
                                                style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No vehicles found.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
