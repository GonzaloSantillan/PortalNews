import  {Card, Link, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';

const News = ({news}) => {
    const {image_url: urlToImage, link: url, title, description, source_id} = news;

    return ( <Grid item md={4} lg={3}>
        <Card>
            {urlToImage ? <CardMedia component={"img"} alt={`News image for ${title}`} image={urlToImage} height={250}/> :
            <CardMedia component={"img"} alt={`No image found`} image={'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'} height={250} sx={{objectFit:"contain"}}/>}
            <CardContent sx={{height: '250px', overflow:"auto"}}>
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