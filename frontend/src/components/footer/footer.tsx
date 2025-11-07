export function Footer() {
  const getFooterText = () => {
    const today = new Date();
    return `Copyright Pixell River Financial ${today.getFullYear()}`;
  };

  return (
    <footer>
      <span id="footer-text">{getFooterText()}</span>
    </footer>
  );
}
