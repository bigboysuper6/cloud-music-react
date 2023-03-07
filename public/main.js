/*
 * @Author: bigboysuper66 bigboysuper6@gmail.com
 * @Date: 2023-03-07 23:02:53
 * @LastEditors: bigboysuper66 bigboysuper6@gmail.com
 * @LastEditTime: 2023-03-07 23:17:37
 * @FilePath: /front/cloud-music-app/public/main.js
 * @Description:electron entry file
 *
 * Copyright (c) 2023 by bigboysuper6@gmail.com, All Rights Reserved.
 */
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 976,
        height: 800,
        // webPreferences: {
        //     preload: path.join(__dirname, "preload.js"),
        // },
    });
    win.loadURL("http://localhost:3002");
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
