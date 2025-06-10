import React from "react";
import { svgs } from "../icons/svgs";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <span> {svgs.shipping}</span>,
    title: "Free Shipping & Returns",
    description:
      "Shop with confidence and have your favorite electronics delivered right to your doorstep without any additional cost.",
  },
  {
    icon: <span>{svgs.monyBack}</span>,
    title: "Money Back Guarantee",
    description:
      "If you're not completely satisfied with your purchase, we'll make it right. No questions asked.",
  },
  {
    icon: <span>{svgs.onlineSupport}</span>,
    title: "Online Support 24/7",
    description:
      "Need help with your electronics? Get in touch with us anytime, anywhere, and let's get your tech sorted.",
  },
];

const ServicesSection = () => {
  return (
    <div className="bg-white py-4 xxl:py-6 my-auto px-4 lg:px-8 rounded-lg flex flex-col md:flex-row w-full items-start justify-center md:gap-3 lg:gap-24">
      {services.map((service, index) => (
        <div
          key={index}
          className="w-full lg:w-[25vw] flex flex-col items-center text-center p-2 lg:p-6"
        >
          <div className="mb-4">{service.icon}</div>
          <div className="flex flex-col items-center text-center">
            <h3 className="font-bold text-base lg:text-lg text-homeHeaders">
              {service.title}
            </h3>
            <p className="text-sm lg:text-base font-normal text-homeHeaders">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
