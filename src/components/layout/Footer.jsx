import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section section-padding" id="contact">
      <div className="container">
        <div className="footer-content">
          
          {/* Top Section */}
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/logo.png" alt="PressEnter Logo" className="footer-logo mb-6" />
              <p className="heading-md mt-4 text-editorial">Build something<br/>worth remembering.</p>
              
              <a href="#contact" className="cta-start heading-md mt-12 inline-block">
                Start a project <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div className="footer-divider"></div>

          {/* Bottom Section */}
          <div className="footer-bottom grid">
            <div className="footer-nav flex flex-col gap-4">
              <a href="#work" className="footer-link label-sm">Work</a>
              <a href="#services" className="footer-link label-sm">Services</a>
              <a href="#about" className="footer-link label-sm">About</a>
              <a href="#contact" className="footer-link label-sm">Contact</a>
            </div>

            <div className="footer-social flex flex-col gap-4">
              <a href="#" className="footer-link label-sm">Instagram</a>
              <a href="#" className="footer-link label-sm">LinkedIn</a>
              <a href="#" className="footer-link label-sm">X</a>
            </div>

            <div className="footer-contact flex flex-col justify-between h-full">
              <a href="mailto:hello@pressenter.in" className="footer-link label-sm text-accent">hello@pressenter.in</a>
              <p className="label-sm text-gray mt-auto">© {new Date().getFullYear()} PressEnter</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
