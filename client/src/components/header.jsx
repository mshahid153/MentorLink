import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import LogoImage from "@/assets/logo.png";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/booking",
    display: "Mentor",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-1">
            <img src={LogoImage} className="w-[40px]" />
            <h1 className="text-2xl font-semibold">MentorLink</h1>
          </NavLink>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-[#1451EE] text-[16px] leading-7 font-[600]"
                        : "text-black text-[16px] leading-7 font-[500] hover:text-[#1451EE]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
