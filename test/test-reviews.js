// // test-reviews.js

// const chai = require('chai')
// const chaiHttp = require('chair-http')
// const server = require('../app')
// const should = chair.should()
// const Review = require('../models/review')

// chai.use(chaiHttp)

// // tell mocha you want to test Reviews 
// describe('Reviews', () =>{

//     //TEST INDEX
//     it('should index ALL reviews on / GET', (done) => {
//         chai.request(server)
//         .get('/')
//         .end((err,res) =>{
//             res.should.have.status(200)
//             res.should.be.html
//             done()
//         })
//     })
//     // TEST NEW 
//     // TEST CREATE 
//     // TEST SHOW
//     // TEST EDIT
//     // TEST UPDATE
//     // TEST DELETE 
// })