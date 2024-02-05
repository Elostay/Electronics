import "@styles/global.css";

export const metadata = {
  title: "electronics",
  description: "Buy by low price",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
