export type ChatType = {
  id: string;
  name: string;
  type: 'building' | 'technopark';
};

export type ChatMessageType = {
  text?: string | null;
  from_user?: boolean;
  created?: string;
  data?: ChatTechnoparkDataItem[] | null;
  file?: string | null;
};

export type ChatTechnoparkDataItem = {
  link: string;
  name: string;
  type: string;
  tax_estate: string;
  tax_ground: string;
  tax_income: string;
  insurance_premiums: string;
  minimal_cost_of_buy: string;
};

export type ChatBuildingDataItem = {
  name: string;
  cost_object: string;
  site_format: string[];
  ownership_form: string;
  pref_treatment: string;
  municipal_entity: string;
  transaction_form: string[];
  support_infra_object: string;
  // "name": "Производственное помещение на териитории Московского комбината шампанских вин (АО «Московский комбинат шампанских вин»)",
  // "cost_object": "9000.00",
  // "site_format": [
  //   "Помещение"
  // ],
  // "ownership_form": "Частная",
  // "pref_treatment": "Отсутствует",
  // "municipal_entity": "Западный административный округ",
  // "transaction_form": [
  //   "Аренда"
  // ],
  // "support_infra_object": "Без льгот"
};
