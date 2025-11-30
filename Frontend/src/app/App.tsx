import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import { useStores } from "../shared/store/store-context.tsx";
import TodoPage from "../modules/todo/pages/TodoPage.tsx";
import { AuthPage } from "../modules/auth/pages/authPage.tsx";


const App = observer(() => {
  const { user, isLoading } = useAuth0();
  const { userStore } = useStores();


  useEffect(() => {
    if (isLoading) {
      userStore.setLoading(true);
      return;
    }
    userStore.syncFromAuth0(user || null);
    userStore.setLoading(false);
  }, [user, isLoading]);


  if (userStore.loading) return <div>Cargando...</div>;
  if (!userStore.isAuthenticated) return <AuthPage />;



  return <TodoPage />;
});


export default App;
