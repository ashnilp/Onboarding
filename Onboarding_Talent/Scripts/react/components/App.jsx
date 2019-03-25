import React, { Component } from 'react';
import Modal from 'react-modal';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customerList: [],
            modalIsOpen: false,
            Name: '',
            Address: '',
            Id: 0
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    /*
     * saveModalDetails(item) {
        const requiredItem = this.state.requiredItem;
        let tempCustomer = this.state.customerList;
        tempCustomer[requiredItem] = item;
        this.setState({ customerList: tempCustomer });

        this.handleEdit();

    }

    handleEdit(event) {
        event.preventDefault();
        var data = {
            Name: this.state.Name,
            Address: this.state.Address,
            Id: this.state.Id
        }

        fetch('/Home/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            if (data === "success") {
                this.setState({
                    msg: "User has been edited"
                });
            }
            alert("Edited Successfully")
        }).catch(function (err) {
            alert("Error")
            console.log(err)
        });
    }


    deleteCustomer(customer) {
        var data = {
            Id: customer.Id
        }

        fetch("/Home/Delete", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (data === "success") {
                this.setState({ msg: "User has been deleted." })
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
     * 
     */

    handleEdit(event) {
        event.preventDefault();
        var data = {
            Name: this.state.Name,
            Address: this.state.Address,
            Id: this.state.Id
        }

        fetch('/Home/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
            }).then(function (data) {
                console.log(data)
                if (data === "success") {
                    this.setState({
                        msg: "User has been edited"
                    });
                }
        }).catch(function (err) {
            console.log(err)
        });
    }


    deleteCustomer(customer) {
        var data = {
            Id: customer.Id
        }

        fetch("/Home/Delete", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (data === "success") {
                this.setState({msg: "User has been deleted."})
            }
        }).catch(function (err) {
            console.log(err); 
        }); 
    }

    openModal(customer) {
        this.setState({
            modalIsOpen: true,
            Name: customer.Name,
            Address: customer.Address,
            Id: customer.Id
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    componentDidMount() {
        let self = this;
   
        fetch('/Home/LoadCustomers', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(async function (data) {
            await self.setState({
                customerList: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }
     


    render() {

        alert("1")


        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customerList.map(customer =>
                                <tr key={customer.Id}>
                                    <td>{customer.Name}</td>
                                    <td>{customer.Address}</td>
                                    <td>
                                        <a onClick={() => this.openModal(customer)}>Edit</a>|
                                        <a onClick={() => this.deleteCustomer(customer)}>Delete</a>
                                    </td>
                                </tr>
                            )}
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                contentLable="Example Modal">
                                <form onSubmit={this.handleEdit} method="POST">
                                    <lable>Name</lable>
                                    <input className="form-control" value={this.state.Name} placeholder='John' name='name' />
                                    <lable>Address</lable>
                                    <input className="form-control" value={this.state.Address} placeholder="2/4 Wha street" name='address' />
                                    <div className="submit-section">
                                        <button className="btn btn-uth-submit">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                        </tbody>
                    </table>
                </div>
            </div>  
        )
    }
}  