const app = require('../index');
//assert 
let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

chai.use(chaiHttp);

describe('POST /Donneurs',  ()=>  {
 
  it('respond with 201 created',  (done) => {
    let data = {     "id": "0",
    "Nom": "Boyle",
    "Prenom": " White",
    "gendre": "male",
    "age": "40",
    "poid": "57Kg",
    "Telephone": "+1 (834) 500-2370",
    "groupe_sanguin": "O+"
  
    }
          chai.request(app)
          .post('/Donneurs')
          .send(data)
          

          .end((err, response) => {
            expect(response.status).to.eq(200)
           


            done();
          });
  });
});

////
describe('POST /Donneurs',  () => {
  let data = {
      //no id
            //no titre

      
          }
  it('respond with 400 not created',  (done)=>  {
    chai.request(app)
          .post('/Donneurs')
          .send(data)
         
          
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.be.eq('"Donneurs_non_cree"');

              done();
          });
  });
});
//DELETE 
describe('DELETE /Donneurs/:id',  (done)=>  {
  it('Deletes a particular Donneurs',  (done)=>  {
    chai.request(app)
  .delete('/Donneurs/1')
  .end((err, response) => {
    response.should.have.status(200);

      done();
  });  
});
  });

//GET

describe("GET /Donneurs", () => {
  it("done", (done) => {
   chai.request(app)
       .get("/Donneurs")
     
 
       .end((err, response) => {
        expect(response.status).to.eq(200)
        
 
 
         done();
       });
       });
 });
 
 describe("GET /Donneurs/:id", () => {
  it("done", (done) => {
    chai.request(app)
      .get("/Donneurs")
     
      .end((err, response) => {
        expect(response.status).to.eq(200)
       


        done();
      });
      });

  it("done", (done) => {
    chai.request(app)
      .get("/Donneurs/nonexistingDonneurs")
    
      .end((err, response) => {
        response.should.have.status(400);

          done();
      });
    });

  });
