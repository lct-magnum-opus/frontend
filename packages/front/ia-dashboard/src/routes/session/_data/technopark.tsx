import { MessageType } from '@/routes/session/_components/messages.tsx';
import { SessionFormSubmitValue } from '@/routes/session/_components/form';
import { QuestionType } from '@/routes/session/_data/types.ts';
import { selectOptionsForSelect, selectOptionsForSlider } from '@/routes/session/_data/utils.ts';
import { TechnoparkType } from '@/store/technopark/types.ts';

export const technoparkQuestions: QuestionType[] = [
  {
    id: 1,
    variant: 'select',
    content:
      'В каком регионе вы хотите проинвестировать? Выберите объект из списка или оставьте поле пустым:',
    transform: (value: SessionFormSubmitValue) => ({
      region: value ? String(value) : null
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: TechnoparkType) => data.region || 'Нет предпочтений по региону'
  },
  {
    id: 2,
    variant: 'slider',
    isRange: true,
    content: 'Укажите количество резидентов:',
    transform: (value: SessionFormSubmitValue) => ({
      min_num_residents: (value as number[])[0]?.toFixed(2) ?? null,
      max_num_residents: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_num_residents !== null && data.max_num_residents !== null
        ? `От ${Number(data.min_num_residents)} до ${Number(data.max_num_residents)}`
        : 'Нет данных'
  },
  {
    id: 3,
    variant: 'slider',
    isRange: true,
    content: 'Укажите год формирования объекта:',
    transform: (value: SessionFormSubmitValue) => ({
      min_year_of_object_forming: (value as number[])[0]?.toFixed(2) ?? null,
      max_year_of_object_forming: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: (v) => ({ ...selectOptionsForSlider(v), step: 1 }),
    getMessage: (data: TechnoparkType) =>
      data.min_year_of_object_forming !== null && data.max_year_of_object_forming !== null
        ? `От ${Number(data.min_year_of_object_forming)} до ${Number(data.max_year_of_object_forming)}`
        : 'Нет данных'
  },
  {
    id: 4,
    variant: 'slider',
    isRange: true,
    content: 'Укажите общую площадь объекта:',
    transform: (value: SessionFormSubmitValue) => ({
      min_total_square: (value as number[])[0]?.toFixed(2) ?? null,
      max_total_square: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_total_square !== null && data.max_total_square !== null
        ? `От ${Number(data.min_total_square)} до ${Number(data.max_total_square)}`
        : 'Нет данных'
  },
  {
    id: 5,
    variant: 'slider',
    isRange: true,
    content: 'Укажите минимальную стоимость объекта за кв/м:',
    transform: (value: SessionFormSubmitValue) => ({
      min_minimal_cost_of_buy: (value as number[])[0]?.toFixed(2) ?? null,
      max_minimal_cost_of_buy: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_minimal_cost_of_buy !== null && data.max_minimal_cost_of_buy !== null
        ? `От ${Number(data.min_minimal_cost_of_buy)} до ${Number(data.max_minimal_cost_of_buy)}`
        : 'Нет данных'
  },
  {
    id: 6,
    variant: 'select',
    isMulti: true,
    content: 'Укажите список отраслей:',
    transform: (value: SessionFormSubmitValue) => ({
      list_of_activities: Array.isArray(value) ? value.map((i) => String(i)) : null
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: TechnoparkType) =>
      data.list_of_activities
        ? data.list_of_activities.join(', ')
        : 'Нет предпочтений по списку отраслей'
  },
  {
    id: 7,
    variant: 'select',
    isMulti: true,
    content: 'Укажите инфраструктуру и сервисы:',
    transform: (value: SessionFormSubmitValue) => ({
      infrastructure: Array.isArray(value) ? value.map((i) => String(i)) : null
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: TechnoparkType) =>
      data.infrastructure
        ? data.infrastructure.join(', ')
        : 'Нет предпочтений по инфраструктуре и сервисам'
  },
  {
    id: 8,
    variant: 'slider',
    isRange: true,
    content: 'Укажите налог на прибыль (в процентах от 0 до 1):',
    transform: (value: SessionFormSubmitValue) => ({
      min_tax_income: (value as number[])[0]?.toFixed(2) ?? null,
      max_tax_income: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_tax_income !== null && data.max_tax_income !== null
        ? `От ${Number(data.min_tax_income)} до ${Number(data.max_tax_income)}`
        : 'Нет данных'
  },
  {
    id: 9,
    variant: 'slider',
    isRange: true,
    content: 'Укажите налог на имущество (в процентах от 0 до 1):',
    transform: (value: SessionFormSubmitValue) => ({
      min_tax_estate: (value as number[])[0]?.toFixed(2) ?? null,
      max_tax_estate: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_tax_estate !== null && data.max_tax_estate !== null
        ? `От ${Number(data.min_tax_estate)} до ${Number(data.max_tax_estate)}`
        : 'Нет данных'
  },
  {
    id: 10,
    variant: 'slider',
    isRange: true,
    content: 'Укажите земельный налог (в процентах от 0 до 1):',
    transform: (value: SessionFormSubmitValue) => ({
      min_tax_ground: (value as number[])[0]?.toFixed(2) ?? null,
      max_tax_ground: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_tax_ground !== null && data.max_tax_ground !== null
        ? `От ${Number(data.min_tax_ground)} до ${Number(data.max_tax_ground)}`
        : 'Нет данных'
  },
  {
    id: 11,
    variant: 'slider',
    isRange: true,
    content: 'Укажите транспортный налог (в процентах от 0 до 1):',
    transform: (value: SessionFormSubmitValue) => ({
      min_tax_transport: (value as number[])[0]?.toFixed(2) ?? null,
      max_tax_transport: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_tax_transport !== null && data.max_tax_transport !== null
        ? `От ${Number(data.min_tax_transport)} до ${Number(data.max_tax_transport)}`
        : 'Нет данных'
  },
  {
    id: 12,
    variant: 'slider',
    isRange: true,
    content: 'Укажите страховые взносы (в процентах от 0 до 1):',
    transform: (value: SessionFormSubmitValue) => ({
      min_insurance_premiums: (value as number[])[0]?.toFixed(2) ?? null,
      max_insurance_premiums: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_insurance_premiums !== null && data.max_insurance_premiums !== null
        ? `От ${Number(data.min_insurance_premiums)} до ${Number(data.max_insurance_premiums)}`
        : 'Нет данных'
  },
  {
    id: 13,
    variant: 'boolean',
    content: 'Необходимо наличие режима свободной таможенной зоны?',
    transform: (value: SessionFormSubmitValue) => ({
      free_custom_zone: !!value
    }),
    getMessage: (data: TechnoparkType) => (data.free_custom_zone ? 'Да' : 'Нет')
  },
  {
    id: 14,
    variant: 'slider',
    isRange: true,
    content: 'Укажите минимальный объем инвестиций (в рублях):',
    transform: (value: SessionFormSubmitValue) => ({
      min_minimal_investment_volume: (value as number[])[0] ?? null,
      max_minimal_investment_volume: (value as number[])[1] ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: TechnoparkType) =>
      data.min_minimal_investment_volume !== null && data.max_minimal_investment_volume !== null
        ? `От ${Number(data.min_minimal_investment_volume)} до ${Number(data.max_minimal_investment_volume)}`
        : 'Нет данных'
  },
  {
    id: 15,
    variant: 'text',
    content:
      'Опишите дополнительные предпочтения, которые хотелось бы учесть или оставьте поле пустым:',
    transform: (value: SessionFormSubmitValue) => ({
      additional_preferences: value ? String(value) : null
    }),
    getMessage: (data: TechnoparkType) => data.additional_preferences || 'Нет предпочтений'
  }
];

export const defaultTechnoparkMessages: MessageType[] = [
  {
    type: 'secondary',
    children: (
      <>
        <h5 className="font-medium">
          Добро пожаловать в сервис инвестиционных рекомендаций Invest Advisor! Мы подберем
          идеальный объект для инвестиций, исходя из ваших предпочтений.
        </h5>
        <p className="mt-2">
          Необходимо ответить на ряд вопросов. После формирования рекомендаций можно задать
          уточнения.
        </p>
        <p className="mt-2">
          Вы хотите проинвестировать в объект ОЭЗ (особой экономической зоны) или в стандартное
          здание?
        </p>
      </>
    )
  },
  {
    type: 'primary',
    children: 'Объект ОЭЗ'
  }
];
