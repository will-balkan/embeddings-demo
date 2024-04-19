import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import {
  createBrowserRouter, NavLink, useParams,
  RouterProvider, Outlet,
} from 'react-router-dom';

function About(props) {
  return <div> All there is to know about me </div>;
}
function Welcome(props) {
  return <div>Welcome</div>;
}

function Nav(props) {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
}

function Test(props) {
  const { id } = useParams();
  return <div> ID: {id} </div>;
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: '/', Component: Welcome },
      { path: '/about', Component: About },
      { path: '/test/:id', Component: Test },
      { path: '*', Component: FallBack },
    ],
  },

]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
