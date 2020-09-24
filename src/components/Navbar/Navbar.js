import React from 'react'

import {NavbarItems} from '../Items'
import '../css/styles.css'

export const Navbar = () => {
    return(
        <nav className='navbar-container'>
            <div className="navbar-title">
                Quacker
            </div>
            <ul classname='navbar-items'>
                {NavbarItems.map((item, index) => {
                    return(
                        <li key={index}>
                            <a href={process.env.PUBLIC_URL + item.url}>
                            {item.name}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}