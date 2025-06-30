'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "../config";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const Header = () => {
  const [navbarCategories, setNavbarCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/header`)
      .then((response) => setNavbarCategories(response.data.navbar_categories))
      .catch((error) => console.error("Error fetching header data:", error));
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white border-b border-green-600 shadow-sm z-50 font-robotoCondensed">
        <MobileHeader 
          navbarCategories={navbarCategories}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          API_URL={API_URL}
        />
        
        <DesktopHeader 
          navbarCategories={navbarCategories}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          closeTimeout={closeTimeout}
          setCloseTimeout={setCloseTimeout}
          API_URL={API_URL}
        />
      </header>

    </>
  );
};

export default Header;