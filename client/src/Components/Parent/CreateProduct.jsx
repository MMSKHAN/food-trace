import React, { useEffect, useState } from 'react'
import "./Farmer.css"
import Parent from './Parent';
import { NavLink } from 'react-router-dom';
function CreateProduct({state,address,proxyAddress}) {
    const [name,setName] = useState('');
    const [variety,setVarity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [dateofharvest, setdateofharvest] = useState('');
    const [datas, setDatas]=useState([])
    const [errors, setErrors]=useState()
    async function handleSetValue(e) {
        console.log("add",address,"pro",proxyAddress)
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'setProduct',
                    type: 'function',
                    inputs: [
                        {
                            type: 'address',
                            name: 'ownadd'
                        },
                        {
                            type: 'string',
                            name: '_name'
                        },
                        {
                            type: 'string',
                            name: '_variety'
                        },
                        {
                            type: 'uint256',
                            name: '_quantity'
                        },
                        {
                            type: 'string',
                            name: '_date'
                        },
                        
                    ]
                }, [address, name, variety,quantity,dateofharvest]);
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
    useEffect(()=>{
        async function handleGetValue(e) {
     
            const { web3, contract } = state;
            if (contract) {
                try {
                    const data = web3.eth.abi.encodeFunctionCall({
                        name: 'getProduct',
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
                            { type: 'uint', name: 'id' },
                            { type: 'string', name: 'name' },
                            { type: 'address', name: 'currentOwner' },
                            { type: 'string', name: 'variety' },
                            { type: 'uint', name: 'quantity' },
                            { type: 'string', name: 'dateofharvest' },
                        ] }],
                        result
                    );
    
                    setDatas(decodedResult[0]); 
         
                } catch (error) {
                   setErrors(error.message)
                }
            }
        }
    handleGetValue();
    })
  return (
          <div>
            <div className="container-fluid">
<br />
<div className="row">
    <Parent/>
</div>
</div>


<div className="container-fluid">
    <div className="row">
    <div className="col-sm-12" style={{borderRight:"1px solid black",padding:"1rem"}} >  
            <h2 className='text-center' > Create Product</h2>
            <form className="row g-3" onSubmit={handleSetValue}>
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Variety</label>
                        <input type="text" className="form-control" id="inputAge" value={variety} onChange={(e) => setVarity(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Quantity</label>
                        <input type="number" className="form-control" id="inputAge" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Harvesting Date</label>
                        <input type="date" className="form-control" id="inputAge" value={dateofharvest} onChange={(e) => setdateofharvest(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>

        </div>
        <hr />
        <div className="col-sm-12">
        <h2 className='text-center ' style={{marginBottom:"5rem"}} > Product List </h2>
       
       {errors ? (
                <p>Error: {errors.message}</p>
            ) : (

                
  <>
            <table className='conta'>
            <tr className='prorow1' > <th className='id' ><p>Id</p></th>
      <th className='names' ><p>Name</p></th>
      <th className='adders' ><p>Current Owner</p></th>
      <th className='varrity' ><p>Variety</p></th>    
      <th className='quantity' ><p>Quantity</p></th>    
      <th className='hardata' ><p>Harvesting Date</p></th>    
            </tr>

                                {datas.map((item, index) => (
                                
                                    <tr className='prorow2' key={index} >
                                    <td><p>{item.id}</p></td>
                                
                                    <td><p>{item.name} </p></td>
                                    <td><p>{item.currentOwner} </p></td>
                                    <td><p>{item.variety} </p> </td>
                                    <td><p>{item.quantity} </p> </td>
                                    <td><p>{item.dateofharvest} </p> </td>
<td className='productinfo' ><NavLink to={`/Send/${item.id}`}  className="btn btn-primary" style={{height:"fit-content"}} >Send</NavLink>
<NavLink to={`/Tracking/${item.id}/${item.name}/${item.currentOwner}/${item.variety}/${item.quantity}/${item.dateofharvest}`} className="btn btn-primary" style={{ height: "fit-content" }}>Tracking</NavLink>
</td>
                                  </tr>
                                ))}
                                            </table>  
                    </>
            )}

        </div>
    </div>
</div>

        </div>
  )
}

export default CreateProduct
