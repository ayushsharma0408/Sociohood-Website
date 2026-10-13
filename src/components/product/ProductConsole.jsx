import ProductShowcase from "./ProductShowcase.jsx";
import {
  complaintProductCaption,
  complaintProductStates,
} from "../../data/complaintProductStates.js";

const ProductConsole = () => (
  <figure className="case-product-evidence">
    <ProductShowcase
      image="/product/admin-complaints.webp"
      alt="SocioHood admin complaint console with statuses, filters and complaint list"
      states={complaintProductStates}
      compact
      numbered
      autoPlayMs={4200}
    />
    <figcaption>{complaintProductCaption}</figcaption>
  </figure>
);

export default ProductConsole;
