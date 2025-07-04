"use client";

import FeaturedCategories from "./FeaturedCategories";
import WorldNews from "./WorldNews";
import Hero from "./Hero";
import LatestNews from "./LatestNews";
import SportTechNews from "./SportTechNews";
import StoryView from "../Header/Story/StoryView";

const Home = () => {
  return (
    <div className="md:mx-12">
      {/* Hero Section - Uses Barlow font */}
      <div className="font-barlow">
        <StoryView />
      </div>
      {/* Hero Section - Uses Barlow font */}
      <div className="font-barlow">
        <Hero />
      </div>
      
      {/* Latest News Section - Uses Roboto Condensed */}
      <div className="font-robotoCondensed">
        <LatestNews />
      </div>

      {/* Featured Categories Section - Uses Roboto Condensed */}
      <div className="font-robotoCondensed">
        <FeaturedCategories />
      </div>
    
      {/* Global News Section - Inherits default font */}
      <div>
        <WorldNews />
      </div>
      
      {/* Sports & Tech News Section - Inherits default font */}
      <div>
        <SportTechNews />
      </div>
    </div>
  );
};

export default Home;