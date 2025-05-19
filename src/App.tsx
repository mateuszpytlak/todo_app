import './App.css'
import {Header} from "./Layout/Header/Header.tsx";
import {TodoApp} from "./components/TodoApp/TodoApp.tsx";

function App() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto">
                    <Header />
                    <TodoApp />
                </div>
            </div>
        </>
    )
}

export default App
