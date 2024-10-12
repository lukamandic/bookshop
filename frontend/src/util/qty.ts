export type SetQtyFunctionValue = React.SetStateAction<
  {
    id: string;
    qty: number;
  }[]
>;

export type SetQtyFunction = (value: SetQtyFunctionValue) => void;

export type UpdateCartFunction = (id: string, qty: number) => void;

export type Quantities = { id: string; qty: number }[];

interface QtyOps {
  checkError: (id: string) => boolean;
  updateQuanties: (id: string, qty: number) => void;
  updateItemQty: () => void;
  removeQuantity: (id: string) => void;
}

export class Qty implements QtyOps {
  private quantities: Quantities;
  public setQtyFunction: SetQtyFunction;
  public updateCartFunction: UpdateCartFunction;

  constructor(
    quantities: Quantities,
    setQtyFunction: SetQtyFunction,
    updateCartFunction: UpdateCartFunction
  ) {
    this.quantities = quantities;
    this.setQtyFunction = setQtyFunction;
    this.updateCartFunction = updateCartFunction;
  }

  checkError(id: string) {
    const index = this.quantities.findIndex((item) => item.id === id);
    console.log(this.quantities);
    if (index !== -1)
      return this.quantities[index].qty < 1 || this.quantities[index].qty > 100;

    return false;
  }

  removeQuantity(id: string) {
    const index = this.quantities.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.setQtyFunction((prevQuantities) =>
        prevQuantities.filter((item) => item.id !== id)
      );
    }
  }

  updateQuanties(id: string, qty: number) {
    const index = this.quantities.findIndex((q) => q.id === id);
    if (index !== -1) {
      this.setQtyFunction((prevQuantities) =>
        prevQuantities.map((item) => (item.id === id ? { ...item, qty } : item))
      );
    } else {
      this.setQtyFunction((prevQuantities) => [...prevQuantities, { id, qty }]);
    }
  }

  updateItemQty() {
    this.quantities.forEach((item, index, object) => {
      if (item.qty < 1 || item.qty > 100) {
        return;
      } else {
        this.updateCartFunction(item.id, item.qty);
        object.splice(index, 1);
      }
    });
  }
}
