'use client'

import Sidebar, { SidebarItem } from "./components/sidebar"
import {emit} from "@tauri-apps/api/event";
import Frame from "@/app/frame";

export default function Members(props: {user: string}) {

    return <Frame>
        <div className="flex">
            Members
        </div>
    </Frame>;
}