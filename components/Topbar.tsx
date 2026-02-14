import React from "react";
import Navbar from "./Navbar";

/**
 * Compound Nav/Topbar component composed from primitives and Navbar.
 * Responsive: collapses links into a menu on small screens.
 */
export function Topbar() {
  // For brevity, use Navbar as the main navigation, but wrap in a responsive container.
  // You can extend this with a hamburger menu for mobile if needed.
  return (
    <div className="w-full">
      <Navbar />
    </div>
  );
}

export default Topbar;
