import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import {
  createBrowserRouter,
  RouterProvider, Outlet,
} from 'react-router-dom';

import Home from './components/Home';

import './store';

function FallBack(props) {
  return <div>URL Not Found</div>;
}

function Layout() {
  return (
    <Outlet />

  );
}

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: '/', Component: Home },
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
