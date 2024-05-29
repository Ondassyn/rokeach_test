'use client';

import { Prisma, SurveySubmission } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
} from '@nextui-org/react';
import { format } from 'date-fns';
import Delete from './Delete';

type SurveySubmissionWithUser = Prisma.SurveySubmissionGetPayload<{
  include: { user: true };
}>;

const Stats = () => {
  const [data, setData] = useState<SurveySubmissionWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [averagesTerminal, setAveragesTerminal] = useState<
    { value: string; averageOrder: number }[]
  >([]);
  const [averagesInstrumental, setAveragesInstrumental] = useState<
    { value: string; averageOrder: number }[]
  >([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/submission`);

      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status}`);
      }

      const resData = await response.json();

      console.log('data', resData);
      setData(resData);
    } catch (error: any) {
      console.error(`Error fetching items: ${error.message}`);
      toast.error('unable to fetch data at this time');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.length) {
      const valueOrderMapInstrumental: any = {};
      const valueOrderMapTerminal: any = {};

      data.forEach((submission) => {
        submission.instrumentalOrder.forEach((value, index) => {
          if (!valueOrderMapInstrumental[value]) {
            valueOrderMapInstrumental[value] = {
              totalOrder: 0,
              count: 0,
            };
          }
          valueOrderMapInstrumental[value].totalOrder += index + 1;
          valueOrderMapInstrumental[value].count += 1;
        });

        submission.terminalOrder.forEach((value, index) => {
          if (!valueOrderMapTerminal[value]) {
            valueOrderMapTerminal[value] = {
              totalOrder: 0,
              count: 0,
            };
          }
          valueOrderMapTerminal[value].totalOrder += index + 1;
          valueOrderMapTerminal[value].count += 1;
        });
      });

      const aveInstrumental = Object.keys(
        valueOrderMapInstrumental
      ).map((value) => ({
        value,
        averageOrder:
          valueOrderMapInstrumental[value].totalOrder /
          valueOrderMapInstrumental[value].count,
      }));
      const aveTerminal = Object.keys(valueOrderMapTerminal).map(
        (value) => ({
          value,
          averageOrder:
            valueOrderMapTerminal[value].totalOrder /
            valueOrderMapTerminal[value].count,
        })
      );
      setAveragesTerminal(
        aveTerminal.sort((a, b) => a?.averageOrder - b?.averageOrder)
      );
      setAveragesInstrumental(
        aveInstrumental.sort(
          (a, b) => a?.averageOrder - b?.averageOrder
        )
      );
      console.log('averagesTerminal', aveTerminal);
    }
  }, [data]);
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Delete
        fetchData={fetchData}
        setAveragesTerminal={setAveragesTerminal}
        setAveragesInstrumental={setAveragesInstrumental}
      />
      <div className="text-xl text-white font-bold">Статистика</div>
      <div className="text-xl font-semibold text-white">
        Средние позиции ценностей
      </div>
      <div className="flex flex-row gap-12">
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-semibold text-white">
            Терминальные ценности
          </div>
          {loading ? (
            <CircularProgress className="py-4" />
          ) : (
            <Table
              isStriped
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>Ценность</TableColumn>
                <TableColumn>Срендяя позиция</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={'Нет данных'}
                isLoading={loading}
              >
                {averagesTerminal?.map((a, index) => (
                  <TableRow key={index}>
                    <TableCell>{a?.value}</TableCell>
                    <TableCell className="text-center">
                      {a?.averageOrder}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-semibold text-white">
            Инструментальные ценности
          </div>
          {loading ? (
            <CircularProgress className="py-4" />
          ) : (
            <Table
              isStriped
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>Ценность</TableColumn>
                <TableColumn>Срендяя позиция</TableColumn>
              </TableHeader>
              <TableBody emptyContent={'Нет данных'}>
                {averagesInstrumental?.map((a, index) => (
                  <TableRow key={index}>
                    <TableCell>{a?.value}</TableCell>
                    <TableCell className="text-center">
                      {a?.averageOrder}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="text-white text-lg font-semibold">
          Результаты пользователей
        </div>
        {loading ? (
          <CircularProgress className="py-4" size="lg" />
        ) : (
          <div className="flex flex-wrap gap-2">
            {data?.length ? (
              data?.map((d) => (
                <Card key={d?.id}>
                  <CardHeader>
                    <div className="flex flex-row w-full font-semibold justify-between gap-4">
                      <div>{`${d?.user?.firstName} ${d?.user?.lastName}`}</div>
                      <div className="font-light text-sm">
                        {format(new Date(d?.createdAt), 'dd/MM/yyyy')}
                      </div>
                    </div>
                  </CardHeader>
                  <Divider className="mb-3 -mt-2" />
                  <CardBody className="-mt-4">
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-col items-center">
                        <div className="font-medium">
                          Терминальные
                        </div>
                        {d?.terminalOrder?.map((o, index) => (
                          <div key={index}>{`${
                            index + 1
                          }. ${o}`}</div>
                        ))}
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="font-medium">
                          Инструментальные
                        </div>
                        {d?.instrumentalOrder?.map((o, index) => (
                          <div key={index}>{`${
                            index + 1
                          }. ${o}`}</div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div className="text-white">Нет данных</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
