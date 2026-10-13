const Button = ({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  ...props
}) => {
  const classes = `${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
