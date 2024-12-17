'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@core/components/Button';

const StaticLoginForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleClick = () => {
    setIsFormVisible(!isFormVisible);
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
            className="mt-6 h-[60px] w-[310px] rounded-lg border-gray-300 bg-secondary-A-850 shadow-lg">
            <div className="mp-2 mt-2 text-sm">
              <p className="text-blue-500">
                Correo: <span className="text-zinc-50">user@hackaton.com</span>{' '}
              </p>
              <p className="text-blue-500">
                {' '}
                password: <span className="text-zinc-50">12345</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaticLoginForm;
