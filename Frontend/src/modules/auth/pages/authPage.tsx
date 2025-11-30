import LoginButton from "../LoginButton"

export const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-gray-500 text-sm mt-1">
            Iniciá sesión para continuar
          </p>
        </header>

        <LoginButton />

        <footer className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Tu App — dale que va
        </footer>
      </div>
    </div>
  )
}

