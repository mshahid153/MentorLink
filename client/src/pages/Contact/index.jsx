import ContactPageImage from "@/assets/contactpage.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = ContactPageImage;
    img.onload = () => {
      setIsLoading(false);
    };
  }, []);

  const handleSubmit = () => {
    const { name, number, email, message } = contactForm;
    if (name && number && email && message) {
      setIsSubmitted(true);
      setContactForm({
        name: "",
        number: "",
        email: "",
        message: "",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isSubmitted)
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="m-5 border-2 border-blue-500 rounded-md shadow-lg shadow-blue-500 p-5 text-2xl text-blue-500">
          Message sent successfully...
        </div>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center m-5 mb-10 md:m-16">
      <div className="w-[90vw] flex justify-center items-center">
        <img
          src={ContactPageImage}
          className="w-[90%] md:h-[500px] object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-5 w-full">
        <Card className="max-w-[500px] md:border-2 border-[#0048ff] shadow-lg shadow-blue-300">
          <CardHeader>
            <CardTitle className="text-[#1451EE] underline underline-offset-8 pb-3">
              Contact Us
            </CardTitle>
            <CardDescription className="text-xl">
              Your Success Starts Here!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  placeholder="Full Name"
                  type="text"
                  className=" focus-visible:ring-[#1451EE]"
                  onChange={(e) =>
                    setContactForm((prevValues) => ({
                      ...prevValues,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  placeholder="Phone Number"
                  type="tel"
                  className=" focus-visible:ring-[#1451EE]"
                  onChange={(e) =>
                    setContactForm((prevValues) => ({
                      ...prevValues,
                      number: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder=" Email"
                type="email"
                className=" focus-visible:ring-[#1451EE]"
                onChange={(e) =>
                  setContactForm((prevValues) => ({
                    ...prevValues,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder=" Message"
                className=" focus-visible:ring-[#1451EE] resize-none"
                onChange={(e) =>
                  setContactForm((prevValues) => ({
                    ...prevValues,
                    message: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-[#007CFF] hover:bg-[#1451EE]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
