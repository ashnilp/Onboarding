import React, { Component } from 'react';
//import '../../../moment.js';


export default class Modal extends Component {

    constructor(props) {
        //alert("constructor")
        super(props);

        this.state = {
            SelectedCustomerId: 0,
            SelectedCustomerName: '',
            SelectedDateSold: '',
            SelectedId: 0,
            SelectedProductId: 0,
            SelectedProductName: '',
            SelectedStoreId: 0,
            SelectedStoreName: '',
            customerList: [],
            productList: [],
            storeList: [],
            newItemFlag: ''
        };

        this.handleCustomerChange = this.handleCustomerChange.bind(this);  
        this.handleProductChange = this.handleProductChange.bind(this);  
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }


    componentDidMount() {
        this.loadCustomers();
        this.loadProducts();
        this.loadStores();
    }

    //load customer 

    loadCustomers() {
        console.log("load customer activated")
        let self = this;

        fetch('/Home/LoadCustomers', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                loading: true,
                customerList: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })

    };

    loadProducts() {
        console.log("load product activated")
        let self = this;

        fetch('/Product/LoadProducts', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                loading: true,
                productList: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    loadStores() {
        console.log("load store activated")
        let self = this;

        fetch('/Store/LoadStores', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                loading: true,
                storeList: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.modalData)

        this.setState({
            SelectedId: nextProps.modalData.Id,
            SelectedCustomerId: nextProps.modalData.CustomerId,
            SelectedCustomerName: nextProps.modalData.CustomerName,
            SelectedDateSold: nextProps.modalData.DateSold,
            SelectedProductId: nextProps.modalData.ProductId,
            SelectedProductName: nextProps.modalData.ProductName,
            SelectedStoreId: nextProps.modalData.StoreId,
            SelectedStoreName: nextProps.modalData.StoreName,
            newItemFlag: nextProps.newItemFlag
        }, () => { console.log(this.state) }

        );
       
    }
    //moment(data.DateSold).format('L')
    handleCustomerChange(e) {
        this.setState({
            SelectedCustomerId: e.target.value
        }, () => { console.log(this.state.SelectedCustomerId) }
        ); 
    }

    handleProductChange(e) {
        this.setState({
            SelectedProductId: e.target.value
        }, () => { console.log(this.state.SelectedProductId) }
        );
    }

    handleStoreChange(e) {
        this.setState({
            SelectedStoreId: e.target.value
        }, () => { console.log(this.state.SelectedStoreId) }
        );
    }

    handleDateChange(e) {
        this.setState({
            SelectedDateSold: e.target.value 
        }, () => { console.log(this.state.SelectedDateSold) }
        );
    }

    handleSave() {
        //alert("Handle Save Activated")
        const item = this.state;
        console.log(this.state)
        this.props.saveModalDetails(item)
    }

    render() {

        return (
            <div>

                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">z'
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only"></span>Close</button>
                                <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input id="id" type="hidden" value="0"  />
                                    <label >Select Customer</label>
                                    <select id="customer" className="form-control"
                                        value={this.state.SelectedCustomerName} onChange={(e) => this.handleCustomerChange(e)}>
                                       
                                        {this.state.customerList.map((e) => { return <option key={e.Id} value={e.Id}>{e.Name}</option> })}
                                    </select> 
                                    <br />
                                    <br />
                                    <label >Product Name</label>
                                    <select id="product" className="form-control"
                                        value={this.state.SelectedProductName} onChange={(e) => this.handleProductChange(e)}>
                                        <option value="">
                                            Select Product.....
                                        </option> 
                                        {this.state.productList.map((e) => { return <option key={e.Id} value={e.Id}>{e.Name}</option> })}
                                    </select>
                                    <br />
                                    <br />
                                    <label >Store Name</label>
                                    <select id="store" className="form-control" 
                                        value={this.state.SelectedStoreName} onChange={(e) => this.handleStoreChange(e)}>
                                        <option value="">
                                            Select Store.....
                                        </option> 
                                        {this.state.storeList.map((e) => { return <option key={e.Id} value={e.Id}>{e.Name}</option> })}
                                    </select>
                                    <br />
                                    <br />
                                    <label >Date</label>
                                    <input id="date" type="date" className="form-control"
                                        value={this.state.SelectedDateSold} onChange={(e) => this.handleDateChange(e)} />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-success" onClick={() => this.handleSave()}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        )
    }
}