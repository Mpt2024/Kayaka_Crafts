import React from "react";
import Hero from "../Hero/Hero";
import Popular from "../Papular/Popular";
import Offers from "../Offers/Offers";
import NewCollections from "../NewCollections/NewCollections";
import NewsLetter from "../NewsLetter/NewsLetter";
import Search from "../Search/Search";

export const Shop = () => {
  return <div>
    <Hero/>
    <Popular/>
    {/* <Offers/> */}
    <NewCollections/>
    <NewsLetter/>
  </div>;
};

