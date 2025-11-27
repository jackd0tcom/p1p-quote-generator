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

interface ultraPremiums {
    name: string;
    dr: number;
    da: number;
    traffic: string;
    price: number;
}

interface ultraPremiumItems extends ultraPremiums {
    quantity: number;
}

interface IslandProps {
    initialServices: Service[];
    initialUltraPremiums: ultraPremiums[];
}

export default function QuoteGenerator({
    initialServices,
    initialUltraPremiums,
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
    const [showUltraPremium, setShowUltraPremium] = useState(false);

    const updateQuantity = (index: number, value: number) => {
        setRows((prevRows) => {
            const newRows = [...prevRows];
            newRows[index].quantity = value;
            return newRows;
        });
    };

    const premiumTotal = ultraPremiumRows.reduce(
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

    const grandTotal = rows.reduce(
        (acc, row) => acc + row.price * row.quantity,
        premiumTotal,
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
                <div className="service-row">
                    <p id="ultra-premium">
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
                    </p>
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
                                    <p>{row.price}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
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
