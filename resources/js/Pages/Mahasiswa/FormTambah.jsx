import React, {useState} from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className='container container-fluid'>
        <h1>Form Tambah Mahasiswa</h1>
        <hr/>
        <Link as='button' type='button' href='/mahasiswa' style={{marginBottom:10}} className='btn btn-sm btn-warning'>
            Kembali
        </Link>
        <form onSubmit={saveData}>
            <div class="row mb-3">
                <label for="" class="col-sm-2 col-form-label">Input NIM</label>
                <div class="col-sm-4">
                <input type="text" className={`form-control ${errors.tnim && 'is-invalid'}`} value={tnim} onChange={(e) =>  setTnim(e.target.value)} 
                    placeholder='Inputkan NIM Mahasiswa...'/>
                    {
                        errors.tnim && <div class="invalid-feedback">
                        {errors.tnim}
                      </div>
                    }
                </div>
            </div>
            <div class="row mb-3">
                <label for="" class="col-sm-2 col-form-label">Nama Lengkap</label>
                <div class="col-sm-10">
                <input type="text" className={`form-control ${errors.tnama && 'is-invalid'}`} value={tnama} onChange={(e) =>  setTnama(e.target.value)} 
                    placeholder='Inputkan Nama Lengkap...'/>
                    {
                        errors.tnama && <div class="invalid-feedback">
                        {errors.tnama}
                      </div>
                    }
                </div>
            </div>
            <div class="row mb-3">
                <label for="" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                <div class="col-sm-4">
                    <select className={`form-select ${errors.tjenkel && 'is-invalid'}`} onChange={(e) => setTjenkel(e.target.value)}>
                        <option value="" selected={true}>--Pilih--</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    {
                        errors.tjenkel && <div class="invalid-feedback">
                        {errors.tjenkel}
                        </div>
                    }
                </div>
            </div>
            <div class="row mb-3">
                <label for="" class="col-sm-2 col-form-label">Alamat</label>
                <div class="col-sm-10">
                    <textarea className={`form-control ${errors.talamat && 'is-invalid'}`} value={talamat} onChange={(e) =>  setTalamat(e.target.value)} 
                        placeholder='Inputkan Alamat...' cols={50} rows={5}></textarea>
                        {
                            errors.talamat && <div class="invalid-feedback">
                            {errors.talamat}
                            </div>
                        }
                </div>
            </div>
            <div class="row mb-3">
                <label for="" class="col-sm-2 col-form-label"></label>
                <div class="col-sm-10">
                    <button type='submit'disabled={loading} className='btn btn-success'>
                        {loading ? 'Tunggu...' : 'Simpan Data'}
                    </button>
                </div>
            </div>
        </form>
        </div>
    )
}