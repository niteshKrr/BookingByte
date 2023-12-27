"use client";

import Header1 from "@/components/Header1";
import Hotel from "@/components/Hotel";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import Filters from "@/components/Filters";

const Page = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  // console.log('City:', city);

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [price, setPrice] = useState(3500);
  const [list, setList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const handleCheckList = async () => {
    const { data } = await axios.get(`/api/facilities/search?val=${checkedList}`);
    if (data?.hotels) {
      setList(data.hotels);
    }
  };

  const handlePrice = async () => {
    const { data } = await axios.get(`/api/facilities/range?price=${price}`);
    if (data?.hotels) {
      setList(data.hotels);
    }
  };

  useEffect(() => {
  
      const fetchHotelsByCity = async () => {
        try {
          let apiUrl = `http://localhost:3000/api/hotels`;
          
          if (city) {
            apiUrl += `?city=${city}`;
          }

          // console.log('API URL:', apiUrl);
    
          const response = await fetch(apiUrl);
          let data = await response.json();
          data = data.hotels ? data.hotels : data.allhotels;
          // console.log('Fetched data:', data);   
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      };
    
      fetchHotelsByCity();

      if(checkedList.length > 0){
        handleCheckList();
      }
  }, []);

  if (isLoading)
    return <p className="grid h-screen place-items-center">Loading...</p>;

  return (
    <>
      <Header1 />
      <div className="grid grid-cols-12">
        <div className=" col-span-3">
          <Filters
            price={price}
            setPrice={setPrice}
            handlePrice={handlePrice}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
        <div className="col-span-9">
          {list.length > 0
            ? list.map((e) => {
                return (
                  <div className=" m-5 " key={e._id}>
                    <Hotel e={e} />
                  </div>
                );
              })
            : data
            ? data.map((e) => {  
                return (
                  <div className=" m-5 " key={e._id}>
                    <Hotel e={e} />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Page;