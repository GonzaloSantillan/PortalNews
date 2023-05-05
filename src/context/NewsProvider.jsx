import axios from "axios";
import { createContext, useEffect, useState } from "react";

const NewsContext = createContext();

export const NewsProvider = ({children}) =>{
    const [category, setCategory] = useState('top');
    const [news, setNews] = useState([]);
    const [page,setPage] = useState(1);
    const [totalNews, setTotalNews] = useState(0);

    useEffect(()=>{
        const getApi= async()=>{
            const url=`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=459b43d93d99418eb58d0a19d652f395`;
            const {data}= await axios(url);
            //console.log(data);
            setNews(data.results);
            setTotalNews(data.totalResults);
            setPage(data.nextPage);
        };
        getApi();
    },[category]);

    const getApi= async()=>{
        const url=`${import.meta.env.VITE_API_URL}${category}&page=${page}${import.meta.env.VITE_API_KEY}`;
        const {data}= await axios(url);
        setNews(data.results);
        setTotalNews(data.totalResults);
        setPage(data.nextPage);
    };

    const changeCategoryHandler = e =>{
        setCategory(e.target.value);
    };

    const paginationHandler =(e,valor)=>{
        getApi();
    };

    return(
        <NewsContext.Provider value={{
            category,
            news,
            totalNews,
            page,
            changeCategoryHandler,
            paginationHandler
        }}>
            {children}
        </NewsContext.Provider>
    );
};

export default NewsContext;
