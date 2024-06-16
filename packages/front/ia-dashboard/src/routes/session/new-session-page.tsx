import { Message, Messages } from '@/routes/session/_components/messages.tsx';
import { FormBoolean, SessionFormSubmitValue } from '@/routes/session/_components/form';
import { useCreateBuilding } from '@/store/building/createBuilding.ts';
import { generatePath, useNavigate } from 'react-router-dom';
import { BUILDING_SESSION_ROUTE, TECHNOPARK_SESSION_ROUTE } from '@/routes/routes.tsx';
import { defaultBuildingMessages } from '@/routes/session/_data/building.tsx';
import { useCreateTechnopark } from '@/store/technopark/createTechnopark.ts';
import { Slot } from '@radix-ui/react-slot';

export function NewSessionPage() {
  const { trigger: createBuilding, isMutating: isCreateBuildingMutating } = useCreateBuilding();
  const { trigger: createTechnopark, isMutating: isCreateTechnoparkMutating } =
    useCreateTechnopark();

  const navigate = useNavigate();

  const onSubmit = async (v: SessionFormSubmitValue) => {
    const value = v as boolean;
    if (value) {
      const data = await createTechnopark({});
      navigate(generatePath(TECHNOPARK_SESSION_ROUTE, { id: data.id }));
    } else {
      const data = await createBuilding({});
      navigate(generatePath(BUILDING_SESSION_ROUTE, { id: data.id }));
    }
  };

  const loading = isCreateBuildingMutating || isCreateTechnoparkMutating;

  return (
    <div className={'grid grid-rows-[1fr_auto] h-full'}>
      <div className="relative pt-5 md:pt-10 pb-5 px-5 overflow-y-scroll">
        <Messages className="max-w-full lg:max-w-[700px] xl:max-w-[900px] mx-auto overflow-x-hidden">
          <Message.Secondary>{defaultBuildingMessages[0].children}</Message.Secondary>
        </Messages>
      </div>

      <div className="pb-4 pt-0 pl-5 pr-5 lg:pr-7">
        <Slot className="max-w-full lg:max-w-[700px] xl:max-w-[900px] mx-auto">
          <FormBoolean
            className="max-w-[600px] mx-auto"
            buttons={{
              yes: 'Объект ОЭЗ',
              no: 'Стандратный объект'
            }}
            onSubmit={onSubmit}
            loading={loading}
          />
        </Slot>
      </div>
    </div>
  );
}
