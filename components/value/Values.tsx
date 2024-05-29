'use client';

import React, { useEffect, useState } from 'react';
import CreateValue from './CreateValue';
import { toast } from 'react-toastify';
import ValueCard from './ValueCard';
import { Value } from '@prisma/client';
import { VALUE_TYPES } from '@/lib/constants';

const Values = () => {
  const [values, setValues] = useState<Value[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/value`);

      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status}`);
      }

      const data = await response.json();
      setValues(data);
      console.log('data', data);
    } catch (error: any) {
      console.error(`Error fetching items: ${error.message}`);
      toast.error('unable to fetch todos at this time');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-8 flex flex-col gap-4 justify-center max-w-96 w-full">
      <div className="flex flex-row justify-end">
        <CreateValue fetchData={fetchData} />
      </div>
      {VALUE_TYPES?.map((vt) => (
        <div key={vt?.code} className="flex flex-col gap-4">
          <div className="text-white font-semibold">{vt?.title}</div>
          <div className="flex flex-col gap-2">
            {values
              .filter((v) => v?.type === vt?.code)
              .map((v) => (
                <div key={v.id}>
                  <ValueCard value={v} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Values;
