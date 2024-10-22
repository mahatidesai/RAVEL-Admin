const url = 'http://192.168.0.123:5000/'; //home url
// const url = 'http://192.168.112.70:5000/'; //mahati hotspot

const userDetailsUrl = url + 'get_all_user_data'; //getting all the user data

const vehicleDetailsUrl = url + 'get_all_vehicle_data'; //getting all the vehicle data

const vehicleDeleteUrl = url + 'delete_vehicle'; // deleting the vehicle

const rentDetailsUrl = url + 'get_all_rented_vehicle'; //getting the renter details data

const userDeleteUrl = url + 'delete_user'; //deleting the user

export {userDetailsUrl, vehicleDetailsUrl, rentDetailsUrl, vehicleDeleteUrl, userDeleteUrl};