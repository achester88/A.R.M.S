'use client'

import Sidebar, { SidebarItem } from "./components/sidebar"
import {emit} from "@tauri-apps/api/event";
import Frame from "@/app/frame";

export default function Greet(props: {user: string}) {

    return (<Frame>
        <h1>{props.user}</h1>
    </Frame>);
}