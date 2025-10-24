import React,{useState,useRef,useEffect} from "react";
import {usecart,dispatchcart} from './ContectReduces.jsx';

export default function Card(props) {
  let Newdispatch=dispatchcart();
  let data=usecart()
  let options=props.options;
  let priceoption=Object.keys(options);

  const [qnt, useqnt]=useState(1);
  const [size, usesize]=useState("");

  const priceRef=useRef();
  let finalPrice=qnt*parseInt(options[size]);
  const handleAddtoCart= async()=>{
  
  
  let food=[];
  for(const item of data){
    if(item.id===props.foodItem._id){
      food=item;
    break;
  }
  }
  if(food!==[]){
    if(food.size===size){
      await Newdispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qnt:qnt,})
      return;
    }
  else if(food.size===size){
    await Newdispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qnt:qnt,size:size});
    return;
  }
  
}
await Newdispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qnt:qnt,size:size})
}
  useEffect(()=>{
    usesize(priceRef.current.value);
  },[])
  return (
    <div className='d-flex flex-wrap justify-content-center'>
        <div className="card m-1 w-100"  style={{ width: '21rem' }}>

          <img
            className="card-img-top"
            src={props.foodItem.img} 
            alt={'Food slide'}
            style={{ objectFit: 'fill', height: '120px' }}
          />
          <div className='card-body'>
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className='container w-100'>
              <select className='me-2 h-100 w-30 bg-success rounded' onChange={(e)=>useqnt(e.target.value)}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select className='m-1 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>usesize(e.target.value)}>
              {priceoption.map((data)=>{
                return <option key={data} value={data}>{data}</option>
              })}
              </select>
              <div className='d-inline h-100 fs-5 m-2'>₹{finalPrice}/</div>
              <hr/>
              <button className="btn btn-success justify-content ms-2" onClick={handleAddtoCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      
    </div>
  );
}
