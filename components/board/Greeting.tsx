import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
const Greeting = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}: {
  firstName: string;
  lastName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="opaque"
      size="5xl"
      hideCloseButton={true}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center">
              Инструкция
            </ModalHeader>
            <ModalBody>
              <div className="whitespace-pre-line text-center">
                {`Вам будут предложены два набора по 18 карточек, где написаны ценности – базовые принципы, которыми вы руководствуетесь в жизни. Ваша задача – разложить их по порядку значимости лично для вас. 
                
                Внимательно изучите первый список «Терминальные ценности» и меняйте карточки местами так, чтобы наиболее значимые ценности были выше. Соответственно, наименее важные ценности должны оказаться ниже. 
                
                Затем точно так же перетасуйте второй список «Инструментальные ценности». 
                
                Работайте не спеша, вдумчиво. Здесь нет правильных или неправильных ответов. Если в процессе работы вы измените свое мнение, то можете исправить свои ответы, поменяв карточки местами. Конечный результат должен отражать вашу истинную позицию.`}
              </div>
              <div className="font-bold text-center mb-4 text-danger-600">{`ПО ЗАВЕРШЕНИЮ ОБЯЗАТЕЛЬНО НАЖАТЬ НА КНОПКУ "ЗАВЕРШИТЬ".`}</div>
              <div className="flex flex-row gap-4">
                <Input
                  isRequired
                  autoFocus
                  label="Имя"
                  placeholder="Введите свое имя"
                  variant="bordered"
                  value={firstName}
                  onValueChange={setFirstName}
                />
                <Input
                  isRequired
                  label="Фамилия"
                  placeholder="Введите свою фамилию"
                  variant="bordered"
                  value={lastName}
                  onValueChange={setLastName}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col items-center">
              <Button
                color="primary"
                onPress={async () => {
                  if (!firstName || !lastName) {
                    toast.error(
                      'Имя и фамилия не могут быть пустыми'
                    );
                    return;
                  }

                  onClose();
                }}
                className="font-bold text-lg"
              >
                Начать
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Greeting;
