import React, { Component } from 'react';
import Modal from './Store/Modal.jsx';
import ModalDelete from './Store/ModalDelete.jsx';


export default class Store extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            storeList: [],
            modalIsOpen: false,
            Name: '',
            Address: '',
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

    resetIndex(index) {
        this.setState({
            requiredItem: index
        }, () => { console.log("index has been reset") }
        );
    }

    deleteModalItem(index) {
        //(index + "  1")
        this.updateDeleteIndex(index)
    }

    updateDeleteIndex(index) {
        //alert(index + " 2")
        this.setState({
            requiredItem: index
        }, () => { console.log(this.state.deleteIndex) }
        );
    }

    updateIndex(index) {
        this.setState({
            requiredItem: index
        }, () => { console.log(this.state.requiredItem) }
        );
    }

    componentDidMount() {
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

    deleteDetails(item) {

        var Id = item.Id;
      
        $.ajax({
            url: '/Store/Delete',
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
        var Address = item.Address;
        var Id = item.Id;


        //alert(Id + "  " +  Name  +"  " + Address)

        if (item.newItemFlag != -1) {
            $.ajax({
                url: '/Store/Edit',
                data: { Id: Id, Name: Name, Address: Address },
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
                url: '/Store/Create',
                data: { Id: 0, Name: Name, Address: Address },
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

        const storeDetails = this.state.storeList.map((store, index) => {
            return (
                <tr key={index}>
                    <td>{store.Name}</td>
                    <td>{store.Address}</td>
                    <td>
                        <button id="edit" className="btn btn-warning" data-toggle="modal" data-target="#myModal"
                            onClick={() => this.replaceModalItem(index, 1)}><span className='glyphicon glyphicon-edit'></span> Edit</button>
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
            //alert("inside if ....")
            modalData = this.state.storeList[rI];
        }

        if (modalData == '' || modalData == null || modalData == 'undefined') {
            modalData = { Id: '', Name: '', Address: '' }
        }

        console.log(modalData)


        return (
            <div>
                <div style={{ textAligh: "center" }}>
                    <h1>Store Details</h1>

                </div>
                <button type="button" className="btn btn-primary btn-lg"
                    data-toggle="modal" data-target="#myModal"
                    onClick={() => this.replaceModalItem(-1, 0)}>
                    Add New Store
                </button>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>s
                                    <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {storeDetails}
                    </tbody>
                </table>
                <Modal
                    title="Store Details"
                    modalData={modalData}
                    saveModalDetails={this.saveModalDetails}
                    newItemFlag={rI}
                />
                <ModalDelete
                    title="Delete Store"
                    modalData={modalData}
                    deleteDetails={this.deleteDetails}

                />
            </div>
        );
    }
}            