
import React from 'react';
import '../../styles/components/_Footer.scss'; 

function Footer() {
  return (
    <footer id="footer" className="footer__wrapper">
      <div id="footer-widget-area" className="widget__wrapper" role="complementary">
        <div className="container widget__container">
          <div className="row">
            <div id="footer_one" className="col-md-4 col-12">
              <aside id="media_image-3" className="widget widget_media_image">
                <a href="https://felgtbi.org/">
                  <img
                    width="251"
                    height="76"
                    src="https://felgtbi.org/wp-content/uploads/2021/10/logo_felgtbi_blanco.png"
                    className="image wp-image-7247 attachment-full size-full"
                    alt="FELGTBI Logo"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    decoding="async"
                  />
                </a>
              </aside>
            </div>
            <div id="footer_two" className="col-md-4 col-12">
              <aside id="text-12" className="widget widget_text">
                <div className="textwidget">
                  <p>Calle Chinchilla, 4. 1º Ext Izq. 28013 Madrid</p>
                  <p>
                    <strong>Teléfono:</strong> +34 913 604 605
                    <br />
                    <strong>Email:</strong> info@felgtbi.org
                  </p>
                </div>
              </aside>
            </div>
            <div id="footer_three" className="col-md-4 col-12">
              <aside id="text-6" className="widget widget_text">
                <div className="textwidget">
                  <p>
                    <a
                      href="https://felgtbi.org/politica-privacidad/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de privacidad
                    </a>{' '}
                    |{' '}
                    <a
                      href="https://felgtbi.org/avisos-legales/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Aviso Legal
                    </a>{' '}
                    |{' '}
                    <a
                      href="https://felgtbi.org/politica-de-cookies/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de cookies
                    </a>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div id="colophon" className="colophon">
        <div className="container-fluid">
          <div className="colophon__row row flex-row justify-content-between">
            <div className="col-12 col-sm-auto">
              <div id="footer__credits" className="footer__credits">
                <p className="czr-copyright">
                  <span className="czr-copyright-text">© 2024 </span>
                  <a
                    className="czr-copyright-link"
                    href="https://felgtbi.org"
                    title="FELGTBI+"
                  >
                    FELGTBI+
                  </a>
                  <span className="czr-rights-text"> – Todos los derechos reservados</span>
                </p>
                <p className="czr-credits">
                  <span className="czr-designer">
                    <span className="czr-wp-powered">
                      <span className="czr-wp-powered-text">Funciona con </span>
                      <a
                        className="czr-wp-powered-link"
                        title="Funciona con WordPress"
                        href="https://es.wordpress.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WP
                      </a>
                    </span>
                    <span className="czr-designer-text">
                      {' '}
                      – Diseñado con el{' '}
                      <a
                        className="czr-designer-link"
                        href="https://presscustomizr.com/customizr"
                        title="Tema Customizr"
                      >
                        Tema Customizr
                      </a>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-auto">
              <div className="social-links">
                <ul className="socials">
                  <li>
                    <a
                      rel="nofollow noopener noreferrer"
                      className="social-icon icon-twitter"
                      title="Síguenos Twitter"
                      aria-label="Síguenos Twitter"
                      href="https://twitter.com/FELGTBI"
                      target="_blank"
                      style={{ fontSize: '20px' }}
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      rel="nofollow noopener noreferrer"
                      className="social-icon icon-instagram"
                      title="Síguenos Instagram"
                      aria-label="Síguenos Instagram"
                      href="https://www.instagram.com/felgtbi/"
                      target="_blank"
                      style={{ fontSize: '20px' }}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      rel="nofollow noopener noreferrer"
                      className="social-icon icon-facebook"
                      title="Síguenos Facebook"
                      aria-label="Síguenos Facebook"
                      href="https://www.facebook.com/FELGTBI"
                      target="_blank"
                      style={{ fontSize: '20px' }}
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      rel="nofollow noopener noreferrer"
                      className="social-icon icon-youtube"
                      title="Síguenos Youtube"
                      aria-label="Síguenos Youtube"
                      href="https://www.youtube.com/channel/UCI1f5B0GhLizU-7jhU-KOYQ"
                      target="_blank"
                      style={{ fontSize: '20px' }}
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      rel="nofollow noopener noreferrer"
                      className="social-icon icon-linkedin-in"
                      title="Síguenos Linkedin-in"
                      aria-label="Síguenos Linkedin-in"
                      href="https://www.linkedin.com/company/felgtb/"
                      target="_blank"
                      style={{ fontSize: '20px' }}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
