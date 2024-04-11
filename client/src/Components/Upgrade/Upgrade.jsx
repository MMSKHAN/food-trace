import React, { useEffect, useState } from 'react'
import Web3 from 'web3';

function Upgrade({state}) {
    const [address, setAddress] = useState(null);
    const [upgrade, setUpgrade] = useState('');
    const [imp, setimp] = useState();
    const [admin, setAdmin] = useState();
    const [error, seterror] = useState('');
    useEffect(() => {
        async function getAccount() {
            if (window.ethereum) {
                try {
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();
                    if (accounts.length > 0) {
                        setAddress(accounts[0]);
                    } else {
                        console.log('No accounts found');
                    }
                } catch (error) {
                    console.error('Error fetching accounts:', error);
                }
            } else {
                console.error('Please install MetaMask or another Ethereum wallet extension');
            }
        }
        getAccount();
    }, []);

    async function handleUpgrade(e) {
        e.preventDefault();
    const { contract } = state;
    if (contract) {
      console.log(contract)
      try {
        await contract.methods.upgradeTo(upgrade).send({ from: address});
          window.alert("Your logical conract address is now upgraded")

      }
       catch (error) {
        window.alert(error.message)
        console.error("Error sending donation:", error);
      }
    }
    }
useEffect(() => {
    async function fetchData() {
        const { contract } = state;
        if (contract) {
            try {
                const adders = await contract.methods.getimplime().call({ from: address });
                setimp(adders[0]);

                setAdmin(adders[1]);
            } catch (error) {
                seterror(error.message);
                console.error("Error fetching contract data:", error);
            }
        }
    }
    fetchData();
}, [state, address]);

  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6" style={{borderRight:"1px solid black",padding:"1rem"}} >  
            <h2 className='text-center' >InPut</h2>
            <form onSubmit={handleUpgrade} >
            <div className="col-md-12 mt-5 ">
                        <label htmlFor="inputName" className="form-label"></label>
                        <input type="text" className="form-control" id="inputName" placeholder='Enter Upgradeable Contract address' value={upgrade} onChange={(e) => setUpgrade(e.target.value)} />
                    </div>
                    <div className="col-12 mt-2">
                        <button type="submit" className="btn btn-primary mt-5">Upgrade</button>
                    </div>

            </form>






            </div>   <div className="col-sm-6"style={{border:"1px black ", padding:"1rem" }}>

<h2 className='text-center ' style={{marginBottom:"5rem"}} > OutPut </h2>
     
<p><span className='add' >Current Logical Address: </span>{imp}  </p>
<p><span className='add' >Admin Address: </span>{admin}  </p>
<p className='text-danger' >{error}  </p>


            </div>
        </div>
    </div>
    </>
  )
}

export default Upgrade
