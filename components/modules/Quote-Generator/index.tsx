import { Island } from '@hubspot/cms-components';
import {
  ModuleFields,
  TextField,
  NumberField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';
import QuoteGenerator from '../../islands/QuoteGenerator.tsx?island';

interface HubspotFieldValues {
  services: {
    name: string;
    price: number;
    estimate: number;
  }[];
  ultraPremiums: {
    name: string;
    dr: number;
    da: number;
    traffic: string;
    price: number;
  }[];
  contentServices: {
    name: string;
    price: number;
  }[];
  technicalServices: {
    name: string;
    price: number;
  }[];
}

interface ModuleProps {
  fieldValues: HubspotFieldValues;
}

export function Component(props: ModuleProps): JSX.Element {
  const defaultServices = [
    { name: 'Editorial Links', price: 450, estimate: 1 },
    { name: 'Expert Links', price: 5000, estimate: 6 },
    { name: 'News Links', price: 750, estimate: 1 },
  ];
  const defaultUltraPremiums = [
    {
      name: 'bloomberg.com',
      dr: 92,
      da: 94,
      traffic: '7.2M',
      price: 36000,
      estimate: 1,
    },
    {
      name: 'rollingstone.com',
      dr: 90,
      da: 92,
      traffic: '3.6M',
      price: 30000,
      estimate: 1,
    },
    {
      name: 'coindesk',
      dr: 90,
      da: 91,
      traffic: '2.3M',
      price: 26000,
      estimate: 1,
    },
  ];
  const defaultContentServices = [
    { name: 'Linkable Content', price: 700 },
    { name: 'Keyword Content', price: 700 },
    { name: 'Content Road Map', price: 1500 },
  ];
  const defaultTechnicalServices = [
    { name: 'Advanced Content', price: 1200 },
    { name: 'Website Audit', price: 2000 },
    { name: 'Schema Optimization', price: 300 },
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
  return (
    <Island
      module={QuoteGenerator}
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
      label="Link Building Service Line Items"
      default={[
        { name: 'Editorial Links', price: 450, estimate: 1 },
        { name: 'Expert Links', price: 5000, estimate: 6 },
        { name: 'News Links', price: 750, estimate: 1 },
      ]}
    >
      <TextField name="name" label="Item Name" default="Service Item" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
      <NumberField
        name="estimate"
        label="Link Estimate Multiplier"
        default={1}
      />
    </RepeatedFieldGroup>
    <RepeatedFieldGroup
      name="ultraPremiums"
      label="Ultra Premium Items"
      default={[
        {
          name: 'bloomberg.com',
          dr: 92,
          da: 94,
          traffic: '7.2M',
          price: 36000,
          estimate: 1,
        },
        {
          name: 'rollingstone.com',
          dr: 90,
          da: 92,
          traffic: '3.6M',
          price: 30000,
          estimate: 1,
        },
        {
          name: 'coindesk',
          dr: 90,
          da: 91,
          traffic: '2.3M',
          price: 26000,
          estimate: 1,
        },
      ]}
    >
      <TextField name="name" label="Item Name" default="Ultra Premium Item" />
      <NumberField name="dr" label="DR" default={0} />
      <NumberField name="da" label="DA" default={0} />
      <TextField name="traffic" label="Traffic" default="7.2M" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
      <NumberField
        name="estimate"
        label="Link Estimate Multiplier"
        default={1}
      />
    </RepeatedFieldGroup>
    <RepeatedFieldGroup
      name="contentServices"
      label="Content Service Line Items"
      default={[
        { name: 'Linkable Content', price: 700 },
        { name: 'Keyword Content', price: 700 },
        { name: 'Content Road Map', price: 1500 },
      ]}
    >
      <TextField name="name" label="Item Name" default="Service Item" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
    </RepeatedFieldGroup>
    <RepeatedFieldGroup
      name="technicalServices"
      label="Technical Service Line Items"
      default={[
        { name: 'Advanced Content', price: 1200 },
        { name: 'Website Audit', price: 2000 },
        { name: 'Schema Optimization', price: 300 },
      ]}
    >
      <TextField name="name" label="Item Name" default="Service Item" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = {
  label: 'Quote Generator Module',
};
