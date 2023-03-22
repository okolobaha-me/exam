export const TabPanel = ({ children, value, index }) => {
  return (
    <>
      {value === index && (
        <>
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
          >
            {value === index && <>{children}</>}
          </div>
        </>
      )}
    </>
  );
};
