import React, { useEffect, useState } from 'react';
import "./Farmer.css";
import Child from './Child';
import { useParams } from 'react-router-dom';

function Tracking({ state, address, proxyAddress }) {
    const { id, name, currentOwner, variety, quantity, dateofharvest } = useParams();

    const [entityDetails, setEntityDetails] = useState([]);
    const [locationDetails, setLocationDetails] = useState([]);
    const [timestamps, setTimestamps] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        async function fetchFirmDetails() {
            const { web3, contract } = state;
            if (contract) {
                try {
                    const data = web3.eth.abi.encodeFunctionCall({
                        name: 'TrackProduct',
                        type: 'function',
                        inputs: [{ type: 'uint256', name: 'productId' }]
                    }, [parseInt(id)]);

                    const transaction = { from: address, to: proxyAddress, data };

                    const result = await web3.eth.call(transaction);
                    const Result = web3.eth.abi.decodeParameters(
                        [{ type: 'string[]', name: 'entityDetails' },
                        { type: 'string[]', name: 'locationDetails' },
                        { type: 'uint[]', name: 'timestamps' }],
                        result
                    );

                    setEntityDetails(Result.entityDetails);
                    setLocationDetails(Result.locationDetails);
                    setTimestamps(Result.timestamps);
                } catch (error) {
                    setErrors(error.message);
                }
            }
        }

        fetchFirmDetails();
    }, [id, state, address, proxyAddress]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toLocaleDateString(); // Format date part
        // const formattedTime = date.toLocaleTimeString(); // Format time part
        return `${formattedDate}`;
    };

    return (
        <div>
            <div className="container-fluid">
                <Child />
                <div className="row mt-2 ">
                    <div className="col-sm-12 text-center">
                        <h1>Product Information</h1>
                    </div>
                </div>
                <table className='conta'>
                    <tr className='prorow1 ' >
                        <th className='id'style={{position:"relative",left:"4.7rem"}} ><p>Id</p></th>
                        <th style={{position:"relative",left:"3.5rem"}} ><p>Product Name</p></th>
                        <th style={{position:"relative",left:"-0.5rem"}} ><p>Current Owner</p></th>
                        <th style={{position:"relative",left:"-3.9rem"}} ><p>Variety</p></th>
                        <th style={{position:"relative",left:"-6.5rem"}} ><p>Quantity</p></th>
                        <th style={{position:"relative",right:"10.5rem"}} ><p>Harvesting Date</p></th>
                    </tr>
                    <tr className='prorow2'>
                        <td><p>{id}</p></td>
                        <td><p>{name} </p></td>
                        <td><p>{currentOwner} </p></td>
                        <td><p>{variety} </p> </td>
                        <td><p>{quantity} </p> </td>
                        <td><p>{dateofharvest} </p> </td>
                    </tr>
                </table>
                <div className="col-sm-12">
                    <h2 className='text-center text-primary' style={{ marginBottom: "5rem" }}>Product Tracking</h2>
                    <div style={{ paddingLeft: "2rem" }} >
                        {errors ? (
                            <p>Error: {errors}</p>
                        ) : (
                            <>
                                {entityDetails.map((item, index) => (
                                    <div className='row' key={index}>
                                        <p style={{ color: index === entityDetails.length - 1 ? 'red' : 'black' }}>
                                           {
                                            index === entityDetails.length - 1 ?
                                            <>
                                             <div>
                                                    <h4> Current Product holder</h4>
                                                    <p><span style={{ color: "blue", fontWeight: "bold" }}>Firm Name:</span> {item}</p>
                                                    <p><span style={{ color: "blue", fontWeight: "bold" }}>Firm Location:</span> {locationDetails[index]}</p>
                                                    <p><span style={{ color: "blue", fontWeight: "bold" }}>Shipping Date:</span> {formatDate(timestamps[index])}</p>
                                                </div>
                                            </>:<>
                                            <div>
                                                    <h4> Previous Product holder</h4>
                                                    <p><span style={{ color: "blue", fontWeight: "bold" }}>Firm Name:</span> {item}</p>
                                                    <p><span style={{ color: "blue", fontWeight: "bold" }}>Firm Location:</span> {locationDetails[index]}</p>
                                                    <p><span style={{ color: "blue", fontWeight: "bold" }}>Shipping Date:</span> {formatDate(timestamps[index])}</p>
                                                </div>
                                            
                                            </>

                                           }
                                        </p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tracking;
