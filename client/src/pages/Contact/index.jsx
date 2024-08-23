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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = ContactPageImage;
    img.onload = () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) return <Loading />;

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
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  placeholder="Phone Number"
                  type="number"
                  className=" focus-visible:ring-[#1451EE]"
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
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder=" Message"
                className=" focus-visible:ring-[#1451EE] resize-none"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#007CFF] hover:bg-[#1451EE]">Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
