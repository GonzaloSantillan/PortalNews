import  {Card, Link, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';

const News = ({news}) => {
    const {image_url: urlToImage, link: url, title, description, source_id} = news;

    return ( <Grid item md={6} lg={4}>
        <Card>
            {urlToImage && <CardMedia component={"img"} alt={`News image for ${title}`} image={urlToImage} height={250}/>}
            <CardContent>
                <Typography variant='body1' color='error'>{source_id}</Typography>
                <Typography variant='h5' component={'div'}>{title}</Typography>
                <Typography variant='body2'>{description}</Typography>
            </CardContent>
            <CardActions>
                <Link href={url} target="_blank" variant={'button'} width={'100%'} textAlign={'center'} sx={{textDecoration:'none'}}>Read News</Link>
            </CardActions>
        </Card>
    </Grid> );
}
 
export default News;