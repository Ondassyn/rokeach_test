'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Value } from '@prisma/client';
import React from 'react';

const ValueCard = ({ value }: { value: Value }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="font-semibold text-lg -mb-6 text-blue-800">
          {value?.name}
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-base leading-tight text-blue-900">
          {value?.description}
        </p>
      </CardBody>
    </Card>
  );
};

export default ValueCard;
