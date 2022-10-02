import React from 'react';
import { useState } from 'react';

const Card = ({ name, email, phone, position, photo }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // if (photo === undefined) {
  //   setIsLoaded(true);
  // }
  return (
    <div className="profiles__card">
      <img className="profiles__card_avatar" src={photo} alt="Profiles photo" />

      <div className="spinner"></div>

      <span className="profiles__card_name">{name} </span>
      <span className="profiles__card_position"> {position}</span>
      <span className="profiles__card_email"> {email}</span>
      <span className="profiles__card_phone"> {phone}</span>
    </div>
  );
};
export default Card;
