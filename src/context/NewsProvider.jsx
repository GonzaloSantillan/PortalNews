import axios from "axios";
import { createContext, useEffect, useState } from "react";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [category, setCategory] = useState("top");
  const [news, setNews] = useState([]);
  const [pages] = useState(new Map());
  const [nextPage, setNextPage] = useState(1);
  const [totalNews, setTotalNews] = useState(0);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
   
      console.log("Ejecucion effect por categoria");
      pages.set(1, undefined);
      getApi();

  }, [category]);

  const getApi = async() => {
    const url = `${import.meta.env.VITE_API_URL}${category}${pages.get(nextPage) !== undefined ? "&page=" + pages.get(nextPage) : ""}${import.meta.env.VITE_API_KEY}`;
    await axios(url).then((response) => {
      setNews(response.data.results);
      setTotalNews(response.data.totalResults);
      if(response.data.totalResults>10){
        return axios(`${import.meta.env.VITE_API_URL}${category}&page=${response.data.nextPage}${import.meta.env.VITE_API_KEY}`);
      }
    }).then((response) => {
        setNews((prevState) => {
           const newNews = [...prevState, ...response.data.results];
           return newNews;
        });
        pages.set(nextPage + 1, response.data.nextPage);
        setNextPage((prevState) => {
          return prevState + 1;
        });
    }).catch((error)=>{
      console.log(error);
      setStatus(error.response.statusText);
    });
  };

  const changeCategoryHandler = (e) => {
    setNews([]);
    setCategory(e.target.value);
  };

  const nextPageHandler = (e, valor) => {
    setNews([]);
    getApi();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const prevPageHandler = (e, valor) => {
    setNews([]);
    setNextPage((prevState) => {
      return prevState > 2 ? prevState-2 : 1;
    });
    getApi();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <NewsContext.Provider
      value={{
        category,
        news,
        totalNews,
        nextPage,
        status,
        changeCategoryHandler,
        nextPageHandler,
        prevPageHandler
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
