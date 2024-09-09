import { ComponentType } from "react";
import UserLayout from "./UserLayout";
import Guard from "src/components/Guard";

interface Props {
  Component: ComponentType & {
    guestGuard?: boolean;
    authGuard?: boolean;
    getLayout?: (page: JSX.Element) => JSX.Element;
  };
}

const Layout = (props: Props) => {
  const { Component } = props;

  const guestGuard = Component.guestGuard;
  const authGuard = Component.authGuard;
  const children = <Component />;

  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  return (
    <>
      <Guard guestGuard={guestGuard} authGuard={authGuard}>
        {getLayout(children)}
      </Guard>
    </>
  );
};

export default Layout;
