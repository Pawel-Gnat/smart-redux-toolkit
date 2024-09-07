import { ChangeEvent } from 'react';

interface InputProps {
  text: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ text, value, onChange }: InputProps) => {
  const lowercasedText = text.toLowerCase();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={lowercasedText} className="text-md font-medium">
        {text}
      </label>
      <input
        id={lowercasedText}
        type="text"
        name={lowercasedText}
        placeholder={`Filter by ${lowercasedText}`}
        value={value}
        onChange={onChange}
        className="rounded-lg border border-gray-300 px-4 py-2"
      />
    </div>
  );
};
