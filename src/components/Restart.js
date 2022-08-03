import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useDispatch } from "react-redux/es/exports";
import { addScore, addToken } from "../redux/actions";

const Restart = () => {
  const dispatch = useDispatch();
  const { score } = useSelector((state) => state.questionSet);

  const handleReset = () => {
    dispatch(addScore(0));
    dispatch(addToken(0));
  };

  console.log(score);
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center py-18">
        <h1 className="text-[4rem] font-bold mt-28">Trivia Game</h1>
        <p className="font-medium text-[1.3rem] my-2">Your Score : {score}</p>
        <div className="button">
          <button
            className="bg-white hover:bg-[#108CFE] hover:text-white border-2 border-[#108CFE] rounded-3xl py-3 text-[1.1rem] text-[#108CFE] w-52 my-8 mx-5"
            onClick={() => handleReset()}
          >
            Reset
          </button>
          <Link to="/">
            <button className="bg-[#108CFE] hover:bg-[#1A76E3] rounded-3xl py-3 text-[1.1rem] text-white w-52 my-8 mx-5">
              Play Again
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Restart;
