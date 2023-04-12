import AlbumComponent from "@/components/album/AlbumComponent";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Album() {
  const [cardList, setCardList] = useState([]);
  const fetchImage = async (idx, category) => {
    const url = `https://source.unsplash.com/random/?${category}`;
    const sig = Math.random(idx) * 10000;
    let imgUrl = "";
    await axios.get(`${url}&sig=${sig}`).then((data) => {
      // the url of the random img
      imgUrl = data.request.responseURL;
    });
    return imgUrl;
  };

  let cards = [
    {
      alt: "random1",
      heading: "Imagem 1",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random2",
      heading: "Imagem 2",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random3",
      heading: "Imagem 3",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random4",
      heading: "Imagem 4",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random5",
      heading: "Imagem 5",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random6",
      heading: "Imagem 6",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random7",
      heading: "Imagem 7",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random8",
      heading: "Imagem 8",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
    {
      alt: "random9",
      heading: "Imagem 9",
      desc: "Imagem gerada aleatoriamente através de uma api de serviço de imagens. Muito útil para pequenas demonstrações.",
    },
  ];

  useEffect(() => {
    const getCards = async () => {
      const categories = [
        "animals",
        "3d-renders",
        "travel",
        "nature",
        "street-photography",
        "current-events",
      ];
      for (let card of cards) {
        const category =
          categories[parseInt(Math.random() * (categories.length - 1))];
        const idx = cards.indexOf(card);
        card.src = await fetchImage(idx, category);
        setCardList((arr) => [...arr, card]);
      }
    };
    getCards();
  }, []);

  return (
    <AlbumComponent
      galleryName={"A Galeria"}
      galleryDesc={
        "Sofisticada e requintada, com a melhor seleção de fotografias. Feito para seu deleite e admiração."
      }
      galleryCards={cardList}
    ></AlbumComponent>
  );
}
