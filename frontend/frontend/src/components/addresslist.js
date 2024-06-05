import React, { useState, useEffect } from 'react';

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        // Update the URL as per your server configuration
        fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/addresslist')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAddresses(data);  // Set addresses in state
            })
            .catch(error => console.error('Error fetching addresses:', error));
    }, []);

    return (
        <div>
            <h1>Address List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Names</th>
                        <th>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address, index) => (
                        <tr key={index}>
                            <td>{address.name}</td>
                            <td>{address.Address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AddressList;