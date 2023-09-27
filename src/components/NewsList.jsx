import { Grid, Typography, Pagination, Stack } from "@mui/material";
import useNews from "../hooks/useNews";
import News from "./News";

const NewsList = () => {
  const { news, totalNews, nextPageHandler, prevPageHandler, category, status, nextPage } = useNews();
  return (
    <>
      { news.length ? 
        <>
          <Typography textAlign={"center"} marginY={5} variant="h3" component={"h2"}>
            {`Last news on ${category}`}
          </Typography>
          <Typography textAlign={"center"} marginY={5} component={"h5"}>
            {`There are ${totalNews} results.`} 
          </Typography>
          <Stack spacing={2} direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{ marginY: 5 }}>
            {nextPage <=2 ? <h4>...</h4>:<h4 style={{cursor:"pointer"}} onClick={prevPageHandler}>{`<<<PREV`}</h4>}
            <h4 style={{cursor:"pointer"}} onClick={nextPageHandler}>{`NEXT>>>`}</h4>
          </Stack>
          <Grid container spacing={2}>
            {news.map((it,index) => (
              <News news={it} key={index} />
            ))}
          </Grid>
          <Stack spacing={2} direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{ marginY: 5 }}>
            {nextPage <= 2 ? <h4>...</h4>:<h4 style={{cursor:"pointer"}} onClick={prevPageHandler}>{`<<<PREV`}</h4>}
            <h4 style={{cursor:"pointer"}} onClick={nextPageHandler}>{`NEXT>>>`}</h4>
          </Stack>
        </> : 
        <Typography color={status==="Loading..." ? 'black':'red'} textAlign={"center"} marginY={5} variant="p" component={"h3"}>
          {status}
        </Typography>
      }
    </>
  );
};

export default NewsList;
