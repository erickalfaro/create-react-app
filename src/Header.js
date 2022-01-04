import React from 'react'
import finapse_logo from './finapse_logo.png';
import bitcoin_logo from './bitcoin.png';
import bmac_logo from './bmac_logo.svg';
import "./Header.css"

function Header() {
    return (
        <div className='header'>
            <div className="header__left">
                <img src={finapse_logo} className="finapse_logo" alt="logo" href />
            </div>

            <div className="header__right">
                <a className="support" href="https://www.buymeacoffee.com/finapse" target="_blank" rel="noopener noreferrer">
                    Support my work:
                </a>

                <img
                    src={bmac_logo}
                    className="bmac"
                    alt="logo"
                    onClick={() => window.open("https://www.buymeacoffee.com/finapse", "_blank")} />

                <img
                    src={bitcoin_logo}
                    className="bitcoin" alt="logo"
                    onClick={() => window.open("https://strike.me/finapse", "_blank")} />


            </div>

        </div>
    )
}

export default Header
