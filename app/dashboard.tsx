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

export default function Greet(props: {user: string}) {

    // Necessary because we will have to use Greet as a component later.
    return <div>{props.user}</div>;
}