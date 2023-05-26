import NavBar from "@/components/NavBar";
import Provider from "@/components/Provider";
import SideBar from "@/components/SideBar";
import BottomSignInBar from "components/BottomSignInBar";
import "styles/global.css";

export const metadata = {
  title: "twitter",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className="w-full h-[100vh] relative">
          <main className="flex items-start justify-center">
            <NavBar />
            {children}
            <SideBar />
          </main>
          <BottomSignInBar />
        </body>
      </Provider>
    </html>
  );
}

export default RootLayout;
