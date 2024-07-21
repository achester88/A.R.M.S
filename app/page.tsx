'use client'

import Image from "next/image";
import { invoke } from '@tauri-apps/api/tauri'
import {exists, BaseDirectory, createDir, writeTextFile} from '@tauri-apps/api/fs';
import Database from "tauri-plugin-sql-api";
import { getVersion } from '@tauri-apps/api/app';
import { emit, listen } from '@tauri-apps/api/event'

import Greet from './greet'
import Login from './login'
import Dashboard from './dashboard'
import Settings from './settings'
import Members from './members'

import {useEffect, useState} from "react";

async function init() {
    const Version = await getVersion();

    const InitData = {
        version: Version
    };

    let isInit = await exists('config.json', { dir: BaseDirectory.App });
    console.log(isInit);

    if (!isInit) {
        //create config from template
        await writeTextFile('config.json', JSON.stringify(InitData), { dir: BaseDirectory.App });
        //create database from template
        const db = await Database.load("sqlite:database.db");
        await db.execute(
            "CREATE TABLE users (user text, pass text)",
        );
        await db.execute(
            "INSERT INTO users VALUES ('admin', 'admin')",
        );

        await db.execute(
            "CREATE TABLE members (\n" +
            "id text NOT NULL PRIMARY KEY UNIQUE,\n" +
            "name text,\n" +
            "rifle_num int,\n" +
            "rifle_description text,\n" +
            "three_positions_high_score int,\n" +
            "prone_high_score int,\n" +
            "kneeling_high_score int,\n" +
            "standing_high_score int,\n" +
            "average_total int,\n" +
            "average_prone int,\n" +
            "average_kneeling int,\n" +
            "average_standing int,\n" +
            "attendance_rate real,\n" +
            "minutes_shot int\n" +
            ")",
        );
    }
}

export default function Home() {
    const [page, setPage] = useState('Login');
    const [user, setUser] = useState('');

    const unlistenLogin = listen('login', (event: any) => {
        // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
        // event.payload is the payload object
        console.log(event.payload);
        setUser(event.payload.user);
        setPage("Main");
    })

    const unlistenSetPage = listen('setPage', (event: any) => {
        // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
        // event.payload is the payload object
        console.log(event.payload);
        setPage(event.payload.page);
    })

    useEffect(()=>{
        init();
    }, [])

    if (page == "Login") {
        return <Login />;
    } else if (page == "Settings") {
        return <Settings user={user}/>;
    } else if (page == "Members") {
        return <Members user={user}/>;
    } else {
        return <Dashboard user={user}/>;
    }

}
