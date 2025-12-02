import React from 'react';

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M12 2L12 5" />
        <path d="M6 8L6 11" />
        <path d="M18 8L18 11" />
        <path d="M12 22V18" />
        <path d="M5 14H8" />
        <path d="M16 14H19" />
        <path d="M5 14C5 17.3137 7.68629 20 11 20H13C16.3137 20 19 17.3137 19 14V11C19 9.34315 17.6569 8 16 8H8C6.34315 8 5 9.34315 5 11V14Z" />
    </svg>
);

export default TrophyIcon;