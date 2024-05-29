'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { toast } from 'react-toastify';

const Delete = ({
  fetchData,
  setAveragesInstrumental,
  setAveragesTerminal,
}: {
  fetchData: () => {};
  setAveragesTerminal: Dispatch<
    SetStateAction<{ value: string; averageOrder: number }[]>
  >;
  setAveragesInstrumental: Dispatch<
    SetStateAction<{ value: string; averageOrder: number }[]>
  >;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        color="danger"
        onPress={onOpen}
        className="absolute top-8 right-8 font-semibold"
      >
        Удалить все данные
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Удаление
              </ModalHeader>
              <ModalBody>
                <p>Вы уверены что хотите удалить все данные?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="light"
                  onPress={onClose}
                >
                  Отмена
                </Button>
                <Button
                  color="danger"
                  isLoading={loading}
                  onPress={async () => {
                    setLoading(true);
                    try {
                      const apiUrl = '/api/submission';

                      const requestData = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      };

                      const response = await fetch(
                        apiUrl,
                        requestData
                      );

                      if (!response.ok) {
                        throw new Error(
                          `Failed to post title: ${response.status} - ${response.statusText}`
                        );
                      }
                      setAveragesInstrumental([]);
                      setAveragesTerminal([]);
                      toast.success('Все данные удалены');
                      fetchData();
                    } catch (error) {
                      console.log(error);
                      toast.error('Что-то пошло не так');
                    } finally {
                      setLoading(false);
                      onClose();
                    }
                  }}
                >
                  Удалить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Delete;
