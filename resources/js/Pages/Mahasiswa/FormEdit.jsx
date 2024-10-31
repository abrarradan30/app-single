import React, {useState} from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function FormEdit({id, mhs}) {
    const [tnim, setTnim] = useState(mhs.nim);
    const [tnama, setTnama] = useState(mhs.nama_lengkap);
    const [tjenkel, setTjenkel] = useState(mhs.jenkel);
    const [talamat, setTalamat] = useState(mhs.alamat);

    const [loading, setLoading] = useState(false)

    const {errors} = usePage().props;

    const saveData = (e) => {
        e.preventDefault()
        setLoading(true);

        const mahasiswa = {tnama, tjenkel, talamat}
        Inertia.put(`/mahasiswa/${id}`, mahasiswa, {
            onFinish: () => setLoading(false)
        })
    }

    return (
        <>
        <h1>Form Edit Mahasiswa</h1>
        <hr/>
        <Link as='button' type='button' href='/mahasiswa' style={{ color:'black', marginBottom:10}}>
            Kembali
        </Link>
        <form onSubmit={saveData}>
        <table border={0}>
            <tr>
                <td>Input Nim : </td>
                <td>
                    <input maxLength={7} type="text" value={tnim} onChange={(e) =>  setTnim(e.target.value)} 
                    disabled={true}/>
                </td>
            </tr>
            <tr>
                <td>Input Nama Lengkap : </td>
                <td>
                    <input type="text" value={tnama} onChange={(e) =>  setTnama(e.target.value)} 
                    placeholder='Inputkan Nama Lengkap...' size={50}/>
                    {
                        errors.tnama && <div style={{ color: 'red', fontStyle:'italic' }}>{errors.tnama}</div>
                    }
                </td>
            </tr>
            <tr>
                <td>Jenis Kelamin : </td>
                <td>
                    <select onChange={(e) => setTjenkel(e.target.value)}>
                        <option value="" selected={true}>--Pilih--</option>
                        <option value="L" selected={tjenkel == 'L' && true}>Laki-Laki</option>
                        <option value="P" selected={tjenkel == 'P' && true}>Perempuan</option>
                    </select>
                    {
                        errors.tjenkel && <div style={{ color: 'red', fontStyle:'italic' }}>{errors.tjenkel}</div>
                    }
                </td>
            </tr>
            <tr>
                <td>Alamat : </td>
                <td>
                    <textarea value={talamat} onChange={(e) =>  setTalamat(e.target.value)} 
                    placeholder='Inputkan Alamat...' cols={50} rows={5}></textarea>
                    {
                        errors.talamat && <div style={{ color: 'red', fontStyle:'italic' }}>{errors.talamat}</div>
                    }
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button type='submit'disabled={loading}>
                        {loading ? 'Tunggu...' : 'Update Data'}
                    </button>
                </td>
            </tr>
        </table>
        </form>
        </>
    )
}