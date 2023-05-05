import axios from "axios";
import { createContext, useEffect, useState } from "react";

const NewsContext = createContext();

export const NewsProvider = ({children}) =>{
    const [category, setCategory] = useState('general');
    const [news, setNews] = useState([]);
    const [page,setPage] = useState(1);
    const [totalNews, setTotalNews] = useState(0);

    useEffect(()=>{
        const getApi= async()=>{
            const url=`${import.meta.env.VITE_API_URL}${category}${import.meta.env.VITE_API_KEY}`;
            const {data}= await axios(url);
            setNews(data.articles);
            setTotalNews(data.totalResults);
            setPage(1)
        };
        getApi();
    },[category]);

    useEffect(()=>{
        const getApi= async()=>{
            const url=`${import.meta.env.VITE_API_URL}${category}&page=${page}${import.meta.env.VITE_API_KEY}`;
            const {data}= await axios(url);
            setNews(data.articles);
            setTotalNews(data.totalResults);
        };
        getApi();
    },[page]);

    const changeCategoryHandler = e =>{
        setCategory(e.target.value);
    };

    const paginationHandler =(e,valor)=>{
        setPage(valor);
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