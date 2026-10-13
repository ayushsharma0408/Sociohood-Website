export default function Section({ children, className = "", id, ...props }) {
  return (
    <section id={id} className={`section ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}
