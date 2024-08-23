import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RenderDialog = ({ mentorInfo }) => {
  const navigation = useNavigate();
  const [formValues, setFormValues] = useState({
    date: "",
    time: "",
    duration: "",
  });
  const [formEmpty, setFormEmpty] = useState(false);
  const [timeEmpty, setTimeEmpty] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const parseMentorAvailability = (availabilityStr) => {
    const parts = availabilityStr.split(", ");
    const availableDays = parts.slice(0, -1).map((day) => day.trim());
    const timeRangePart = parts.slice(-1)[0];

    const [startTime, endTime] = timeRangePart
      .split("-")
      .map((time) => time.trim());

    const formatDateWithDay = (date) => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const year = date.getFullYear();
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const dayName = date.toLocaleString("default", { weekday: "long" });

      return `${month} ${day}, ${year} - (${dayName})`;
    };

    const today = new Date();
    const availableDates = [...Array(30)]
      .map((_, i) => {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        return {
          date: futureDate,
          dayName: futureDate.toLocaleString("default", { weekday: "long" }),
        };
      })
      .filter(({ dayName }) => availableDays.includes(dayName))
      .map(({ date }) => formatDateWithDay(date));

    return {
      availableDates,
      timeRange: {
        start: startTime,
        end: endTime,
      },
    };
  };

  const { availableDates, timeRange } = parseMentorAvailability(
    mentorInfo.availability
  );

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value || "";

    const convertTo24Hour = (time) => {
      const [hour, period] = time.split(" ");
      let [h, m] = hour.split(":").map(Number);

      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;

      return (
        h.toString().padStart(2, "0") +
        ":" +
        (m ? m.toString().padStart(2, "0") : "00")
      );
    };

    const timeRangeStart = convertTo24Hour(timeRange.start);
    const timeRangeEnd = convertTo24Hour(timeRange.end);

    if (selectedTime >= timeRangeStart && selectedTime <= timeRangeEnd) {
      setFormValues((prevValues) => ({
        ...prevValues,
        time: selectedTime,
      }));
      setTimeEmpty(false);
    } else {
      setTimeEmpty(true);
    }
  };

  const handleDateChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      date: value,
    }));
  };

  const handleDurationChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      duration: value,
    }));
  };

  const handleCancel = () => {
    setIsScheduleOpen(false);
    setFormEmpty(false);
    setTimeEmpty(false);
    setFormValues({
      date: "",
      time: "",
      duration: "",
    });
  };

  const handleSubmit = () => {
    const { date, time, duration } = formValues;
    if (!date || !time || !duration) {
      setFormEmpty(true);
      return;
    }
    localStorage.setItem("meetingDetails", JSON.stringify(formValues));
    setFormEmpty(false);
    setIsScheduleOpen(false);
    navigation("/billing");
  };

  return (
    <>
      {mentorInfo.isPremium && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="mt-5 bg-[#007CFF] hover:bg-[#1451EE]">
              Book
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#1451EE]">
                Premium Mentor Alert
              </AlertDialogTitle>
              <AlertDialogDescription>
                Please note that premium mentors charge an additional fee for
                their services. By selecting a premium mentorInfo, you will
                receive personalized guidance and expertise in your chosen area
                of interest. Make sure to check the pricing details before
                scheduling your session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => setIsScheduleOpen(true)}
                className="bg-[#007CFF] hover:bg-[#1451EE]"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <AlertDialog open={isScheduleOpen}>
        {!mentorInfo.isPremium && (
          <AlertDialogTrigger asChild>
            <Button
              className="mt-5 bg-[#007CFF] hover:bg-[#1451EE]"
              onClick={() => setIsScheduleOpen(true)}
            >
              Book
            </Button>
          </AlertDialogTrigger>
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#0048ff]">
              Select Date
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <Select onValueChange={handleDateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map((date, index) => (
                  <SelectItem key={index} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-col space-y-4">
              <AlertDialogTitle className="text-[#0048ff]">
                Select Time
              </AlertDialogTitle>
              {timeEmpty && (
                <p className="text-red-700">{`Please select a time between ${timeRange.start} and ${timeRange.end}`}</p>
              )}
              <input
                type="time"
                id="start-time"
                value={formValues.time}
                onChange={handleTimeChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <AlertDialogTitle className="text-[#0048ff]">
                Select Duration
              </AlertDialogTitle>
              <Select
                id="duration"
                value={formValues.duration}
                onValueChange={handleDurationChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={30}>30 Minutes</SelectItem>
                  <SelectItem value={45}>45 Minutes</SelectItem>
                  <SelectItem value={60}>60 Minutes</SelectItem>
                </SelectContent>
              </Select>
              {formEmpty && (
                <p className="text-red-600 text-center pb-3">
                  Please fill the details to continue...
                </p>
              )}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#007CFF] hover:bg-[#1451EE]"
              onClick={handleSubmit}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RenderDialog;
