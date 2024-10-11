import "./index.css";

interface CartItemProps {
  children: React.ReactNode;
}

export const CartItem = ({ children }: CartItemProps) => {
  return <div className="cart-item">{children}</div>;
};
