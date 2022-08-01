import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import Header from "./Header";

const Restart = () => {
  const { score } = useSelector((state) => state.questionSet);
  console.log(score);
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center py-20">
        <h1 className="text-[4rem] font-bold mt-28">Trivia Game</h1>
        <p className="font-medium text-[1.3rem] my-2">Your Score : {score}</p>

        <button className="bg-[#108CFE] hover:bg-[#1A76E3] rounded-3xl py-3 text-[1.1rem] text-white w-52 my-8">
          <Link to="/">Restart</Link>
        </button>
      </div>
    </>
  );
};

export default Restart;
