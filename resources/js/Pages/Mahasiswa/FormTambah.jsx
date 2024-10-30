import React, {useState} from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function FormTambah() {
    const [tnim, setTnim] = useState('');
    const [tnama, setTnama] = useState('');
    const [tjenkel, setTjenkel] = useState('');
    const [talamat, setTalamat] = useState('');

    const [loading, setLoading] = useState(false)

    const {errors} = usePage().props;

    const saveData = (e) => {
        e.preventDefault()
        setLoading(true);

        const mahasiswa = {tnim, tnama, tjenkel, talamat}
        Inertia.post('/mahasiswa', mahasiswa, {
            onFinish: () => setLoading(false)
        })
    }

    return (
        <>
        <h1>Form Tambah Mahasiswa</h1>
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
                    placeholder='Inputkan NIM Mahasiswa...'/>
                    {
                        errors.tnim && <div style={{ color: 'red', fontStyle:'italic' }}>{errors.tnim}</div>
                    }
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
                    <select value={tjenkel} onChange={(e) => setTjenkel(e.target.value)}>
                        <option value="" selected={true}>--Pilih--</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
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
                        {loading ? 'Tunggu...' : 'Simpan Data'}
                    </button>
                </td>
            </tr>
        </table>
        </form>
        </>
    )
}