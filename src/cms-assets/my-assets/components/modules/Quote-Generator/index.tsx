import { Island } from "@hubspot/cms-components";
import {
  ModuleFields,
  TextField,
  NumberField,
  RepeatedFieldGroup,
} from "@hubspot/cms-components/fields";
// Import island version (works in production)
import QuoteGeneratorIsland from "../../islands/QuoteGenerator?island";
// Import direct version for dev server fallback
import QuoteGeneratorDirect from "../../islands/QuoteGenerator.tsx";

interface HubspotFieldValues {
  services: {
    itemName: string;
    price: number;
    estimate: number;
  }[];
  ultraPremiums: {
    itemName: string;
    dr: number;
    da: number;
    traffic: string;
    price: number;
    estimate: number;
  }[];
  contentServices: {
    itemName: string;
    price: number;
  }[];
  technicalServices: {
    itemName: string;
    price: number;
  }[];
}

interface ModuleProps {
  fieldValues: HubspotFieldValues;
}

export function Component(props: ModuleProps): JSX.Element {
  const defaultServices = [
    { itemName: "Editorial Links", price: 450, estimate: 1 },
    { itemName: "Expert Links", price: 5000, estimate: 6 },
    { itemName: "News Links", price: 750, estimate: 1 },
  ];
  const defaultUltraPremiums = [
    {
      itemName: "bloomberg.com",
      dr: 92,
      da: 94,
      traffic: "7.2M",
      price: 36000,
      estimate: 1,
    },
    {
      itemName: "rollingstone.com",
      dr: 90,
      da: 92,
      traffic: "3.6M",
      price: 30000,
      estimate: 1,
    },
    {
      itemName: "coindesk",
      dr: 90,
      da: 91,
      traffic: "2.3M",
      price: 26000,
      estimate: 1,
    },
  ];
  const defaultContentServices = [
    { itemName: "Linkable Content", price: 700 },
    { itemName: "Keyword Content", price: 700 },
    { itemName: "Content Road Map", price: 1500 },
  ];
  const defaultTechnicalServices = [
    { itemName: "Advanced Content", price: 1200 },
    { itemName: "Website Audit", price: 2000 },
    { itemName: "Schema Optimization", price: 300 },
  ];
  const initialServices =
    props.fieldValues?.services && props.fieldValues.services.length > 0
      ? props.fieldValues.services
      : defaultServices;
  const initialUltraPremiums =
    props.fieldValues?.ultraPremiums &&
    props.fieldValues.ultraPremiums.length > 0
      ? props.fieldValues.ultraPremiums
      : defaultUltraPremiums;
  const initialContentServices =
    props.fieldValues?.contentServices &&
    props.fieldValues.contentServices.length > 0
      ? props.fieldValues.contentServices
      : defaultContentServices;
  const initialTechnicalServices =
    props.fieldValues?.technicalServices &&
    props.fieldValues.technicalServices.length > 0
      ? props.fieldValues.technicalServices
      : defaultTechnicalServices;

  const hasModuleId =
    QuoteGeneratorIsland && (QuoteGeneratorIsland as any).moduleId;

  if (hasModuleId) {
    // Production: use Island with proper moduleId and SSR metadata
    return (
      <Island
        module={QuoteGeneratorIsland}
        initialServices={initialServices}
        initialUltraPremiums={initialUltraPremiums}
        initialContentServices={initialContentServices}
        initialTechnicalServices={initialTechnicalServices}
      />
    );
  }
  return (
    <QuoteGeneratorDirect
      initialServices={initialServices}
      initialUltraPremiums={initialUltraPremiums}
      initialContentServices={initialContentServices}
      initialTechnicalServices={initialTechnicalServices}
    />
  );
}

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      name="services"
      label="Link Building Services"
      default={[
        { itemName: "Editorial Links", price: 450, estimate: 1 },
        { itemName: "Expert Links", price: 5000, estimate: 6 },
        { itemName: "News Links", price: 750, estimate: 1 },
      ]}
    >
      <TextField name="itemName" label="Item Name" default="Service Item" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
      <NumberField name="estimate" label="Link Estimate" default={1} />
    </RepeatedFieldGroup>
    <RepeatedFieldGroup
      name="ultraPremiums"
      label="Ultra Premiums"
      default={[
        {
          itemName: "bloomberg.com",
          dr: 92,
          da: 94,
          traffic: "7.2M",
          price: 36000,
        },
        {
          itemName: "rollingstone.com",
          dr: 90,
          da: 92,
          traffic: "3.6M",
          price: 30000,
        },
        { itemName: "coindesk", dr: 90, da: 91, traffic: "2.3M", price: 26000 },
      ]}
    >
      <TextField
        name="itemName"
        label="Item Name"
        default="Ultra Premium Item"
      />
      <NumberField name="dr" label="DR" default={0} />
      <NumberField name="da" label="DA" default={0} />
      <TextField name="traffic" label="Traffic" default="0" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
    </RepeatedFieldGroup>
    <RepeatedFieldGroup
      name="contentServices"
      label="Content Services"
      default={[
        { itemName: "Linkable Content", price: 700 },
        { itemName: "Keyword Content", price: 700 },
        { itemName: "Content Road Map", price: 1500 },
      ]}
    >
      <TextField name="itemName" label="Item Name" default="Service Item" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
    </RepeatedFieldGroup>
    <RepeatedFieldGroup
      name="technicalServices"
      label="Technical Services"
      default={[
        { itemName: "Advanced Content", price: 1200 },
        { itemName: "Website Audit", price: 2000 },
        { itemName: "Schema Optimization", price: 300 },
      ]}
    >
      <TextField name="itemName" label="Item Name" default="Service Item" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = {
  label: "Quote Generator Module",
};
