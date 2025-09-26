export default function SectionWrapper({ sectionStyles = {
  width: "100%",
  padding: "20px",
  backgroundColor: "#FFFFFF",
  // border: "1px solid #000000",
  borderRadius: "16px"
}, element }) {
  return (
    <section style={sectionStyles} >
      {element}
    </section>
  );
}