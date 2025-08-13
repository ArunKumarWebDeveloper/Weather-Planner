import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
              <img class="img1" src="./weather.png" ></img>  

                
               <img class ="img2"src="./plan.png" ></img>  
                   
            
            </div>
            <ul className="navbar-links">
                <li>
                    <a class="weather" href="#weather">Weather</a>
                </li>
                <li>
                    <a class="pl" href="#planner">Planner</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;