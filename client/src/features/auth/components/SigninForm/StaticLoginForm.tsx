'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@core/components/Button';

const StaticLoginForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleOutsideClick = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsFormVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Button
        onClick={handleClick}
        size={'sm'}
        className="rounded-md p-3 text-sm text-white shadow-md transition-all">
        Mostrar datos del login
      </Button>
      {isFormVisible && (
        <div className="mt-6 h-[60px] w-[310px] rounded-lg border-gray-300 bg-secondary-A-850 shadow-lg">
          <form>
            <div className="mp-2 mt-2 text-sm">
              <p className="text-blue-500">
                Correo: <span className="text-zinc-50">user@hackaton.com</span>{' '}
              </p>
              <p className="text-blue-500">
                {' '}
                password: <span className="text-zinc-50">12345</span>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default StaticLoginForm;
