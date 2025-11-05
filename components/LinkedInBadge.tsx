"use client";

/**
 * LinkedIn Profile Badge Component
 * 
 * Isolated wrapper to prevent LinkedIn script from affecting global styles.
 * Keep this component only on pages where you need the badge.
 */

export default function LinkedInBadge() {
  return (
    <div className="linkedin-badge-wrapper">
      <div 
        className="badge-base LI-profile-badge" 
        data-locale="en_US" 
        data-size="medium" 
        data-theme="dark" 
        data-type="VERTICAL" 
        data-vanity="fuaadabdullah" 
        data-version="v1"
      >
        <a 
          className="badge-base__link LI-simple-link" 
          href="https://www.linkedin.com/in/fuaadabdullah?trk=profile-badge"
        >
          Fuaad Abdullah
        </a>
      </div>
      
      <style jsx>{`
        .linkedin-badge-wrapper {
          /* Isolate LinkedIn badge styles */
          max-width: 300px;
          margin: 0 auto;
        }
        
        /* Prevent LinkedIn script from affecting global styles */
        .linkedin-badge-wrapper * {
          box-sizing: border-box;
        }
        
        /* Override any LinkedIn font inheritance if needed */
        .linkedin-badge-wrapper {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
