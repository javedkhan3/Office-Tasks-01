import React from "react";

const PageHeading = ({ title, showBreakLine, className }) => {
  return (
    <>
     <h1 className={`text-3xl font-bold text-gray-800 dark:text-white ${className || ""}`}>
      {title}
      {showBreakLine && <hr className="border-gray-300 dark:border-gray-700 mb-6 mt-2" />}
    </h1>
    </>
  );
};

export default PageHeading;
