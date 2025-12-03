import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        textAlign: 'right',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 10,
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e6e6e6',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        padding: 8,
    },
    tableHeader: {
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold',
    },
    tableCell: {
        flex: 1,
        padding: 4,
    },
    tableCellName: {
        flex: 2,
        padding: 4,
    },
    summary: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    summaryLabel: {
        fontWeight: 'bold',
    },
    date: {
        fontSize: 9,
        color: '#666',
    },
});

interface Service {
    itemName: string;
    price: number;
    estimate: number;
    quantity: number;
}

interface UltraPremium {
    itemName: string;
    dr: number;
    da: number;
    traffic: string;
    price: number;
    estimate: number;
    quantity: number;
}

interface OtherService {
    itemName: string;
    price: number;
    quantity: number;
}

interface QuotePDFDocumentProps {
    services: Service[];
    ultraPremiums: UltraPremium[];
    contentServices: OtherService[];
    technicalServices: OtherService[];
    grandTotal: number;
    estimatedLinks: number;
    monthlyTerm: number;
    monthlyCost: number;
    costPerLink: number;
}

const formatDollar = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const QuotePDFDocument = ({
    services,
    ultraPremiums,
    contentServices,
    technicalServices,
    grandTotal,
    estimatedLinks,
    monthlyTerm,
    monthlyCost,
    costPerLink,
}: QuotePDFDocumentProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.date}>
                    Generated: {new Date().toLocaleDateString()}
                </Text>
            </View>

            <Text style={styles.title}>Link Building Quote</Text>

            {/* Link Building Services */}
            {services.some(s => s.quantity > 0) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Link Building Services</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCellName}>Service</Text>
                            <Text style={styles.tableCell}>Qty</Text>
                            <Text style={styles.tableCell}>Price</Text>
                            <Text style={styles.tableCell}>Total</Text>
                            <Text style={styles.tableCell}>Link Estimate</Text>
                        </View>
                        {services
                            .filter(s => s.quantity > 0)
                            .map((service, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCellName}>{service.itemName}</Text>
                                    <Text style={styles.tableCell}>{service.quantity}</Text>
                                    <Text style={styles.tableCell}>{formatDollar(service.price)}</Text>
                                    <Text style={styles.tableCell}>
                                        {formatDollar(service.price * service.quantity)}
                                    </Text>
                                    <Text style={styles.tableCell}>
                                        {service.quantity * service.estimate}
                                    </Text>
                                </View>
                            ))}
                    </View>
                </View>
            )}

            {/* Ultra Premium Links */}
            {ultraPremiums.some(u => u.quantity > 0) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ultra Premium Links</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCellName}>Domain</Text>
                            <Text style={styles.tableCell}>Qty</Text>
                            <Text style={styles.tableCell}>Price</Text>
                            <Text style={styles.tableCell}>DR</Text>
                            <Text style={styles.tableCell}>DA</Text>
                            <Text style={styles.tableCell}>Traffic</Text>
                            <Text style={styles.tableCell}>Link Estimate</Text>
                        </View>
                        {ultraPremiums
                            .filter(u => u.quantity > 0)
                            .map((premium, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCellName}>{premium.itemName}</Text>
                                    <Text style={styles.tableCell}>{premium.quantity}</Text>
                                    <Text style={styles.tableCell}>{formatDollar(premium.price)}</Text>
                                    <Text style={styles.tableCell}>{premium.dr}</Text>
                                    <Text style={styles.tableCell}>{premium.da}</Text>
                                    <Text style={styles.tableCell}>{premium.traffic}</Text>
                                    <Text style={styles.tableCell}>
                                        {premium.quantity * premium.estimate}
                                    </Text>
                                </View>
                            ))}
                    </View>
                </View>
            )}

            {/* Content Services */}
            {contentServices.some(c => c.quantity > 0) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Content Services</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCellName}>Service</Text>
                            <Text style={styles.tableCell}>Qty</Text>
                            <Text style={styles.tableCell}>Price</Text>
                            <Text style={styles.tableCell}>Total</Text>
                        </View>
                        {contentServices
                            .filter(c => c.quantity > 0)
                            .map((service, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCellName}>{service.itemName}</Text>
                                    <Text style={styles.tableCell}>{service.quantity}</Text>
                                    <Text style={styles.tableCell}>{formatDollar(service.price)}</Text>
                                    <Text style={styles.tableCell}>
                                        {formatDollar(service.price * service.quantity)}
                                    </Text>
                                </View>
                            ))}
                    </View>
                </View>
            )}

            {/* Technical Services */}
            {technicalServices.some(t => t.quantity > 0) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technical Services</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCellName}>Service</Text>
                            <Text style={styles.tableCell}>Qty</Text>
                            <Text style={styles.tableCell}>Price</Text>
                            <Text style={styles.tableCell}>Total</Text>
                        </View>
                        {technicalServices
                            .filter(t => t.quantity > 0)
                            .map((service, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCellName}>{service.itemName}</Text>
                                    <Text style={styles.tableCell}>{service.quantity}</Text>
                                    <Text style={styles.tableCell}>{formatDollar(service.price)}</Text>
                                    <Text style={styles.tableCell}>
                                        {formatDollar(service.price * service.quantity)}
                                    </Text>
                                </View>
                            ))}
                    </View>
                </View>
            )}

            {/* Summary */}
            <View style={styles.section}>
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total:</Text>
                        <Text>{formatDollar(grandTotal)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Estimated Links:</Text>
                        <Text>{estimatedLinks}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Monthly Term:</Text>
                        <Text>{monthlyTerm} months</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Monthly Cost:</Text>
                        <Text>{formatDollar(monthlyCost)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Cost Per Link:</Text>
                        <Text>{formatDollar(costPerLink || 0)}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);
