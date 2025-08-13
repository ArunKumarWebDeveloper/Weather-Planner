import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
              <img class="img1" src="/weather.png" ></img>  
               <img class ="img2"src="/plan.png" ></img>  
                   
            </div>
            <p>Weather + Planner</p>
        </nav>
    );
};

export default Navbar;