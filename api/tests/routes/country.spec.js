/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'Resumen de la receta'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('/recipes', () => {
    it('GET should get 200 and notes are returned as json', () => {
      return agent
      .get('/recipes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    });
    it(' GET busca una receta por nombre',() => {
      return agent
      .get('/recipes?name=chocolate')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    });
    it('POST returned a mesagge succesfully', () => {
      return agent
      .post('/recipes')
      .send({
        name: "Garlicky Chilli",
        summary: "Hagals con cuidado pana",
        healthScore: 99,
        analyzedInstructions: "Step1 cocinar las papas",
        diets: [1,3,5]
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({msn: 'Recipe created succesfully'})
      })
    })
  });
});
