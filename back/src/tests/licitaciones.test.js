const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const config = require('../config');
const express = require('express');
const app = config(express());
const Licitacion = require('../models/licitacion');

let mongoServer;

const licitacionCompleta = {
  nombre: "Test Licitacion Completa",
  num_proceso: "EXP-2025-00123456",
  expediente: "EX-2025-09876543",
  area: "Infraestructura",
  subarea: "Obras Públicas",
  firmante: "Ing. Laura Gómez",
  modalidad: "Abierta",
  tipo_contrato: "Suministro",
  estado: "En evaluación",
  plazo: "90 días",
  inicio: "2025-06-01",
  vencimiento: "2025-09-01",
  monto: 2500000,
  pliego_ingreso: "2025-05-01",
  pliego_egreso: "2025-05-10",
  salida_pg1: "2025-05-15",
  vuelta_pg1: "2025-05-20",
  fecha_llamado: "2025-05-25",
  apertura_ofertas: "2025-06-05",
  fecha_vencimiento_plazo_impugnacion: "2025-06-20",
  fecha_vencimiento_doc: "2025-06-30",
  salida_pg2: "2025-07-05",
  vuelta_pg2: "2025-07-10",
  fecha_aprobatoria: "2025-08-01",
  aprobatoria: "2025-08-02",
  Active: true,
  renglon: [
    {
      descripcion: "Pavimentación de calle principal",
      monto: 1500000,
      oferta: [
        {
          monto_oferta: 1450000,
          observaciones: "Incluye materiales premium",
          ganador: true,
          documentacion: true,
          fecha_oferta: "2025-06-05",
          beneficiario: ["682612f9eb903e2f0e532b63"]
        },
        {
          monto_oferta: 1470000,
          observaciones: "Propuesta con menor tiempo de entrega",
          ganador: false,
          documentacion: true,
          fecha_oferta: "2025-06-05",
          beneficiario: ["682612f9eb903e2f0e532b63", "68261b131168c9834e26148b"]
        }
      ]
    }
  ],
  orden_compra: [
    {
      num_orden: "OC-2025-0001",
      monto: 1450000,
      tipo: "Compra Directa",
      destinatario: ["68261b131168c9834e26148b", "682612f9eb903e2f0e532b63"],
      origen: "licitacion",
      ampliatoria: [
        {
          tipo: "AMPLIATORIA",
          acta: "Acta N° 123",
          monto: 100000,
          vencimiento: "2025-10-01",
          observaciones: "Ampliación por cambio de condiciones"
        }
      ],
      prorroga: [
        {
          tipo: "PRORROGA",
          acta: "Acta N° 124",
          monto: 0,
          vencimiento: "2025-12-01",
          observaciones: "Prórroga por clima"
        }
      ],
      control: [
        {
          num_certificado: "1",
          periodo: "2025-12-01",
          SPR: "",
          PRD: "",
          monto_ejecutado: 15000,
          monto_pagado: 15000,
          estado: "PAGADO"
        }
      ]
    }
  ]
};

const licitacionEditada = {
  nombre: "Test Licitacion Editada",
  monto: 250,
  pliego_ingreso: "2025-05-01",
  pliego_egreso: "2025-05-11",
  Active: true,
  renglon: [
    {
      descripcion: "Pavimentación de calle principal",
      monto: 1500000,
      oferta: [
        {
          monto_oferta: 1470000,
          observaciones: "Propuesta Editada",
          ganador: false,
          documentacion: true,
          fecha_oferta: "2025-06-05",
          beneficiario: ["68261b131168c9834e26148b"]
        }
      ]
    }
  ],
  orden_compra: [
    {
      num_orden: "OC-2025-0001 Editada",
      monto: 1450000,
      tipo: "Compra Directa",
      destinatario: ["68261b131168c9834e26148b", "682612f9eb903e2f0e532b63"],
      origen: "licitacion",
      ampliatoria: [
        {
          tipo: "AMPLIATORIA",
          acta: "Acta N° 123",
          monto: 100000,
          vencimiento: "2025-10-01",
          observaciones: "Ampliación por cambio de condiciones"
        }
      ],
      prorroga: [
        {
          tipo: "PRORROGA",
          acta: "Acta N° 124",
          monto: 0,
          vencimiento: "2025-12-01",
          observaciones: "Prórroga por clima"
        }
      ],
      control: [
        {
          num_certificado: "1",
          periodo: "2025-12-01",
          SPR: "",
          PRD: "",
          monto_ejecutado: 15000,
          monto_pagado: 15000,
          estado: "PAGADO"
        }
      ]
    },
    {
      num_orden: "OC-2025-0001 Editada nueva",
      monto: 1450000,
      tipo: "Compra Directa",
      destinatario: ["68261b131168c9834e26148b", "682612f9eb903e2f0e532b63"],
      origen: "licitacion",
      ampliatoria: [],
      prorroga: [],
      control: [
        {
          num_certificado: "1 editado",
          periodo: "2025-12-01",
          SPR: "",
          PRD: "",
          monto_ejecutado: 15000,
          monto_pagado: 15000,
          estado: "PAGADO"
        }
      ]
    }
  ]
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Licitacion.deleteMany(); // limpia antes de cada test
});

test('POST /licitacion crea una nueva licitacion(fecha, monto)', async () => {
  const res = await request(app)
    .post('/api/licitacion')
    .send({
      nombre: 'Test Licitacion',
      num_proceso: '123',
      inicio: '2025-06-01',
      monto: 2500000,
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.nombre).toBe('Test Licitacion');
  expect(res.body.inicio).toBe('2025-06-01T00:00:00.000Z');
  expect(res.body.monto).toBe(2500000);
});

test('POST /licitacion crea una nueva licitacion completa', async () => {
  const res = await request(app)
    .post('/api/licitacion')
    .send(licitacionCompleta)

  expect(res.statusCode).toBe(200);
  expect(res.body.nombre).toBe('Test Licitacion Completa');
  expect(res.body.orden_compra).toHaveLength(1)
  expect(res.body.renglon).toHaveLength(1);
  expect(res.body.renglon[0].oferta).toHaveLength(2);
  expect(res.body.renglon[0].oferta[0].monto_oferta).toBe(1450000);

});

test('GET /licitacion devuelve todas las licitaciones', async () => {
  const res1 = await request(app)
    .post('/api/licitacion')
    .send(licitacionCompleta)

  const res = await request(app)
    .get('/api/licitacion');

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].nombre).toBe('Test Licitacion Completa');
  expect(res.body[0].orden_compra).toHaveLength(1)
  expect(res.body[0].renglon).toHaveLength(1);
  expect(res.body[0].renglon[0].oferta).toHaveLength(2);
  expect(res.body[0].renglon[0].oferta[0].monto_oferta).toBe(1450000);
  expect(res.body[0].orden_compra[0].num_orden).toBe("OC-2025-0001");
})


test('editar una licitación existente', async () => {

  //Crea una licitación completa para editar
  const resCreate = await request(app)
    .post('/api/licitacion')
    .send(licitacionCompleta)

  createdId = resCreate.body._id;

  //edito la licitación creada
  const res = await request(app)
    .put('/api/licitacion/')
    .query({ id: createdId })
    .send(licitacionEditada)
    .expect(200);


  // Asegura que los cambios se aplicaron
  expect(res.body.nombre).toBe("Test Licitacion Editada");
  expect(res.body.monto).toBe(250);
  expect(res.body.renglon[0].oferta).toHaveLength(1);
  expect(res.body.renglon[0].oferta[0].observaciones).toBe("Propuesta Editada");
  expect(res.body.orden_compra).toHaveLength(2);
  expect(res.body.orden_compra[0].num_orden).toBe("OC-2025-0001 Editada");

})

