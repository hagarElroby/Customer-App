interface FormContainerProps {
  children: React.ReactNode;
  width?: string;
  style?: React.CSSProperties;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  width = "40.27vw",
  style = {},
}) => {
  return (
    <div
      style={{
        width: width,
        ...style,
      }}
      className={`min-w-[98%] xs:min-w-[360px] custom-rounded-input md:rounded-none form-padding flex items-center justify-center
         bg-white shadow-custom-3`}
    >
      <div className="flex items-center flex-col w-full custom-form-gapY40">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
