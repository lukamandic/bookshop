import { useCartStore } from "../../store";
import "./index.css";

interface BookProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  revision: number;
}

export const Book = ({
  id,
  title,
  description,
  price,
  image,
  revision,
}: BookProps) => {
  const add = useCartStore((state) => state.add);

  const handleAddToCart = () => {
    add({ id: id, name: title, qty: 1, price: price });
  };

  return (
    <div className="book">
      <img src={image} alt={title} className="book-image" />
      <div className="book-info">
        <h2 className="book-title">{title}</h2>
        <p>Revisions: {revision}</p>
        <p className="book-description">{description}</p>
        <p className="book-price">Price: ${price}</p>
        <button onClick={() => handleAddToCart()} className="add-to-cart">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Book;
