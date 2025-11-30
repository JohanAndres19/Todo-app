import { useAuth0 } from "@auth0/auth0-react";
import { env } from '../../core/env.ts'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => loginWithRedirect({
        authorizationParams: {
          audience: env.VITE_AUTH0_AUDIENCE,
          scope: "read:todos write:todos"
        }
      })}
      className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
    >
      Log In
    </button>
  );
};

export default LoginButton;
