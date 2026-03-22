import { useEffect, useRef } from 'react';
import './HeroAvatar.css';

const HeroAvatar = () => {
  const hasVisited = useRef(false);

  useEffect(() => {
    // Only trigger once per session to avoid spamming emails
    if (!hasVisited.current) {
      hasVisited.current = true;

      const userAgent = navigator.userAgent;
      const language = navigator.language;
      const screenRes = `${window.screen.width}x${window.screen.height}`;

      // Fetch location based on IP
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          const visitorData = {
            city: data.city,
            region: data.region,
            country_name: data.country_name,
            ip: data.ip,
            userAgent,
            language,
            screenRes
          };

          fetch('/api/visit', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitorData)
          }).catch(err => console.error('Visit tracker error:', err));
        })
        .catch(err => {
          // Fallback if location fetch fails
          fetch('/api/visit', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userAgent, language, screenRes })
          }).catch(e => console.error(e));
        });
    }
  }, []);

  return (
    <img
      src="/myphto.jpg"
      alt="Vaibhav"
      className="profile-avatar"
    />
  );
};

export default HeroAvatar;