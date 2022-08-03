import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import Auth from "./features/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { authService } from "./services";
import { getMeThunk } from "./features/Auth/authSlice";
import { fetchTodosThunk } from "./features/Todo/todoSlice";
import Profile from "./features/Profile";

//------------------mirage js--------------------------
// import { makeServer } from "./server";
// import { fetchTodosThunk } from "./features/Todo/todoSlice";

// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" });
// }
//------------------------------------------------------

// lazy load - Code splitting
const Todo = lazy(() => import("./features/Todo"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService.auth, (currentUser) => {
      console.log(currentUser);
      dispatch(getMeThunk(currentUser));

      // get all todos
      dispatch(fetchTodosThunk());
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="todos" element={<Todo />}>
            <Route path=":todoId" element={<Todo />} />
          </Route>
          <Route path="auth/*" element={<Auth />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
