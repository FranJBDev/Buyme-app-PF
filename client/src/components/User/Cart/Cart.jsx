import React from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./cart.module.css";
import Item from "./Item/Item";
import {CLEAR_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, ADD_ONE_TO_CART} from "../../../redux/actions/index.js"

export default function Cart() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCart = (id) => {
       dispatch({
         type: ADD_ONE_TO_CART,
         payload: id
       })
      }
    

  const delFromCart = (id, all= false) => {
   if(all){
     dispatch({
       type: REMOVE_ALL_FROM_CART,
       payload: id
     })
   }else{
    dispatch({
      type: REMOVE_ONE_FROM_CART,
      payload: id
    })
   }
  }

  const clearCart = () => {
    dispatch({type:CLEAR_CART})
  }
  
  return (
    <div className={s.main_box}>
      <div className={s.cart_div}>
        {!cartState.length ? (
          <h2>Your cart is empty</h2>
        ) : (
          cartState.map((item,index) => (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              img={item.img}
              price={item.price}
              amount={item.amount}
              delFromCart={delFromCart}
              addToCart={addToCart}
            />
          ))
        )}
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
