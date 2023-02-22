import { Routes, Route, BrowserRouter } from "react-router-dom";
import store from "./app/store";
import Home from "./views/Home";
import MusicList from "./views/MusicList";
import { Provider } from "react-redux";
import Bar from "./components/Bar";
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/songlist/:id" element={<MusicList />}></Route>
                    <Route path="/daysongs" element={<MusicList />}></Route>
                </Routes>
            </BrowserRouter>
            <Bar />
        </Provider>
    );
}

export default App;
