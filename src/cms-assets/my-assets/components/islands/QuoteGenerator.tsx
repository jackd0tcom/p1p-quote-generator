import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import "../styles/quoteGenerator.css";
import { QuotePDFDocument } from "./QuotePDFDocument";

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
  const [showUltraPremium, setShowUltraPremium] = useState(false);
  const [monthlyTerm, setMonthlyTerm] = useState(3);
  const [showLinkBuilding, setShowLinkBuilding] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showTechincal, setShowTechnical] = useState(false);
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

  const formatDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const updateQuantity = (type: string, index: number, value: number) => {
    if (value < 0) {
      return;
    }
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

  const linkBuildingServicesTotal: number = rows.reduce(
    (acc, row) => acc + row.estimate * row.quantity,
    0
  );
  const ultraPremiumTotal: number = ultraPremiumRows.reduce(
    (acc, row) => acc + row.estimate * row.quantity,
    0
  );

  const estimatedLinks: number =
    linkBuildingServicesTotal >= 0
      ? linkBuildingServicesTotal
      : 0 + ultraPremiumTotal >= 0
      ? ultraPremiumTotal
      : 0;

  const costPerLink: number =
    estimatedLinks > 0 ? (linkPriceTotal + premiumTotal) / estimatedLinks : 0;

  const carat = (state) => {
    return (
      <svg
        className={state ? "carat toggled" : "carat"}
        width="12"
        height="10"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.49707 0.75C7.68955 0.416895 8.16982 0.416896 8.3623 0.75L15.291 12.75C15.4834 13.0833 15.2423 13.5 14.8574 13.5H1.00195C0.617071 13.5 0.375961 13.0833 0.568359 12.75L7.49707 0.75Z"
          fill="black"
          stroke="black"
        />
      </svg>
    );
  };

  const handleVisibilityToggle = (state, setState) => {
    if (!state) {
      setState(true);
    } else setState(false);
  };

  const downloadPDF = async () => {
    try {
      const doc = (
        <QuotePDFDocument
          services={rows}
          ultraPremiums={ultraPremiumRows}
          contentServices={contentServiceRows}
          technicalServices={technicalServiceRows}
          grandTotal={grandTotal}
          estimatedLinks={estimatedLinks}
          monthlyTerm={monthlyTerm}
          monthlyCost={grandTotal / monthlyTerm}
          costPerLink={costPerLink}
        />
      );

      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date().toISOString().split("T")[0];
      link.download = `quote-${date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="quote-generator-wrapper">
      <div className="quote-generator-header">
        {/* <button
          onClick={downloadPDF}
          className="download-pdf-button"
          type="button"
        >
          Download PDF Quote
        </button> */}
      </div>
      <div className="quote-generator-table-wrapper">
        <div className="service-row-head">
          <div
            className="heading-toggle"
            onClick={() =>
              handleVisibilityToggle(showLinkBuilding, setShowLinkBuilding)
            }
          >
            {carat(showLinkBuilding)}
            <h3 className="rows-container-heading link-building-services">
              Link Building Services
            </h3>
          </div>
          {showLinkBuilding && (
            <>
              <p>Qty</p>
              <p>Price</p>
              <p>Total</p>
            </>
          )}
        </div>
        <div
          className={
            showLinkBuilding
              ? "rows-container rows-visible"
              : "rows-container rows-hidden"
          }
        >
          {rows.map((row, index) => {
            return (
              <div className="service-row">
                <p>{row.itemName}</p>
                <input
                  className="calculator-input"
                  type="number"
                  value={row.quantity >= 1 ? row.quantity : ""}
                  onChange={(e) =>
                    updateQuantity("links", index, Number(e.target.value))
                  }
                />
                <p>{formatDollar.format(row.price)}</p>
                <p>{formatDollar.format(row.price * row.quantity)}</p>
              </div>
            );
          })}
          <div className="ultra-premium-row ultra-head">
            <div
              className="heading-toggle premium-button"
              onClick={() =>
                handleVisibilityToggle(showUltraPremium, setShowUltraPremium)
              }
            >
              {carat(showUltraPremium)}
              <h4 id="ultra-premium">Ultra Premium Links </h4>
            </div>
            {showUltraPremium && (
              <>
                <p>Qty</p>
                <p>Price</p>
                <p>DR</p>
                <p>DA</p>
                <p>Traffic</p>
              </>
            )}
          </div>
          <div
            className={
              showUltraPremium
                ? "ultra-premium-wrapper rows-visible"
                : "ultra-premium-wrapper rows-hidden"
            }
          >
            {ultraPremiumRows.map((row, index) => {
              return (
                <div className="ultra-premium-row">
                  <p>{row.itemName}</p>
                  <input
                    className="calculator-input"
                    type="number"
                    value={row.quantity >= 1 ? row.quantity : ""}
                    onChange={(e) =>
                      updatePremium(index, Number(e.target.value))
                    }
                  />
                  <p>{formatDollar.format(row.price)}</p>
                  <p>{row.dr}</p>
                  <p>{row.da}</p>
                  <p>{row.traffic}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="service-row-head">
          <div
            className="heading-toggle"
            onClick={() => handleVisibilityToggle(showContent, setShowContent)}
          >
            {carat(showContent)}
            <h3 className="rows-container-heading">Content Services</h3>
          </div>
        </div>
        <div
          className={
            showContent
              ? "rows-container rows-visible"
              : "rows-container rows-hidden"
          }
        >
          {contentServiceRows.map((row, index) => {
            return (
              <div className="service-row">
                <p>{row.itemName}</p>
                <input
                  className="calculator-input"
                  type="number"
                  value={row.quantity >= 1 ? row.quantity : ""}
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
        <div className="service-row-head">
          <div
            className="heading-toggle"
            onClick={() =>
              handleVisibilityToggle(showTechincal, setShowTechnical)
            }
          >
            {carat(showTechincal)}
            <h3 className="rows-container-heading">Technical Services</h3>
          </div>
        </div>
        <div
          className={
            showTechincal
              ? "rows-container rows-visible"
              : "rows-container rows-hidden"
          }
        >
          {technicalServiceRows.map((row, index) => {
            return (
              <div className="service-row">
                <p>{row.itemName}</p>
                <input
                  className="calculator-input"
                  type="number"
                  value={row.quantity >= 1 ? row.quantity : ""}
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
            <p className="monthly">Monthly Cost</p>
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
            <p className="monthly">
              {formatDollar.format(grandTotal / monthlyTerm)}
            </p>
            <p>{!costPerLink ? "$0" : formatDollar.format(costPerLink)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
