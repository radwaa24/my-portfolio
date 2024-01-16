import React, { useState, useEffect } from "react";
import { PostInfoContainer } from "./PostInfoContainer";
import ProductContainer from "./ProductPostContainer";

const UsersPost = () => {
  const [renderDate, setRenderData] = useState(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const displayYear = dateofpost.getFullYear();
    const displayMonth = capitalizeFirstLetter(
      dateofpost.toLocaleString("default", { month: "short" })
    );
    const displayDay = dateofpost.getDate();

    const formattedDateString =
      currentYear === displayYear
        ? `${displayMonth} ${displayDay}`
        : `${displayMonth} ${displayDay}, ${displayYear}`;

    setRenderData(formattedDateString);
  }, [currentDate]);

  return (
    <div className="pt-3 pl-3 mb-3 lg:w-[950px] w-full">
      <div className="space-y-5">
        <PostInfoContainer renderDate={renderDate} />
        <ProductContainer category={"gold"} />
        <ProductContainer category={"silver"} />
        <ProductContainer category={"bronze"} />
        <ProductContainer category={"others"} />
      </div>
    </div>
  );
};

export default UsersPost;

// const VerticalLine = ({ children }) => {
//   return (
//     <div className="flex h-full w-full space-x-3 relative">
//       <div className="w-full">
//         <div className="border-l border-gray-500 h-full absolute left-2%"></div>
//       </div>
//     </div>
//   );
// };

const dateofpost = new Date();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
