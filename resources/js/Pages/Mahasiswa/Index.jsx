import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({mahasiswa, filters}) {
    // console.log(mahasiswa);
    const {flash} = usePage().props;

    const [search, setSearch] = useState(filters.search || '');

    const deleteData = (id, nama) => {
        if(confirm(`Yakin menghapus data mahasiswa dengan nama ${nama} dihapus ?`)) {
            Inertia.delete(`/mahasiswa/${id}`);
        }
    }

    const editData = (id) => {
        Inertia.get(`/mahasiswa/${id}`);
    }
    
    const doSearchData = (e) => {
        e.preventDefault();
        Inertia.get('mahasiswa', {search}, {preserveState: true});
    }

    const startNumber = (mahasiswa.current_page - 1) * mahasiswa.per_page;

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

            <form onSubmit={doSearchData}>
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button type='submit'>Cari</button>
            </form>
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
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mahasiswa.data && mahasiswa.data.length === 0 ? (
                            <tr>
                                <th colSpan={6}>Data kosong ...</th>
                            </tr>
                        ) : (mahasiswa.data.map((mhs, index) => (
                            <tr key={index}>
                                <td>{startNumber + index + 1}</td>
                                <td>{mhs.nim}</td>
                                <td>{mhs.nama_lengkap}</td>
                                <td>
                                    {mhs.jenkel == 'L' ? 'Laki-Laki' : 'Perempuan'}
                                </td>
                                <td>{mhs.alamat}</td>
                                <td>
                                    <button
                                        onClick={() => editData(mhs.id)}
                                    >Edit</button>
                                    <button style={{
                                        marginLeft: 5
                                    }}
                                        onClick={() => deleteData(mhs.id, mhs.nama_lengkap)}
                                    >Hapus</button>
                                </td>
                            </tr>
                        )) 
                        )
                    }
                </tbody>
            </table>
            <div style={{ marginTop: 10}}>
                {mahasiswa.links.map((link, index) => {

                    let isActive = link.active;
                    const linkActive = isActive ? {fontWeight:'bold', textDecoration:'underline'} : {};

                    let linkLabel = link.label;

                    if(linkLabel.includes('raquo')) {
                        linkLabel = 'Next >>'
                    }
                    if(linkLabel.includes('laquo')) {
                        linkLabel = 'Previous <<'
                    }

                    return (
                        <button key={index} onClick={() => Inertia.get(link.url)} disabled={isActive} style={linkActive}>
                            {linkLabel}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}