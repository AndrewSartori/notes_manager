import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotes, deleteNote } from "../../actions/notes";

class Notes extends React.Component {
    // state = {
    //     noteBody: ""
    // }
    
    static propTypes = {
        notes: PropTypes.array.isRequired,
        getNotes: PropTypes.func.isRequired,
        deleteNote: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getNotes();
    }

    // onChange = (event) => {
    //     this.setState({ 
    //         [event.target.name]: event.target.value 
    //     });
    // };

    // onSubmit = (event) => {
    //     event.preventDefault();
    //     this.state.noteBody.filter(note => {
    //         if(note.body.includes(event)){
    //             this.setState({ 
    //                 noteBody: note 
    //             });
    //             console.log(note);
    //         }
    //     })
    // };

    render() {
        return (
            <React.Fragment>
                <div>
                    {/* <div className="card card-body mt-4 mb-4">
                        <h2>Search Notes by Body</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    className="form-control"
                                    type="text"
                                    name="noteBody"
                                    onChange={this.onChange}
                                    value={noteBody}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">SUBMIT</button>
                            </div>
                        </form>
                        { 
                            this.state.noteBody &&
                            <div className="card card-body mt-4 mb-4">
                                <h1>{noteBody}</h1>
                            </div>
                        }
                    </div> */}
                    <div>
                        <h2>Notes</h2>
                        <table className="table table striped">
                            <thead>
                                <tr>
                                    <th>Note ID</th>
                                    <th>Note Title</th>
                                    <th>Note Body</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.notes.map(note => (
                                    <tr key={note.id}>
                                        <td>{note.id}</td>
                                        <td>{note.title}</td>
                                        <td>{note.body}</td>
                                        <td>
                                            <button 
                                                onClick={this.props.deleteNote.bind(this, note.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                            {" "}
                                            DELETE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    notes: state.notes.notes
});

export default connect(mapStateToProps, { getNotes, deleteNote })(Notes);