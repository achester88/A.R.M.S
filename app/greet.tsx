'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

import Database from "tauri-plugin-sql-api";

async function create_test_table() {
    console.log(Database);
    const db = await Database.load("sqlite:test.db");
    const result = await db.execute(
        "CREATE TABLE place (country text, city text NULL, telcode integer)",
    );
    console.log(result);
}

export default function Greet() {
    const [greeting, setGreeting] = useState('');

    create_test_table();

    useEffect(() => {
        invoke<string>('greet', { name: 'Next.js' })
            .then(result => setGreeting(result))
            .catch(console.error)
    }, [])

    // Necessary because we will have to use Greet as a component later.
    return <div>{greeting}</div>;
}