'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@core/components/Button';
import { CopyIcon } from '@core/components/Icon/Copy';
import { useCopyToClipboard } from '@core/hooks/useCopyToClipboard';
import { useToast } from '@features/toast/hooks/useToast';

const StaticLoginForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [copy] = useCopyToClipboard();
  const { showToast: toast } = useToast();

  const handleClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCopy = (text: string) => {
    copy(text);
    toast({
      id: crypto.randomUUID(),
      title: 'Copiado',
      description: 'Se copio el texto en el portapapeles',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Button
        onClick={handleClick}
        size={'sm'}
        className="rounded-md p-3 text-sm text-white shadow-md transition-all">
        Mostrar datos del login
      </Button>
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-6 h-[80px] w-[310px] rounded-lg border-gray-300 bg-secondary-A-850 shadow-lg">
            <div className="mp-2 mt-2 space-y-4 px-7 text-sm">
              <div className="flex items-center justify-between">
                <p className="sapce-x-2 w-fit text-left text-blue-500">
                  Email: <span className="text-zinc-50">cesar@example.com</span>
                </p>
                <Button
                  size="fit"
                  onClick={() => handleCopy('cesar@example.com')}
                  className="ml-5 !border-none !bg-transparent text-white opacity-80 hover:!bg-transparent hover:opacity-85 active:!bg-transparent active:opacity-100">
                  <CopyIcon />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <p className="sapce-x-2 w-fit text-left text-blue-500">
                  Password: <span className="text-zinc-50">@123456Cc</span>
                </p>
                <Button
                  size="fit"
                  onClick={() => handleCopy('@123456Cc')}
                  className="ml-5 !border-none !bg-transparent text-white opacity-80 hover:!bg-transparent hover:opacity-85 active:!bg-transparent active:opacity-100">
                  <CopyIcon />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaticLoginForm;
