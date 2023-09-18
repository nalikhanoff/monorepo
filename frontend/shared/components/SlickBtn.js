// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SlickButtonFix({ currentSlide, slideCount, children, ...props }) {
  return <span {...props}>{children}</span>;
}

export default SlickButtonFix;
