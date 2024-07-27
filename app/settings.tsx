'use client'

import Sidebar, { SidebarItem } from "./components/sidebar"
import {emit} from "@tauri-apps/api/event";
import Frame from "@/app/frame";
import {useEffect, useState} from "react";
import {getVersion} from "@tauri-apps/api/app";
import Database from "tauri-plugin-sql-api";

export default function Settings(props: {user: string}) {
    const [version, setVersion] = useState("");
    const [member_count, setMemberCount] = useState("");

    useEffect(()=>{
        getVersion().then((ver) => {
            setVersion(ver);
        });
        Database.load("sqlite:database.db").then((db) => {
            db.select("SELECT * FROM members").then((members: any) => {
                setMemberCount(members.length);
            })
        })

    }, [])

    return <Frame>
        <div className="m-4 text-center">
            <h1 className="text-3xl font-extrabold">Settings</h1>
            <hr className="my-2"/>
            <h2 className="text-xl font-extrabold">INFO</h2>
            <h4>Member Count: {member_count}</h4>
            <h4>Current User: {props.user}</h4>
            <h4>Current Version: {version}</h4>

        </div>
    </Frame>;
}