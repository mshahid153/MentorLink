import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
  });
  const [totalFee, setTotalFee] = useState(0);
  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [lastNameEmpty, setLastNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [numberEmpty, setNumberEmpty] = useState(false);
  const [detailsEmpty, setDetailsEmpty] = useState(false);
  const [alertConfirmation, setAlertConfirmation] = useState(false);
  const navigation = useNavigate();
  const mentorInfo = JSON.parse(localStorage.getItem("mentorDetails"));
  const { duration } = JSON.parse(localStorage.getItem("meetingDetails"));

  useEffect(() => {
    calculateTotalFee();
  }, [duration, mentorInfo]);

  const getDurationFee = () => {
    switch (duration) {
      case 30:
        return 2000;
      case 45:
        return 3000;
      case 60:
        return 4000;
      default:
        return 0;
    }
  };

  const getPremiumFee = () => {
    return mentorInfo.isPremium ? 1000 : 0;
  };

  const calculateTotalFee = () => {
    const durationFee = getDurationFee();
    const premiumFee = getPremiumFee();
    const gst = (durationFee + premiumFee) * 0.18;
    const total = durationFee + premiumFee + gst;
    setTotalFee(total);
  };

  const handleCheckOut = () => {
    setFirstNameEmpty(!billingDetails.firstName);
    setLastNameEmpty(!billingDetails.lastName);
    setNumberEmpty(!billingDetails.number);
    setEmailEmpty(!billingDetails.email);

    if (
      !billingDetails.firstName ||
      !billingDetails.lastName ||
      !billingDetails.number ||
      !billingDetails.email
    ) {
      setDetailsEmpty(true);
      return;
    }

    setDetailsEmpty(false);
    setAlertConfirmation(true);
  };

  const handleConfirmation = () => {
    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));
    navigation("/confirmation");
  };

  return (
    <div className="flex flex-col md:gap-5 md:flex-row">
      <div className="md:w-1/2">
        <Card
          className={`md:w-[400px] md:m-10 md:border-2 md:border-[#0048ff] md:shadow-lg md:shadow-blue-300 ${
            detailsEmpty ? "md:border-red-500 md:shadow-red-500" : ""
          } `}
        >
          <CardHeader>
            <CardTitle className="text-[#1451EE] underline underline-offset-8 pb-3">
              Billing Details
            </CardTitle>
            <CardDescription className="text-xl">
              Please enter your details...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="firstname"
                className={`font-bold ${firstNameEmpty ? "text-red-500" : ""}`}
              >
                First Name
              </Label>
              <Input
                id="firstname"
                placeholder="First Name"
                type="text"
                className=" focus-visible:ring-[#1451EE]"
                onFocus={() => setFirstNameEmpty(!billingDetails.firstName)}
                onBlur={() => setFirstNameEmpty(!billingDetails.firstName)}
                onChange={(e) =>
                  setBillingDetails((prevValues) => ({
                    ...prevValues,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="lastname"
                className={`font-bold ${lastNameEmpty ? "text-red-500" : ""}`}
              >
                Last Name
              </Label>
              <Input
                id="lastname"
                placeholder=" Last Name"
                type="text"
                className=" focus-visible:ring-[#1451EE]"
                onFocus={() => setLastNameEmpty(!billingDetails.lastName)}
                onBlur={() => setLastNameEmpty(!billingDetails.lastName)}
                onChange={(e) =>
                  setBillingDetails((prevValues) => ({
                    ...prevValues,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="number"
                className={`font-bold ${numberEmpty ? "text-red-500" : ""}`}
              >
                Number
              </Label>
              <Input
                id="number"
                placeholder="Phone Number"
                type="tel"
                className=" focus-visible:ring-[#1451EE]"
                onFocus={() => setNumberEmpty(!billingDetails.number)}
                onBlur={() => setNumberEmpty(!billingDetails.number)}
                onChange={(e) =>
                  setBillingDetails((prevValues) => ({
                    ...prevValues,
                    number: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="email"
                className={`font-bold ${emailEmpty ? "text-red-500" : ""}`}
              >
                Email
              </Label>
              <Input
                id="email"
                placeholder=" Email"
                type="email"
                className=" focus-visible:ring-[#1451EE]"
                onFocus={() => setEmailEmpty(!billingDetails.email)}
                onBlur={() => setEmailEmpty(!billingDetails.email)}
                onChange={(e) =>
                  setBillingDetails((prevValues) => ({
                    ...prevValues,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mb-10 md:w-full md:m-10">
        <Card className="md:border-2 md:border-[#0048ff] md:shadow-lg md:shadow-blue-300">
          <CardHeader>
            <CardTitle className="text-[#1451EE] underline underline-offset-8 pb-3">
              Bill Checkout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-xl py-1">
              <h1>Meeting - {`${duration} min`}</h1>
              <h1>₹{getDurationFee()}</h1>
            </div>
            <div className="flex justify-between text-xl py-1">
              <h1>Premium service</h1>
              <h1>₹{getPremiumFee()}</h1>
            </div>
            <div className="flex justify-between text-xl py-1">
              <h1>GST - 18%</h1>
              <h1>₹{(getDurationFee() + getPremiumFee()) * 0.18}</h1>
            </div>
            <hr />
            <div className="flex justify-between text-xl py-1 ">
              <h1>Total</h1>
              <h1>₹{totalFee}</h1>
            </div>
          </CardContent>
          {detailsEmpty && (
            <p className="text-red-600 font-bold ml-5 pb-3">
              Please fill in all billing details to checkout
            </p>
          )}
          <CardFooter className="">
            <Button onClick={handleCheckOut}>Check out</Button>
          </CardFooter>
        </Card>
        <AlertDialog open={alertConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#1451EE] text-xl">
                Confirm your details
              </AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
              <div className="text-xl">
                <h1>{`First Name : ${billingDetails.firstName}`}</h1>
                <h1>{`Last Name : ${billingDetails.lastName}`}</h1>
                <h1>{`Number  : ${billingDetails.number}`}</h1>
                <h1>{`Email : ${billingDetails.email}`}</h1>
                <h1>{`Amount : ${totalFee}`}</h1>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlertConfirmation(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#0048ff] hover:bg-[#1451EE]"
                onClick={handleConfirmation}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Billing;
