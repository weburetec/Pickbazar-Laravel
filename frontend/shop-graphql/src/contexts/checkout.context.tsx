import { UserAddress } from "@graphql/auth.graphql";
import React, { FC, useMemo } from "react";

export interface State {
  billing_address: UserAddress | null;
  shipping_address: UserAddress | null;
  delivery_time: any;
  checkoutData: {
    total_tax: number;
    shipping_charge: number;
    unavailable_products: string[];
  } | null;
  discount: number;
  coupon: any;
}

const defaultState = {
  billing_address: null,
  shipping_address: null,
  checkoutData: null,
  delivery_time: "",
  discount: 0,
  coupon: null,
};
const initialState =
  typeof window !== "undefined" && localStorage.getItem("checkout")
    ? JSON.parse(localStorage.getItem("checkout")!)
    : defaultState;
type Action =
  | {
      type: "UPDATE_BILLING_ADDRESS";
      payload: UserAddress;
    }
  | {
      type: "UPDATE_SHIPPING_ADDRESS";
      payload: UserAddress;
    }
  | {
      type: "UPDATE_DELIVERY_TIME";
      payload: any;
    }
  | {
      type: "SET_CHECKOUT_DATA";
      payload: any;
    }
  | {
      type: "CLEAR_CHECKOUT";
    }
  | {
      type: "APPLY_COUPON";
      payload: any;
    }
  | {
      type: "REMOVE_COUPON";
    };

export const CheckoutContext = React.createContext<State | any>(initialState);

CheckoutContext.displayName = "CheckoutContext";

function checkoutReducer(state: State, action: Action) {
  switch (action.type) {
    case "UPDATE_BILLING_ADDRESS": {
      return {
        ...state,
        billing_address: action.payload,
      };
    }
    case "UPDATE_SHIPPING_ADDRESS": {
      return {
        ...state,
        shipping_address: action.payload,
      };
    }
    case "SET_CHECKOUT_DATA": {
      return {
        ...state,
        checkoutData: action.payload,
      };
    }
    case "UPDATE_DELIVERY_TIME": {
      return {
        ...state,
        delivery_time: action.payload,
      };
    }
    case "CLEAR_CHECKOUT": {
      return defaultState;
    }
    case "APPLY_COUPON": {
      return {
        ...state,
        discount: calculateDiscount(state, action.payload),
        coupon: action.payload,
      };
    }
    case "REMOVE_COUPON": {
      return {
        ...state,
        discount: 0,
        coupon: null,
      };
    }
  }
}

function calculateDiscount(state: any, coupon: any, amount: number = 1) {
  switch (coupon.type) {
    case "percentage":
      return (amount * coupon.amount) / 100;
    case "FIXED_COUPON":
      return coupon.amount;
    case "free_shipping":
      return state.checkoutData?.shipping_charge;
  }
}

export const CheckoutProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(checkoutReducer, initialState);
  React.useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(state));
  }, [state]);
  const updateBillingAddress = (payload: UserAddress) =>
    dispatch({ type: "UPDATE_BILLING_ADDRESS", payload });
  const updateShippingAddress = (payload: UserAddress) =>
    dispatch({ type: "UPDATE_SHIPPING_ADDRESS", payload });
  const updateDeliveryTime = (payload: any) =>
    dispatch({ type: "UPDATE_DELIVERY_TIME", payload });
  const setCheckoutData = (payload: any) =>
    dispatch({ type: "SET_CHECKOUT_DATA", payload });
  const removeCoupon = () => dispatch({ type: "REMOVE_COUPON" });

  const applyCoupon = (payload: any) =>
    dispatch({ type: "APPLY_COUPON", payload });
  const clearCheckoutData = () => {
    localStorage.removeItem("checkout");
    dispatch({ type: "CLEAR_CHECKOUT" });
  };

  const value = useMemo(
    () => ({
      ...state,
      updateBillingAddress,
      updateShippingAddress,
      updateDeliveryTime,
      setCheckoutData,
      applyCoupon,
      removeCoupon,
      clearCheckoutData,
    }),
    [state]
  );

  return <CheckoutContext.Provider value={value} {...props} />;
};

export const useCheckout = () => {
  const context = React.useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error(`useCheckout must be used within a CheckoutProvider`);
  }
  return context;
};
