import React from "react";

const Order = props => {

    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <div className="container row my-2 p-2" key={item.type}>
                <span
                    className="border border-secondary rounded p-2 me-2">
                    {item.amount} x <span
                        style={{ textTransform: "capitalize" }}>{item.type}
                    </span></span>
            </div>

        )
    })

    return (
        <div className="container">
            <div className="border border-secondary rounded p-3 mb-4 shadow">
                <p>Order Number: {props.order.id}</p>
                <p>Delivery Address: {props.order.customer.deleveryAddress}</p>
                <p>Phone: {props.order.customer.phone}</p>
                <hr />
                {ingredientSummary}
                <hr />
                <p>Total Price: {props.order.price} BDT</p>
            </div>
        </div>
    )
}

export default Order;