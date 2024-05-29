'use client';

import { VALUE_TYPES } from '@/lib/constants';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateValue = ({ fetchData }: { fetchData: () => {} }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('INSTRUMENTAL');
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="solid"
          color="primary"
          onPress={() => onOpen()}
          className="capitalize"
        >
          Добавить ценность
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Создать ценность
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Название"
                  placeholder="Введите текст"
                  variant="bordered"
                  value={title}
                  onValueChange={setTitle}
                />
                <Input
                  label="Описание"
                  placeholder="Введите текст"
                  variant="bordered"
                  value={description}
                  onValueChange={setDescription}
                />
                <Select
                  isRequired
                  label="Тип ценности"
                  placeholder="Выберите тип"
                  defaultSelectedKeys={['INSTRUMENTAL']}
                  className=""
                  selectedKeys={[type]}
                  onChange={(e) => setType(e.target.value)}
                >
                  {VALUE_TYPES.map((vt) => (
                    <SelectItem key={vt.code} value={vt.code}>
                      {vt.title}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Отмена
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  onPress={async () => {
                    if (!title || !type) {
                      toast.error('Поля не могут быть пустыми');
                      return;
                    }
                    setLoading(true);
                    try {
                      const apiUrl = '/api/value';

                      const requestData = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          title,
                          description,
                          type,
                        }),
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

                      setTitle('');
                      setDescription('');
                      toast.success('Ценность создана');
                      fetchData();
                    } catch (error) {
                      console.log(error);
                      toast.error('Что-то пошло не так');
                    } finally {
                      setLoading(false);
                    }
                    onClose();
                  }}
                >
                  Создать
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateValue;
