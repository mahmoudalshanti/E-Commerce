/* eslint-disable react/prop-types */
import ec1 from "../Images/e-1.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const breakPoints = {
  640: {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
  },

  900: {
    slidesPerView: 2,
    spaceBetween: 20,
    slidesPerGroup: 2,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
  },
};

export default function ProductSlides({ title, card }) {
  return (
    <>
      {title && (
        <Typography
          maxWidth={"fit-content"}
          color={"black"}
          fontSize={"2rem"}
          fontFamily={"MuktaB"}
          mb={2}>
          {title}
        </Typography>
      )}
      <Box height={300}>
        <Swiper
          className="customSwiper2"
          breakpoints={breakPoints}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          scrollbar
          modules={[Navigation, Scrollbar, A11y, Autoplay]}
          navigation>
          <>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ cursor: "pointer" }} className="bestBox">
                <CardMedia image={ec1} sx={{ height: 140 }} />
                <CardContent>
                  <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
                    {card.title}
                  </Typography>
                  <Typography fontSize={"1rem"} fontFamily={"muktaR"}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          </>
        </Swiper>
      </Box>
    </>
  );
}
