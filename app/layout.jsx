import "styles/global.css";

export const metadata = {
  title: "twitter",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <main >
            {children}
          </main>
      </body>
    </html>
  );
}

export default RootLayout;
