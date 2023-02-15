// inisialisasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")

// Implementaion
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Membuat koneksi MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan_node_api"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

//<============================== CRUD BUKU ==============================>
// end-point AKSES DATA BUKU
app.get("/buku", (req, res) => {
    // Membuat sql query
    let sql = "select * from buku"

    // menjalankan query
    db.query(sql, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        }
        else {
            response = {
                count: result.length, //jumlah data
                buku: result //is data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data buku berdasarkan id_buku tertentu
app.get("/buku/:id", (req, res) => {
    let data = {
        id_buku: req.params.id
    }
    // create sql query
    let sql = "select * from buku where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                buku: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point MENAMBAHKAN DATA BUKU
app.post("/buku", (req,res) => {

    // prepare data
    let data = {
        judul_buku: req.body.judul_buku,
        tahun_terbit: req.body.tahun_terbit
    }

    // create sql query insert
    let sql = "insert into buku set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Buku Telah Ditambahkan"
            }
        }
        res.json(response) // send response
    })
})

// end-point MENGUBAH DATA BUKU BERDASARKAN ID_BUKU
app.put("/buku", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            judul_buku: req.body.judul_buku,
            tahun_terbit: req.body.tahun_terbit
        },

        // parameter (primary key)
        {
            id_buku: req.body.id_buku
        }
    ]

    // create sql query update
    let sql = "update buku set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Buku Telat Diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point MENGHAPUS DATA BUKU BERDASARKAN ID BUKU
app.delete("/buku/:id", (req,res) => {
    // prepare data
    let data = {
        id_buku: req.params.id
    }

    // create query sql delete
    let sql = "delete from buku where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Buku Telah Terhapus"
            }
        }
        res.json(response) // send response
    })
})

//<============================== CRUD SISWA ==============================>
// end-point AKSES DATA BUKU
app.get("/siswa", (req, res) => {
    // Membuat sql query
    let sql = "select * from siswa"

    // menjalankan query
    db.query(sql, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        }
        else {
            response = {
                count: result.length, //jumlah data
                siswa: result //isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data buku berdasarkan id_siswa tertentu
app.get("/siswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    // create sql query
    let sql = "select * from siswa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                siswa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point MENAMBAHKAN DATA SISWA
app.post("/siswa", (req,res) => {

    // prepare data
    let data = {
        nama_siswa: req.body.nama_siswa,
        kelas_siswa: req.body.kelas_siswa,
        absensi_siswa: req.body.absensi_siswa
    }

    // create sql query insert
    let sql = "insert into siswa set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Siswa Telah Ditambahkan"
            }
        }
        res.json(response) // send response
    })
})

// end-point MENGUBAH DATA SISWA BERDASARKAN ID_SISWA
app.put("/siswa", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nama_siswa: req.body.nama_siswa,
            kelas_siswa: req.body.kelas_siswa,
            absensi_siswa: req.body.absensi_siswa
        },

        // parameter (primary key)
        {
            id_siswa: req.body.id_siswa
        }
    ]

    // create sql query update
    let sql = "update siswa set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Siswa Telat Diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point MENGHAPUS DATA SISWA BERDASARKAN ID SISWA
app.delete("/siswa/:id", (req,res) => {
    // prepare data
    let data = {
        id_siswa: req.params.id
    }

    // create query sql delete
    let sql = "delete from siswa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Siswa Telah Terhapus"
            }
        }
        res.json(response) // send response
    })
})


//<============================== CRUD ADMIN ==============================>
// end-point AKSES DATA BUKU
app.get("/admin", (req, res) => {
    // Membuat sql query
    let sql = "select * from admin"

    // menjalankan query
    db.query(sql, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        }
        else {
            response = {
                count: result.length, //jumlah data
                admin: result //isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data buku berdasarkan id_admin tertentu
app.get("/siswa/:id", (req, res) => {
    let data = {
        id_admin: req.params.id
    }
    // create sql query
    let sql = "select * from siswa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point MENAMBAHKAN DATA admin
app.post("/admin", (req,res) => {

    // prepare data
    let data = {
        nama_admin: req.body.nama_admin,
        status: req.body.status
    }

    // create sql query insert
    let sql = "insert into admin set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Admin Telah Ditambahkan"
            }
        }
        res.json(response) // send response
    })
})

// end-point MENGUBAH DATA SISWA BERDASARKAN ID_ADMIN
app.put("/admin", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nama_admin: req.body.nama_admin,
            status: req.body.status
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]

    // create sql query update
    let sql = "update admin set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Admin Telat Diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point MENGHAPUS DATA SISWA BERDASARKAN ID ADMIN
app.delete("/admin/:id", (req,res) => {
    // prepare data
    let data = {
        id_admin: req.params.id
    }

    // create query sql delete
    let sql = "delete from admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " Admin Telah Terhapus"
            }
        }
        res.json(response) // send response
    })
})

//<============================== TRANSAKSI PEMINJAMAN BUKU ==============================>

// end-point menambahkan data peminjaman buku
app.post("/peminjaman_buku", (req,res) => {
    // prepare data to peminjaman_buku
    let data = {
        id_siswa: req.body.id_siswa,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss') // get current time
    }

    // parse to JSON
    let buku = JSON.parse(req.body.buku)

    // create query insert to peminjaman_buku
    let sql = "insert into peminjaman_buku set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        
        if (error) {
            res.json({message: error.message})
        } else {
            
            // get last inserted id_buku
            let lastID = result.insertId

            // prepare data to detail_peminjaman_buku
            let data = []
            for (let index = 0; index < buku.length; index++) {
                data.push([
                    lastID, buku[index].id_buku
                ])                
            }

            // create query insert detail_peminjaman_buku
            let sql = "insert into detail_peminjaman_buku values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message: error.message})
                } else {
                    res.json({message: "Peminjaman Telah Berhasil"})
                }
            })
        }
    })
})

// end-point menampilkan data peminjaman buku
app.get("/peminjaman_buku", (req,res) => {
    // create sql query
    let sql = "select p.id_peminjam, p.id_siswa, p.waktu, s.nama_siswa, s.kelas_siswa, s.absensi_siswa " +
     "from peminjaman_buku p join siswa s on p.id_siswa = s.id_siswa "

    // run query
    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                peminjaman_buku: result
            })
        }
    })
})

// end-point untuk menampilkan detail peminjaman buku
app.get("/peminjaman_buku/:id_peminjam", (req,res) => {
    let param = { id_peminjam: req.params.id_peminjam}

    // create sql query
    let sql = "select p.judul_buku, p.penulis, p.tahun_terbit " + 
    "from detail_peminjaman_buku dps join buku p "+
    "on p.id_buku = dps.id_buku " +
    "where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                detail_peminjaman_buku: result
            })
        }
    })
})

// end-point untuk menghapus data peminjaman_buku
app.delete("/peminjaman_buku/:id_peminjam", (req, res) => {
    let param = { id_peminjam: req.params.id_peminjam}

    // create sql query delete detail_peminjaman_buku
    let sql = "delete from detail_peminjaman_buku where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})
        } else {
            let param = { id_peminjam: req.params.id_peminjam}
            // create sql query delete peminjaman_buku
            let sql = "delete from peminjaman_buku where ?"

            db.query(sql, param, (error, result) => {
                if (error) {
                    res.json({ message: error.message})
                } else {
                    res.json({message: " Peminjaman Dihapus"})
                }
            })
        }
    })

})

app.listen(8000, () => {
    console.log("Perpustakaan berjalan di port 8000")
})
