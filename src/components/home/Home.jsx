import React from "react";
import VideoPlayer from "./Video/VideopLayer";
import { Section } from "./Section/Section";
import { VideosSection } from "./Card/CradSection";
import { CategoriesSection } from "./CategorySection/Category";
import { Footer } from "../Footer/Footer";

function Home() {
  return (
    <>
      <VideoPlayer />
      <Section />
      <VideosSection />
      <CategoriesSection />
      <Footer />
    </>
  );
}

export default Home;
