const fs = require('fs')


let listadoPorHacer = [];


const guardarDB = () => {
  const data = JSON.stringify(listadoPorHacer)
  fs.writeFile(`db/data.json`, data, err => {
    if(err) 
      throw new Error('No se pudo guardar', err)
  })
}

const cargarDB = () => {
  try {
    listadoPorHacer = require('../db/data.json') 
  } catch (error) {
    listadoPorHacer = []
  }

}

const crear = descripcion => {
  cargarDB()  
  const porHacer = {
    descripcion,
    completado: false
  }
  listadoPorHacer.push(porHacer)
  guardarDB()
  return porHacer
}

const getListado = () => {
  cargarDB()
  return listadoPorHacer
}

const actualizar = (descripcion, completado = true) => {
  cargarDB()
  const index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
  if (index >= 0) {
     listadoPorHacer[index].completado = completado 
     guardarDB()
     return true
  } 
  return false
}
const borrar = descripcion => {
  cargarDB()
  const index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
  if (index >= 0) {
    listadoPorHacer.splice(index, 1)
    guardarDB()
    return true
  } 
  return false
}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}