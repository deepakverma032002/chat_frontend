import React, { PropsWithChildren, useEffect, useState } from "react";

interface AuthContextProps extends PropsWithChildren {
  session?: User;
}

type ContextValues = { session?: User; isLogin: boolean };

const AuthContext = React.createContext<ContextValues>({} as ContextValues);
const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
  session,
}) => {
  const [userSession, setUserSession] = useState<User | undefined>();

  useEffect(() => {
    setUserSession(session);
  }, [session]);

  const value = { session: userSession, isLogin: !!userSession };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useSession = () => React.useContext(AuthContext);

export default AuthContextProvider;
