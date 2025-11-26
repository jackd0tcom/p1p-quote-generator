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
  const initialServices =
    props.fieldValues?.services && props.fieldValues.services.length > 0
      ? props.fieldValues.services
      : defaultServices;
  return <Island module={QuoteGenerator} initialServices={initialServices} />;
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
  </ModuleFields>
);

export const meta = {
  label: 'Quote Generator Module',
};
