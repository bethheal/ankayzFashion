import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-md flex justify-between items-center p-4">
      <h1 className="text-xl font-bold text-yellow-700 cursor-pointer" onClick={() => navigate("/")}>
        Ankayz
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-gray-700">{user.fullname}</span>
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-600"
            onClick={() => navigate("/profile")}
          />
        </div>
      )}
    </header>
  );
}
