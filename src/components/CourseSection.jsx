import React, { useEffect, useState } from "react";
import science from "../assets/science.svg";
import math from "../assets/math.svg";
import robotics from "../assets/robotics.svg";
import financial from "../assets/financial.svg";
import artificial from "../assets/artificial.svg";
import calendar from "../assets/calendar.svg";
import littleChild from "../assets/little-child.svg";
import useFetch from "../hooks/useFetch";

function CourseSection() {
  const { loading: sectionLoading, error: sectionError, data: sectionData } = useFetch(`${import.meta.env.VITE_API_URL}/api/course-sections?populate=*`);
  const courseSection = sectionData?.data[0];

  const { loading: cardLoading, error: cardError, data: cardData } = useFetch(`${import.meta.env.VITE_API_URL}/api/course-cards?populate=*`);
  const courseCard = cardData?.data;

  const courseCardFirst = courseCard?.slice(0, 2);
  const courseCardSecond = courseCard?.slice(2);

  if (sectionLoading || cardLoading) return <p>Loading...</p>
  if (sectionError || cardError) {
    console.log(sectionError || cardError);
    return <p>Error loading data</p>;
  }


  return (
    <div className="py-16 px-28" id={courseSection?.slug}>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-6 grid grid-cols-1">
          <h2 className="text-[40px] font-bold text-left text-[#1E2A39] -mb-8">
            {courseSection?.title}
          </h2>

          <p className="text-left text-[18px] text-[#5D4A49] -mb-6">
            {courseSection?.description}
          </p>

          <div className="text-left">
            <button className="bg-custom-gradient text-white text-[16px] py-1 px-3 rounded-md font-semibold flex items-center gap-x-2">
              <img src={calendar} className="w-5 h-5" />
              Book a FREE Trial
            </button>
          </div>
        </div>

        {
          courseCardFirst?.map((course) => {
            return (
              <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-left">
                {/* <img src={`${import.meta.env.VITE_API_URL}${course?.logo.url}`} className="w-[58px] h-[58px] mb-4" alt="Science Icon" /> */}
                <img src={course?.logo.url} className="w-[58px] h-[58px] mb-4" alt="Science Icon" />
                <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
              </div>
            )
          })
        }
      </div>

      <div className="grid grid-cols-12 mt-8 gap-8">
        <div className="col-span-3 bg-gradient-to-b from-transparent to-light-blue">
          {/* <img src={`${import.meta.env.VITE_API_URL}${courseSection?.promotionalImage?.url}`} className="w-[308px] h-[230px]" /> */}
          <img src={courseSection?.promotionalImage?.url} className="w-[308px] h-[230px]" />
        </div>

        {
          courseCardSecond?.map((course) => {
            return (
              <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-left">
                {/* <img src={`${import.meta.env.VITE_API_URL}${course.logo.url}`} className="w-[58px] h-[58px] mb-4" alt="AI Icon" /> */}
                <img src={course.logo.url} className="w-[58px] h-[58px] mb-4" alt="AI Icon" />
                <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default CourseSection;