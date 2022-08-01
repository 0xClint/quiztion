import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import axios from "axios";
import { addScore } from "../redux/actions";
import Header from "./Header";
import Loader from "../assets/icons/loader.gif";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let questionList = [],
    score = 0;

  const { questionSet } = useSelector((state) => state.questionSet);
  //   console.log(questionSet);
  console.log(questionSet[0].categoryId, questionSet[0].level);

  const questionURL = `https://opentdb.com/api.php?amount=5&category=${questionSet[0].categoryId}&difficulty=${questionSet[0].level}&type=multiple`;
  console.log(questionURL);
  useEffect(() => {
    axios.get(questionURL).then((response) => {
      setTimeout(() => {
        setQuestions(response.data.results);
        setLoader(false);
      }, 1000);

      console.log(response.data, response.data.results);
    });
  }, []);
  // console.log(questions, questions[1]);
  let i = 1;
  questions.map((items) => {
    let options = items.incorrect_answers;
    options.push(items.correct_answer);
    shuffleArray(options);
    let data = {
      id: i,
      question: items.question,
      correct_answer: items.correct_answer,
      options: options,
    };
    questionList.push(data);
    i++;
  });

  console.log(questionList);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const handleClick = (id, selectedAnswer) => {
    const correctAnswer = questionList.filter((items) => {
      if (items.id == id) {
        return items.correct_answer;
      }
    });
    if (correctAnswer[0].correct_answer == selectedAnswer) {
      document.getElementById(selectedAnswer).style.backgroundColor = "#67ED37";
      document.getElementById(selectedAnswer).style.color = "#FFFFFF";
      score++;
    } else {
      document.getElementById(selectedAnswer).style.backgroundColor = "#F43333";
      document.getElementById(selectedAnswer).style.color = "#FFFFFF";
    }
    console.log(correctAnswer[0].correct_answer, selectedAnswer, score);

    setTimeout(() => {
      document.getElementById(id).style.display = "none";
      if (id == questionList.length) {
        navigate("/restart");
        dispatch(addScore(score));
        console.log(score + "dispatched");
      }
    }, 300);
  };

  return (
    <>
      {loader ? (
        <div className="loader_container flex justify-center items-center h-[100vh]">
          <img src={Loader} alt="" srcset="" className="h-20" />
        </div>
      ) : (
        <>
          <Header />
          <div className="question overflow-hidden h-[85vh]">
            {questionList.map((item) => {
              return (
                <div
                  className="container px-10 flex flex-col h-[85vh] justify-center items-center"
                  key={item.id}
                  id={item.id}
                >
                  <label className="text-[#FEC936] my-2">
                    Question {item.id} / 5
                  </label>
                  <h1 className="text-[1.5rem] font-bold text-center mx-28 my-5">
                    {item.question}
                  </h1>
                  <div className="option_container my-5">
                    <p
                      id={item.options[0]}
                      className=" opt rounded-2xl bg-[#F2F2F2] hover:bg-[#E8E8E8] w-[40vw] cursor-pointer focus:outline-none px-5 py-2.5 shadow-sm text-[#626384] my-6"
                      onClick={() => handleClick(item.id, item.options[0])}
                    >
                      {item.options[0]}
                    </p>
                    <p
                      id={item.options[1]}
                      className="rounded-2xl  bg-[#F2F2F2] hover:bg-[#E8E8E8] w-[40vw] cursor-pointer focus:outline-none px-5 py-2.5 shadow-sm text-[#626384] my-6"
                      onClick={() => handleClick(item.id, item.options[1])}
                    >
                      {item.options[1]}
                    </p>
                    <p
                      id={item.options[2]}
                      className="rounded-2xl bg-[#F2F2F2] hover:bg-[#E8E8E8] w-[40vw] cursor-pointer focus:outline-none px-5 py-2.5 shadow-sm text-[#626384] my-6"
                      onClick={() => handleClick(item.id, item.options[2])}
                    >
                      {item.options[2]}
                    </p>
                    <p
                      id={item.options[3]}
                      className="rounded-2xl bg-[#F2F2F2] hover:bg-[#E8E8E8] w-[40vw] cursor-pointer focus:outline-none px-5 py-2.5 shadow-sm text-[#626384] my-6"
                      onClick={() => handleClick(item.id, item.options[3])}
                    >
                      {item.options[3]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Questions;
