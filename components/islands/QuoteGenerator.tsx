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

interface OtherService {
  name: string;
  price: number;
}

interface OtherServiceItem extends OtherService {
  quantity: number;
}

interface ultraPremiums {
  name: string;
  dr: number;
  da: number;
  traffic: string;
  price: number;
  estimate: number;
}

interface ultraPremiumItems extends ultraPremiums {
  quantity: number;
}

interface IslandProps {
  initialServices: Service[];
  initialUltraPremiums: ultraPremiums[];
  initialContentServices: OtherService[];
  initialTechnicalServices: OtherService[];
}

export default function QuoteGenerator({
  initialServices,
  initialUltraPremiums,
  initialContentServices,
  initialTechnicalServices,
}: IslandProps): JSX.Element {
  const [rows, setRows] = useState<ServiceItem[]>(() => {
    if (!initialServices) return [];
    return initialServices.map((service) => ({
      ...service,
      quantity: 0,
    }));
  });
  const [ultraPremiumRows, setUltraPremiumRows] = useState<ultraPremiumItems[]>(
    () => {
      if (!initialUltraPremiums) return [];
      return initialUltraPremiums.map((premium) => ({
        ...premium,
        quantity: 0,
      }));
    },
  );
  const [contentServiceRows, setContentServiceRows] = useState<
    OtherServiceItem[]
  >(() => {
    if (!initialContentServices) return [];
    return initialContentServices.map((service) => ({
      ...service,
      quantity: 0,
    }));
  });
  const [technicalServiceRows, setTechnicalServiceRows] = useState<
    OtherServiceItem[]
  >(() => {
    if (!initialTechnicalServices) return [];
    return initialTechnicalServices.map((service) => ({
      ...service,
      quantity: 0,
    }));
  });
  const [showUltraPremium, setShowUltraPremium] = useState(false);
  const [monthlyTerm, setMonthlyTerm] = useState(3);

  const formatDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const updateQuantity = (type: string, index: number, value: number) => {
    if (type === 'links') {
      setRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index].quantity = value;
        return newRows;
      });
    } else if (type === 'content') {
      setContentServiceRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index].quantity = value;
        return newRows;
      });
    } else if (type === 'technical') {
      setTechnicalServiceRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index].quantity = value;
        return newRows;
      });
    }
  };

  const premiumTotal: number = ultraPremiumRows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0,
  );

  const updatePremium = (index: number, value: number) => {
    setUltraPremiumRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].quantity = value;
      return newRows;
    });
  };

  const linkPriceTotal: number = rows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0,
  );
  const contentPriceTotal = contentServiceRows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0,
  );
  const technicalPriceTotal = technicalServiceRows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0,
  );

  const grandTotal: number =
    linkPriceTotal + contentPriceTotal + premiumTotal + technicalPriceTotal;

  const estimatedLinks: number =
    rows.reduce((acc, row) => acc + row.estimate * row.quantity, 0) +
    ultraPremiumRows.reduce((acc, row) => acc + row.estimate * row.quantity, 0);

  return (
    <div className="quote-generator-wrapper">
      <div className="quote-generator-header">
        <h1>Link Building Quote Generator</h1>
      </div>
      <div className="quote-generator-table-wrapper">
        <div className="service-row-head">
          <h3>Link Building Services</h3>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Link Estimate</p>
        </div>
        {rows.map((row, index) => {
          return (
            <div className="service-row">
              <p>{row.name}</p>
              <p>{formatDollar.format(row.price)}</p>
              <input
                type="number"
                value={row.quantity}
                onChange={(e) =>
                  updateQuantity('links', index, Number(e.target.value))
                }
              />
              <p>{formatDollar.format(row.price * row.quantity)}</p>
              <p>{row.quantity * row.estimate}</p>
            </div>
          );
        })}
        <div className="service-row">
          <h3 id="ultra-premium">
            Ultra Premium Links{' '}
            <div
              id="ultra-premium-checkbox"
              className={showUltraPremium ? 'show-ultra' : 'hide-ultra'}
              onClick={() => {
                if (showUltraPremium) {
                  setShowUltraPremium(false);
                } else setShowUltraPremium(true);
              }}
            ></div>
          </h3>
        </div>
        {showUltraPremium && (
          <div className="ultra-premium-wrapper">
            <div className="ultra-premium-row">
              <p></p>
              <p></p>
              <p>DR</p>
              <p>DA</p>
              <p>Traffic</p>
              <p>Price</p>
              <p>Link Estimate</p>
            </div>
            {ultraPremiumRows.map((row, index) => {
              return (
                <div className="ultra-premium-row">
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      updatePremium(index, Number(e.target.value))
                    }
                  />
                  <p>{row.name}</p>
                  <p>{row.dr}</p>
                  <p>{row.da}</p>
                  <p>{row.traffic}</p>
                  <p>{formatDollar.format(row.price)}</p>
                  <p>{row.quantity * row.estimate}</p>
                </div>
              );
            })}
          </div>
        )}
        <h3>Content Services</h3>
        {contentServiceRows.map((row, index) => {
          return (
            <div className="service-row">
              <p>{row.name}</p>
              <p>{formatDollar.format(row.price)}</p>
              <input
                type="number"
                value={row.quantity}
                onChange={(e) =>
                  updateQuantity('content', index, Number(e.target.value))
                }
              />
              <p>{formatDollar.format(row.price * row.quantity)}</p>
            </div>
          );
        })}
        <h3>Technical Services</h3>
        {technicalServiceRows.map((row, index) => {
          return (
            <div className="service-row">
              <p>{row.name}</p>
              <p>{formatDollar.format(row.price)}</p>
              <input
                type="number"
                value={row.quantity}
                onChange={(e) =>
                  updateQuantity('technical', index, Number(e.target.value))
                }
              />
              <p>{formatDollar.format(row.price * row.quantity)}</p>
            </div>
          );
        })}
        <div className="service-row-foot">
          <p></p>
          <p></p>
          <p></p>
          <p>Total</p>
          <p>Total Estimated Links</p>
        </div>
        <div className="service-row-foot">
          <p></p>
          <p></p>
          <p></p>
          <p>{formatDollar.format(grandTotal)}</p>
          <p>{estimatedLinks}</p>
        </div>
        <div className="service-row-foot">
          <p></p>
          <p></p>
          <p>Monthly Term</p>
          <p>Monthly Cost</p>
          <p>Cost Per Link</p>
        </div>
        <div className="service-row-foot">
          <p></p>
          <p></p>
          <input
            type="number"
            name="monthly-term"
            value={monthlyTerm}
            onChange={(e) => setMonthlyTerm(Number(e.target.value))}
          />
          <p>{formatDollar.format(grandTotal / monthlyTerm)}</p>
          <p>{formatDollar.format(grandTotal / estimatedLinks)}</p>
        </div>
      </div>
    </div>
  );
}
