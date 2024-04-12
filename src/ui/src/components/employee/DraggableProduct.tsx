// DraggableProduct.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { Product } from './types';

interface DraggableProductProps {
  product: Product;
  handleDrop: (id: string) => void;
}

const DraggableProduct: React.FC<DraggableProductProps> = ({ product, handleDrop }) => {
  const [, drag] = useDrag(() => ({
    type: "PRODUCT",
    item: { id: product._id },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        handleDrop(item.id);
      }
    },
  }));

  return (
    <div ref={drag} className="border p-3 flex justify-between">
      <span className="product-label">{product.productName}</span>
      <span className="product-price">${product.productPrice}</span>
    </div>
  );
};

export default DraggableProduct;
