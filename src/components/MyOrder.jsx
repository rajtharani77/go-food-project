import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setorderData] = useState([]);

    const fetchMyOrder = async () => {
        const UserEmail = localStorage.getItem('UserEmail');
        if (!UserEmail) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/myorderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: UserEmail
                })
            });

            const response = await res.json();
            setorderData(response?.OrderData?.order_data || []);
        } catch (error) {
            console.error("Failed to fetch order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);


    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((orderGroup) => (
                            <div key={orderGroup[0]?._id || Math.random()} className="col-12">
                                {orderGroup.map((item) => (
                                    <React.Fragment key={item._id || Math.random()}>
                                        {item.Order_date ? (
                                            <div className='m-auto mt-5 fs-4 fw-bold'>
                                                {item.Order_date}
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className='col-12 col-md-6 col-lg-3 d-inline-block m-2'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{item.qnt}</span>
                                                            <span className='m-1'>{item.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center mt-5 fs-3">You have no orders yet!</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}