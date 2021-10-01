import React, { Component } from "react";
import { connect } from 'react-redux';
import Order from "./Order/Order";
import { fetchOrders } from '../../redux/actionCreators';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = state => {
    return ({
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderError: state.orderError,
        token: state.token,
        userId: state.userId,
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    })
}

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    componentDidUpdate() {
        // console.log(this.props);
    }
    render() {
        let orders = null;
        if (this.props.orderError) {
            orders = (
                <div className="container">
                    <p className="border border-secondary rounded p-3 m-4 shadow">
                        Sorry failed to load Orders.</p>
                </div>
            )
        } else {
            if (this.props.orders.length === 0) {
                orders = (
                    <div className="container">
                        <p className="border border-secondary rounded p-3 m-4 shadow">
                            You have no Orders.</p>
                    </div>
                )
            } else {
                orders = this.props.orders.map(order => {
                    return (
                        <Order order={order} key={order.id} />
                    )
                })
            }
        }
        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);