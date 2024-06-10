'use client';

import { Value } from '@prisma/client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import ValueCard from '../value/ValueCard';

const ReorderList = ({
  items,
  setItems,
}: {
  items: Value[];
  setItems: Dispatch<SetStateAction<Value[]>>;
}) => {
  useEffect(() => {
    document.getElementById('listItem')?.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  }, []);

  return (
    <div className="flex flex-row">
      <div id="listItem" className="lg:w-[26rem] w-full">
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
          {items.map((item, index) => (
            <Reorder.Item
              className="py-1 cursor-grab flex flex-row items-center"
              key={item?.id}
              value={item}
            >
              <div
                className="lg:text-4xl md:text-4xl text-2xl text-white font-bold 
                lg:w-12 md:w-12 w-10 shrink-0"
              >
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
