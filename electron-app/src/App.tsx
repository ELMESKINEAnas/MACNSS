import React from "react";
import ERoutes from "./routes/Routes";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
function App() {
    const queryClient = new QueryClient()
    return (
        <div className="">
            <QueryClientProvider client={queryClient}>
                <ERoutes/>
            </QueryClientProvider>
        </div>
    );
}

export default App;
