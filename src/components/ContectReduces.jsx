import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const dispatchCart = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qnt: action.qnt, size: action.size }]

        case "REMOVE":
            let newArray = [...state];
            newArray.splice(action.index, 1);
            return newArray;

        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id) {

                    return { ...food, qnt: parseInt(action.qnt) + parseInt(food.qnt), price: action.price + food.price };
                }
                return food;
            })
        case "DROP":
            let aNewArray = [];
            return aNewArray;
        default:
            console.log("error in reducer");
    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <dispatchCart.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </dispatchCart.Provider>
    )
}

export const usecart = () => useContext(CartStateContext);
export const dispatchcart = () => useContext(dispatchCart);