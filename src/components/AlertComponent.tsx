import { useEffect } from 'react';

const AlertComponent: React.FC<{ type: 'success' | 'failure', message: string, onClose: () => void }> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Ocultar o alerta após 3000 milissegundos (3 segundos)

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 ${
        type === 'success' ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'
      } rounded-md flex justify-between items-center`}
    >
      <span>{message}</span>
    </div>
  );
};

export default AlertComponent;
