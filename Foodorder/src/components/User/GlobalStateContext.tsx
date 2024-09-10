import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

interface CartItem {
    id: number;
    name: string;
    noofplates: number;
    price: number;
}

interface State {
    products: Product[];
    cart: CartItem[];
    quantities: { [key: number]: number };
}

interface Action {
    type: string;
    payload?: any;
}

const initialState: State = {
    products: [],
    cart: [],
    quantities: {},
};

const GlobalStateContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };
        case 'SET_CART':
            // eslint-disable-next-line no-case-declarations
            const quantities = action.payload.reduce((acc: { [key: number]: number }, item: CartItem) => {
                acc[item.id] = item.noofplates;
                return acc;
            }, {});
            return {
                ...state,
                cart: action.payload,
                quantities,
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                quantities: {
                    ...state.quantities,
                    [action.payload.productId]: action.payload.quantity,
                },
            };
        default:
            return state;
    }
};

export const GlobalStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products");
                dispatch({ type: 'SET_PRODUCTS', payload: res.data });
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        const fetchCart = async () => {
            const userId = localStorage.getItem("loginid");
            const res = await axios.get(`http://localhost:3000/cart?userId=${userId}`);
            dispatch({ type: 'SET_CART', payload: res.data });
        };

        fetchProducts();
        fetchCart();
    }, []);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
