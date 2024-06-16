import { MessageType } from '@/routes/session/_components/messages.tsx';
import { SessionFormSubmitValue } from '@/routes/session/_components/form';
import { QuestionType } from '@/routes/session/_data/types.ts';
import { BuildingType } from '@/store/building/types.ts';
import { selectOptionsForSelect, selectOptionsForSlider } from '@/routes/session/_data/utils.ts';

export const buildingQuestions: QuestionType[] = [
  {
    id: 1,
    variant: 'select',
    content: 'Нужен преференциальный режим?',
    transform: (value: SessionFormSubmitValue) => ({
      pref_treatment: value ? String(value) : 'Отсутствует'
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: BuildingType) => data.pref_treatment || 'Отсутствует'
  },
  {
    id: 2,
    variant: 'select',
    content:
      'В каком регионе вы хотите проинвестировать? Выберите объект из списка или оставьте поле пустым:',
    transform: (value: SessionFormSubmitValue) => ({
      region: value ? String(value) : null
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: BuildingType) => data.region || 'Нет предпочтений по региону'
  },
  {
    id: 3,
    variant: 'select',
    isMulti: true,
    content: 'Укажите формат площадки:',
    transform: (value: SessionFormSubmitValue) => ({
      site_format: Array.isArray(value) ? value.map((i) => String(i)) : null
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: BuildingType) =>
      data.site_format ? data.site_format.join(', ') : 'Нет предпочтений по формату площадки'
  },
  {
    id: 4,
    variant: 'select',
    isMulti: true,
    content: 'Укажите тип площадки:',
    transform: (value: SessionFormSubmitValue) => ({
      site_type: Array.isArray(value) ? value.map((i) => String(i)) : null
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: BuildingType) =>
      data.site_type ? data.site_type.join(', ') : 'Нет предпочтений по типу площадки'
  },
  {
    id: 5,
    variant: 'select',
    isMulti: true,
    content: 'Укажите форму сделки:',
    transform: (value: SessionFormSubmitValue) => ({
      transaction_form: Array.isArray(value) ? value.map((i) => String(i)) : null
    }),
    selectOptions: selectOptionsForSelect,
    getMessage: (data: BuildingType) =>
      data.transaction_form ? data.transaction_form.join(', ') : 'Нет предпочтений по форме сделки'
  },
  {
    id: 6,
    variant: 'slider',
    isRange: true,
    content: 'Укажите стоимость сделки, руб./кв. м:',
    transform: (value: SessionFormSubmitValue) => ({
      min_cost_object: (value as number[])[0]?.toFixed(2) ?? null,
      max_cost_object: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_cost_object !== null && data.max_cost_object !== null
        ? `От ${Number(data.min_cost_object)} до ${Number(data.max_cost_object)}`
        : 'Нет данных'
  },
  // водоснабжение
  {
    id: 7,
    variant: 'boolean',
    content: 'Необходимо наличие водоснабжения?',
    transform: (value: SessionFormSubmitValue) => ({
      water_supply_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.water_supply_available ? 'Да' : 'Нет')
  },
  {
    id: 8,
    variant: 'slider',
    isRange: true,
    content: 'Укажите тариф на потребление воды:',
    transform: (value: SessionFormSubmitValue) => ({
      min_water_supply_rate_consumption: (value as number[])[0]?.toFixed(2) ?? null,
      max_water_supply_rate_consumption: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_water_supply_rate_consumption !== null &&
      data.max_water_supply_rate_consumption !== null
        ? `От ${Number(data.min_water_supply_rate_consumption)} до ${Number(data.max_water_supply_rate_consumption)}`
        : 'Нет данных'
  },
  {
    id: 9,
    variant: 'slider',
    isRange: true,
    content: 'Максимально допустимая мощность объектов водоснабжения, куб. м/ч:',
    transform: (value: SessionFormSubmitValue) => ({
      min_water_supply_objects_max_capacity: (value as number[])[0]?.toFixed(2) ?? null,
      max_water_supply_objects_max_capacity: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_water_supply_objects_max_capacity !== null &&
      data.max_water_supply_objects_max_capacity !== null
        ? `От ${Number(data.min_water_supply_objects_max_capacity)} до ${Number(data.max_water_supply_objects_max_capacity)}`
        : 'Нет данных'
  },
  // газоснабжение
  {
    id: 10,
    variant: 'boolean',
    content: 'Необходимо наличие газоснабжения?',
    transform: (value: SessionFormSubmitValue) => ({
      gas_supply_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.gas_supply_available ? 'Да' : 'Нет')
  },
  {
    id: 11,
    variant: 'slider',
    isRange: true,
    content: 'Укажите тариф на потребление газа:',
    transform: (value: SessionFormSubmitValue) => ({
      gas_supply_rate_consumption_min: (value as number[])[0]?.toFixed(2) ?? null,
      gas_supply_rate_consumption_max: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.gas_supply_rate_consumption_min !== null && data.gas_supply_rate_consumption_max !== null
        ? `От ${Number(data.gas_supply_rate_consumption_min)} до ${Number(data.gas_supply_rate_consumption_max)}`
        : 'Нет данных'
  },
  {
    id: 12,
    variant: 'slider',
    isRange: true,
    content: 'Укажите тариф на транспортировку газа:',
    transform: (value: SessionFormSubmitValue) => ({
      min_gas_supply_rate_transport: (value as number[])[0]?.toFixed(2) ?? null,
      max_gas_supply_rate_transport: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_gas_supply_rate_transport !== null && data.max_gas_supply_rate_transport !== null
        ? `От ${Number(data.min_gas_supply_rate_transport)} до ${Number(data.max_gas_supply_rate_transport)}`
        : 'Нет данных'
  },
  // электроснабжение
  {
    id: 13,
    variant: 'boolean',
    content: 'Необходимо наличие электроснабжения?',
    transform: (value: SessionFormSubmitValue) => ({
      electricity_supply_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.electricity_supply_available ? 'Да' : 'Нет')
  },
  {
    id: 14,
    variant: 'slider',
    isRange: true,
    content: 'Укажите тариф на потребление электричества:',
    transform: (value: SessionFormSubmitValue) => ({
      min_electricity_rate_consumption: (value as number[])[0]?.toFixed(2) ?? null,
      max_electricity_rate_consumption: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_electricity_rate_consumption !== null &&
      data.max_electricity_rate_consumption !== null
        ? `От ${Number(data.min_electricity_rate_consumption)} до ${Number(data.max_electricity_rate_consumption)}`
        : 'Нет данных'
  },
  {
    id: 15,
    variant: 'slider',
    isRange: true,
    content: 'Укажите тариф на транспортировку электричества:',
    transform: (value: SessionFormSubmitValue) => ({
      min_electricity_rate_transport: (value as number[])[0]?.toFixed(2) ?? null,
      max_electricity_rate_transport: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_electricity_rate_transport !== null && data.max_electricity_rate_transport !== null
        ? `От ${Number(data.min_electricity_rate_transport)} до ${Number(data.max_electricity_rate_transport)}`
        : 'Нет данных'
  },
  // теплоснабжение
  {
    id: 16,
    variant: 'boolean',
    content: 'Необходимо наличие теплоснабжения?',
    transform: (value: SessionFormSubmitValue) => ({
      heating_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.heating_available ? 'Да' : 'Нет')
  },
  {
    id: 17,
    variant: 'slider',
    isRange: true,
    content: 'Укажите тариф на потребление энергии, руб./Гкал*ч:',
    transform: (value: SessionFormSubmitValue) => ({
      min_heating_rate_consumption: (value as number[])[0]?.toFixed(2) ?? null,
      max_heating_rate_consumption: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_heating_rate_consumption !== null && data.max_electricity_rate_consumption !== null
        ? `От ${Number(data.min_heating_rate_consumption)} до ${Number(data.max_electricity_rate_consumption)}`
        : 'Нет данных'
  },
  {
    id: 18,
    variant: 'slider',
    isRange: true,
    content: 'Укажите тариф на транспортировку энергии, руб./Гкал*ч:',
    transform: (value: SessionFormSubmitValue) => ({
      min_heating_rate_transport: (value as number[])[0]?.toFixed(2) ?? null,
      max_heating_rate_transport: (value as number[])[1]?.toFixed(2) ?? null
    }),
    selectOptions: selectOptionsForSlider,
    getMessage: (data: BuildingType) =>
      data.min_heating_rate_transport !== null && data.max_heating_rate_transport !== null
        ? `От ${Number(data.min_heating_rate_transport)} до ${Number(data.max_heating_rate_transport)}`
        : 'Нет данных'
  },
  // доп вопросы
  {
    id: 19,
    variant: 'boolean',
    content: 'Необходим вывоз ТКО?',
    transform: (value: SessionFormSubmitValue) => ({
      waste_disposal_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.waste_disposal_available ? 'Да' : 'Нет')
  },
  {
    id: 20,
    variant: 'boolean',
    content: 'Необходимо наличие подъездных путей?',
    transform: (value: SessionFormSubmitValue) => ({
      access_roads_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.access_roads_available ? 'Да' : 'Нет')
  },
  {
    id: 21,
    variant: 'boolean',
    content: 'Необходимо наличие Ж/Д?',
    transform: (value: SessionFormSubmitValue) => ({
      railways_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.railways_available ? 'Да' : 'Нет')
  },
  {
    id: 22,
    variant: 'boolean',
    content: 'Необходимо наличие парковки грузового транспорта?',
    transform: (value: SessionFormSubmitValue) => ({
      truck_parking_available: !!value
    }),
    getMessage: (data: BuildingType) => (data.truck_parking_available ? 'Да' : 'Нет')
  },
  {
    id: 23,
    variant: 'text',
    content:
      'Опишите дополнительные предпочтения, которые хотелось бы учесть или оставьте поле пустым:',
    transform: (value: SessionFormSubmitValue) => ({
      additional_comments: value ? String(value) : null
    }),
    getMessage: (data: BuildingType) => data.additional_comments || 'Нет предпочтений'
  }
];

export const defaultBuildingMessages: MessageType[] = [
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
    children: 'Стандартное здание'
  }
];
