import "./index.css";

interface IHeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: IHeaderProps) => {
  return <header className="bookshop-header">{children}</header>;
};
