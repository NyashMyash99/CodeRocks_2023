import React, { useEffect, useState } from "react";
import { useAuthState } from "../store/auth/auth.slice";
import { LogoSection } from "../components/landing/LogoSection";
import { MenuSection } from "../components/landing/MenuSection";
import { AuthorizationSection } from "../components/landing/AuthorizationSection";
import { ProfileSection } from "../components/landing/ProfileSection";

export default function Home() {
  const [component, setComponent] = useState(<AuthorizationSection />);
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    setComponent(isAuthenticated ? <MenuSection /> : <AuthorizationSection />);
  }, [isAuthenticated]);

  return (
    <main>
      <LogoSection />
      {component}
      <ProfileSection />
    </main>
  );
}
