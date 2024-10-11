interface InputProps {
  type: string;
  className: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  type,
  className,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
