'use client';

import { Value } from '@prisma/client';
import React, { Dispatch, SetStateAction } from 'react';
import { Reorder } from 'framer-motion';
import ValueCard from '../value/ValueCard';

const ReorderList = ({
  items,
  setItems,
}: {
  items: Value[];
  setItems: Dispatch<SetStateAction<Value[]>>;
}) => {
  return (
    <div className="flex flex-row w-96">
      <div></div>
      <div className="w-96">
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
          {items.map((item, index) => (
            <Reorder.Item
              className="py-1 cursor-pointer flex flex-row items-center"
              key={item?.id}
              value={item}
            >
              <div className="text-4xl text-white font-bold w-12 shrink-0">
                {index + 1}
              </div>
              <ValueCard value={item} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default ReorderList;
