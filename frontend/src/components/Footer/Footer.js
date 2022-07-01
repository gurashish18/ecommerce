import React from 'react'
import {BsFillHeartFill} from "react-icons/bs";
import instalogo from '../../assets/insta.png';
import linkedinlogo from '../../assets/linkedin.png'
import githublogo from '../../assets/github.png'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-upper'>
            <h3>Made with <BsFillHeartFill/></h3>
        </div>
        <div className='footer-lower'>
            <img src={instalogo} alt='insta'/>
            <img src={linkedinlogo} alt='linkedin'/>
            <img src={githublogo} alt='github'/>
        </div>
    </div>
  )
}

export default Footer