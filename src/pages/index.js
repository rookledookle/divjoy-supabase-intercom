import React from "react";
import Meta from "components/Meta";
import HeroSection2 from "components/HeroSection2";
import FeaturesSection from "components/FeaturesSection";
import ClientsSection from "components/ClientsSection";
import TestimonialsSection from "components/TestimonialsSection";
import CtaSection from "components/CtaSection";

function IndexPage(props) {
  return (
    <>
      <Meta />
      <HeroSection2
        title="Build web applications and websites with ease"
        subtitle="Carefully crafted, easy to customize, fully responsive UI components for your Tailwind CSS based projects."
        strapline=""
        size="lg"
        bgColor="bg-blue-900"
        bgImage=""
        bgImageOpacity={1}
        textColor="text-white"
      />
      <FeaturesSection
        title="Amazing features packed in a neat package"
        subtitle="You will love working with your newly updated and customized dashboard."
        strapline="It's time to build"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
      <ClientsSection
        title="These companies trust us"
        subtitle=""
        strapline=""
        size="md"
        bgColor="bg-blue-800"
        bgImage=""
        bgImageOpacity={1}
        textColor="text-white"
      />
      <TestimonialsSection
        title="Customer Testimonials"
        subtitle=""
        strapline="Real Feedback"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
      <CtaSection
        title={
          <>
            Create an account <span className="text-blue-600">today</span>!
          </>
        }
        subtitle="Inspiring results from day one without the pain. Get your own custom dashboard and start building amazing services."
        strapline=""
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
    </>
  );
}

export default IndexPage;
