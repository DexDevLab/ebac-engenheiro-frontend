import { Box } from "@mui/material";
import img1 from "./assets/images/c1.jpg";
import img2 from "./assets/images/c2.jpg";
import img3 from "./assets/images/c3.jpg";
import img4 from "./assets/images/c4.jpg";
import img5 from "./assets/images/c5.jpg";
import img6 from "./assets/images/c6.jpg";
import img7 from "./assets/images/c7.jpg";
import "./assets/styles/App.css";
import CarouselImage from "./components/Carousel/CarouselImage";
import SliderComponent from "./components/Carousel/SliderComponent";

function App() {
  const items = [
    <CarouselImage alt="Carousel01" src={img1} />,
    <CarouselImage alt="Carousel02" src={img2} />,
    <CarouselImage alt="Carousel03" src={img3} />,
    <CarouselImage alt="Carousel04" src={img4} />,
    <CarouselImage alt="Carousel05" src={img5} />,
    <CarouselImage alt="Carousel06" src={img6} />,
    <CarouselImage alt="Carousel07" src={img7} />,
  ];

  return (
    <Box mt={{ mobile: "5rem", tablet: "8rem", laptop: "10rem", desktop: "8rem" }}>
      <SliderComponent carouselItems={items} />
    </Box>
  );
}

export default App;
