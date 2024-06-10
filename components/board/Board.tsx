'use client';

import React, { useEffect, useState } from 'react';
import ReorderList from './ReorderList';
import { Value } from '@prisma/client';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/react';
import Greeting from './Greeting';
import { CheckIcon } from '@heroicons/react/16/solid';

const MOCKDATA: Value[] = [
  {
    id: '1',
    name: 'test1',
    description:
      'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd fdsafds dfdfdf',
    type: 'INSTRUMENTAL',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'test2',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'INSTRUMENTAL',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'test3',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'INSTRUMENTAL',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'test4',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'INSTRUMENTAL',
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'test5',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'TERMINAL',
    createdAt: new Date(),
  },
  {
    id: '6',
    name: 'test6',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'TERMINAL',
    createdAt: new Date(),
  },
  {
    id: '7',
    name: 'test7',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'TERMINAL',
    createdAt: new Date(),
  },
  {
    id: '8',
    name: 'test8',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'TERMINAL',
    createdAt: new Date(),
  },
  {
    id: '9',
    name: 'test9',
    description: 'asdfasdfas sdfd sdfsf afsd fs sdfsd d sf sd sdfd',
    type: 'TERMINAL',
    createdAt: new Date(),
  },
];

const Board = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [instrumentals, setInstrumentals] = useState<Value[]>([]);
  const [terminals, setTerminals] = useState<Value[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/value`);

      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status}`);
      }

      const data = await response.json();

      setInstrumentals(
        data?.filter((d: Value) => d?.type === 'INSTRUMENTAL')
      );
      setTerminals(
        data?.filter((d: Value) => d?.type === 'TERMINAL')
      );
      console.log('data', data);
    } catch (error: any) {
      console.error(`Error fetching items: ${error.message}`);
      toast.error('unable to fetch todos at this time');
    }
  };

  useEffect(() => {
    console.log('instrumentals', instrumentals);
  }, [instrumentals]);

  useEffect(() => {
    fetchData();
    // setInstrumentals(
    //   MOCKDATA?.filter((d: Value) => d?.type === 'INSTRUMENTAL')
    // );
    // setTerminals(
    //   MOCKDATA?.filter((d: Value) => d?.type === 'TERMINAL')
    // );
  }, []);
  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="text-white lg:text-2xl md:text-2xl text-xl font-bold bg-blue-800 w-full text-center py-3
        rounded-xl bg-opacity-20 flex flex-row items-center justify-between lg:px-8 md:px-8"
      >
        <div>Изучение ценностных ориентаций Рокича </div>
        <Button
          variant="solid"
          color={isSubmitted ? 'secondary' : 'success'}
          isLoading={loadingSubmit}
          isDisabled={isSubmitted}
          onPress={async () => {
            setLoadingSubmit(true);
            try {
              const apiUrl = '/api/submission';

              const requestData = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstName,
                  lastName,
                  instrumentalOrder: instrumentals?.map(
                    (i) => i?.name
                  ),
                  terminalOrder: terminals?.map((i) => i?.name),
                }),
              };

              const response = await fetch(apiUrl, requestData);

              if (!response.ok) {
                throw new Error(
                  `Failed to post submission: ${response.status} - ${response.statusText}`
                );
              }
              setIsSubmitted(true);
            } catch (error) {
              console.log(error);
              toast.error('Что-то пошло не так');
            } finally {
              setLoadingSubmit(false);
            }
          }}
          // size="lg"
          className="text-white text-lg font-semibold z-10 hidden lg:block md:block"
        >
          {isSubmitted ? (
            <div className="flex flex-row items-center gap-1">
              <CheckIcon className="h-6" />
              <p>Ответы загружены</p>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-1">
              <p>Закончить</p>
            </div>
          )}{' '}
        </Button>
      </div>
      <Greeting
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
      />

      <div className="flex lg:flex-row md:flex-row flex-col lg:gap-28 md:gap-28 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-xl text-white font-bold">
            Терминальные ценности
          </div>
          <p className="text-white text-center font-semibold lg:w-[26rem] w-full mb-4 leading-tight">
            убеждения в том, что конечная цель индивидуального
            существования стоит того, чтобы к ней стремиться
          </p>
          <ReorderList items={terminals} setItems={setTerminals} />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl text-white font-bold text-center">
            Инструментальные ценности
          </div>
          <p className="text-white text-center font-semibold lg:w-[26rem] w-full mb-4 leading-tight">
            убеждения в том, что какой-то образ действий или свойство
            личности является предпочтительным в любой ситуации
          </p>
          <ReorderList
            items={instrumentals}
            setItems={setInstrumentals}
          />
        </div>
      </div>
      <div className="pb-8">
        <Button
          variant="solid"
          color={isSubmitted ? 'secondary' : 'success'}
          isLoading={loadingSubmit}
          isDisabled={isSubmitted}
          onPress={async () => {
            setLoadingSubmit(true);
            try {
              const apiUrl = '/api/submission';

              const requestData = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstName,
                  lastName,
                  instrumentalOrder: instrumentals?.map(
                    (i) => i?.name
                  ),
                  terminalOrder: terminals?.map((i) => i?.name),
                }),
              };

              const response = await fetch(apiUrl, requestData);

              if (!response.ok) {
                throw new Error(
                  `Failed to post submission: ${response.status} - ${response.statusText}`
                );
              }
              setIsSubmitted(true);
            } catch (error) {
              console.log(error);
              toast.error('Что-то пошло не так');
            } finally {
              setLoadingSubmit(false);
            }
          }}
          // size="lg"
          className="text-white text-lg font-semibold z-10 lg:hidden md:hidden block"
        >
          {isSubmitted ? (
            <div className="flex flex-row items-center gap-1">
              <CheckIcon className="h-6" />
              <p>Ответы загружены</p>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-1">
              <p>Закончить</p>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Board;
