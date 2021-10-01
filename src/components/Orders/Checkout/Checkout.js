import React, { Component } from "react";
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from "axios";
import { Formik } from "formik";
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from "../../../redux/actionCreators";

const mapDispatchToProps = dispatch => {
    return ({
        resetIngredients: () => dispatch(resetIngredients()),
    })
}

const mapStateToProps = state => {
    return ({
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        token: state.token,
        userId: state.userId,
    })
}

class Checkout extends Component {

    state = {
        isLoading: false,
        isModalOpen: false,
        modalMessage: "",
    }

    goBack = () => {
        this.props.history.goBack("/");
    }
    submitHandler = (values) => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
        }
        axios.post("https://burger-builder-21020-default-rtdb.firebaseio.com/order.json?auth="
            + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMessage: "Order Placed Succesfully!",
                    });
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMessage: "Something Went Wrong, Order Again!",
                    });
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMessage: "Something Went Wrong, Order Again!",
                });
                console.log(error.message);
            });
    }

    render() {
        let form = (
            <div>
                <h4 className="border border-danger shadow border-2 rounded-3 p-4">
                    Payment: {this.props.totalPrice} BDT</h4>

                <Formik
                    initialValues={
                        {
                            deleveryAddress: "",
                            phone: "",
                            paymentType: "Cash On Delivery"
                        }
                    }
                    validate={(values) => {
                        const errors = {};
                        if (!values.deleveryAddress) {
                            errors.deleveryAddress = "Required";
                        }
                        if (!values.phone) {
                            errors.phone = "Required";
                        }
                        else if
                            (!/^((\+88)|(88))?01[0-9]{9}$/.test(values.phone)) {
                            errors.phone = "Invalid Phone Number";
                        }
                        console.log(errors);
                        return errors;
                    }}
                    onSubmit={
                        values => { this.submitHandler(values); }
                    }
                >
                    {
                        ({ values, handleChange, errors, touched, handleSubmit, handleBlur }) => (
                            <div className="border border-secondary rounded-3 shadow p-4">
                                <form onSubmit={handleSubmit}>
                                    <textarea name="deleveryAddress"
                                        id="deleveryAddress"
                                        className="form-control"
                                        placeholder="Your Address"
                                        value={values.deleveryAddress}
                                        onChange={handleChange}
                                        onBlur={handleBlur}>
                                    </textarea><br />
                                    <span className="text-danger">
                                        {errors.deleveryAddress && touched.deliveryAddress && errors.deliveryAddress}
                                    </span>

                                    <input name="phone" id="phone"
                                        className="form-control"
                                        placeholder="Your Phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur} /><br />
                                    <span className="text-danger">{errors.phone}</span>


                                    <select name="paymentType" id="paymentType"
                                        className="form-control"
                                        value={values.paymentType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}>
                                        <option value="Cash On Deliver">Cash On Delivery</option>
                                        <option value="Bkash">Bkash</option>
                                    </select><br />

                                    <Button style={{ backgroundColor: "#D70F64" }} type="submit"
                                        onClick={this.submitHander} disabled={!this.props.purchasable}
                                        className="me-auto"
                                    >Place Order</Button>
                                    <Button color="secondary" className="ms-1" type="submit"
                                        onClick={this.goBack}>Cancel</Button>
                                </form>
                            </div>
                        )
                    }
                </Formik>

            </div>
        );
        return (
            <div className="container">
                {
                    (this.state.isLoading) ? <Spinner /> : form
                }
                <Modal isOpen={this.state.isModalOpen}
                    onClick={this.goBack}>
                    <ModalBody><p>{this.state.modalMessage}</p></ModalBody>
                </Modal>
            </div >
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);