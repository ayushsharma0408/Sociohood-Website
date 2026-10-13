const Container = ({ children, className = "", as: Tag = "div", ...props }) => (
  <Tag className={`container ${className}`.trim()} {...props}>
    {children}
  </Tag>
);

export default Container;
