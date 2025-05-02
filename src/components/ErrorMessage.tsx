import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto text-center">
      {message}
    </div>
  );
};

export default ErrorMessage;