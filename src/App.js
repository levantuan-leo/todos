import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import Auth from "./features/Auth";
import { authService } from "./services";
import { setUser } from "./features/Auth/authSlice";
import { fetchTodosThunk } from "./features/Todo/todoSlice";

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
      dispatch(setUser(currentUser));

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
          <Route path="/" element={<Todo />} />
          <Route path="user/*" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
