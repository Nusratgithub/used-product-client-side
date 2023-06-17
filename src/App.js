import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../src/Router/Routes/Routes'

function App() {
  return (
    <div className="max-w-screen-2xl m-auto">
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
