import React, { useState } from 'react'
import Child from './Child';

function DataMigration({state,address,proxyAddress}) {
  const [upgrade, setUpgrade] = useState('');
  async function handleUpgrade(e) {
    e.preventDefault();
    const { web3, contract } = state;
    if (contract) {
        try {
            const data = web3.eth.abi.encodeFunctionCall({
                name: 'migrateDataFromParent',
                type: 'function',
                inputs: [
                    {
                        type: 'address',
                      name: 'parentAddress'
                    },
                ]
            }, [upgrade]);
              const transaction = {
                from: address,
                to: proxyAddress,
                data: data,
            };
console.log("object",transaction)
            await web3.eth.sendTransaction(transaction);
            window.alert("Success! Data is migrated now");
        } catch (error) {
            window.alert(error.message);
            console.error("Error sending transaction:", error);
        }
    }
  }
  return (
    <>
        <div className="container-fluid">
          <div className="row"><Child/></div>
        <div className="row"style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div className="col-sm-6  text-center"  >  
            <h2 className='text-center' > Data Migration </h2>
            <form onSubmit={handleUpgrade} >
            <div className="col-md-12 mt-5 ">
                        <label htmlFor="inputName" className="form-label"></label>
                        <input type="text" className="form-control" id="inputName" placeholder='Enter Version 1 Contract address' value={upgrade} onChange={(e) => setUpgrade(e.target.value)} />
                    </div>
                    <div className="col-12 mt-2">
                        <button type="submit" className="btn btn-primary mt-5">Migrate</button>
                    </div>

            </form>

</div>
</div>
</div>


    </>
  )
}

export default DataMigration
