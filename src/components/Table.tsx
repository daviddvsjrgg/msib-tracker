import Image from 'next/image'
import React from 'react'

const dummyData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
]

const Table = () => {
  return (
    <div className="card bg-base-100 w-auto shadow-xl m-8">
    <div className="card-body">
        <h2 className="card-title">List Perusahaan 0/22</h2>
        <div className="overflow-x-auto">   
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
                </th>
                <th>No</th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
            </tr>
            </thead>
            {/* row 1 */}
            {dummyData.map((p, index) => (
            <tbody key={index}>
                 <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <td>
                        {index + 1}
                    </td>
                    <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                        <Image
                            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                            alt="Avatar Tailwind CSS Component"
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            width={180}
                            height={37}
                            priority
                            unoptimized
                            />
                        </div>
                        </div>
                        <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                        </div>
                    </div>
                    </td>
                    <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                    </td>
                    <td>Purple</td>
                    <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                </tr>
            </tbody>
            ))}
            {/* foot */}
            <tfoot>
            <tr>
                <th></th>
                <th>No</th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
            </tr>
            </tfoot>
        </table>
        </div>
    </div>
    </div>
  )
}

export default Table