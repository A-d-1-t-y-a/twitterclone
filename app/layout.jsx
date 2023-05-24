import NavBar from "@/components/NavBar";
import Provider from "@/components/Provider";
import BottomSignInBar from "components/BottomSignInBar"
import "styles/global.css";

export const metadata = {
  title: "twitter",
};

function RootLayout({ children }) {

  return (
    <html lang="en">
        <Provider>
      <body className="w-full h-full relative overflow-hidden">
          <main className="flex lg:px-20 md:px-10">
            <NavBar />
            {children}
          </main>
          <BottomSignInBar/>
      </body>
        </Provider>
    </html>
  );
}

export default RootLayout;
