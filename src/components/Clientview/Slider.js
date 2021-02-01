import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  getData,
  postData,
  ServerURL,
  postDataAndImage,
} from "../FetchNodeService";
import { Carousel } from "react-responsive-carousel";
import Icon from "@material-ui/core/Icon";
import "react-multi-carousel/lib/styles.css";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));
export default function Slidermain() {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const [getListad, setListad] = useState([]);

  const fetchDataadstatus = async () => {
    let list = await getData("category/fetchcategoryadstatus");
    setListad(list);
  };
  useEffect(function () {
    fetchDataadstatus();
  }, []);

  const slider = () => {
    return getListad.map((item, key) => {
      return (
        // <Carousel showArrows={true} autoPlay={true} showThumbs={false} showStatus={true} showIndicators={true}>
        <div>
          <img src={`${ServerURL}/images/${item.ad}`} />
        </div>

        // </Carousel>
      );
    });
  };

  return (
    <div style={{ height: 400 }}>
      <Carousel
        showArrows={true}
        autoPlay={true}
        showThumbs={false}
        showStatus={true}
        showIndicators={true}
      >
        {slider()}
      </Carousel>
    </div>
  );
}
