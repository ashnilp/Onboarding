import React, { Component } from 'react';


export default class Modal extends Component {

    constructor(props) {
        //alert("constructor")
        super(props);

        this.state = {
            Id: props.Id,
        };

        this.handleDelete = this.handleDelete.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            Id: nextProps.modalData.Id,
        }, () => { console.log(nextProps.modalData.Id)}
        );

    }



    handleDelete() {

        const item = this.state;
        console.log(this.state)
        this.props.deleteDetails(item)
    }

    render() {
        return (
            <div>


                <div className="modal fade" id="myModalDelete" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only"></span>Close</button>
                                <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <input id="Id" type="hidden" defaultValue={this.props.modalData.Id} />
                                    <label>Are you sure - you want to delete this record? </label>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-dismiss="modal">No</button>
                                <button type="submit" className="btn btn-danger" onClick={() => this.handleDelete()}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}