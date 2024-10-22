import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import editwhite from '../images/editwhite.png';
import deleteimg from '../images/deleteimg.png';
import profileimg from '../images/profileimg.png';
import {userDetailsUrl, vehicleDetailsUrl, rentDetailsUrl}  from '../urls';

export default function RentDetails() {

    const [rentdetail, setRentData] = useState([]);
    const [vehicledata, setData] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle error state

    const [userdata, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const rentresponse = await fetch(rentDetailsUrl);
                if (!rentresponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const rentresult = await rentresponse.json();
                setRentData(rentresult.rented);

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
                setLoading(false); // Set loading to false when done
            }

            
            

        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log("Data fetched:", userdata);
    console.log(vehicledata.length);

    const combinedData = rentdetail.map(rented => ({
        ...rented,
        vehicle: vehicledata.find(vehicle=> vehicle._id === rented.vehicleID),
        renter: userdata.find(user => user.firebaseID === rented.renterFirebaseID),
        owner: userdata.find(user => user.firebaseID === rented.ownerFirebaseID)
    }));

    console.log("combinedData",combinedData);
return (
    <>
        <Navbar/>
        <div id="rentdetail">
            <h2>RENT DETAILS</h2>
            <div id="tableDiv">
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tr>
                        <td>Renter Name</td>
                        <td>Renter Phone</td>
                        <td>Owner Name</td>
                        <td>Owner Phone</td>
                        <td>Vehicle Name</td>
                        <td>Vehicle Company Name</td>
                        <td>Rent</td>
                        <td>Location</td>
                        <td>Booking Date</td>
                        <td>Booking Time</td>
                        <td>Booked From</td>
                        <td>Booked To</td>
                    </tr>
                    {combinedData.length > 0 ? (
                        combinedData.map((rentInfo) => (
                            <tr key={rentInfo._id}> {/* Assuming `_id` exists in rentInfo */}
                                <td>{rentInfo.renter?.name || 'N/A'}</td>
                                <td>{rentInfo.renter?.phone || 'N/A'}</td>
                                <td>{rentInfo.owner?.name || 'N/A'}</td> {/* Add owner data if it exists */}
                                <td>{rentInfo.owner?.phone || 'N/A'}</td>
                                <td>{rentInfo.vehicle.vehicleName}</td>
                                <td>{rentInfo.vehicle.vehicleCompanyName}</td>
                                <td>{rentInfo.vehicle.vehicleRent}/day</td>
                                <td>{rentInfo.vehicle.vehicleLocation || 'N/A'}</td>
                                <td>{rentInfo.bookedDate.substring(0,10) || 'N/A'}</td>
                                <td>{rentInfo.bookedDate.substring(11) || 'N/A'}</td>
                                <td>{rentInfo.dateRentFrom.substring(0,10) || 'N/A'}</td>
                                <td>{rentInfo.dateRentTo.substring(0,10) || 'N/A'}</td>
                               
                            </tr>
                        ))
                    ) : (
                        <p>No renting</p>
                    )}
                </table>
            </div>
        </div>
    </>
)}