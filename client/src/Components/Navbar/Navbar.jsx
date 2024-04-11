import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Web3 from 'web3';

function Navbar({ state, proxyAddress }) {
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
  return (
    <>
   <div className="container-fluid">
    <div className="row">
        <div className="col-sm-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav" >
    <ul className="navbar-nav">
      <li class="nav-item">
        <NavLink className="nav-link text-white " to="/">Version 1</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link text-white " to="/Upgrade">Upgrade</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link text-white " to="/Version2">Version 2</NavLink>
      </li>
    </ul>
    <div className='addreses'>
    <p> <span className='add' >Contract Address:</span> {proxyAddress}</p>
    <p><span className='add' >Connected Account:</span> {address}</p>

    </div>
  </div>
</nav> 
        </div>
    </div>
   </div>
    </>
  )
}

export default Navbar
