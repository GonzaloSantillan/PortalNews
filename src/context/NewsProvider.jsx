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
            const url=`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=459b43d93d99418eb58d0a19d652f395`;
            const {data}= await axios(url);
            setNews(data.articles);
            setTotalNews(data.totalResults);
            setPage(1)
        };
        getApi();
    },[category]);

    useEffect(()=>{
        const getApi= async()=>{
            const url=`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=459b43d93d99418eb58d0a19d652f395`;
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
