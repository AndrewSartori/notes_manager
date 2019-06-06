import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createNote } from "../../actions/notes";


class Form extends React.Component {
    state = {
        title: "",
        body: ""
    }

    static propTypes = {
        createNote: PropTypes.func.isRequired
    }

    onChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const body = this.state.body;
        const note = { 
            title, 
            body
        };
        this.props.createNote(note);
        this.setState({
            title: "",
            body: ""
        });
        console.log("SUBMITTED A NEW NOTE")
    }

    render() {
        const title = this.state.title;
        const body  = this.state.body;
        
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Note</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Body</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="body"
                            onChange={this.onChange}
                            value={body}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">SUBMIT</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { createNote })(Form);