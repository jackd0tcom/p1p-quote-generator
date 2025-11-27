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
    },
    {
      name: 'rollingstone.com',
      dr: 90,
      da: 92,
      traffic: '3.6M',
      price: 30000,
    },
    { name: 'coindesk', dr: 90, da: 91, traffic: '2.3M', price: 26000 },
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
  return (
    <Island
      module={QuoteGenerator}
      initialServices={initialServices}
      initialUltraPremiums={initialUltraPremiums}
    />
  );
}

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      name="services"
      label="Service Line Items"
      default={[
        { name: 'Editorial Links', price: 450, estimate: 1 },
        { name: 'Expert Links', price: 5000, estimate: 6 },
        { name: 'News Links', price: 750, estimate: 1 },
      ]}
    >
      <TextField name="name" label="Item Name" default="Service Item" />
      <NumberField name="price" label="Unit Price ($)" default={0} />
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
        },
        {
          name: 'rollingstone.com',
          dr: 90,
          da: 92,
          traffic: '3.6M',
          price: 30000,
        },
        { name: 'coindesk', dr: 90, da: 91, traffic: '2.3M', price: 26000 },
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
