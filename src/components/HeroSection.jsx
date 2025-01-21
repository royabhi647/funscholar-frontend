import React from "react";
import calendar from "../assets/calendar.svg";
import child from "../assets/child.svg";
import useFetch from "../hooks/useFetch";

function HeroSection() {
  const { loading, error, data } = useFetch(`${import.meta.env.VITE_API_URL}/api/herosections?populate=*`);
  if (loading) return <p>Loading...</p>
  if (error) return console.log(error);

  const headingItems = Array.isArray(data?.data[0]?.headingItems)
    ? data?.data[0]?.headingItems
    : JSON.parse(data?.data[0]?.headingItems || "[]");


  return (
    <div className="flex justify-between items-center px-28">
      <div className="">
        <p className="text-[18px] font-semibold text-[#B0928B]">{data?.data[0]?.insTitle}</p>

        <div className="text-[56px] font-bold text-[#1E2A39]">
          {/* <span className="flex -mb-8">New age</span>
          <span className="flex -mb-8">Experiential Tuition</span>
          <span className="flex"> Centres</span> */}
          {
            headingItems.length > 0 &&
            headingItems.map((heading, index) => (
              <span key={index} className={`flex ${index !== headingItems.length - 1 ? "-mb-8" : ""}`}>{heading}</span>
            ))
          }

        </div>

        <p className="text-[20px] font-medium text-[#5D4A49] mb-6">
          {data?.data[0]?.description}
        </p>

        <button className="bg-custom-gradient text-white text-[16px] py-1 px-3 rounded-md font-semibold flex items-center gap-x-2">
          <img src={calendar} className="w-5 h-5" />
          Book a FREE Trial
        </button>
      </div>

      <div>
        <img
          // src={`${import.meta.env.VITE_API_URL}${data?.data[0]?.coverImage?.url}`}
          src={data?.data[0]?.coverImage?.url}
          alt="Child with books"
          className="w-[642px] h-[640px]"
        />
      </div>
    </div>
  );
}

export default HeroSection;