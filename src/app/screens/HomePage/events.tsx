import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

const Events = () => {
  const events_list = [
    {
      title: "Boyin Foodga marhamat",
      desc: "Yangicha uslubda Yangicha tam va Yangicha his",
      author: "Abdurahmon Mufid",
      date: "2023/11/01",
      location: "Toshkent, Nurafshon ko'cha",
      img: "/restaurant/boyinfood.jpeg",
    },
    {
      title: "Katta Chegirma endi Blissimoda",
      desc: "Faqat 19 ~ 29 - noyabr kunlari antiqa Pitsa yegani tashrif buyuring!",
      author: "BlissimoUz",
      date: "2023/11/15",
      location: "Toshkent, Chilonzor",
      img: "/restaurant/blessimo.jpeg",
    },
    {
      title: "Hali his qilmagan hisni his qilmoqchimisiz?",
      desc: "Merhaba promokodi orqali 50% chegirmani qo'lga kiriting!",
      author: "Chicken House",
      date: "2023/10/5",
      location: "Toshkent, Qo'yliq",
      img: "/restaurant/merhaba.jpeg",
    },
    {
      title: "Yangicha yondashuv endi O'zbekistonda!!!",
      desc: "O'zbekistondagi eng yirik ulgurji bozor",
      author: "Food City",
      date: "2023/08/12",
      location: "Toshkent, Yangi Qo'yliq Bozori",
      img: "/restaurant/foodcity.jpeg",
    },
  ];
  return (
    <div className="events_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className="events_main">
          <Box className="events_text">
            <span className="category_title">Hodisalar</span>
          </Box>
          <Box className="prev_next_frame">
            <img
              src="/icons/arrow_right.svg"
              style={{ transform: "rotate(-180deg)" }}
              alt=""
              className="swiper-button-prev"
            />
            <div className="dot_frame_pagination swiper-pagination"></div>
            <img
              src="/icons/arrow_right.svg"
              className="swiper-button-next"
              alt=""
            />
          </Box>
          <Swiper
            className="events_info swiper-wrapper"
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
          >
            {events_list.map((value, number) => {
              return (
                <SwiperSlide className="events_info_frame">
                  <div className="events_img">
                    <img src={value.img} className="events_img" />
                  </div>
                  <Box className="events_desc">
                    <Box className="events_bott">
                      <Box className="bott_left">
                        <div className="event_title_speaker">
                          <strong>{value.title}</strong>
                          <div className="event_organizator">
                            <img
                              src="/icons/speaker.svg"
                              style={{ width: "20px", marginRight: "10px" }}
                            />
                            <p className="spec_text_author">{value.author}</p>
                          </div>
                        </div>
                        <p className="text_desc" style={{ marginTop: "10px" }}>
                          {" "}
                          {value.desc}{" "}
                        </p>
                        <div
                          className="bott_info"
                          style={{ marginTop: "10px" }}
                        >
                          <div className="bott_info_main">
                            <img
                              src="/icons/calendar.svg"
                              style={{ marginRight: "10px" }}
                            />
                            {value.date}
                          </div>
                          <div className="bott_info_main">
                            <img
                              src="/icons/location.svg"
                              style={{ marginRight: "10px" }}
                            />
                            {value.location}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
};

export default Events;
