import Sidebar, {SidebarItem} from "@/app/components/sidebar";
import {emit} from "@tauri-apps/api/event";

export default function Frame({children}: any) {
    return (
        <div className="flex">
            <Sidebar>
                <SidebarItem text="Home" onClick={() => {
                    emit('setPage', {page: "Home"})
                }}/>
                <SidebarItem text="Members" onClick={() => {
                    emit('setPage', {page: "Members"})
                }}/>
                <hr className="my-3"/>
                <SidebarItem text="Settings" onClick={() => {
                    emit('setPage', {page: "Settings"})
                }}/>
            </Sidebar>

    <main className="grow">{children}</main>
        </div>
)
    ;
}