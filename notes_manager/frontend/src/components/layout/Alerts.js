import React, { Component, Fragment } from 'react'
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from 'prop-types'


class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, alert, message } = this.props;
        
        if(error !== prevProps.error){
            if(error.msg.title){
                alert.error(`Title: ${error.msg.title.join()}`);
            }
            if(error.msg.body){
                alert.error(`Body: ${error.msg.body.join()}`);
            }
            if(error.msg.non_field_errors){
                alert.error(error.msg.non_field_errors.join());
            }
            if(error.msg.username){
                alert.error(error.msg.username.join());
            }
        }
        if(message !== prevProps.message){
            if(message.deleteNote){
                alert.success(message.deleteNote);
            }
            if(message.createNote){
                alert.success(message.createNote);
            }
            if(message.passwordsNotMatch){
                alert.error(message.passwordsNotMatch);
            }
        }
    }
    
    render() {  
        return (
            <Fragment />
        )
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));