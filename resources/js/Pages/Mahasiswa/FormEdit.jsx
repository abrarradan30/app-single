import React, {useState} from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className='container container-fluid'>
        <h1>Form Edit Mahasiswa</h1>
        <hr/>
        <Link as='button' type='button' href='/mahasiswa' style={{marginBottom:10}} className='btn btn-sm btn-warning'>
            Kembali
        </Link>
        <form onSubmit={saveData}>
            <div class="row mb-3">
                <label for="" class="col-sm-2 col-form-label">Input NIM</label>
                <div class="col-sm-4">
                <input type="text" className={`form-control ${errors.tnim && 'is-invalid'}`} value={tnim} onChange={(e) =>  setTnim(e.target.value)} 
                    disabled={true}/>
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
                        <option value="L" selected={tjenkel == 'L' && true} >Laki-Laki</option>
                        <option value="P" selected={tjenkel == 'P' && true} >Perempuan</option>
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