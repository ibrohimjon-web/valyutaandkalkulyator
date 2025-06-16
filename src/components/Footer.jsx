import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <p>© {year} Ibrohimjon Ikromjonov. Barcha huquqlar himoyalangan.</p>
    </footer>
  );
};

export default Footer;
