import React, { Component } from 'react';


export default class Modal extends Component {


    constructor(props) {
        //alert("constructor")
        super(props);

        this.state = {
            Id: props.Id,
            Name: props.Name,
            Price: props.Price,
            newItemFlag: ''
        };

        console.log(this.props);

        this.handleSave = this.handleSave.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.modalData)
        this.setState({
            Id: nextProps.modalData.Id,
            Name: nextProps.modalData.Name,
            Price: nextProps.modalData.Price,
            newItemFlag: nextProps.newItemFlag
        });
    }



    nameHandler(e) {

        this.setState({
            Name: e.target.value
        }, () => { console.log(this.state.Name) }
        );

    }

    priceHandler(e) {

        this.setState({
            Price: e.target.value
        }, () => { console.log(this.state.Price) }
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
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only"></span>Close</button>
                                <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input id="Id" type="hidden" defaultValue={this.props.modalData.Id} />
                                    <label>Name</label>
                                    <input type="text" name="Name" id="Name" className="form-control"
                                        defaultValue={this.props.modalData.Name} onChange={(e) => this.nameHandler(e)} />
                                    <label>Price</label>
                                    <input type="text" name="Price" id="Price" className="form-control"
                                        defaultValue={this.props.modalData.Price} onChange={(e) => this.priceHandler(e)} />
                                    <br />
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