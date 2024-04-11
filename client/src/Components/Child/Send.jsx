import React, { useState } from 'react'
import "./Farmer.css"
import Child from './Child';
import { useParams } from 'react-router-dom';

function Send({ state, address, proxyAddress }) {
    const { id } = useParams();
    const [receiver, setReceiver] = useState('');
    
    async function handleSetValue(e) {
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const currentDateInSeconds = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'sendProduct',
                    type: 'function',
                    inputs: [
                        {
                            type: 'uint256',
                            name: 'productId'
                        },
                        {
                            type: 'address',
                            name: 'sender'
                        },
                        {
                            type: 'address',
                            name: 'receiver'
                        },
                        {
                            type: 'uint256',
                            name: 'date'
                        }
                    ]
                }, [id, address, receiver, currentDateInSeconds]); // Include current timestamp as an argument

                const transaction = {
                    from: address,
                    to: proxyAddress,
                    data: data,
                };

                await web3.eth.sendTransaction(transaction);
                window.alert("Success");
            } catch (error) {
                window.alert(error.message);
                console.error("Error sending transaction:", error);
            }
        }
    }

    return (
        <div>
            <div className="container-fluid">
                <br />
                <div className="row">
                    <Child/>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{ borderRight: "1px solid black", padding: "1rem" }} >
                        <h2 className='text-center' > Product Sending</h2>
                        <form className="row g-3" onSubmit={handleSetValue}>

                            <div className="col-md-12">
                                <label htmlFor="inputAge" className="form-label">Id</label>
                                <input type="text" className="form-control" id="inputAge" value={id} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputAge" className="form-label">Owner Address</label>
                                <input type="text" className="form-control" id="inputAge" value={address} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">Receiver Address</label>
                                <input type="text" className="form-control" id="inputName" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>

                    </div>
                    <hr />

                </div>
            </div>
        </div>
    )
}

export default Send
