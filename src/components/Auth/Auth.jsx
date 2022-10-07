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
  validateName,
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
  const [selectedFile, setselectedFile] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    photo: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    position_id: 1,
  });
  useEffect(() => {
    getToken().then(res => {
      saveToken(res.token);
      setToken(localStorage.tokenData);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', updatedUser.name);
    formData.append('photo', updatedUser.photo);
    formData.append('email', updatedUser.email);
    formData.append('position_id', updatedUser.position_id);
    formData.append('phone', updatedUser.phone);
    сreateUser(formData, token);
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
    } else if (name === 'name' && !validateName(value)) {
      setErrorEmail('Error name');
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
      position_id: Number(id),
    });
  };

  const onChange = event => {
    event.preventDefault();

    if (!event.target.files[0].name.match(/\.(jpg|jpeg)$/)) {
      alert('FileReader don"t support');
      return;
    }
    if (!FileReader) {
      alert('FileReader don"t support');
      return;
    }
    if (!event.target.files.length) {
      alert('Nothing download');
    }

    if (!event.target.files[0].size > 5242880) {
      alert('File size cannot more than 5MB');
      return false;
    }
    setselectedFile(event.target.files[0].name);
    setUpdatedUser({
      ...updatedUser,
      photo: event.target.files[0].name,
    });
    event.target.files.onload = function () {
      let height = this.height;
      let width = this.width;
      if (height < 70 || width < 70) {
        alert('Height and Width most not be less 70px');
        return false;
      }
    };
  };
  console.log(updatedUser);
  return (
    <footer className="footer">
      <h1 className="title">Working with POST request</h1>
      <div className="footer__form-group">
        <form id="form" action="true" method="post" className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <input
              required
              onChange={handleChange}
              value={updatedUser.name}
              className="form_input"
              type="text"
              name="name"
              // pattern="[a-zA-Z]{2,60}"
              placeholder="Name"
              minLength="2"
              maxLength="60"
            />
            <input
              required
              value={updatedUser.email}
              className="form_input"
              type="email"
              name="email"
              placeholder="email@example.com"
              onChange={handleChange}
              minLength="2"
              maxLength="100"
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
              type="tel"
              min="12"
              pattern="^[\+]{0,1}380([0-9]{9})$"
              name="phone"
              className="form_input"
              placeholder="+38(XXX)XXX-XX-XX"
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
          <FormLoadFile
            selectedFile={selectedFile}
            onChange={onChange}
            handleOnClick={handleOnClick}
            setUpdatedUser={setUpdatedUser}
            updatedUser={updatedUser}
          />
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
