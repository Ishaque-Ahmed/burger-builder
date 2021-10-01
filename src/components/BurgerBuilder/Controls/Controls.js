import React from "react";
import { Card, CardBody, CardHeader, Button, CardFooter } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = props => {
    return (
        <div className="d-flex">
            <div className="me-auto ms-2 fs-5 fw-bold">{props.label}</div>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
        </div>
    );
}


const Controls = props => {
    return (
        <div className="container ml-md-5 text-center">
            <Card className="mt-3 mb-3 text-center">
                <CardHeader
                    style={{ backgroundColor: "#D70F64", color: "white" }}>
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return (
                                <BuildControls
                                    label={item.label}
                                    type={item.type}
                                    key={Math.random()}
                                    added={() => props.ingredientAdded(item.type)}
                                    removed={() => props.ingredientRemoved(item.type)}
                                />
                            )
                        })
                    }
                </CardBody>
                <CardFooter><h5>Price: <strong>{props.price}</strong> Bdt</h5></CardFooter>
                <Button style={{ backgroundColor: "#D70F64" }}
                    disabled={!props.purchasable}
                    onClick={props.toggleModal}>Order Now</Button>
            </Card>
        </div>
    )
}

export default Controls;