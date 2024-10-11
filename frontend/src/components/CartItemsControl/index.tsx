import "./index.css";

interface CartItemsControlProps {
  children: React.ReactNode;
}

export const CartItemsControl = ({ children }: CartItemsControlProps) => {
  return <div className="cart-item-controls">{children}</div>;
};
