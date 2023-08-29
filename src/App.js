import { LoadingProvider } from "./LoadingContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Layout>
          <>

          </>
        </Layout>
      </Router>
    </LoadingProvider>
  );
}

export default App;
