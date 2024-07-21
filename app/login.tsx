'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import { emit, listen } from '@tauri-apps/api/event'
import Database from "tauri-plugin-sql-api";

async function create_test_table() {
    console.log(Database);
    const db = await Database.load("sqlite:test.db");
    const result = await db.execute(
        "CREATE TABLE place (country text, city text NULL, telcode integer)",
    );
    //SELECT * FROM Customers
    // WHERE CustomerID=1; 
    console.log(result);
}

export default function Greet() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function login() {
        const db = await Database.load("sqlite:database.db");
        const result: any[] = await db.select(
            "SELECT * FROM users WHERE user = $1",
            [username]
        );
        console.log(result);
        if (result.length > 0) {
            if (result[0].pass == password) {
                console.log("LOG IN NOW");
                setError("");
                emit('login', {
                    user: username,
                })
            } else {
                setError("Incorrect password");
            }
        } else {
            setError("Username not found");
        }

        console.log(username, password);
    }

    return (
        <main>
            <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-800">
                <div className="block">
                    <div className="flex items-center justify-center">
                        <img src="./placeholder-logo.png" alt="ARMS Logo" width="290px" height="280px"></img>
                    </div>
                    <h2>Login:</h2>
                    <input id="username" className="w-11/12 m-2 p-1 text-black" type="text" placeholder="username"
                           onChange={e => setUsername(e.target.value)}/>
                    <input id="password" className="w-11/12 m-2 p-1 text-black" type="password" placeholder="password"
                           onChange={e => setPassword(e.target.value)}/>
                    <h4 className="text-red-600 italic">{error}</h4>
                    <div className="h-2"/>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={login}>Log In
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

