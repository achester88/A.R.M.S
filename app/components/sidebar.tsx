import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
import {createContext, useContext, useEffect, useState} from "react"
import { getVersion } from '@tauri-apps/api/app';

const SidebarContext: any = createContext(false);

export default function Sidebar({ children }: any, props: {user: string}) {
    const [expanded, setExpanded] = useState(true)
    const [version, setVersion] = useState("");



    useEffect(()=> {
        getVersion().then((ver) => {
            setVersion(ver);
        })
    }, [])

    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-gray-700 border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-500 hover:bg-gray-300">
                            {expanded ? "ARMS" : "#"}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>

                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3">
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                            <div className="leading-4">
                                <h4 className="font-semibold">Version {version}</h4>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({ text, active, alert, onClick }: any) {
    // @ts-ignore
    const { expanded } = useContext(SidebarContext)
    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-300 text-gray-600"}`}>
            <span onClick={onClick} className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}