// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "./Parent.sol";

contract Child{
    uint private _id;
    address public owner;
    bool public isMigrationInProgress;

    constructor() {
        _id = 1;
        owner = msg.sender;
        isMigrationInProgress = false;
    }

    struct Entity {
        address Firmadd;
        string Firmname;
        string Firmlocation;
        string Ownername;
        string Ownercontact;
        string city;
        string Entity;
    }

    Entity[] public Kisan;
    Entity[] public warhouse;
    Entity[] public log;
    Entity[] public wholesaler;

    struct Product {
        uint id;
        string name;
        address currentOwner;
        string variety;
        uint quantity;
        string dateofharvest;
    }

    Product[] public products;
    mapping(uint => address[]) public productOwnership;
    mapping(uint => uint) public transferTimestamps;

    function setEntity(Entity[] storage entities,address _Firmadd, string memory _Firmname, string memory _Firmlocation, string memory _Ownername, string memory _Ownercontact, string memory _city, string memory _entity) private {
      
        entities.push(Entity(_Firmadd, _Firmname, _Firmlocation, _Ownername, _Ownercontact, _city, _entity));
    }

    function setKisan( address own,address _Firmadd, string memory _Firmname, string memory _Firmlocation, string memory _Ownername, string memory _Ownercontact, string memory _city, string memory _entity) public {
       require(own==owner,"only admin can add this entity");
        setEntity(Kisan, _Firmadd, _Firmname, _Firmlocation, _Ownername, _Ownercontact, _city, _entity);
    }

    function setWare(address own,address _Firmadd, string memory _Firmname, string memory _Firmlocation, string memory _Ownername, string memory _Ownercontact, string memory _city, string memory _entity) public {
        require(own==owner,"only admin can add this entity");
        setEntity(warhouse, _Firmadd, _Firmname, _Firmlocation, _Ownername, _Ownercontact, _city, _entity);
    }

    function setLog(address own,address _Firmadd, string memory _Firmname, string memory _Firmlocation, string memory _Ownername, string memory _Ownercontact, string memory _city, string memory _entity) public {
         require(own==owner,"only admin can add this entity");
        setEntity(log, _Firmadd, _Firmname, _Firmlocation, _Ownername, _Ownercontact, _city, _entity);
    }

    function setWholesaler(address own,address _Firmadd, string memory _Firmname, string memory _Firmlocation, string memory _Ownername, string memory _Ownercontact, string memory _city, string memory _entity) public {
       require(own==owner,"only admin can add this entity");
        setEntity(wholesaler, _Firmadd, _Firmname, _Firmlocation, _Ownername, _Ownercontact, _city, _entity);
    }
  function getKisan() public view returns (Entity[] memory) {
        return Kisan;
    }
  function getWare() public view returns (Entity[] memory) {
        return warhouse;
    }
  function getLog() public view returns (Entity[] memory) {
        return log;
    }
  function getWholesaler() public view returns (Entity[] memory) {
        return wholesaler;
    }
    function setProduct(string memory _name, address _currentOwner,string memory _variety, uint _quantity, string memory _date) public {
          if (!isMigrationInProgress) {
        bool isFarmer = false;
        for (uint i = 0; i < Kisan.length; i++) {
            if (Kisan[i].Firmadd == _currentOwner) {
                isFarmer = true;
                break;
            }
        }
        require(isFarmer, "Address is not a registered farmer.");
        productOwnership[_id].push(_currentOwner);
        transferTimestamps[_id] = block.timestamp;
    }
        products.push(Product(_id, _name, _currentOwner, _variety, _quantity, _date));

        _id++;
    }
   function getProduct() public view returns(Product[] memory){
        return products;
    } 
    function sendProduct(uint productId, address sender, address receiver, uint date) public {
        require(productId > 0 && productId <= products.length, "Invalid product ID");
        bool isSender = false;
        for (uint i = 0; i < products.length; i++) {
            if (products[i].id == productId && products[i].currentOwner == sender ) {
                isSender = true;
                break;
            }
        }
        require(isSender, "You are not the owner of this product");
        products[productId - 1].currentOwner = receiver;
        productOwnership[productId].push(receiver);
        transferTimestamps[productId] = date;
    }

    function TrackProduct(uint productId) public view returns (string[] memory entityDetails, string[] memory locationDetails, uint[] memory timestamps) {
        address[] memory productOwners = productOwnership[productId];
        entityDetails = new string[](productOwners.length);
        locationDetails = new string[](productOwners.length);
        timestamps = new uint[](productOwners.length);
        for (uint i = 0; i < productOwners.length; i++) {
            for (uint j = 0; j < Kisan.length; j++) {
                if (Kisan[j].Firmadd == productOwners[i]) {
                    entityDetails[i] = Kisan[j].Entity;
                    locationDetails[i] = Kisan[j].Firmlocation;
                    timestamps[i] = transferTimestamps[productId];
                    break;
                }
            }
            for (uint j = 0; j < warhouse.length; j++) {
                if (warhouse[j].Firmadd == productOwners[i]) {
                    entityDetails[i] = warhouse[j].Entity;
                    locationDetails[i] = warhouse[j].Firmlocation;
                    timestamps[i] = transferTimestamps[productId];
                    break;
                }
            }
            for (uint j = 0; j < wholesaler.length; j++) {
                if (wholesaler[j].Firmadd == productOwners[i]) {
                    entityDetails[i] = wholesaler[j].Entity;
                    locationDetails[i] = wholesaler[j].Firmlocation;
                    timestamps[i] = transferTimestamps[productId];
                    break;
                }
            }
            for (uint j = 0; j < log.length; j++) {
                if (log[j].Firmadd == productOwners[i]) {
                    entityDetails[i] = log[j].Entity;
                    locationDetails[i] = log[j].Firmlocation;
                    timestamps[i] = transferTimestamps[productId];
                    break;
                }
            }
        }
        return (entityDetails, locationDetails, timestamps);
    }

   
    function migrateDataFromParent(address parentAddress) public {
    Parent parentContract = Parent(parentAddress);

    Parent.Farmer[] memory kisanData = parentContract.getKisan();
    for (uint i = 0; i < kisanData.length; i++) {
        setKisan(owner,kisanData[i].Firmadd, kisanData[i].Firmname, kisanData[i].Firmlocation, kisanData[i].Ownername, kisanData[i].Ownercontact, kisanData[i].city, kisanData[i].Entity);
    }

    Parent.Warehouse[] memory warehouseData = parentContract.getWare();
    for (uint i = 0; i < warehouseData.length; i++) {
        setWare(owner,warehouseData[i].Firmadd, warehouseData[i].Firmname, warehouseData[i].Firmlocation, warehouseData[i].Ownername, warehouseData[i].Ownercontact, warehouseData[i].city, warehouseData[i].Entity);
    }

    isMigrationInProgress = true;
    Parent.Product[] memory productData = parentContract.getProduct();
    for (uint i = 0; i < productData.length; i++) {
        setProduct( productData[i].name, productData[i].currentOwner, productData[i].variety, productData[i].quantity, productData[i].dateofharvest);
        
          address[] memory owners = parentContract.getProductOwnership(productData[i].id);
    
        for (uint j = 0; j < owners.length; j++) {
            productOwnership[productData[i].id].push(owners[j]);
        }
        transferTimestamps[productData[i].id] = parentContract.getTransferTimestamp(productData[i].id);
    }
    
 isMigrationInProgress = false;
}


}
