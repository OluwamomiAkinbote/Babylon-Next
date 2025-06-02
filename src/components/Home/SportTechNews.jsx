"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { ClipLoader } from "react-spinners";
import SportTechSection from "./SportTechSection";

const SportTechNews = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_URL}/sports-tech/`);
        setSportsNews(response.data.sport_posts);
        setTechNews(response.data.tech_posts);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="mx-auto px-2 py-8 font-robotoCondensed">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader color="#5fca31" size={30} />
        </div>
      ) : (
        <>
          <SportTechSection title="Sports" posts={sportsNews} />
          <SportTechSection title="Technology" posts={techNews} />
        </>
      )}
    </div>
  );
};

export default SportTechNews;
