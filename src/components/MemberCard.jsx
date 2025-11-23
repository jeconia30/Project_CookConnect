import React from 'react';

import './MemberCard.css'; 
const MemberCard = ({ name, role, photoSrc, altText }) => {
  return (
    <div className="team-member-card">
      <img src={photoSrc} alt={altText} className="member-photo" />
      <div className="member-card-content">
        <h4>{name}</h4>
        <p className="role">{role}</p>
      </div>
    </div>
  );
};

export default MemberCard;