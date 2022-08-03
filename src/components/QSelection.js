import axios from "axios";
import React, { useState, useEffect } from "react";
import { Downarrow } from "../assets/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuestions, addToken } from "../redux/actions";
import Header from "./Header";
import { useSelector } from "react-redux/es/exports";

const levelData = [
  { id: "1", level: "easy" },
  { id: "2", level: "medium" },
  { id: "3", level: "hard" },
];

const QSelection = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [level, setLevel] = useState([]);
  const [levelOpen, setLevelOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.questionSet);
  console.log(token);

  const categoryURL = "https://opentdb.com/api_category.php";

  const handleCategory = (id, name) => {
    setCategoryId(id);
    setCategoryName(name);
    setCategoryOpen(false);
  };

  useEffect(() => {
    axios.get(categoryURL).then((res) => {
      setCategoryList(res.data.trivia_categories);
    });
  }, []);

  const handleLevel = (category) => {
    setLevel(category);
    setLevelOpen(false);
  };

  const handleClick = async () => {
    if (categoryId && level) {
      navigate("/questions");
      document.getElementById("error").innerHTML = "";
      const data = {
        categoryId,
        level,
      };
      dispatch(addQuestions(data));

      if (!token) {
        const tokenData = await axios(
          "https://opentdb.com/api_token.php?command=request"
        );
        dispatch(addToken(tokenData.data.token));
        console.log("token not exist creating new", tokenData.data.token);
      } else {
        console.log("token exist, not creating new");
      }
    } else {
      document.getElementById("error").innerHTML =
        "Please select the given fields";
    }
  };

  // console.log(categoryList);
  return (
    <div className="container">
      <Header />
      <div className=" m-auto flex flex-col justify-center items-center px-10">
        <h1 className="text-[4rem] font-bold mt-20">Trivia Game</h1>
        <div className="error h-5" id="error"></div>
        <div className="font-medium flex flex-col justify-center items-center mt-4">
          <div
            className="category_dropdown flex cursor-pointer"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <input
              type="text"
              placeholder="Category"
              className="rounded-2xl bg-[#F2F2F2] w-[35vw] cursor-pointer focus:outline-none px-5 py-2.5 shadow-sm text-[#626384] my-3"
              value={categoryName ? categoryName : 1}
            />
            <Downarrow className=" -translate-x-10 translate-y-8 scale-110" />
          </div>
          {categoryOpen && (
            <div className="dropdown z-10 absolute bg-[#F2F2F2] w-[35vw]  translate-y-24 -translate-x-1 overflow-y-scroll h-1/2 rounded-b-2xl">
              {categoryList.map((item) => (
                <div
                  className="py-3 px-5 cursor-pointer hover:bg-[#E8E8E8]"
                  key={item.id}
                  onClick={() => handleCategory(item.id, item.name)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
          <div
            className="category_dropdown flex cursor-pointer"
            onClick={() => setLevelOpen(!levelOpen)}
          >
            <input
              type="text"
              placeholder="Difficulty"
              className="rounded-2xl bg-[#F2F2F2] w-[35vw] cursor-pointer focus:outline-none px-5 py-2.5 shadow-sm text-[#626384] my-3"
              value={level ? level : 1}
            />
            <Downarrow className=" -translate-x-10 translate-y-8 scale-110" />
          </div>
          {levelOpen && (
            <div className="dropdown z-10 absolute bg-[#F2F2F2] w-[35vw]  translate-y-[55px] -translate-x-1 rounded-b-2xl">
              {levelData.map((item) => (
                <div
                  className="py-3 px-5 cursor-pointer hover:bg-[#E8E8E8]"
                  key={item.id}
                  onClick={() => handleLevel(item.level)}
                >
                  {item.level}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => handleClick()}
            className="bg-[#108CFE] hover:bg-[#1A76E3] rounded-3xl py-3 text-[1.1rem] text-white w-48 my-10"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default QSelection;
