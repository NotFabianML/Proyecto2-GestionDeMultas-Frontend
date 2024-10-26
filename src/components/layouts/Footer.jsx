import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="left-text">
                Copyright &copy; 2024 NexTek | All Rights Reserved
            </div>
            <div className="icons">
                <FaFacebook className="icon facebook" />
                <FaInstagram className="icon instagram" />
                <FaYoutube className="icon youtube" />
            </div>
        </footer>
    );
};

export default Footer;
