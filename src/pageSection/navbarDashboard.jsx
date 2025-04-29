import { useMediaQuery } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export default function NavBarDashboard() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const employeeRef = useRef(null);
  const jobRoleRef = useRef(null);
  const coreValueRef = useRef(null);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/LoginPage";
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (employeeRef.current && !employeeRef.current.contains(event.target)) &&
        (jobRoleRef.current && !jobRoleRef.current.contains(event.target)) &&
        (coreValueRef.current && !coreValueRef.current.contains(event.target)) &&
        !event.target.closest(".hamburger")
      ) {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return activeLink === path ? "text-blue-700" : "text-gray-700";
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prevState) =>
      prevState === dropdownName ? null : dropdownName
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      {isLargeScreen ? (
        <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 py-3 transition-all duration-300 ${
  isScrolled ? "bg-white shadow-md" : "bg-transparent"
}`}>

  <div className="flex-grow"></div> {/* Spacer kiri */}

  <div className="relative ml-auto"> {/* Hamburger pindah ke kanan */}
    <button
      className="flex items-center justify-center p-2 btn btn-ghost btn-circle hamburger"
      onClick={toggleMenu}
    >
      {!isMenuOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </button>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="absolute right-0 z-50 px-6 py-4 mt-3 bg-white rounded-lg shadow-md w-[300px] md:w-72"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-col gap-4">
            <div ref={jobRoleRef}></div>
            <div ref={coreValueRef}></div>

            <div className="flex items-center gap-4">
              {user ? (
                <a href="#" className="flex items-center gap-4">
                  <div className="w-10 h-10">
                    <img
                      src={user.profileImage || "https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png"}
                      alt="Profile"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="font-semibold">{user.username}</h1>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </a>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</header>

      ) : (
        <header className={`fixed top-0 left-0 right-0 z-50 flex items-center h-[50px] px-6 transition-all duration-300 md:text-sm lg:text-base ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}>
          <div className="w-[80px] h-[40px] overflow-hidden flex items-center">
          </div>

          <div className="flex gap-6 ml-6">

          </div>

          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <a href="#" className="flex items-center gap-4">
                <div className="w-10 h-10">
                  <img
                    src={user.profileImage || "https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png"}
                    alt="Profile"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h1 className="font-semibold">{user.username}</h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </a>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </header>
      )}
    </div>
  );
}
