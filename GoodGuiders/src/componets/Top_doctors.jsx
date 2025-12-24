import { useEffect, useState } from "react";
import Slider from "react-slick";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Top_doctors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopMentors = async () => {
      try {
        const res = await fetch(`${API}/stats/mentors/top-rated`);
        const data = await res.json();
        setMentors(data.data || []);
      } catch (err) {
        console.error("Failed to load mentors", err);
      } finally {
        setLoading(false);
      }
    };

    loadTopMentors();
  }, []);

  const settings_slider = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 3 } },
      { breakpoint: 1400, settings: { slidesToShow: 2 } },
    ],
  };

  if (loading) return null;

  return (
    <Slider {...settings_slider} className="ratedoctor-slide arrow-style1">
      {mentors.map((mentor) => {
        const imgSrc = mentor.profileImage
          ? `http://localhost:5000${mentor.profileImage}`
          : IMAGE_URLS["avtar/1.jpg"];

        return (
          <div key={mentor._id}>
            <div className="hosdoct-grid">
              <div className="img-wrap">
                <img className="img-fluid" src={imgSrc} alt={mentor.name} />
              </div>

              <div className="doct-detail">
                <h4>{mentor.name}</h4>
                <span>
                  {mentor.education?.length
                    ? mentor.education[mentor.education.length - 1]?.degree
                    : mentor.specializedIn || "Mentor"}
                </span>
                <p>{mentor.experience || "0"} years</p>
                <p>
                  ⭐ {mentor.rating || "0"} / 5
                  <br />({mentor.ratingCount || 0} reviews)
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
