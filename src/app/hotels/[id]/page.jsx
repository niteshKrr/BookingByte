"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

// MKVCIHvJRUYT54En

const SingleHotel = ({params}) => {
  const [hotel, setHotel] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/hotels/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setHotel(data.hotel);
        setLoading(false);
      });
  }, [params.id]);

  if (isLoading)
    return <p className="grid h-screen place-items-center">Loading...</p>;

  return (
    <>
      <div className="w-7/12 mx-auto my-10 ">
        <Image
          src={hotel?.banner}
          alt="hotel"
          width={2000}
          height={2000}
          className=" w-full h-large-box my-5"
        />
        <div className=" ">
          <h3 className=" text-3xl font-bold">{hotel?.name}</h3>
          <p className=" text-xl my-5 text-justify">{hotel?.description}</p>
          <button className=" w-60 h-14 rounded-lg bg-blue-400 text-lg">
            Price : &#8377; {hotel?.price}
          </button>
          <p className=" text-3xl font-bold my-5">Facilities : </p>
          <ul className=" flex text-xl justify-between">
            {hotel
              ? hotel.facilities?.map((ele) => {
                  return (
                    <li
                      key={ele.name}
                      className=" mr-10 mb-3 flex items-center"
                    >
                      <span>
                        <Image
                          src={ele.img}
                          alt="hotel views"
                          width={200}
                          height={200}
                          className="w-8 h-8 rounded-full"
                        />
                      </span>
                      <span className="ml-5">{ele.name}</span>
                    </li>
                  );
                })
              : ""}
          </ul>
            <Link href={`/payment/${hotel?._id}`}>
              <button className=" w-60 h-14 rounded-lg bg-red-400 my-5 text-lg">
                Book Now
              </button>
            </Link>
            <span className=" text-xl ml-5">
              Please{" "}
              <Link href={"/login"} className=" text-blue-500">
                Log in
              </Link>{" "}
              to get new Offers !
            </span>
        </div>
      </div>
    </>
  );
};

export default SingleHotel;


