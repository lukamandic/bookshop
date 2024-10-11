import { useState } from "react";
import "./index.css";
import {
  Cart,
  CartItem,
  CartItemsControl,
  ErrorMessage,
  Header,
  Input,
  Book,
} from "../../components";
import { useCartStore } from "../../store";
import { useGetBooks } from "../../hooks";
import { Qty } from "../../util/qty";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  const cartCount = useCartStore((state) => state.count);
  const cart = useCartStore((state) => state.cart);
  const updateCartItem = useCartStore((state) => state.update);
  const removeCartItem = useCartStore((state) => state.remove);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [title, setTitle] = useState("nosql");
  const { books, setTitleSearch } = useGetBooks(title, location);
  const [quantities, setQuantities] = useState<{ id: string; qty: number }[]>(
    []
  );
  const qty = new Qty(quantities, setQuantities, updateCartItem);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleSearch(e.target.value);
  };

  return (
    <div className="bookshop">
      <Header>
        <h1 className="bookshop-title">ScyllaDB Bookshop</h1>
        <button className="bookshop-cart-button" onClick={toggleCartVisibility}>
          My Cart ({cartCount()})
        </button>
      </Header>

      <div className="bookshop-body">
        <div className={`bookshop-content ${isCartVisible ? "shrink" : ""}`}>
          <Input
            onChange={(e) => titleChange(e)}
            type="text"
            className="bookshop-filter"
            placeholder="Filter books..."
          />

          {books.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.volumeInfo.title}
              description={book.volumeInfo.description}
              price={book.volumeInfo.price}
              image={book.volumeInfo.imageLinks.thumbnail}
            />
          ))}
        </div>

        <Cart isCartVisible={isCartVisible}>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <h3>{item.name}</h3>
              <CartItemsControl>
                <input
                  type="number"
                  className="cart-quantity"
                  defaultValue={item.qty}
                  onChange={(e) => qty.updateQuanties(item.id, +e.target.value)}
                />
                <button
                  onClick={() => qty.updateItemQty()}
                  className="update-quantity-button"
                >
                  Update Quantity
                </button>
                <button
                  onClick={() => removeCartItem(item.id)}
                  type="button"
                  className="remove-item-button"
                >
                  &#x2715; Remove
                </button>
              </CartItemsControl>

              {qty.checkError(item.id) ? (
                <ErrorMessage message="Sorry! The number is invalid" />
              ) : null}
            </CartItem>
          ))}
          <h3>Total Price: ${totalPrice()}</h3>
        </Cart>
      </div>
    </div>
  );
};
