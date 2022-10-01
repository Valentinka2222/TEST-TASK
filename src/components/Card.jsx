import React from 'react';

const Card = ({ name, email, phone, position, photo }) => {
  return (
    <div className="profiles__card">
      <img className="profiles__card_avatar" src={photo} alt="Profiles photo" />
      <span className="profiles__card_name">{name} </span>
      <span className="profiles__card_position"> {position}</span>
      <span className="profiles__card_email"> {email}</span>
      <span className="profiles__card_phone"> {phone}</span>
    </div>
  );
};
export default Card;
