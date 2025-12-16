"use client";

import { useEffect, useState } from "react";

/**
 * LinkedIn Profile Badge Component - Improved styling + loading state
 *
 * Shows a small loading state while the LinkedIn widget attempts to render.
 * Provides a clean fallback and accessible labels.
 */

export default function LinkedInBadge() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    // Check for injected iframe for up to 6s (polling)
    const maxChecks = 12;
    let checks = 0;
    const interval = setInterval(() => {
      checks++;
      const badge = document.querySelector('.LI-profile-badge');
      const iframe = badge?.querySelector('iframe');
      if (iframe && mounted) {
        setLoaded(true);
        clearInterval(interval);
      } else if (checks >= maxChecks && mounted) {
        // give up and show fallback note
        setFailed(true);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="linkedin-card-container" aria-live="polite">
      <div className="linkedin-card" role="region" aria-label="LinkedIn profile badge">
        <div className="badge-header">
          <svg
            className="linkedin-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>

          <div>
            <h3 className="badge-title">Connect on LinkedIn</h3>
            <p className="badge-subtle">Profile badge — opens in a new tab</p>
          </div>
        </div>

        <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="VERTICAL" data-vanity="fuaadabdullah" data-version="v1">
          {(!loaded && !failed) && (
            <div className="badge-loading" aria-hidden>
              <span className="spinner" aria-hidden="true"></span>
              <span className="loading-text">Loading badge…</span>
            </div>
          )}

          {/* The LinkedIn script will enhance this link into a badge when possible */}
          <a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/fuaadabdullah?trk=profile-badge" target="_blank" rel="noopener noreferrer" aria-label="Open Fuaad Abdullah on LinkedIn (opens in new tab)">
            View profile
          </a>

          {failed && (
            <p className="badge-fallback">Could not load LinkedIn badge — <a href="https://www.linkedin.com/in/fuaadabdullah" target="_blank" rel="noopener noreferrer">open profile</a></p>
          )}
        </div>
      </div>

      <style jsx>{`
        .linkedin-card-container { width: 100%; max-width: 420px; margin: 0; }
        .linkedin-card { background: linear-gradient(180deg, rgba(10,14,18,0.6), rgba(14,18,20,0.7)); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px; transition: transform .18s ease, box-shadow .18s ease; }
        .linkedin-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.35); }
        .badge-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .linkedin-icon { color: #0077b5; flex-shrink:0; }
        .badge-title { font-size: 16px; font-weight: 700; color: #e6eef6; margin:0; }
        .badge-subtle { margin:0; font-size: 12px; color: #9aa7b2; }

        .badge-base { min-height: 140px; display:flex; align-items:center; justify-content:center; position:relative; }

        .badge-loading { display:flex; align-items:center; gap:12px; }
        .spinner { width:18px; height:18px; border-radius:50%; border:3px solid rgba(255,255,255,0.12); border-top-color: #0077b5; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-text { color: #becbd4; font-size: 14px; }

        .badge-base__link { display:inline-flex; align-items:center; gap:8px; padding:10px 18px; background: linear-gradient(180deg,#0077b5,#006097); color:#fff !important; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px; }
        .badge-base__link:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,119,181,0.15); }

        .badge-fallback { margin-top:10px; color:#9aa7b2; font-size:13px; }

        @media (max-width: 640px) {
          .linkedin-card { padding: 14px; }
          .badge-base { min-height: 120px; }
          .badge-title { font-size: 15px; }
        }
      `}</style>
    </div>
  );
}
