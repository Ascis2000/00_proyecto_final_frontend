import React from 'react';
import '../../styles/components/_Footer.scss';

function Footer() {
  return (
    <footer id="footer">
      <div className="footer__widgets">
        {/* Logo */}
        <div className="footer__column footer__column--left">
          <a href="https://felgtbi.org/">
            <img
              src="https://felgtbi.org/wp-content/uploads/2021/10/logo_felgtbi_blanco.png"
              alt="FELGTBI Logo"
              className="footer__logo"
            />
          </a>
        </div>

        {/* Contacto */}
        <div className="footer__column footer__column--center">
          <p>Calle Chinchilla, 4. 1º Ext Izq. 28013 Madrid</p>
          <p>
            <strong>Teléfono:</strong> +34 913 604 605
            <br />
            <strong>Email:</strong> info@felgtbi.org
          </p>
        </div>

        {/* Enlaces legales */}
        <div className="footer__column footer__column--right">
          <p>
            <a href="https://felgtbi.org/politica-privacidad/" target="_blank" rel="noopener noreferrer">
              Política de privacidad
            </a>{' '}
            |{' '}
            <a href="https://felgtbi.org/avisos-legales/" target="_blank" rel="noopener noreferrer">
              Aviso Legal
            </a>{' '}
            |{' '}
            <a href="https://felgtbi.org/politica-de-cookies/" target="_blank" rel="noopener noreferrer">
              Política de cookies
            </a>
          </p>
        </div>
      </div>

      {/* Segunda fila: Créditos y Redes Sociales */}
      <div className="footer__colophon">
        <div className="footer__credits">
          <p>© 2024 FELGTBI+ – Todos los derechos reservados</p>
          <p>
            Funciona con{' '}
            <a href="https://es.wordpress.org/" target="_blank" rel="noopener noreferrer">
              WP
            </a>{' '}
            – Diseñado con el{' '}
            <a href="https://presscustomizr.com/customizr" target="_blank" rel="noopener noreferrer">
              Tema Customizr
            </a>
          </p>
        </div>
        <ul className="footer__socials">
          <li>
            <a href="https://twitter.com/FELGTBI" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/felgtbi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/FELGTBI" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCI1f5B0GhLizU-7jhU-KOYQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/felgtb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
