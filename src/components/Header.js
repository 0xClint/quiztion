import React from "react";
import { Quiztion } from "../assets";

const Header = () => {
  return (
    <div className="header flex justify-end px-20 pt-8">
      <Quiztion className="h-10 w-36 hover:scale-110 duration-75 ease-in" />
    </div>
  );
};

export default Header;
