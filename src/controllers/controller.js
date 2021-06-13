const mysqldb = require('../db/myConnection')

const getEmployees = (req, res) => new Promise((resolve, reject) => {
    
    mysqldb.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        console.log('MySQL Connection: ', connection.threadId);
        connection.query('SELECT * FROM empleado', (err, results) => {
            if (err)
                console.error(err);
            //console.log('User Query Results: ', results);
            res.send(results);
        });
    });
});

exports.getEmployees = getEmployees;

const getEmployeesXID = (req, res) => new Promise((resolve, reject) => {
    const legajo = parseInt(req.params.legajo);
    mysqldb.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('SELECT * FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.getEmployeesXID = getEmployeesXID;

const createEmployee = (req, res) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body;   
    var values = [legajo, apellido, nombre, dni, sector, fecha_ingreso, activo];
    mysqldb.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'INSERT INTO empleado(legajo, apellido, nombre, dni, sector, fecha_ingreso, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    res.json({ message: "Empleado insertado con exito" });
                }
            });
        }
    });
});

exports.createEmployee = createEmployee;

const updateEmployee = (req, res) => new Promise((resolve, reject) => {
    const { apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body;
    const legajo = parseInt(req.params.legajo);
    var values = [apellido, nombre, dni, sector, fecha_ingreso, activo, legajo];
    mysqldb.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fecha_ingreso=?, activo=? WHERE legajo=?';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err });
                }
                else {
                    res.json({ message: "Empleado actualizado con exito" });
                }
            });
        }
    });
});

exports.updateEmployee = updateEmployee;

const deleteEmployee = (req, res) => new Promise((resolve, reject) => {
    const legajo = parseInt(req.params.legajo);
    mysqldb.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('DELETE FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
            if (err) {
                console.error(err);
                res.json({ message: "Error al tratar de Eliminar" });
            }
            else {
                res.json({ message: "Empleado eliminado con exito" });
            }
        });
    });
});
exports.deleteEmployee = deleteEmployee;