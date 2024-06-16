export type TechnoparkType = {
  id: string | null;
  name: string | null;
  state: number | null;
  region: string | null;
  min_num_residents: number | null;
  max_num_residents: number | null;
  min_year_of_object_forming: number | null;
  max_year_of_object_forming: number | null;
  min_total_square: number | null;
  max_total_square: number | null;
  min_minimal_cost_of_buy: number | null;
  max_minimal_cost_of_buy: number | null;
  list_of_activities: string[] | null;
  infrastructure: string[] | null;
  min_tax_income: string | null;
  max_tax_income: string | null;
  min_tax_estate: string | null;
  max_tax_estate: string | null;
  min_tax_ground: string | null;
  max_tax_ground: string | null;
  min_tax_transport: string | null;
  max_tax_transport: string | null;
  min_insurance_premiums: string | null;
  max_insurance_premiums: string | null;
  free_custom_zone: boolean | null;
  min_minimal_investment_volume: string | null;
  max_minimal_investment_volume: string | null;
  additional_preferences: string | null;
  user: number | null;
};


