import React, { useEffect, useState } from 'react';
import "./Farmer.css";
import Parent from './Parent';
import { NavLink } from 'react-router-dom';

function Farmer({ state, address, proxyAddress }) {
    const [firmAdd, setFirmAdd] = useState(''); 
    const [firmname, setFirmname] = useState('');
    const [firmlocation, setLocation] = useState('');
    const [ownername, setownername] = useState('');
    const [ownercontact, setOwnercontact] = useState('');
    const [city, setCity] = useState('');
    const [datas, setDatas] = useState([]);
    const [errors, setErrors] = useState();

    async function handleSetValue(e) {
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'setKisan',
                    type: 'function',
                    inputs: [
                        {
                            type: 'address',
                            name: '_Firmadd'
                        },
                        {
                            type: 'address',
                            name: 'own'
                        },
                        {
                            type: 'string',
                            name: '_Firmname'
                        },
                        {
                            type: 'string',
                            name: '_Firmlocation'
                        },
                        {
                            type: 'string',
                            name: '_ownername'
                        },
                        {
                            type: 'string',
                            name: '_Ownercontact'
                        },
                        {
                            type: 'string',
                            name: '_city'
                        },
                        {
                            type: 'string',
                            name: '_entity'
                        },
                    ]
                }, [address,firmAdd, firmname, firmlocation, ownername, ownercontact, city,"Farm"]); 
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

    useEffect(() => {
        async function handleGetValue(e) {

            const { web3, contract } = state;
            if (contract) {
                try {
                    const data = web3.eth.abi.encodeFunctionCall({
                        name: 'getKisan',
                        type: 'function',
                        inputs: []
                    }, []);
                    const transaction = {
                        from: address,
                        to: proxyAddress,
                        data: data,
                    };

                    const result = await web3.eth.call(transaction);

                    const decodedResult = web3.eth.abi.decodeParameters(
                        [{ type: 'tuple[]', components: [
                            { type: 'address', name: 'Firmadd' },
                            { type: 'string', name: 'Firmname' },
                            { type: 'string', name: 'Firmlocation' },
                            { type: 'string', name: 'Ownername' },
                            { type: 'string', name: 'Ownercontact' },
                            { type: 'string', name: 'city' },
                            { type: 'string', name: 'Entity' },
                        ] }],
                        result
                    );

                    setDatas(decodedResult[0]);

                } catch (error) {
                    setErrors(error)
                }
            }
        }
        handleGetValue();
    },);

    return (
        <div>
            <div className="container-fluid">
                <br />
                <div className="row">
                    <Parent />
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{ borderRight: "1px solid black", padding: "1rem" }} >
                        <h2 className='text-center' >Farm Registration</h2>
                        <form className="row g-3" onSubmit={handleSetValue}>
                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">Farm Wallet Address</label>
                                <input type="text" className="form-control" id="inputName" value={firmAdd} onChange={(e) => setFirmAdd(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">Farm Name</label>
                                <input type="text" className="form-control" id="inputName" value={firmname} onChange={(e) => setFirmname(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">Farm Location</label>
                                <input type="text" className="form-control" id="inputName" value={firmlocation} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">Owner Name</label>
                                <input type="text" className="form-control" id="inputName" value={ownername} onChange={(e) => setownername(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">Owner Contact</label>
                                <input type="text" className="form-control" id="inputName" value={ownercontact} onChange={(e) => setOwnercontact(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputName" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                              
                              </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                    <hr />
                    <div className="col-sm-12">
                        <h2 className='text-center ' style={{ marginBottom: "5rem" }} > Farms List </h2>
                        {errors ? (
                            <p>Error: {errors.message}</p>
                        ) : (
                            <>
                                <table className='conta'>
                                <tr className='row1' >
                                        <th className='name' ><p>Farm Wallet Address</p></th>
                                        <th className='money' ><p>Farm Name</p></th>
                                        <th className='loc' ><p>Farm Location</p></th>
                                        <th className='ownname' ><p>Farm Owner Name</p></th>
                                        <th className='conta' ><p>Farm Owner Contact</p></th>
                                        <th className='city' ><p>City</p></th>
                                      
                                    </tr>
                                    {datas.map((item, index) => (
                                        <tr className='row2' key={index} >
                                            <td><p>{item.Firmadd}</p></td>
                                            <td><p>{item.Firmname} </p></td>
                                            <td><p>{item.Ownername} </p></td>
                                            <td><p>{item.Ownercontact} </p></td>
                                            <td><p>{item.Firmlocation} </p></td>
                                            <td><p>{item.city} </p></td>
                                           
                                            <td> <NavLink to="/CreateProduct" className='btn btn-primary' >Create Product</NavLink> </td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer;
