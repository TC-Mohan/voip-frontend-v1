import React, { useEffect } from 'react';

const LiveChat = () => {
  useEffect(() => {
    // Tawk.to chat script initialization
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];

    s1.async = true;
    s1.src = 'https://embed.tawk.to/65607f59ba9fcf18a80e7fbf/1hg0f2tlg';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    if (s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }

    return () => {
      // Clean up if needed
    };
  }, []);

  return (
    <div>
      {/* This component can be empty or can contain additional content */}
    </div>
  );
};

export default LiveChat;