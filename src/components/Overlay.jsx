import React, { useState } from 'react'

const Overlay = (props) => {

  const validate = () => {
 
    props.pincode.length < 6 ? (cosole.log("hehe wrong hai")) : 
    props.setblurred(false)
    console.log(props.blurred,"blurrred")
    
  }

  
  return (
    
    <div className="blur-overlay bg-dark d-flex justify-content-center align-items-center">

<form className='bg-dark p-4 rounded d-flex flex-column'>
  <h3 className='text-white text-center mb-0'>Apni-E-Dukaan</h3>
  <p className='text-white text-center mt-0'>Welcomes you!</p>
  <p className='text-white mb-0'>We require your pincode to serve you better</p>
  <div className="form-group">
    <label for="exampleInputEmail1">Pincode</label>
    <input  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Pincode" value={props.pincode}onChange={(e)=>{props.setpincode(e.target.value)}}/>
  </div>
  
  <button type = "button" className="btn btn-primary mt-2" onClick={()=>{validate()
  }}>Submit</button>
</form>

    </div>
  )
}

export default Overlay