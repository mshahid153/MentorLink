import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { Check, ChevronsUpDown } from "lucide-react";
import { fields } from "@/fields.js";
import ScheduleImage from "@/assets/schedulepage.jpg";
import Loading from "@/components/loading";
import axios from "axios";

const MentorBooking = () => {
  const navigate = useNavigate();
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [formEmpty, setFormEmpty] = useState(false);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [isMentorResultVisible, setIsMentorResultVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentName || !selectedField) {
      setFormEmpty(true);
      return;
    }

    setFormEmpty(false);
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(apiUrl, {
        params: { field: selectedField },
      });
      setFilteredMentors(response.data);
      setIsMentorResultVisible(true);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDetails = (id) => {
    navigate(`/mentor/${id}`);
  };

  const renderMentor = () => {
    if (isLoading) return <Loading />;

    return (
      <div className="w-[90%]  p-5 flex flex-wrap gap-5 justify-center md:mt-12 md:h-[80vh] overflow-y-auto">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className={`min-w-[300px w-[400px] h-[150px] border-2 border-black p-3 flex gap-3 justify-around items-center rounded-lg hover:border-[#1451EE] ${
              mentor.isPremium
                ? "hover:bg-[#FFD700]/20"
                : "hover:bg-blue-300/20 "
            } hover:text-lg transition-all duration-300`}
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl">{mentor.name}</h1>
              <p>{mentor.areaOfExpertise}</p>
              {mentor.isPremium ? (
                <span className="flex gap-3">
                  Premium
                  <FaCrown size={24} color="gold" />
                </span>
              ) : (
                <span>Standard</span>
              )}
            </div>
            <Button
              className="bg-[#1451EE]/80 hover:bg-[#1451EE]"
              onClick={() => onClickDetails(mentor.id)}
            >
              Details
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex items-center flex-col md:flex-row">
      <div className=" m-8 md:ml-20 ">
        <Card
          className={`md:w-[400px] border-2 shadow-lg ${
            formEmpty
              ? "border-red-500 shadow-red-500"
              : "border-[#1451EE] shadow-blue-300"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-[#1451EE] text-3xl">
              Book your slot!
            </CardTitle>
            <CardDescription className="text-xl">
              Connect with Expert Mentors in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Full Name"
                    className=" focus-visible:ring-[#1451EE]"
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="field">Select your field</Label>
                  <Popover open={isOptionOpen} onOpenChange={setIsOptionOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOptionOpen}
                        className="w-full justify-between"
                      >
                        {selectedField || "Select a field..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full">
                      <Command>
                        <CommandInput placeholder="Search field..." />
                        <CommandList>
                          <CommandEmpty>No field found.</CommandEmpty>
                          <CommandGroup>
                            {fields.map((field) => (
                              <CommandItem
                                key={field}
                                value={field}
                                onSelect={(currentValue) => {
                                  setSelectedField(
                                    currentValue === selectedField
                                      ? ""
                                      : currentValue
                                  );
                                  setIsOptionOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedField === field
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {field}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button
                className="bg-[#007CFF] hover:bg-[#1451EE] mt-5"
                type="submit"
              >
                Book Mentor
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-red-500 font-semibold">
            {formEmpty ? "Please fill Name and Interest..." : ""}
          </CardFooter>
        </Card>
      </div>

      {!isMentorResultVisible ? (
        <div className="w-full flex justify-center items-center md:mr-10">
          <img
            src={ScheduleImage}
            alt="bookingpage image"
            className="h-[300px] md:h-[640px] object-contain"
          />
        </div>
      ) : (
        renderMentor()
      )}
    </div>
  );
};

export default MentorBooking;
