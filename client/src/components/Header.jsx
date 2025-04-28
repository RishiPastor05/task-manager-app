import useAuth from '../hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-indigo-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button 
        onClick={logout} 
        className="bg-white text-indigo-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;