import React from 'react';
import calendar from "../assets/calendar.svg";
import funScholarImg1 from "../assets/funscholarImg1.svg";
import useFetch from '../hooks/useFetch';

const WhyChooseSection = () => {

  const { loading: sectionLoading, error: sectionError, data: sectionData } = useFetch(`${import.meta.env.VITE_API_URL}/api/funscholar-sections?populate=*`);
  const funscholarSection = sectionData?.data[0];

  const { loading: cardLoading, error: cardError, data: cardData } = useFetch(`${import.meta.env.VITE_API_URL}/api/funscholarcards?populate=*`);
  const funScholarCard = cardData?.data;


  if (sectionLoading || cardLoading) return <p>Loading...</p>
  if (sectionError || cardError) {
    console.log(sectionError || cardError);
    return <p>Error loading data</p>;
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-white py-16 px-8 md:px-24 relative overflow-hidden" id={funscholarSection?.slug}>
      <div className="absolute top-0 right-0 w-96 h-96 border-2 border-dashed border-red-200 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="">
        <div className="text-left mb-12">
          <h2 className="text-md md:text-[40px] font-bold mb-2">
            {funscholarSection?.heading}
          </h2>
          <div className='flex justify-between'>
            <p className="text-[#5D4A49] text-[18px] w-[915px]">
              {funscholarSection?.description}
            </p>
            <button className="bg-custom-gradient text-white text-[16px] py-1 px-3 rounded-md font-semibold flex items-center gap-x-2 h-[37px]">
              <img src={calendar} className="w-5 h-5" />
              Book a FREE Trial
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funScholarCard.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  // src={`${import.meta.env.VITE_API_URL}${feature?.thumbnail?.url}`}
                  src={feature?.thumbnail?.url}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1E2A39] mb-2 px-2">
                {feature.title}
              </h3>
              <p className="text-[#5D4A49] text-[14px] px-2 mb-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;