"use client"; // Ensure this component is rendered on the client side
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector to access Redux store
import { signOut } from "next-auth/react"; // Import signOut from next-auth
import { RootState } from "@/app/store/store";
import { clearUserData } from "@/app/store/userSlice";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const dispatch = useDispatch();

  // State to handle navbar visibility
  const [isCollapsed, setIsCollapsed] = useState(true);
  // State to handle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to handle avatar hover
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  // Fetch user data from Redux store
  // const user = useSelector((state) => state); // Adjust the state path as needed
  const user = useSelector((state: RootState) => state.user.user);

  // Toggle function to change the navbar visibility state
  const toggleNavbar = () => setIsCollapsed((prev) => !prev);

  // Toggle function to change the dropdown visibility state
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to handle logout
  const handleLogout = () => {
    dispatch(clearUserData());
    localStorage.removeItem("user");
    signOut({ callbackUrl: "/" });
    // signOut({ callbackUrl: "/" }); // Redirect to home or login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h2 className="m-0 text-primary">
          <i className="fa fa-book me-3"></i>eLEARNING
        </h2>
      </a>
      <button
        type="button"
        className="navbar-toggler me-4"
        onClick={toggleNavbar} // Toggle state on button click
        aria-controls="navbarCollapse" // For accessibility
        aria-expanded={!isCollapsed} // Reflect the current state
        aria-label="Toggle navigation" // For accessibility
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`navbar-collapse ${!isCollapsed ? 'd-block' : 'd-none'}`} id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link href="index.html" className="nav-item nav-link active">Home</Link>
          <Link href="about.html" className="nav-item nav-link">About</Link>
          <Link href="courses.html" className="nav-item nav-link">Courses</Link>
          <div className="nav-item dropdown">
            <Link href="#" className="nav-link dropdown-toggle" onClick={toggleDropdown}>
              Pages
            </Link>
            <div className={`dropdown-menu fade-down m-0 ${isDropdownOpen ? 'd-block' : 'd-none'}`}>
              <Link href="team.html" className="dropdown-item">Our Team</Link>
              <Link href="testimonial.html" className="dropdown-item">Testimonial</Link>
              <Link href="404.html" className="dropdown-item">404 Page</Link>
            </div>
          </div>
          <Link href="contact.html" className="nav-item nav-link">Contact</Link>
        </div>
        
        {user ? (
          <div
            className="position-relative d-inline-block"
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            <Image
              src={user.picture??"/img/avatar-user.svg"} 
              alt="User Avatar"
              height={40}
              width={40}
              className="rounded-circle"
              style={{ width: '40px', height: '40px' }} // Adjust size as needed
            />
            {isAvatarHovered && (
              <div className="dropdown-menu show" style={{ position: 'absolute', top: '100%', right: 0 }}>
                <div className="dropdown-item">Hello, {user.name}</div>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
            Join Now <i className="fa fa-arrow-right ms-3"></i>
          </Link>
        )}
      </div>
    </nav>
  );
}
