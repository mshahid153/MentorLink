import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LandingPageImage from "@/assets/homepage.jpg";
import Loading from "@/components/loading";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = LandingPageImage;
    img.onload = () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="h-full w-full flex flex-col justify-around items-center md:flex-row md:px-10">
      <div className="flex flex-col gap-3 p-5 md:w-[70%] md:mb-20">
        <h1 className="text-3xl leading-10">
          Ace Your{" "}
          <span className="text-[#1451EE] font-semibold">Career Goals</span>{" "}
          with
          <br /> <span className="text-[#1451EE] font-semibold">
            Top-Tier
          </span>{" "}
          1x1 Sessions
          <span className="text-[#1451EE]">.</span>
        </h1>
        <p className="text-xl">
          Unlock your full potential with tailored mock interviews and career
          guidance from industry-leading mentors. Our platform connects you with
          seasoned professionals who understand your aspirations and help you
          navigate your MBA journey with confidence. Whether you're preparing
          for placements, exploring new career paths, or honing your skills, our
          1x1 sessions are designed to provide the support you need when you
          need it
        </p>
        <div className="mt-3">
          <Button
            className="bg-[#007CFF] h-[50px] w-[230px] rounded-full p-5 text-xl hover:bg-[#1451EE] hover:p-5 transition-all duration-300"
            onClick={() => navigate("/booking")}
          >
            Book a 1x1 Meeting
          </Button>
        </div>
      </div>
      <div className="bg-black">
        <img
          src={LandingPageImage}
          alt="landing page image"
          className="w-full md:w-[700px]"
        />
      </div>
    </div>
  );
};

export default Home;
