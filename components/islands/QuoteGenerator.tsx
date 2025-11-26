import { useState } from 'react';
import '../../styles/quoteGenerator.css';

interface Service {
  name: string;
  price: number;
  estimate: number;
}

interface ServiceItem extends Service {
  quantity: number;
}

interface IslandProps {
  initialServices: Service[];
}

export default function QuoteGenerator({
  initialServices,
}: IslandProps): JSX.Element {
  const [rows, setRows] = useState<ServiceItem[]>(() => {
    if (!initialServices) return [];
    return initialServices.map((service) => ({
      ...service,
      quantity: 0,
    }));
  });

  const updateQuantity = (index: number, value: number) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].quantity = value;
      return newRows;
    });
  };

  const grandTotal = rows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0,
  );

  const estimatedLinks = rows.reduce(
    (acc, row) => acc + row.estimate * row.quantity,
    0,
  );

  return (
    <div className="quote-generator-wrapper">
      <div className="quote-generator-header">
        <h1>Link Building Quote Generator</h1>
      </div>
      <div className="quote-generator-table-wrapper">
        <div className="service-row-head">
          <p>Link Building Services</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Link Estimate</p>
        </div>
        {rows.map((row, index) => {
          return (
            <div className="service-row">
              <p>{row.name}</p>
              <p>{row.price}</p>
              <input
                type="number"
                value={row.quantity}
                onChange={(e) => updateQuantity(index, Number(e.target.value))}
              />
              <p>{row.price * row.quantity}</p>
              <p>{row.quantity * row.estimate}</p>
            </div>
          );
        })}
        <div className="service-row-foot">
          <p></p>
          <p></p>
          <p></p>
          <p>{grandTotal}</p>
          <p>{estimatedLinks}</p>
        </div>
      </div>
    </div>
  );
}
