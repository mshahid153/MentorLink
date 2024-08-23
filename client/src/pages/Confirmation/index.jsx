import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import SuccessAnimation from "@/SuccessAnimation.json";
import ConfirmationPageImage from "@/assets/successpage.jpg";

const Confirmations = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const mentorInfo = JSON.parse(localStorage.getItem("mentorDetails"));
  const { date, time, duration } = JSON.parse(
    localStorage.getItem("meetingDetails")
  );
  const { firstName, lastName, number, email } = JSON.parse(
    localStorage.getItem("billingDetails")
  );

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  const renderTimeFormat = () => {
    const convertTo12HourFormat = (timeStr) => {
      const [hour, minute] = timeStr.split(":");
      let h = parseInt(hour);
      const m = minute || "00";
      const period = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m.padStart(2, "0")} ${period}`;
    };

    const [startHour, startMinute] = time.split(":").map(Number);
    const totalMinutes = startMinute + duration;
    const endHour = startHour + Math.floor(totalMinutes / 60);
    const finalMinute = totalMinutes % 60;

    const formattedStartTime = convertTo12HourFormat(time);
    const formattedEndTime = convertTo12HourFormat(
      `${endHour % 24}:${finalMinute.toString().padStart(2, "0")}`
    );

    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  return (
    <div>
      {!isAnimationComplete ? (
        <Player
          autoplay
          keepLastFrame
          src={SuccessAnimation}
          style={{ width: "80%", height: "600px" }}
          onEvent={(event) => {
            if (event === "complete") {
              handleAnimationComplete();
            }
          }}
        />
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-5 my-10 ">
          <div className="flex justify-center items-center md:w-1/2">
            <img src={ConfirmationPageImage} className="w-[90%] rounded-md" />
          </div>
          <div className="w-[90%] md:w-2/5 md:mr-10">
            <Card className="md:border-2 border-[#0048ff] shadow-lg shadow-blue-300">
              <CardHeader>
                <CardTitle className="text-[#1451EE] underline underline-offset-8 pb-3">
                  Meeting Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 text-lg font-semibold">
                <div>
                  <h1>{`Name : ${firstName} ${lastName}`}</h1>
                  <h1>{`Number : ${number}`}</h1>
                  <h1>{`Email : ${email}`}</h1>
                </div>
                <div>
                  <h1>{`Mentor Name: ${mentorInfo.name}`}</h1>
                  <h1>{`Expertise in : ${mentorInfo.areaOfExpertise}`}</h1>
                  <h1>{`Meeting Date : ${date}`}</h1>
                  <h1>Meeting Time : {renderTimeFormat()}</h1>
                  <h1>Meeting ID : IOJEK564GO</h1>
                </div>
              </CardContent>

              <CardFooter className=""></CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmations;
