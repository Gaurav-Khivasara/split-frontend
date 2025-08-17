import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function AccountButton({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

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
        !buttonRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="nav-account" >
      <button ref={buttonRef} onClick={() => setIsOpen((open) => !open)} className="btn" >
        <img height="30" width="30" src={user.avatar} alt="user-avatar" />
        {user.name}
      </button>

      {isOpen && (
        <div ref={menuRef} role="menu" className="nav-account-menu" >
          <Link to="/profile" >Profile</Link>
          <LogoutButton setUser={setUser} />
        </div>
      )}
    </div>
  );
}