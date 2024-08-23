import AboutUsPageImage from "@/assets/aboutpage.jpg";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = AboutUsPageImage;
    img.onload = () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row md:gap-5 justify-center md:items-center h-[80vh]">
      <div className="m-5 md:p-5 ">
        <img src={AboutUsPageImage} className="w-full" />
      </div>
      <div className="flex justify-center flex-col gap-5 mx-5 ">
        <h1 className="text-[#1451EE] text-2xl underline underline-offset-8 font-semibold">
          About Us
        </h1>
        <h1 className="text-xl font-semibold">
          Welcome to MentorLink - Empowering Future Leaders!
        </h1>
        <p>
          At MentorLink, we are passionate about shaping the success stories of
          tomorrow's business leaders. As a leading placement training company,
          our mission is to unlock the full potential of MBA students, guiding
          them towards remarkable career journeys. We believe in empowering
          future leaders to achieve their dreams and carve out impactful careers
          in the world of business.
        </p>
      </div>
    </div>
  );
};

export default About;
