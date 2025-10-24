import React from 'react'
import { usecart, dispatchcart } from '../components/ContectReduces.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  let navigate = useNavigate();
  let data = usecart();
  let dispatch = dispatchcart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("UserEmail");
    console.log(data, localStorage.getItem("UserEmail"), new Date())
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/orderData`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      navigate("/MyOrder"); 
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
                    {data.map((food, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qnt}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td>
                                <button type="button" className="btn p-0">
                                    <DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
            <div>
                {localStorage.getItem("authToken") ?
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
                    :
                    <div className="text-danger fs-4 mt-3">Please log in to place an order.</div>
                }
            </div>
        </div>
    </div>
);
}