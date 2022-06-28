import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Navbar} from 'react-responsive-navbar-overlay';

function Header() {
  return (
    <BrowserRouter>
            <Navbar/>
            {/* <Route exact path="/" component={Home} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/blog" component={Blog} /> */}
    </BrowserRouter>
  )
}

export default Header