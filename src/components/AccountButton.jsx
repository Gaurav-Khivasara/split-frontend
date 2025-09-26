import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";

export default function AccountButton({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        linkRef.current &&
        !buttonRef.current.contains(event.target) &&
        (!menuRef.current.contains(event.target) ||
          linkRef.current.contains(event.target))
      ) {
        if (linkRef.current.contains(event.target)) {
          setTimeout(() => setIsOpen(false), 10);
        } else {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mouseup", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="nav-account" >
      <button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)} className="btn" >
        <img height="30" width="30" src={user?.picture || "/default-profile-pics/unchecked/n.svg"} alt="user-picture" style={{ backgroundColor: "cyan" }} />
        {user?.name || "Name"}
      </button>

      {isOpen && (
        <div ref={menuRef} role="menu" className="nav-account-menu" >
          <Link to="/profile" ref={linkRef} >Profile</Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}