import React from "react";

interface PortfolioItemProps {
  portfolio: {
    id: number;
    image: string;
    title: string;
    link: string;
    description: string;
    period: {
      start: string;
      end: string;
    }
  };
}

const PortfolioItem = ( props: PortfolioItemProps ) => {
  const { image, title, link, description, period } = props.portfolio;
  return (
    <div className="w-full">
      <div className="my-4 md:mx-4 shadow p-6 rounded-md group hover:shadow-md ">
        <div className="mb-6 w-full h-full  rounded-md overflow-hidden">
          <img
            src={image}
            alt="coverImage"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <a className="text-lg font-medium text-purple-700 mb-2 bold" href={link}>{title}</a>
        <p className="text-lg font-medium text-purple-300 mb-2 bold">{
          period.start + " - " + period.end
        }</p>
        <p className="text-black-400">{description}</p>
      </div>
    </div>
  );
};

export default PortfolioItem;
