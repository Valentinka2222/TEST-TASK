import React from 'react';
import PropTypes from 'prop-types';
import Pexels from '../images/pexels.jpeg';
import './headline.scss';

const Headline = ({ setIsShowAuth }) => {
  return (
    <section className="headline">
      <div className="headline__content">
        <div className="headline__content_article">
          <h1 className="headline__content_article-title">
            Test assignment for front-end developer
          </h1>
          <p className="headline__content_article-description">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>
        </div>
        <div className="headline__action">
          <button onClick={setIsShowAuth} className="headline__action_btn btn">
            Sign up
          </button>
        </div>
      </div>

      <img className="headline__banner" src={Pexels} alt="Headline Barner" />
    </section>
  );
};
Headline.propTypes = {
  setIsShowAuth: PropTypes.func,
};
export default Headline;
