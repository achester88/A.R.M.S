'use client'

import Sidebar, { SidebarItem } from "./components/sidebar"
import {emit} from "@tauri-apps/api/event";
import Frame from "@/app/frame";
import {useEffect, useState} from "react";
import Database from "tauri-plugin-sql-api";

export default function Members(props: {user: string}) {

    return <Frame>
        <div className="flex items-center justify-center">
            <h1 className="text-3xl font-extrabold">Members</h1>
        </div>
        <div className="m-4">
            <button data-modal-target="static-modal" data-modal-toggle="static-modal"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        emit('setPage', {page: "AddMember"})
                    }}>Add Member
            </button>

            <div className="my-4">
                <Table/>
            </div>
        </div>

    </Frame>;
}

function Table() {
    const [list, setList] = useState(<br/>);

    useEffect(()=> {
        Database.load("sqlite:database.db").then((db) => {
            db.select("SELECT * FROM members").then((members: any) => {
                console.log("mem:", members);
                let tempList: any = [];
                //{name, rifle_num, high_score, prone, standing, kneeling, average, attendance_rate, total_min}
                members.forEach((member: any) => {
                    console.log(member);
                    tempList.push(<TableRow key={member.id} data={member}/>);
                });

                setList(tempList);

            })
        });
    }, []);

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
                    {list}
                    </tbody>
                </table>
            </div>


        </div>
    );
}

function TableRow({data}: any) {

    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.name}
            </th>
            <td className="px-6 py-4">
                {data.rifle_num}
            </td>
            <td className="px-6 py-4">
                {data.three_positions_high_score}
            </td>
            <td className="px-6 py-4">
                {data.prone_high_score}
            </td>
            <td className="px-6 py-4">
                {data.standing_high_score}
            </td>
            <td className="px-6 py-4">
                {data.kneeling_high_score}
            </td>
            <td className="px-6 py-4">
                {data.average_total}
            </td>
            <td className="px-6 py-4">
                {data.attendance_rate}
            </td>
            <td className="px-6 py-4">
                {data.minutes_shot}
            </td>
            <td className="px-6 py-4 text-right">
                <a href="#"
                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Open Report</a>
            </td>
        </tr>
    );
}