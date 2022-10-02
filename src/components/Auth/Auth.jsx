import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveToken } from '../../modules/api';
import { getToken, сreateUser } from '../../modules/getaway';
import { getUsersListByPage, getPositions } from '../../modules/users.action';
import {
  validatePhoneNumber,
  validateEmail,
  validatePositionId,
} from '../../validators/validators';
import RadioInput from './RadioInput';
import FormLoadFile from './FormLoadFile';
import './footer.scss';

const Auth = ({ positions }) => {
  const style = {
    fontFamily: 'Asap',
    minwWidth: '50px',
    height: '14px',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#CB3D40',
    background: '#F8F8F8',
    marginLeft: '-293px',
    marginTop: '4px',
    marginBottom: '4px',
  };
  const [selectedOption, setSelectedOption] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [token, setToken] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    photo: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    position_id: 1,
    registration_timestamp: new Date().getTime(),
  });
  useEffect(() => {
    getToken().then(res => {
      setToken(res.token);
      saveToken(res.token);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    сreateUser(updatedUser, token);
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'phone' && !validatePhoneNumber(value)) {
      setErrorPhone('Error phone');
    } else if (name === 'email' && !validateEmail(value)) {
      setErrorEmail('Error email');
    } else {
      setErrorEmail(null);
      setErrorPhone(null);
    }
  };

  const handleOnClick = e => {
    const { position, id } = e.target.dataset;

    setSelectedOption(position);
    if (validatePositionId(id)) {
    }
    setUpdatedUser({
      ...updatedUser,
      position: position,
      position_id: id,
    });
  };

  return (
    <footer className="footer">
      <h1 className="title">Working with POST request</h1>
      <div className="footer__form-group">
        <form id="form" method="post" className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <input
              required
              onChange={handleChange}
              value={updatedUser.name}
              className="form_input"
              type="text"
              name="name"
              pattern="[a-zA-Z]{2,}"
              placeholder="Name"
            />
            <input
              required
              minLength="2"
              maxLength="100"
              value={updatedUser.email}
              className="form_input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            {errorEmail && (
              <h2 className="error" style={style}>
                {errorEmail}
              </h2>
            )}

            <input
              required
              value={updatedUser.phone}
              onChange={handleChange}
              type="number"
              min="12"
              name="phone"
              className="form_input"
              placeholder="Phone"
            />
            {errorPhone ? (
              <h2 className="error" style={style}>
                {errorPhone}
              </h2>
            ) : (
              <span className="form_label" htmlFor="number">
                +38 (XXX) XXX - XX - XX
              </span>
            )}
          </div>
          <div className="form_positions " onClick={handleOnClick}>
            <legend>Select your position</legend>
            {positions.map(position => (
              <RadioInput key={position.id} {...position} selectedOption={selectedOption} />
            ))}
          </div>
          <FormLoadFile setUpdatedUser={setUpdatedUser} />
          <input required id="register" type="submit" className="form-submit__btn btn"></input>
        </form>
      </div>
    </footer>
  );
};
const mapDispatch = {
  getUsersListByPage,
  getPositions,
};

const mapState = state => {
  return {
    positions: state.users.positions,
  };
};

Auth.propTypes = {
  positions: PropTypes.array,
};
export default connect(mapState, mapDispatch)(Auth);
