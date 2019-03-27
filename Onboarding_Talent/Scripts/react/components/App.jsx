import React, { Component }  from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import Customer from './Customer.jsx';
import Product from './Product.jsx';
import Store from './Store.jsx';
import ProductSold from './ProductSold.jsx';
 
export default class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <h2>Menu</h2>
                    
                      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/Customer'} className="nav-link">Customer</Link></li>
                            <li><Link to={'/Product'} className="nav-link"><span>      </span>Product</Link></li>
                            <li><Link to={'/Store'} className="nav-link"><span>       </span>Store</Link></li>
                            <li><Link to={'/ProductSold'} className="nav-link"><span>       </span>ProductSold</Link></li>
                        </ul>
                      </nav>
                    
                    <hr />
                    <br />
                    <Switch>
                        <Route exact path='/Customer' component={Customer} />
                        <Route exact path='/Product' component={Product} />
                        <Route exact path='/Store' component={Store} />
                        <Route exact path='/ProductSold' component={ProductSold} />
                    </Switch>    
                </div>
                <br/>
            </Router>
        )
    }  
}  