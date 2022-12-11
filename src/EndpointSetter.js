import React, { useState, useEffect } from "react";
import './endpoint.css';
import Modal from 'react-bootstrap/Modal';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function EndpointSetter(props) {
    const handleDropdownChange = (e) => {
        console.log(e.target.value)
        localStorage.setItem("endpoint", e.target.value)
        window.location.reload();
      }
    return(
        <Modal show={props.show22} onHide={props.handleClose22} centered class="modal">
        <Modal.Header style={{fontSize:"14px"}}>
          Your current endpoint is {props.endpoint}.
          If it's not working, consider changing it.
        </Modal.Header>
        <Modal.Body>
          
      
        <div>
        <select id="dropdown" onChange={handleDropdownChange}>
          <option value="" selected disabled hidden>Pick endpoint</option>
          <option value="https://chain.wax.io">Chain Wax</option>
          <option value="https://wax.cryptolions.io">Cryptolions</option>
          <option value="https://wax.eosdac.io">Eosdac</option>
          <option value="https://wax.pink.qq">Pinkqq</option>
          <option value="https://api.wax.bountyblok.io">Bountyblok</option>
          <option value="https://wax.eoseoul.io">EOSeoul</option>
        </select>
      </div>
        </Modal.Body>
      </Modal>
    )
}