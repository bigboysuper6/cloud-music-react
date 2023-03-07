/*
 * @Author: bigboysuper66 bigboysuper6@gmail.com
 * @Date: 2023-02-05 16:22:03
 * @LastEditors: bigboysuper66 bigboysuper6@gmail.com
 * @LastEditTime: 2023-03-07 23:30:09
 * @FilePath: /front/cloud-music-app/src/App.js
 * @Description:
 *
 * Copyright (c) 2023 by bigboysuper6@gmail.com, All Rights Reserved.
 */
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
