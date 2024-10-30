import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';

export default function Index({mahasiswa}) {
    // console.log(mahasiswa);
    const {flash} = usePage().props;
    return (
        <div>
            <h3>Data Mahasiswa</h3>
            <hr />
            <Link as='button' type='button' href='/mahasiswa/add' style={{ color:'black', marginBottom:10}}>
            Tambah Data
            </Link>

            {
                flash && flash.message && <div style={{
                    fontWeight: 'bold',
                    color: 'green',
                    marginBottom: 10
                }}>{flash.message}</div>
            }

            <table cellPadding={5} border={1} style={{
                borderCollapse: 'collapse'
            }}>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>NIM</th>
                        <th>Nama Lengkap</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mahasiswa.length === 0 ? (
                            <tr>
                                <th colSpan={5}>Data kosong ...</th>
                            </tr>
                        ) : (mahasiswa.map((mhs, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{mhs.nim}</td>
                                <td>{mhs.nama_lengkap}</td>
                                <td>
                                    {mhs.jenkel == 'L' ? 'Laki-Laki' : 'Perempuan'}
                                </td>
                                <td>{mhs.alamat}</td>
                            </tr>
                        )) 
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}