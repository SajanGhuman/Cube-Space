interface ButtonProps {
  customText: string;
}

const Button: React.FC<ButtonProps> = ({ customText }) => {
  return <div className="bg-text-green w-[100px]">{customText}</div>;
};

export default Button;
