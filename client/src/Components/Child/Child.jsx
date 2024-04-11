import React from 'react'
import { NavLink } from 'react-router-dom'

function Child() {
  return (
    <>
      <div className="container-fluid">
<br />
<div className="row">
    <div className="col-sm-12">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

<div className="collapse navbar-collapse" id="navbarNav" >
<ul className="navbar-nav">
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/v2Data Migration">Data Migration</NavLink>
  </li>
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/v2Farmer">Farmer</NavLink>
  </li>
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/v2WareHouse">WareHouse</NavLink>
  </li>
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/v2Logistics">Logistics</NavLink>
  </li>
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/v2Wholesaler">Wholesaler</NavLink>
  </li>
  <li class="nav-item">
    <NavLink className="nav-link text-white " to="/v2CreateProduct">Product</NavLink>
  </li>
</ul>
</div>
</nav> 
    </div>
</div>
</div>
    </>
  )
}

export default Child
