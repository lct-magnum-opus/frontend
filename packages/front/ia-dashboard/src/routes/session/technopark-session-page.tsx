import { Message, Messages, MessageType } from '@/routes/session/_components/messages.tsx';
import {
  FormBoolean,
  FormSelect,
  FormSlider,
  FormText,
  SessionFormSubmitValue
} from '@/routes/session/_components/form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  defaultTechnoparkMessages,
  technoparkQuestions
} from '@/routes/session/_data/technopark.tsx';
import { useTechnopark } from '@/store/technopark/getTechnopark.ts';
import { useTechnoparkOptions } from '@/store/technopark/getTechnoparkOptions.ts';
import { Slot } from '@radix-ui/react-slot';
import { useUpdateTechnopark } from '@/store/technopark/updateTechnopark.ts';
import {
  ParsedMessageType,
  ParsedOptionsSelect,
  ParsedOptionsSlider
} from '@/routes/session/_data/types.ts';
import { usePrevious } from '@/hooks/usePrevious.ts';
import { last, sortBy } from 'lodash-es';
import { useSubmitTechnopark } from '@/store/technopark/submitTechnopark.ts';
import { useMessages } from '@/store/chat/getMessages.ts';
import { marked } from 'marked';
import { useCreateMessage } from '@/store/chat/createMessage.ts';
import { HOME_ROUTE } from '@/routes/routes.tsx';
import { ChatMessageType, ChatTechnoparkDataItem } from '@/store/chat/types.ts';
import { TechnoparkTableHeader } from '@/routes/session/_components/technopark-table/technopark-table-header.tsx';
import { Table, TableBody } from '@/components/ui/table.tsx';
import { TechnoparkTableRow } from '@/routes/session/_components/technopark-table/technopark-table-row.tsx';
import { useCreateReport } from '@/store/chat/createReport.ts';
import { Button } from '@/components/ui/button.tsx';
import { Download } from 'lucide-react';

export function TechnoparkSessionPage() {
  const { id: _id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  // todo добавить проверку, что с айди все впорядке и объект существует
  const id = _id as string;
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const addMessage = (message: MessageType) =>
    setMessages((messages) => {
      const newMessages = [...messages];
      if (messages.find((i) => message.type === 'secondary' && i.children === message.children)) {
        return newMessages;
      }

      return [...newMessages, message];
    });

  const { trigger: submitTechnopark } = useSubmitTechnopark();

  const question = useMemo(
    () => technoparkQuestions.find((i) => i.id === questionId),
    [questionId]
  );

  const { data: technopark, isLoading: isTechnoparkLoading } = useTechnopark({
    id
  });

  const { data: _options } = useTechnoparkOptions({
    id,
    question: questionId || undefined
  });

  const options = useMemo(
    () => (_options ? question?.selectOptions?.(_options) : undefined),
    [_options]
  );
  const nextQuestionId = useMemo(() => _options?.next_question || null, [_options]);

  useEffect(() => {
    if (_options?.next_question === null) {
      const question = last(technoparkQuestions);
      if (question) {
        addMessage({ type: 'secondary', children: question.content, questionId: question.id });
      }
      return;
    }
  }, [_options]);

  useEffect(() => {
    if (!options) return;

    if (
      (Array.isArray(options) && options.length === 0) ||
      (!Array.isArray(options) &&
        (options as ParsedOptionsSlider).min === (options as ParsedOptionsSlider).max)
    ) {
      if (nextQuestionId) {
        const question = technoparkQuestions.find((i) => i.id === questionId);
        if (question) {
          addMessage({ type: 'secondary', children: question.content, questionId: question.id });
        }
        addMessage({ type: 'primary', children: 'Нет данных' });
        setQuestionId(nextQuestionId);
      }
    } else {
      if (question) {
        addMessage({ type: 'secondary', children: question.content, questionId: question.id });
      }
    }
  }, [options, nextQuestionId, question]);

  const { trigger: updateTechnopark, isMutating } = useUpdateTechnopark();

  const onSubmit = async (v: SessionFormSubmitValue) => {
    if (question) {
      const data = question.transform(v);
      await updateTechnopark({
        id,
        state: nextQuestionId ? nextQuestionId - 1 : last(technoparkQuestions)?.id,
        ...data
      });

      addMessage({ type: 'primary', children: question.getMessage(data) });

      if (nextQuestionId === null) {
        setQuestionId(null);
        await submitTechnopark({ id });
        setSubmitted(true);
      } else {
        const nextQuestion = technoparkQuestions.find((i) => i.id === nextQuestionId);
        if (nextQuestion) {
          addMessage({
            type: 'secondary',
            children: nextQuestion.content,
            questionId: question.id
          });
        } else {
          const question = last(technoparkQuestions);
          if (question) {
            addMessage({ type: 'secondary', children: question.content, questionId: question.id });
          }
        }

        setQuestionId(nextQuestionId);
      }
    }
  };

  const formProps = {
    onSubmit,
    loading: isMutating
  };

  const prevTId = usePrevious(technopark?.id);

  useEffect(() => {
    if (technopark) {
      if (technopark.id === prevTId) return;

      const previousMessages: MessageType[] =
        technopark.state && technopark.state > 0
          ? technoparkQuestions
              .filter((question) => question.id <= (technopark.state as number))
              .flatMap((question) => [
                {
                  type: 'secondary',
                  children: question.content,
                  questionId: question.id
                },
                {
                  type: 'primary',
                  children: question.getMessage(technopark)
                }
              ])
          : [];

      const questionId = (technopark.state ?? 0) + 1;
      const question = technoparkQuestions.find((i) => i.id === questionId);

      setMessages([
        ...defaultTechnoparkMessages,
        ...previousMessages,
        ...(question
          ? [
              {
                type: 'secondary',
                children: question.content,
                questionId: question.id
              } as MessageType
            ]
          : [])
      ]);

      setQuestionId(questionId);
    }
  }, [technopark]);

  /**
   * Работа с чатом после стадии формы
   */

  const [requestedReportName, setRequestedReportName] = useState<string | null>(null);
  const { trigger: createReport } = useCreateReport();
  const requestReport = async (name: string) => {
    setRequestedReportName(name);
    await createReport({
      id,
      name
    });
  };

  const { data: chatMessages } = useMessages({
    id,
    refreshInterval: (data: ChatMessageType[] | undefined) => {
      const lastMessage = last(sortBy(data, (i) => new Date(i.created ?? '')));
      if (
        (lastMessage && lastMessage.from_user) ||
        (technopark?.state === 15 && !data?.length) ||
        requestedReportName
      ) {
        return 500;
      }

      return 0;
    }
  });

  const { trigger: createMessage } = useCreateMessage();

  const onSubmitMessage = async (value: any) => {
    if (id && value) {
      await createMessage({
        id,
        text: value
      });
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (chatMessages?.length) {
      setSubmitted(false);

      const file = chatMessages.find((i) => i.file)?.file;
      if (file) {
        setRequestedReportName(null);
      }
    }
  }, [chatMessages]);

  const [parsedChatMessages, setParsedChatMessages] = useState<ParsedMessageType[]>([]);
  const isSubmitted = submitted || technopark?.state === 15 || !!parsedChatMessages.length;
  const responseLoading =
    isSubmitted &&
    ((last(parsedChatMessages) && last(parsedChatMessages)?.from_user) ||
      parsedChatMessages.length === 0);

  useEffect(() => {
    if (chatMessages?.length) {
      (async () => {
        const html = await Promise.all(
          sortBy(chatMessages, (i) => new Date(i.created ?? '')).map(async (i) => ({
            from_user: !!i.from_user,
            data: i.data,
            file: i.file?.replace('http', 'https'),
            text: i.text,
            html: (
              await marked.parse(i?.text?.replace(/^"/gi, '').replace(/"$/gi, '') ?? '', {
                breaks: true
              })
            )
              // @ts-ignore
              .replaceAll('\\n', '<br>')
              .replaceAll(/#+/gi, '')
          }))
        );

        setParsedChatMessages(html);
        setSubmitted(false);
      })();
    }
  }, [chatMessages, submitted]);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight
        });
      }
    });
  }, [messages, parsedChatMessages]);

  let filteredMessages: MessageType[] = [...messages].filter((i) => !!i.children);

  if (!isTechnoparkLoading && !technopark) {
    return <Navigate to={HOME_ROUTE} replace />;
  }

  return (
    <div className={'grid grid-rows-[1fr_auto] h-full'}>
      <div className="relative pt-5 md:pt-10 pb-5 px-5 overflow-y-scroll" ref={ref}>
        <Messages className="max-w-full lg:max-w-[700px] xl:max-w-[900px] mx-auto overflow-x-hidden">
          {filteredMessages.map(
            (message, index) => message.children && <Message {...message} key={index} />
          )}

          {!!parsedChatMessages.length &&
            parsedChatMessages.map((item, index) => (
              <Message type={item.from_user ? 'primary' : 'secondary'} key={`abc-${index}`}>
                {!item.file && <div dangerouslySetInnerHTML={{ __html: item.html }} />}

                {item.file && (
                  <Button className="p-0 h-fit text-wrap" variant="link" size={'sm'} asChild>
                    <a href={item.file} target={'_blank'} download>
                      <Download className="mr-2 h-4 w-4 min-w-4" />
                      Отчет по объекту {!!item.text && `"${item.text}"`}
                    </a>
                  </Button>
                )}

                {item.data && (
                  <>
                    <strong className="block my-4">
                      Таблица с подробными характеристиками объектов. Чтобы сформировать отчет,
                      нажмите на иконку в строке с нужным объектом.
                    </strong>
                    <Table className="">
                      <TechnoparkTableHeader />

                      <TableBody>
                        {item.data?.map((i, index) => (
                          <TechnoparkTableRow
                            requestedReportName={requestedReportName}
                            requestReport={requestReport}
                            {...(i as ChatTechnoparkDataItem)}
                            key={index}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </Message>
            ))}
        </Messages>
      </div>

      <div className="pb-4 pt-0 pl-5 pr-5 lg:pr-7">
        {(isSubmitted || responseLoading) && (
          <Slot className="max-w-full lg:max-w-[700px] xl:max-w-[900px] mx-auto">
            <FormText onSubmit={onSubmitMessage} loading={responseLoading} />
          </Slot>
        )}

        {question && !isSubmitted && (
          <Slot className="max-w-full lg:max-w-[700px] xl:max-w-[900px] mx-auto">
            {question.variant === 'select' ? (
              <FormSelect
                isMulti={question.isMulti}
                options={(options || []) as ParsedOptionsSelect}
                key={`form-select-${question.id}`}
                {...formProps}
              />
            ) : question.variant === 'slider' ? (
              <FormSlider
                isRange={question.isRange}
                min={(options as ParsedOptionsSlider)?.min}
                max={(options as ParsedOptionsSlider)?.max}
                step={(options as ParsedOptionsSlider)?.step}
                key={`form-slider-${question.id}`}
                {...formProps}
              />
            ) : question.variant === 'boolean' ? (
              <FormBoolean {...formProps} key={`form-boolean-${question.id}`} />
            ) : question.variant === 'text' ? (
              <FormText {...formProps} key={`form-text-${question.id}`} />
            ) : null}
          </Slot>
        )}
      </div>
    </div>
  );
}
