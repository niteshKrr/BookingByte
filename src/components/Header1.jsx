"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Block from "./Block";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const Header1 = () => {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const key = Cookies.get("user");
    if(key){
      setAuth(true);
      return;
    }
    setAuth(false);
  }, [auth]);
  
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("user");
    setAuth(false);
    router.push("/");
  };

  return (
    <div className=" flex justify-between border-b-2 border-gray-300 items-center h-24 px-10">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={200}
        height={200}
        className=" w-50 h-50 "
      />
      <div className=" h-full flex">
        <Block title={"Become a Member"} para={"Additional 0% off on stays."} img={"/1.svg"} />
        <Block
          title={"BB. for Business"}
          para={"Trusted by 5000 corporates."}
          img={"/2.svg"}
        />
        <Block title={"List your property"} para={"Start earning in 30 min."} img={"/3.svg"} />
        <Block title={"987654321"} para={"Call us to book now."} img={"/4.svg"} />
        <div className="flex items-center px-3 ">
          <Image
            src={"/login.gif"}
            alt="demo"
            width={200}
            height={200}
            className=" w-10 h-10 mr-5"
          />
          {auth ? (
            <h3
              className=" font-bold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </h3>
          ) : (
            <Link href={"/login"} className=" font-bold">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header1;
