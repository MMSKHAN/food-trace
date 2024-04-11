/*eslint-disable*/
import React, { useEffect,useState} from "react";
import getWeb3 from "./getWeb3";
import ProxyAbi from "./contracts/Proxy.json"
import Child from "./Components/Child/Child";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Upgrade from "./Components/Upgrade/Upgrade";
import Farmer from "./Components/Parent/Farmer";
import Farmer2 from "./Components/Child/Farmer";
import WhareHouse2 from "./Components/Child/WhareHouse";
import WholeSaler from "./Components/Child/WholeSaler";
import Logistics from "./Components/Child/Logistics";
import DataMigration from "./Components/Child/DataMigration";
import WhareHouse from "./Components/Parent/WhareHouse";
import CreateProduct from "./Components/Parent/CreateProduct";
import Send from "./Components/Parent/Send";
import Tracking from "./Components/Parent/Tracking";
import CreateProduct2 from "./Components/Child/CreateProduct";
import Send2 from "./Components/Child/Send";
import Tracking2 from "./Components/Child/Tracking";
import Registration from "./Components/Parent/Registration";
function App() {
  const [state, setState] = useState({web3: null,contract: null});
  const [proxyAddress,setcontractaddres]=useState(null)
  const [address, setAddress] = useState("No account connected yet");
  useEffect(() => {
    async function getAccount() {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setAddress(accounts[0]);
                } else {
                    console.log('No accounts found');
                }
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
     
    }
    getAccount();
}, []);
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        
        const deployedNetwork = ProxyAbi.networks[networkId];
     
        setcontractaddres(deployedNetwork.address)
        const instance = new web3.eth.Contract(
          ProxyAbi.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Please connect with wallet first");
        console.log(error);
      }
    };
    init();
  }, []);
  return (
   <>


<BrowserRouter>
        <Navbar state={state} proxyAddress={proxyAddress}  />
        <Routes>
          {/* <Route path="/" element={<Parent state={state} proxyAddress={proxyAddress} ParentAddr={ParentAddr} />} /> */}
          <Route path="/Upgrade" element={<Upgrade state={state}  />}/>
          <Route path="/Version2" element={<Farmer2 state={state} proxyAddress={proxyAddress} />} />
          {/* <Route path="/" element={<Registration state={state} proxyAddress={proxyAddress} address={address}  />} /> */}
          <Route path="/" element={<Farmer state={state} proxyAddress={proxyAddress} address={address}  />} />
          <Route path="/WareHouse1" element={<WhareHouse state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/v2Data Migration" element={<DataMigration state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/v2Farmer" element={<Farmer2 state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/Version2" element={<Child state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/v2WareHouse" element={<WhareHouse2 state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/v2Logistics" element={<Logistics state={state} proxyAddress={proxyAddress} address={address}/>} />
          <Route path="/v2Wholesaler" element={<WholeSaler state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/CreateProduct" element={<CreateProduct state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/Send/:id" element={<Send state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/Tracking/:id/:name/:currentOwner/:variety/:quantity/:dateofharvest" element={<Tracking state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/Tracking2/:id/:name/:currentOwner/:variety/:quantity/:dateofharvest" element={<Tracking2 state={state} proxyAddress={proxyAddress} address={address} />} />

            <Route path="/v2CreateProduct" element={<CreateProduct2 state={state} proxyAddress={proxyAddress} address={address} />} />
          <Route path="/v2Send/:id" element={<Send2 state={state} proxyAddress={proxyAddress} address={address} />} />
          {/* <Route path="/v2Tracking/:id" element={<Tracking2 state={state} proxyAddress={proxyAddress} address={address} />} /> */}
          <Route path="/v2Tracking/:id/:name/:currentOwner/:variety/:quantity/:dateofharvest" element={<Tracking2 state={state} proxyAddress={proxyAddress} address={address} />} />
        </Routes>
  
      </BrowserRouter>
   </>
  );
}

export default App;
