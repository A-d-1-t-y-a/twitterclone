import NavBar from "@/components/NavBar";
import "styles/global.css";

export const metadata = {
  title: "twitter",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <main className="flex lg:px-20 md:px-10">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
