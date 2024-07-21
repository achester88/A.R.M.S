'use client'

import { useEffect, useState } from 'react';
import { emit } from '@tauri-apps/api/event'
import Database from "tauri-plugin-sql-api";

export default function AddMember(props: {user: string}) {

    const [name, setName] = useState("");
    const [rifle, setRifle] = useState("");
    const [desc, setDesc] = useState("");
    const [prone, setProne] = useState("");
    const [kneeling, setKneeling] = useState("");
    const [standing, setStanding] = useState("");


    const [error, setError] = useState("");

    async function create_member() {

        let id = crypto.randomUUID().replaceAll("-", '_');
        console.log(id);
        let ps = parseInt(prone);
        let ks = parseInt(kneeling);
        let ss = parseInt(standing);
        let total = ps + ks + ss;

        const db = await Database.load("sqlite:database.db");
        await db.execute("INSERT INTO members VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, 0, 0, 0, 0, 0)",
            [id, name, rifle, desc, total, ps, ks, ss]);
        await db.execute("CREATE TABLE shooter_" + id + " (\n" +
            "round_id text NOT NULL PRIMARY KEY UNIQUE,\n" +
            "data text,\n" +
            "prone_timelimit int,\n" +
            "kneeling_timelimit int,\n" +
            "standing_timelimit int,\n" +
            "prone_score int,\n" +
            "kneeling_score int,\n" +
            "standing_score int,\n" +
            "total_time int,\n" +
            "total_socre int\n" +
            ")");

        await emit('setPage', {page: "Members"});

    }

    return (
        <main>
            <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-800">
                <div>
                    <div className="flex items-center justify-center">
                        <h1 className="text-3xl font-extrabold">Add Member</h1>
                    </div>
                    <div className="h-10"/>
                    <div className="inline-flex ">
                        <h2 className="p-3">Name:</h2>
                        <input id="name" className="w-11/12 m-2 p-1 text-black" type="text" placeholder="First Last"
                               onChange={e => setName(e.target.value)}/>
                        <h2 className="p-3">Rifle:</h2>
                        <input id="rifle" className="w-11/12 m-2 p-1 text-black" type="text" placeholder="#"
                               onChange={e => setRifle(e.target.value)}/>
                    </div>

                    <hr className="my-3"/>

                    <div className="flex">
                        <h2 className="p-3">Rifle Type:</h2>
                        <input id="desc" className="w-9/12 m-2 p-1 text-black" type="text" placeholder="Standerd"
                               onChange={e => setDesc(e.target.value)}/>
                    </div>

                    <hr className="my-3"/>

                    <div>
                        <div className="flex items-center justify-center">
                            <h1 className="text-xl font-extrabold">Personal Best</h1>
                        </div>
                        <div className="grid grid-cols-3 grid-rows-2 ">
                            <h2 className="p-3 text-center">Prone</h2>
                            <h2 className="p-3 text-center">Kneeling</h2>
                            <h2 className="p-3 text-center">Standing</h2>
                            <div className="flex justify-center items-center">
                                <input id="prone" className="text-center w-6/12 m-2 p-1 text-black" type="text"
                                       placeholder="0"
                                       onChange={e => setProne(e.target.value)}/>
                            </div>
                            <div className="flex justify-center items-center">
                                <input id="desc" className="text-center w-6/12 m-2 p-1 text-black" type="text"
                                       placeholder="0"
                                       onChange={e => setKneeling(e.target.value)}/>
                            </div>
                            <div className="flex justify-center items-center">
                                <input id="desc" className="text-center w-6/12 m-2 p-1 text-black" type="text"
                                       placeholder="0"
                                       onChange={e => setStanding(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="h-2"/>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={create_member}>Add
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

