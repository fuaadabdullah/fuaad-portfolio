"use client";

/**
 * LinkedIn Profile Badge Component - World Class Edition
 * 
 * Professional card design with proper LinkedIn badge integration.
 * Includes loading state and proper positioning.
 */

export default function LinkedInBadge() {
  return (
    <div className="linkedin-card-container">
      <div className="linkedin-card">
        <div className="badge-header">
          <svg 
            className="linkedin-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <h3 className="badge-title">Connect on LinkedIn</h3>
        </div>
        
        <div 
          className="badge-base LI-profile-badge" 
          data-locale="en_US" 
          data-size="large" 
          data-theme="dark" 
          data-type="VERTICAL" 
          data-vanity="fuaadabdullah" 
          data-version="v1"
        >
          <a 
            className="badge-base__link LI-simple-link" 
            href="https://www.linkedin.com/in/fuaadabdullah?trk=profile-badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fuaad Abdullah
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .linkedin-card-container {
          width: 100%;
          max-width: 400px;
          margin: 0;
        }
        
        .linkedin-card {
          background: linear-gradient(135deg, rgba(15, 20, 25, 0.6) 0%, rgba(11, 15, 19, 0.8) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .linkedin-card:hover {
          border-color: rgba(0, 119, 181, 0.4);
          box-shadow: 0 12px 48px rgba(0, 119, 181, 0.2);
          transform: translateY(-2px);
        }
        
        .badge-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .linkedin-icon {
          color: #0077b5;
          flex-shrink: 0;
        }
        
        .badge-title {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
          letter-spacing: -0.01em;
        }
        
        /* Ensure LinkedIn badge renders properly */
        .linkedin-card :global(.LI-profile-badge) {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Style the fallback link before script loads */
        .badge-base__link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #0077b5;
          color: white !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        
        .badge-base__link:hover {
          background: #005885;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
        }
        
        .badge-base__link::before {
          content: "→";
          font-size: 20px;
        }
        
        /* Isolate LinkedIn script styles */
        .linkedin-card * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
