import {
  FaCrown,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import RenderDialog from "./components/RenderDialog";
import axios from "axios";
import Loading from "@/components/loading";

const MentorDetails = () => {
  const { id } = useParams();
  const [mentorInfo, setMentorInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/${id}`);
        setMentorInfo(response.data);
        localStorage.setItem("mentorDetails", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        setError("Failed to fetch mentor data. Please try again later.");
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="m-5 border-2 border-red-500 rounded-md shadow-lg shadow-red-500 p-5 text-2xl text-red-500">
          Sorry, {error}
        </div>
      </div>
    );

  return (
    <div className="md:px-5">
      <h1 className="text-3xl font-bold px-5 pt-5 text-[#1451EE] underline-offset-8 underline">
        Details
      </h1>
      <div className="w-full min-w-[] flex flex-col items-start gap-5 md:flex-row mt-5">
        <div className="md:min-w-[30%] p-5 leading-8 border-2 rounded-lg border-[#1451EE] mx-5 text-xl shadow-blue-300 shadow-lg">
          <div className="flex gap-3 items-center">
            <h3>
              <span className="font-semibold">Name : </span>
              {mentorInfo.name}
            </h3>
            {mentorInfo.isPremium === 1 ? (
              <FaCrown size={24} color="gold" />
            ) : null}
          </div>
          <p>
            <span className="font-semibold">Expertise in : </span>
            {mentorInfo.areaOfExpertise}
          </p>
          <p>
            <span className="font-semibold">Experience : </span>
            {mentorInfo.experience} Years
          </p>
          <div className="flex items-center">
            <span className="font-semibold">Rating : </span>
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                {index < mentorInfo.rating ? (
                  <AiFillStar className="text-yellow-500" />
                ) : (
                  <AiOutlineStar className="text-yellow-500" />
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 p-5 border-2 rounded-lg border-[#1451EE] mx-5 text-lg mb-10 shadow-blue-300 shadow-lg">
          <h3 className="text-[#1451EE] text-2xl font-semibold leading-10">
            About me...
          </h3>
          <p className="leading-8">
            {`${mentorInfo.name} is an experienced and dedicated mentorInfo with a strong
            background in ${mentorInfo.areaOfExpertise}. With a wealth of knowledge
            and a passion for sharing insights, ${mentorInfo.name} is committed to
            helping individuals achieve their goals and excel in their careers.
            Whether you're looking for guidance in ${mentorInfo.areaOfExpertise} or
            seeking advice on how to navigate complex challenges, ${mentorInfo.name}
            is here to provide the support and expertise you need.`}
          </p>
          <p>
            <span className="font-semibold">Available : </span>{" "}
            {mentorInfo.availability}
          </p>
          <div className="flex space-x-3 items-center">
            <span className="font-semibold">Connect :</span>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={25} className="text-gray-800" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter size={25} className="text-gray-800" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={25} className="text-gray-800" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={25} className="text-gray-800" />
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={25} className="text-gray-800" />
            </a>
          </div>
          <RenderDialog mentorInfo={mentorInfo} />
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;
