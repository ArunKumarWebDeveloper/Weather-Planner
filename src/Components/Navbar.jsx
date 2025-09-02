import React from 'react';

const Navbar = () => {
    return (
        <div className="container">
        <nav className="navbar">
                <img src="/logo.png" alt="Logo"></img>
            <div className="navbar-logo">
              <a href="#weather"><img class="img1" src="/weather.png" ></img></a>
               <a href="#planner"><img class ="img2"src="/plan.png" ></img></a>

            </div>

        </nav>
        </div>
    );
};

export default Navbar;