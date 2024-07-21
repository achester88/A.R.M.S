'use client'

import Image from "next/image";
import { invoke } from '@tauri-apps/api/tauri'
import {exists, BaseDirectory, createDir, writeTextFile} from '@tauri-apps/api/fs';
import Database from "tauri-plugin-sql-api";
import { getVersion } from '@tauri-apps/api/app';

import Greet from './greet'
import Login from './login'
import {useEffect} from "react";

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
    }
}

export default function Home() {
    useEffect(()=>{
        init();
    }, [])

  return (
    <main>
        <Login />
    </main>
  );
}
