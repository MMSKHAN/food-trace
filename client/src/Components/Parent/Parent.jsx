/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Web3 from 'web3';

function Parent({ state, contractaddres,ParentAddr }) {
    const [address, setAddress] = useState("No account connected yet");

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

  



 

  
    
  
    async function click(e) {
        e.preventDefault();
        const { contract, web3 } = state;
        if (contract) {
            try {
                const das = await contract.methods.getimplime().call({ from: address });
                console.log("implementation:", das[0].stringyfy);
                console.log("admin:", das[1]);
            } catch (error) {
                window.alert(error.message);
                console.error("Error fetching implementation and admin addresses:", error);
            }
        }
    }
    
    
  
    return (


<div className="container-fluid">
<br />
<div className="row">
    <div className="col-sm-12">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

<div className="collapse navbar-collapse" id="navbarNav" >
<ul className="navbar-nav">
 
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/">Farmer</NavLink>
  </li>
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/WareHouse1">WareHouse</NavLink>
  </li>
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/CreateProduct">Product</NavLink>
  </li>
</ul>
</div>
</nav> 
    </div>
</div>
</div>


);
}

export default Parent;
