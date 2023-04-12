import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default function AlbumCardComponent({
  cardAlt,
  cardSrc,
  cardHeading,
  cardDesc,
  ...props
}) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{ objectFit: "cover", height: "300px", width: "100%" }}
          // sx={{
          //   // 16:9
          //   pt: "56.25%",
          // }}
          image={cardSrc}
          alt={cardAlt}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {cardHeading}
          </Typography>
          <Typography>{cardDesc}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" href={cardSrc}>
            Detalhes
          </Button>
          {/* <Button size="small">Edit</Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
