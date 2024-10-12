import "./index.css";

interface CartProps {
  children: React.ReactNode;
  isCartVisible: boolean;
}

export const Cart = ({ children, isCartVisible }: CartProps) => {
  return (
    <div className={`shopping-cart ${isCartVisible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

export default Cart;
