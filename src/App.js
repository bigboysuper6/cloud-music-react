import { Routes, Route, BrowserRouter } from "react-router-dom";
import store from "./app/store";
import Home from "./views/Home";
import MusicList from "./views/MusicList";
import { Provider } from "react-redux";
import Nav from "./components/Nav";
import Bar from "./components/Bar";
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/songlist/:id" element={<MusicList />}></Route>
                    <Route path="/daysongs" element={<MusicList />}></Route>
                </Routes>
                <Bar />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
