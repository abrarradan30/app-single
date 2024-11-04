import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../../components/Layout";

export default function Index({ mahasiswa, filters }) {
    // console.log(mahasiswa);
    const { flash } = usePage().props;

    const [search, setSearch] = useState(filters.search || "");

    const [showModal, setShowModal] = useState(false);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

    const openModal = (mhs) => {
        setSelectedMahasiswa(mhs);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMahasiswa(null);
    };

    const deleteData = () => {
        if (selectedMahasiswa) {
            Inertia.delete(`/mahasiswa/${selectedMahasiswa.id}`);
            closeModal();
        }
    };

    const editData = (id) => {
        Inertia.get(`/mahasiswa/${id}`);
    };

    const doSearchData = (e) => {
        e.preventDefault();
        Inertia.get("mahasiswa", { search }, { preserveState: true });
    };

    const startNumber = (mahasiswa.current_page - 1) * mahasiswa.per_page;

    return (
        <Layout>
            <div>
                <h3>Data Mahasiswa</h3>
                <hr />
                <Link
                    className="btn btn-sm btn-primary"
                    as="button"
                    type="button"
                    href="/mahasiswa/add"
                    style={{ marginBottom: 10 }}
                >
                    Tambah Data
                </Link>

                {flash && flash.message && (
                    <div
                        style={{
                            fontWeight: "bold",
                            color: "green",
                            marginBottom: 10,
                        }}
                    >
                        {flash.message}
                    </div>
                )}

                <form onSubmit={doSearchData}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cari berdasarkan NIM/Nama"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                        />
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                        >
                            Cari
                        </button>
                    </div>
                </form>
                <table className="table -table-bordered table-striped table-sm">
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
                        {mahasiswa.data && mahasiswa.data.length === 0 ? (
                            <tr>
                                <th colSpan={6}>Data kosong ...</th>
                            </tr>
                        ) : (
                            mahasiswa.data.map((mhs, index) => (
                                <tr key={index}>
                                    <td>{startNumber + index + 1}</td>
                                    <td>{mhs.nim}</td>
                                    <td>{mhs.nama_lengkap}</td>
                                    <td>
                                        {mhs.jenkel == "L"
                                            ? "Laki-Laki"
                                            : "Perempuan"}
                                    </td>
                                    <td>{mhs.alamat}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => editData(mhs.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            style={{ marginLeft: 5 }}
                                            onClick={() => openModal(mhs)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div style={{ marginTop: 5 }}>
                    <ul className="pagination">
                        {mahasiswa.links.map((link, index) => {
                            if (link.url === null) {
                                return null;
                            }

                            let isActive = link.active;
                            let className = isActive
                                ? "page-item active"
                                : "page-item";
                            let linkLabel = link.label
                                .replace(/&laquo;/, "<<")
                                .replace(/&raquo;/, ">>");

                            return (
                                <li className={className} key={index}>
                                    <button
                                        className="page-link"
                                        onClick={() => Inertia.get(link.url)}
                                    >
                                        {linkLabel}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {/* {mahasiswa.links.map((link, index) => {

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
                })} */}
                </div>

                {/* Modal for confirmation */}
                {showModal && selectedMahasiswa && (
                    <div
                        className="modal show d-block"
                        tabIndex="-1"
                        role="dialog"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Konfirmasi Hapus Data Mahasiswa
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Yakin menghapus data mahasiswa dengan
                                        nama <b>{selectedMahasiswa.nama_lengkap}</b> ?
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={deleteData}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
