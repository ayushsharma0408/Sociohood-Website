import Reveal from "../../common/Reveal.jsx";
import ProductConsole from "../../product/ProductConsole.jsx";

const ComplaintProductView = () => (
  <Reveal as="section" className="detail-section">
    <div className="eyebrow blue">ACTUAL PRODUCT VIEW</div>
    <h2>See the complaint operation.</h2>
    <ProductConsole />
  </Reveal>
);

export default ComplaintProductView;
