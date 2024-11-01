import React from 'react';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.css';

const FiltroInput = ({ text, placeholder, value, onChange }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <input
            type="text"
            style={{
                width: '100%',
                padding: '8px',
                border: '1px solid black',
                borderRadius: '13px',
                fontSize: '16px'
            }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
    );
};

FiltroInput.propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default FiltroInput;
