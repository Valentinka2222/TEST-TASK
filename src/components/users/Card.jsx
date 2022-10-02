import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ name, email, phone, position, photo, isLoaded }) => {
  return (
    <div className="profiles__card">
      {isLoaded ? (
        <span className="loader " />
      ) : (
        <img className="profiles__card_avatar" src={photo} alt="Profiles photo" />
      )}

      <span className="profiles__card_name">{name} </span>
      <span className="profiles__card_position"> {position}</span>
      <span className="profiles__card_email"> {email}</span>
      <span className="profiles__card_phone"> {phone}</span>
    </div>
  );
};

Card.propTypes = {
  photo: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  phone: PropTypes.string,
};
export default Card;
