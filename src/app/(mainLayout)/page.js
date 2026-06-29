import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.4.4"]);

import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import WhyJoin from "@/components/WhyJoin";
import FeaturedStartups from "@/components/FeaturedStartups";
import FeaturedOpportunities from "@/components/FeaturedOpportunities";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedStartups />
      <FeaturedOpportunities />
      <Statistics />
      <WhyJoin />
    </div>
  );
}
