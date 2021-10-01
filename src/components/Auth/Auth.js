import React, { Component } from "react";
import { Formik } from "formik";
import { auth } from '../../redux/authActionCreators';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from "reactstrap";

const mapDispatchToProps = dispatch => {
    return ({
        auth: (email, password, mode) => dispatch(auth(email, password, mode)),
    })
}

const mapStateToProps = state => {
    return ({
        authLoading: state.authLoading,
        authFailedMessage: state.authFailedMessage,
    })
}

class Auth extends Component {

    state = {
        mode: "Sign Up",
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" })
    }

    render() {
        let err = null;
        if (this.props.authFailedMessage !== null) {
            err = <Alert color="danger">{this.props.authFailedMessage}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = <Formik
                initialValues={
                    {
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }
                }
                onSubmit={
                    values => { this.props.auth(values.email, values.password, this.state.mode) }
                }
                validate={(values) => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = "Required";
                    } else if
                        (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invald Email Address";
                    }

                    if (!values.password) {
                        errors.password = "Required";
                    } else if (values.password.length < 4) {
                        errors.password = "Must be atleast four characters";
                    }
                    if (this.state.mode === "Sign Up") {
                        if (!values.passwordConfirm) {
                            errors.passwordConfirm = "Required";
                        } else if (values.password !== values.passwordConfirm) {
                            errors.passwordConfirm = "password field does not match";
                        }
                    }
                    return errors;
                }}
            >
                {
                    ({ values, handleChange, handleSubmit, errors }) => (
                        <div className="container border border-secondary p-2 rounded">
                            <button
                                style={{
                                    width: "100%",
                                    backgroundColor: "#D70F64",
                                    color: "white"
                                }}
                                className="btn btn-lg"
                                onClick={this.switchModeHandler}>
                                Switch to: {this.state.mode === "Sign Up" ? "Login" :
                                    "Sign Up"}</button> <br /> <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email" placeholder="Enter Your Email"
                                    className="form-control mb-2"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span className="text-danger">{errors.email}</span>
                                <br />
                                <input
                                    name="password" placeholder="Enter Password"
                                    className="form-control mb-2"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span className="text-danger">{errors.password}</span>
                                <br />
                                {
                                    this.state.mode === "Sign Up" ? <div>
                                        <input
                                            name="passwordConfirm"
                                            placeholder="Confirm Password"
                                            className="form-control mb-2"
                                            value={values.passwordConfirm}
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{errors.passwordConfirm}
                                        </span>
                                        <br />
                                    </div> : null
                                }
                                <button type="submit"
                                    className="btn btn-success mb-2">
                                    {this.state.mode === "Sign Up" ? "Sign Up" :
                                        "Login"}</button>
                            </form>
                        </div>
                    )
                }
            </Formik>

        }
        return (
            <div>
                {err}
                {form}
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);