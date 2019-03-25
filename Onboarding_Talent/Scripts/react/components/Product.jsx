import React, { Component } from 'react';
import Modal from './product/Modal.jsx';
import ModalDelete from './ModalDelete.jsx';


export default class Product extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            productList: [],
            Name: '',
            Price: 0,
            Id: 0,
            requiredItem: -1,
            loading: false,
            deleteIndex: 0,
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
        }, () => { console.log(this.state.requiredItem) }
        );
    }

    resetIndex(index) {
        this.setState({
            requiredItem: index
        }, () => { console.log("index has been reset") }
        );
    }

    deleteModalItem(index, flag) {
        alert(index)
        if (flag == 1) {
            this.updateDeleteIndex(index)
        }
        else {
            this.resetIndex(index)
        }
    }

    updateDeleteIndex(index) {
        this.setState({
            requiredItem: index
        }, () => { console.log(this.state.deleteIndex) }
        );
    }

    

    componentDidMount() {
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

    deleteDetails(item) {

        var Id = item.Id;

        $.ajax({
            url: '/Product/Delete',
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

        var Name = item.Name;
        var Price = item.Price;
        var Id = item.Id;


        //alert(Id + "  " +  Name  +"  " + Price)

        if (item.newItemFlag != -1) {
            $.ajax({
                url: '/Product/Edit',
                data: { Id: Id, Name: Name, Price: Price },
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
                url: '/Product/Create',
                data: { Id: 0, Name: Name, Price: Price },
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

        const productDetails = this.state.productList.map((product, index) => {
            return (
                <tr key={index}>
                    <td>{product.Name}</td>
                    <td>{product.Price}</td>
                    <td>
                        <button id="edit" className="btn btn-warning" data-toggle="modal" data-target="#myModal"
                            onClick={() => this.replaceModalItem(index, 1)}><span className='glyphicon glyphicon-edit'></span> Edit</button>
                    </td>
                    <td>
                        <button id="delete" className="btn btn-danger"
                            data-toggle="modal" data-target="#myModalDelete"
                            onClick={() => this.deleteModalItem(index, 1)}
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
            modalData = this.state.productList[rI];
        }

        if (modalData == '' || modalData == null || modalData == 'undefined') {
            modalData = { Id: '', Name: '', Price: '' }
        }

        console.log(modalData)


        return (
            <div>
                <div style={{ textAligh: "center" }}>
                    <h1>Product Details</h1>

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
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {productDetails}
                    </tbody>
                </table>
                <Modal
                    title="Product Details"
                    modalData={modalData}
                    saveModalDetails={this.saveModalDetails}
                    newItemFlag={rI}
                />
                <ModalDelete
                    title="Delete Product"
                    modalData={modalData}
                    deleteDetails={this.deleteDetails}

                />
            </div>
        );
    }
}            