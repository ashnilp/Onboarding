import React, { Component } from 'react';
import Modal from './ProductSold/Modal.jsx';
import ModalDelete from './ModalDelete.jsx';
//import  "../../moment.js"; 



export default class Customer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            productSoldList: [],
            Id: 0,
            requiredItem: -1,
            modalData: ''
        }

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.deleteModalItem = this.deleteModalItem.bind(this);

    }

    replaceModalItem(index, flag) {

        if (flag == 1) {
            this.updateIndex(index)
        } else {
            this.resetIndex(index)
        }
    }

    updateIndex(index) {
        this.setState({
            requiredItem: index
        }, () => { console.log(this.state.requiredItem + " update index") }
        );
    }  

    resetIndex(index) {
        this.setState({
            requiredItem: index
        }, () => { console.log(index + "  index has been reset") }
        );
    }

    deleteModalItem(index) {
        this.updateDeleteIndex(index)
    }

    updateDeleteIndex(index) {
        this.setState({
            requiredItem: index
        }, () => { console.log(this.state.deleteIndex) }
        );
    }

    componentDidMount() {
        

        this.loadSales();
        //this.loadCustomers();
        //this.loadProducts();
        //this.loadStores();
    }

    loadSales() {
        let self = this;

        fetch('/ProductSold/LoadAllSales', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                loading: true,
                productSoldList: data
            }) ;
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    deleteDetails(item) {

        var Id = item.Id;

        $.ajax({
            url: '/ProductSold/Delete',
            data: { Id: Id },
            type: "POST",
            cache: false,
            success: function (savingStatus) {
                location.reload();
                console.log("Request executed successfully");
                if (savingStatus.success == false) { alert("Please fill the empty fields"); }
            },
            error: function () {
                console.log("error")
            }
        });
    }

    saveModalDetails(item) {
        
        console.log(item + "  save")
        var Id = item.SelectedId;
        var customerId = item.SelectedCustomerId;
        var productId = item.SelectedProductId;
        var storeId = item.SelectedStoreId;
        //var dateSold = moment(item.SelectedDateSold).format('L');
        var dateSold = item.SelectedDateSold;
        //moment(data.DateSold).format('L')

        console.log(Id + "   " + customerId + " " + productId + " " + storeId + " " + dateSold);

        //alert(Id + "  " +  Name  +"  " + Address)

        if (item.newItemFlag != -1) {
            $.ajax({
                url: '/ProductSold/Edit',
                data: { Id: Id, CustomerId: customerId, ProductId: productId, StoreId: storeId, DateSold: dateSold},
                type: "POST",
                cache: false,
                success: function (savingStatus) {
                    location.reload();
                    //alert("Request executed successfully");
                    if (savingStatus.success == false) {
                        alert("Please fill the empty fields");
                    }
                },
                error: function () {
                    alert("error")
                }
            });

        } else {
            console.log(item.newItemFlag + " else for new addition")

            $.ajax({
                url: '/ProductSold/Create',
                data: { Id: 0, CustomerId: customerId, ProductId: productId, StoreId: storeId, DateSold: dateSold },
                type: "POST",
                cache: false,
                success: function (savingStatus) {
                    location.reload();
                    //alert("Request executed successfully");
                    if (savingStatus.success == false) {
                        alert("Please fill the empty fields");
                    }
                },
                error: function () {
                    alert("error")
                }
            }); 

        }
    }


    

    render() {

        const productSoldDetails = this.state.productSoldList.map((productsold, index) => {
            return (
                <tr key={index}>
                    <td>{productsold.CustomerName}</td>
                    <td>{productsold.ProductName}</td>
                    <td>{productsold.StoreName}</td>
                    <td>{productsold.DateSold}</td>
                    <td>
                        <button id="edit" className="btn btn-warning" data-toggle="modal" data-target="#myModal"
                            onClick={() => this.replaceModalItem(index, 1)}>
                            <span className='glyphicon glyphicon-edit'></span> Edit</button>
                    </td>
                    <td>
                        <button id="delete" className="btn btn-danger"
                            data-toggle="modal" data-target="#myModalDelete"
                            onClick={() => this.deleteModalItem(index)}
                        >
                            <span className='glyphicon glyphicon-trash'></span> Delete</button>
                    </td>
                </tr>
            )
        });


        const rI = this.state.requiredItem;
        //alert(rI + "  This is index")
        let modalData = null;
        if (rI != -1) {
            // alert("inside if ....")
            modalData = this.state.productSoldList[rI];
        }

        if (modalData == '' || modalData == null || modalData == 'undefined') {
            modalData = { Id: '', Name: '', Price: '' }
        }

        console.log(modalData)



        return (
            <div>
                <div style={{ textAligh: "center" }}>
                    <h1>Sale Details</h1>

                </div>
                <button type="button" className="btn btn-primary btn-lg"
                    data-toggle="modal" data-target="#myModal"
                    onClick={() => this.replaceModalItem(-1, 0)}>
                    Add New Product
                </button>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Store Name</th>
                            <th>Date Sold</th>
                            <th>Action(Edit)</th>
                            <th>Action(Delete)</th>
                        </tr>
                    </thead>
                    <tbody>

                        {productSoldDetails}
                    </tbody>
                </table>
                <Modal
                    title="Sale Details"
                    modalData={modalData}
                    saveModalDetails={this.saveModalDetails}
                    newItemFlag={rI}
                />

                <ModalDelete
                    title="Delete Customer"
                    modalData={modalData}
                    deleteDetails={this.deleteDetails}

                />
            
            </div>
        );
    }
}             