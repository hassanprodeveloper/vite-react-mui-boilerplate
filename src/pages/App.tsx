// ** Emotion Imports
import { CacheProvider } from "@emotion/react";

// ** Third Party Import
import { Toaster } from "react-hot-toast";

// ** Prismjs Styles
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Icons bundle
// import "../iconify-bundle/bundle-icons-react";

// ** Global css styles
import "../styles/globals.css";

import {
  SettingsProvider,
  SettingsConsumer,
} from "src/@core/context/settingsContext";
import ReactHotToast from "src/@core/styles/libs/react-hot-toast";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";
import { AuthProvider } from "src/context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from ".";
import LoginPage from "./login";

const clientSideEmotionCache = createEmotionCache();

// ** Guard Props Type
// type GuardProps = {
//   authGuard: boolean;
//   guestGuard: boolean;
//   children: ReactNode;
// };

// const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
//   if (guestGuard) {
//     return <GuestGuard fallback={<h1>Guest</h1>}>{children}</GuestGuard>;
//   } else if (!guestGuard && !authGuard) {
//     return <>{children}</>;
//   } else {
//     return <AuthGuard fallback={<h1>Auth</h1>}>{children}</AuthGuard>;
//   }
// };

const App = () => {
  // const aclAbilities = defaultACLObj;

  return (
    <BrowserRouter>
      <CacheProvider value={clientSideEmotionCache}>
        <AuthProvider>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/login"
                        element={
                          <div>
                            {typeof LoginPage.guestGuard}
                            <LoginPage />
                          </div>
                        }
                      />
                    </Routes>

                    {/* <Routes /> */}

                    {/* <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard
                        aclAbilities={aclAbilities}
                        guestGuard={guestGuard}
                        authGuard={authGuard}
                      >
                        {getLayout(<h1>App.js</h1>)}
                      </AclGuard>
                    </Guard> */}

                    <ReactHotToast>
                      <Toaster
                        position={settings.toastPosition}
                        toastOptions={{ className: "react-hot-toast" }}
                      />
                    </ReactHotToast>
                  </ThemeComponent>
                );
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </BrowserRouter>
  );
};

export default App;
