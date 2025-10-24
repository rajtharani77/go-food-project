import React, { useState, useEffect } from 'react'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import Carousel from '../components/Carousal';
import Navbar from '../components/navbar'
export default function Home() {
  const [foodItem, setfoodItem] = useState([]);
  const [search, setSearch] = useState('');
  const [foodCategory, setfoodCategory] = useState([]);

  const LoadData = async () => {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/foodData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    setfoodItem(response[0]);
    setfoodCategory(response[1]);
  }
  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <Carousel search={search} setSearch={setSearch}/>
      </div>
      <div className="container" >
        {
          foodCategory.length > 0
            ? foodCategory.map((data) => {
              return (<div key={data._id}><div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row mb-3">
                  {
                    foodItem.length > 0
                      ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map(ItemName => {
                        return (<div key={ItemName._id} className="col-12 col-md-6 col-lg-3"><Cards foodItem={ItemName} options={ItemName.options[0]}></Cards></div>)
                      }) : <div>No, such item found.</div>
                  }</div></div>

              )
            })
            : ""
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}