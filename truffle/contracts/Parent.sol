// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
pragma experimental ABIEncoderV2;
contract Parent {
    uint private _id;
    address private owner;
    
    constructor() {
        _id = 1;
        owner = msg.sender;
    }

    struct Farmer {
        address Firmadd;
        string Firmname;
        string Firmlocation;
        string Ownername;
        string Ownercontact;
        string city;
        string Entity;
    }

    Farmer[] public Kisan;

    function setKisan(address own,address _Firmadd,string memory _Firmname, string memory _Firmlocation, string memory _Ownername, string memory _Ownercontact,string memory _city ,string memory _entity) public {
        require(own == owner, "only admin can add this entity");
        Farmer memory newdetail = Farmer(_Firmadd, _Firmname, _Firmlocation, _Ownername, _Ownercontact, _city,_entity);
        Kisan.push(newdetail);
    }

    function getKisan() public view returns (Farmer[] memory) {
        return Kisan;
    }

    struct Warehouse {
         address Firmadd;
        string Firmname;
        string Firmlocation;
        string Ownername;
        string Ownercontact;
        string city;
         string Entity;
    }

    Warehouse[] public warhouse;

    function setWare(address own, address _Firmadd, string memory _Firmname, string memory _Firmlocation, string memory _Ownername, string memory _Ownercontact, string memory _city,string memory _entity) public {
          require(own == owner, "only admin can add this entity");
        Warehouse memory newdetail = Warehouse(_Firmadd, _Firmname, _Firmlocation, _Ownername, _Ownercontact, _city,_entity);
        warhouse.push(newdetail);   
    }

    function getWare() public view returns (Warehouse[] memory) {
        return warhouse;
    }

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
    mapping(uint => uint) public transferTimestamps; // Mapping to store transfer timestamps

    function setProduct(address ownadd,string memory _name,string memory _variety,uint _quantity,string memory  _date) public {
        bool isFarmer = false;
        for (uint i = 0; i < Kisan.length; i++) {
            if (Kisan[i].Firmadd == ownadd) {
                isFarmer = true;
                break;
            }
        }
        require(isFarmer, "Address is not a registered farmer. only a Register farmer can create this product");
        Product memory newProduct = Product(_id, _name, ownadd, _variety, _quantity, _date);
        products.push(newProduct);
        productOwnership[_id].push(ownadd);
         transferTimestamps[_id] = block.timestamp;
        _id++;
    }

    function getProduct() public view returns(Product[] memory){
        return products;
    } 

    function sendProduct(uint productId, address sender, address receiver,uint date) public {
        require(productId > 0 && productId <= products.length, "Invalid product ID");
        
        bool isSender = false;
        for (uint i = 0; i < products.length; i++) {
            if (products[i].id == productId && products[i].currentOwner == sender) {
                isSender = true;
                break;
            }
        }
        require(isSender, "Sorry!! You are not owner of this Product");
        
        products[productId - 1].currentOwner = receiver;
        productOwnership[productId].push(receiver);
        
        // Record timestamp of transfer
        transferTimestamps[productId] = date;
    }
 
function TrackProduct(uint productId) public view returns (string[] memory entityDetails, string[] memory locationDetails, uint[] memory timestamps) {
    require(productId > 0 && productId <= products.length, "Invalid product ID");
    
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
    }

    return (entityDetails, locationDetails, timestamps);
}
function getProductOwnership(uint productId) public view returns (address[] memory) {
    return productOwnership[productId];
}

function getTransferTimestamp(uint productId) public view returns (uint) {
    return transferTimestamps[productId];
}

}

