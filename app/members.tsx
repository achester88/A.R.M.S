'use client'

import Sidebar, { SidebarItem } from "./components/sidebar"
import {emit} from "@tauri-apps/api/event";
import Frame from "@/app/frame";
import {useState} from "react";
import Database from "tauri-plugin-sql-api";

export default function Members(props: {user: string}) {

    return <Frame>
        <div className="flex">
            Members
        </div>
        <div className="m-4">
            <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {

                    }}>Add Member
            </button>
            <div className="my-4">
                <Table/>
            </div>
        </div>
    </Frame>
;
}

function Table() {
    const [members, setMembers] = useState([]);

    Database.load("sqlite:database.db").then((db) => {
        db.select("SELECT * FROM members").then((members) => {
            console.log(members);
        })
    });


    return (
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            HS
                        </th>
                        <th scope="col" className="px-6 py-3">
                            P
                        </th>
                        <th scope="col" className="px-6 py-3">
                            S
                        </th>
                        <th scope="col" className="px-6 py-3">
                            K
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Avg.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Attendance
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Mins.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <TableRow/>
                    <TableRow/>
                    </tbody>
                </table>
            </div>


        </div>
    );
}

function TableRow() {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Anthony Chester
            </th>
            <td className="px-6 py-4">
                14
            </td>
            <td className="px-6 py-4">
                250
            </td>
            <td className="px-6 py-4">
                95
            </td>
            <td className="px-6 py-4">
                70
            </td>
            <td className="px-6 py-4">
                70
            </td>
            <td className="px-6 py-4">
                225
            </td>
            <td className="px-6 py-4">
                89%
            </td>
            <td className="px-6 py-4">
                1000
            </td>
            <td className="px-6 py-4 text-right">
                <a href="#"
                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Open Report</a>
            </td>
        </tr>
    );
}

/* for each member
CREATE TABLE shooter_ (
round_id text NOT NULL PRIMARY KEY UNIQUE,
data text,
prone_timelimit int,
kneeling_timelimit int,
standing_timelimit int,
prone_score int,
kneeling_score int,
standing_score int,
total_time int,
total_socre int
)
 */