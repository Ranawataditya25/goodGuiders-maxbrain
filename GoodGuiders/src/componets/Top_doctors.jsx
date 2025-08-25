import * as React from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Top_doctors() {
    const Productdata = [
        {
            "imgsrc": "avtar/1.jpg",
            "title": " Anna Mull",
            "subtitle": "M.Tech",
            "text": "20 Bowman St, South Windsor, Mt 39508",
        },
        {
            "imgsrc": "avtar/2.jpg",
            "title": " Anna Mull",
            "subtitle": "Phd",
            "text": "50 Bowman St, South Windsor, Mt 39508",
        },
        {
            "imgsrc": "avtar/3.jpg",
            "title": " Anna Mull",
            "subtitle": "B.Tech",
            "text": "30 Bowman St, South Windsor, Mt 39508",
        },
        {
            "imgsrc": "avtar/4.jpg",
            "title": " Anna Mull",
            "subtitle": "M.Com",
            "text": "30 Bowman St, South Windsor, Mt 39508",
        },
        {
            "imgsrc": "avtar/5.jpg",
            "title": " Anna Mull",
            "subtitle": "B.sc",
            "text": "30 Bowman St, South Windsor, Mt 39508",
        },
        {
            "imgsrc": "avtar/6.jpg",
            "title": " Anna Mull",
            "subtitle": "M.Tech",
            "text": "30 Bowman St, South Windsor, Mt 39508",
        },
      
        

    ]
    var settings_slider = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fadeSpeed: 1000,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          }
        ]
    };
    return (
        <div>
            <Slider {...settings_slider} className="ratedoctor-slide arrow-style1" >
                {Productdata.map((item, index) => {
                    const imgsrc = IMAGE_URLS[item.imgsrc];
                    return (
                        <div key={index}>
                            <div className="hosdoct-grid">
                                <div className="img-wrap">
                                    <img className="img-fluid" src={imgsrc} alt="" />
                                </div>
                                <div className="doct-detail">
                                    <h4>{item.title}</h4><span> {item.subtitle}</span>
                                    <p>{item.text}</p>
                                    <ul className="codex-soclist">
                                        <li><Link href="javascript:void(0);"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link href="javascript:void(0);"><i className="fa fa-twitter"></i></Link></li>
                                        <li><Link href="javascript:void(0);"><i className="fa fa-instagram"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider >
        </div>
    )
}
