import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import deleteimg from '../images/deleteimg.png';
import profileimg from '../images/profileimg.png';
import { userDetailsUrl, userDeleteUrl } from '../urls'; // Ensure you have a URL for deleting users

export default function UserDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(userDetailsUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.response);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchData();
    }, []);

    const deleteUser = async (userId, firebaseID) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user? This action will also delete associated cars.');

        if (confirmDelete) {
            try {
                const response = await fetch(`${userDeleteUrl}/${userId}/${firebaseID}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }

                // Refresh the user list after deletion
                const updatedData = data.filter(user => user._id !== userId);
                setData(updatedData);
            } catch (error) {
                console.error('Error deleting user:', error);
                setError(error.message);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log("Data fetched:", data);
    console.log(data.length);

    return (
        <>
            <Navbar />
            <div id="details">
                <h2>USER DETAILS</h2>
                <p>Total Number of Users Registered: {data.length}</p>
                <div className="users-list">
                    {data.length > 0 ? (
                        data.map((user) => (
                            <div className="loweruser" key={user._id}>
                                <div className='upperuser'>
                                    <div className="user">
                                        <img id="profileimg" src={profileimg} alt="Profile" />
                                        <div className="profile">
                                            <div className="userName">
                                                <div>Name: {user.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="options">
                                        <img
                                            className="optionimg2"
                                            src={deleteimg}
                                            alt="Delete"
                                            onClick={() => deleteUser(user._id, user.firebaseID)} // Call deleteUser on click
                                            style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
                                        />
                                    </div>
                                </div>
                                <div className='otherUserDetails'>
                                    <div>Email: {user.email}</div>
                                    <div>Phone Number: {user.phone}</div>
                                    <div>License Number: {user.liscense}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
