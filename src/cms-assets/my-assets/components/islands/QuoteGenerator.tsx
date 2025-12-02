import { useState } from "react";
import "../styles/quoteGenerator.css";

interface Service {
  itemName: string;
  price: number;
  estimate: number;
}

interface ServiceItem extends Service {
  quantity: number;
}

interface OtherService {
  itemName: string;
  price: number;
}

interface OtherServiceItem extends OtherService {
  quantity: number;
}

interface ultraPremiums {
  itemName: string;
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
    }
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

  const formatDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const updateQuantity = (type: string, index: number, value: number) => {
    if (type === "links") {
      setRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index].quantity = value;
        return newRows;
      });
    } else if (type === "content") {
      setContentServiceRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index].quantity = value;
        return newRows;
      });
    } else if (type === "technical") {
      setTechnicalServiceRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[index].quantity = value;
        return newRows;
      });
    }
  };

  const premiumTotal: number = ultraPremiumRows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0
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
    0
  );
  const contentPriceTotal = contentServiceRows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0
  );
  const technicalPriceTotal = technicalServiceRows.reduce(
    (acc, row) => acc + row.price * row.quantity,
    0
  );

  const grandTotal: number =
    linkPriceTotal + contentPriceTotal + premiumTotal + technicalPriceTotal;

  const estimatedLinks: number =
    rows.reduce((acc, row) => acc + row.estimate * row.quantity, 0) +
    ultraPremiumRows.reduce((acc, row) => acc + row.estimate * row.quantity, 0);

  const costPerLink: number = linkPriceTotal + premiumTotal / estimatedLinks;

  return (
    <div className="quote-generator-wrapper">
      <div className="quote-generator-header">
        {/* <h1>Link Building Quote Generator</h1> */}
      </div>
      <div className="quote-generator-table-wrapper">
        <div className="service-row-head">
          <h3 className="rows-container-heading link-building-services">
            Link Building Services
          </h3>
          <p>Qty</p>
          <p>Price</p>
          <p>Total</p>
          <p>Link Estimate</p>
        </div>
        <div className="rows-container">
          {rows.map((row, index) => {
            return (
              <div className="service-row">
                <p>{row.itemName}</p>
                <input
                  className="calculator-input"
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    updateQuantity("links", index, Number(e.target.value))
                  }
                />
                <p>{formatDollar.format(row.price)}</p>
                <p>{formatDollar.format(row.price * row.quantity)}</p>
                <p>{row.quantity * row.estimate}</p>
              </div>
            );
          })}
        </div>
        <div className="ultra-premium-head">
          <svg
            id="ultra-premium-star"
            className={showUltraPremium ? "show-ultra" : "hide-ultra"}
            onClick={() => {
              if (showUltraPremium) {
                setShowUltraPremium(false);
              } else setShowUltraPremium(true);
            }}
            width="22"
            height="22"
            viewBox="0 0 44 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.1381 14.6565C26.4059 15.4805 27.174 16.0384 28.0405 16.0384H42.3989L30.7827 24.4788C30.0817 24.9881 29.7883 25.8911 30.0561 26.7151L34.4936 40.3714L22.8764 31.9309C22.1754 31.4217 21.2258 31.4217 20.5248 31.9309L8.90765 40.3714L13.3452 26.7151C13.6129 25.8911 13.3196 24.9881 12.6186 24.4788L1.0014 16.0384H15.3608C16.2272 16.0384 16.9954 15.4805 17.2631 14.6565L21.7006 1.00027L26.1381 14.6565Z"
              stroke="#FAAD18"
              stroke-width="2"
            />
          </svg>
          <h3 id="ultra-premium">Ultra Premium Links </h3>
        </div>
        {showUltraPremium && (
          <div className="ultra-premium-wrapper">
            <div className="ultra-premium-row ultra-head">
              <p></p>
              <p>Qty</p>
              <p>Price</p>
              <p>DR</p>
              <p>DA</p>
              <p>Traffic</p>
              <p>Link Estimate</p>
            </div>
            <div className="rows-container">
              {ultraPremiumRows.map((row, index) => {
                return (
                  <div className="ultra-premium-row">
                    <p>{row.itemName}</p>
                    <input
                      className="calculator-input"
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        updatePremium(index, Number(e.target.value))
                      }
                    />
                    <p>{formatDollar.format(row.price)}</p>
                    <p>{row.dr}</p>
                    <p>{row.da}</p>
                    <p>{row.traffic}</p>
                    <p>{row.quantity * row.estimate}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <h3 className="rows-container-heading">Content Services</h3>
        <div className="rows-container">
          {contentServiceRows.map((row, index) => {
            return (
              <div className="service-row">
                <p>{row.itemName}</p>
                <input
                  className="calculator-input"
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    updateQuantity("content", index, Number(e.target.value))
                  }
                />
                <p>{formatDollar.format(row.price)}</p>
                <p>{formatDollar.format(row.price * row.quantity)}</p>
              </div>
            );
          })}
        </div>
        <h3 className="rows-container-heading">Technical Services</h3>
        <div className="rows-container">
          {technicalServiceRows.map((row, index) => {
            return (
              <div className="service-row">
                <p>{row.itemName}</p>
                <input
                  className="calculator-input"
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    updateQuantity("technical", index, Number(e.target.value))
                  }
                />
                <p>{formatDollar.format(row.price)}</p>
                <p>{formatDollar.format(row.price * row.quantity)}</p>
              </div>
            );
          })}
        </div>
        <div className="quote-generator-foot">
          <div className="service-row-foot bold">
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
          <div className="service-row-foot bold">
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
              className="calculator-input"
              type="number"
              name="monthly-term"
              value={monthlyTerm}
              onChange={(e) => setMonthlyTerm(Number(e.target.value))}
            />
            <p>{formatDollar.format(grandTotal / monthlyTerm)}</p>
            <p>{!costPerLink ? "$0" : formatDollar.format(costPerLink)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
