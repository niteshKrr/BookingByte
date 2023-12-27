"use client";

import Header1 from "@/components/Header1";
import Hotel from "@/components/Hotel";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  useEffect(() => {
    fetch(`http://localhost:3000/api/hotels?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [city]);

  if (isLoading)
    return <p className="grid h-screen place-items-center">Loading...</p>;

  return (
    <>
      <Header1 />
      {data
        ? data.hotels.map((e) => {
            return (
              <div className="mt-2" key={e._id}>
                <Hotel e={e} />
              </div>
            );
          })
        : ""}
    </>
  );
};

export default Page;
