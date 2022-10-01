import React from 'react';

export const RadioInput = ({ name, id, selectedOption }) => {
  return (
    <div className="form_positions_item">
      <input
        className="form_positions_item-input"
        key={id}
        type="radio"
        name="positions"
        value={name}
        id={id}
        defaultChecked={selectedOption === { name }}
      />
      <label data-position={name} className="form_positions_label" htmlFor={id} data-id={id}>
        {name}
      </label>
    </div>
  );
};
export default RadioInput;