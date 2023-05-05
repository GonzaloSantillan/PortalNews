import { Grid, Typography, Pagination, Stack } from "@mui/material";
import useNews from "../hooks/useNews";
import News from "./News";

const NewsList = () => {
  const { news, totalNews, paginationHandler, page } = useNews();
  return (
    <>
      <Typography
        textAlign={"center"}
        marginY={5}
        variant="h3"
        component={"h2"}
      >
        Last News
      </Typography>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ marginY: 5 }}
      >
        <Pagination count={Math.ceil(totalNews/20)} color="primary" onChange={paginationHandler} page={page}/>
      </Stack>
      <Grid container spacing={2}>
        {news.map((it) => (
          <News news={it} key={it.url} />
        ))}
      </Grid>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ marginY: 5 }}
      >
        <Pagination count={Math.ceil(totalNews/20)} color="primary" onChange={paginationHandler} page={page}/>
      </Stack>
    </>
  );
};

export default NewsList;
