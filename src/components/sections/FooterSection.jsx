import { Link } from "react-router-dom";
import Logo from "../common/Logo.jsx";

const FooterSection = () => (
  <footer className="expanded-footer">
    <div>
      <Logo />
      <p>Complaint management. Clear accountability.</p>
      <div className="footer-backing">
        Incubated at ISI Kolkata · IDEAS-TIH
        <br />
        Backed by DST, Government of India
        <br />
        through the IDEAS-TIH ecosystem
      </div>
    </div>
    <div className="footer-links">
      <b>EXPLORE</b>
      <Link to="/products/complaint-management">Complaint Management</Link>
      <Link to="/case-studies">Case studies</Link>
      <Link to="/blog">Insights</Link>
      <Link to="/company">About</Link>
    </div>
    <div className="footer-address">
      <b>CONTACT</b>
      <a href="mailto:contact@sociohood.com">contact@sociohood.com</a>
      <a href="tel:+918409897416">+91 84098 97416</a>
      <p>
        <b>Patna</b>
        <br />
        M6 Vijay Aman Apartment, Main Road,
        <br />
        Kankarbagh, Patna 800020, Bihar.
      </p>
      <p>
        <b>Kolkata</b>
        <br />
        107/1 Lake Gardens,
        <br />
        Kolkata 700045, West Bengal.
      </p>
    </div>
    <small>
      © 2026 SocioHood Technologies Pvt. Ltd.{" "}
      <a href="mailto:contact@sociohood.com">Privacy & enquiries</a>{" "}
      <a href="mailto:contact@sociohood.com?subject=Demo%20sign-in">Demo sign-in</a>
    </small>
  </footer>
);

export default FooterSection;
