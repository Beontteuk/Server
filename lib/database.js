// const {Pool} = require('pg');
// const bodyParser = require('body-parser')
// const jwt = require('./jwt')

// var pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'hackathon',
//   password: 'password',
//   port: 5432 //postgres의 기본 포트인듯?
// })


// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows);
//   })
// }

// const getUserById = (request, response, user_id) => {
//   console.log(user_id);
//   pool.query('SELECT * FROM users WHERE user_id=$1', [user_id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows);
//   })
// }

// const getUserByEmail = (request, response) => {
//   const user = request.body;
//   console.log(user);
//   //email

//   pool.query('SELECT * FROM users WHERE email=$1', [user.email], (error, results) => {
//     if (error) {
//       throw error
//     }
//     if(results.rows.length > 0){
//       response.status(200).json(results.rows[0]);
//     }
//     else {
//       response.status(201).json({isSuccess:false});
//     }
    
//   })
// }

// const logintest = (request, response) => {
//   const id = request.body.id;

//   response.status(200).send(`안녕하세요, ${id}`);
// }


// const createUser = (request, response) => {
//   const user = request.body;
//   //id
//   //pw
//   //email

//   console.log(user);

//   pool.query('INSERT INTO users (user_id, user_pw, email) VALUES ($1, $2, $3);', 
//   [user.id, user.pw, user.email], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).redirect('/');
//   })
// }

// const signin = (request, response) => {
//   const user = request.body;
//   //id
//   //pw
//   console.log(user);

//   pool.query('SELECT * FROM users WHERE user_id=$1 and user_pw=$2;', 
//   [user.id, user.pw], (error, results) => {
//     if (error) {
//       throw error
//     }

//     if(results.rows.length > 0){
//       response.status(200).send('로그인 성공');
//     }
//     else{
//       response.status(401).send('로그인 실패');
//     }
//   })
// }

// const getQrCount = (request, response) => {
//   const id = request.body.user_id;
//   console.log(id)
  

//   pool.query('SELECT * FROM users WHERE user_id=$1;', 
//   [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     if(results.rows.length > 0){
      
//       pool.query('SELECT qr_count FROM users WHERE user_id=$1', [id], function(error, results){   
//         if(error) {
          
//           throw err;
//         }
//         let qrcount = results.rows[0].qr_count;
//         response.status(200).send(qrcount.toString());
//       })

//     }
//     else{
//       response.status(401).send('id doesn\'t exist!');
//     }
//   })

  
// }



// const signinProcess = (request, response) => {

//   const user = request.body;
//   console.log(user);
//   //email

//   pool.query('SELECT * FROM users WHERE email=$1', [user.email], function(error, results){   
//     if(error) {
//       throw error
//     }
//     if(results.rows.length > 0) {
//       var userdata = results.rows[0];
//       console.log(userdata);
//       console.log("JWT 토큰발급!");
//       token = jwt.sign({
//         type: 'JWT',
//         nickname: "yuchan"
//     }, SECRET_KEY, {
//         expiresIn: '14d',
//         issuer: 'beomjun',
//     });
  
//     return res.status(200).json({
//         code: 200,
//         message: '토큰이 발급되었습니다',
//         token: token
//     });
//     } else {
//       console.log("그런거 없네요?")
//       response.status(401).json('{isSuccess:true}');
//     }
//   });
// }


// const getQrcodes = (request, response) => {
//   pool.query('SELECT * FROM qrcodes ORDER BY island_id ASC, qr_id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows);
//   })
// }

// const getQrcodelogs = (request, response) => {
//   pool.query('SELECT * FROM qrcode_logs', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows);
//   })
// }


// const addQrcodelog = (request, response) => {
//   const data = request.body;
//   let isValidateId;
//   //user_id
//   //island_id
//   //qr_id
//   console.log(data);

//   pool.query('SELECT * FROM users WHERE user_id=$1;', 
//   [data.user_id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     if(results.rows.length > 0){
//       console.log(data.island_id, data.qr_id);
//       pool.query('SELECT * FROM qrcode_logs WHERE island_id=$1 and qr_id=$2;', 
//       [data.island_id, data.qr_id], (error, checkresults) => {
//         console.log(checkresults.rows)
//           console.log(checkresults.rows);
//         if(checkresults.rows.length>0){
//           response.status(401).send('You already checked that qr code!');
//         }

//         else {
//           pool.query('INSERT INTO qrcode_logs (user_id, island_id, qr_id, time) VALUES ($1, $2, $3, NOW());', 
//           [data.user_id, parseInt(data.island_id), parseInt(data.qr_id)], (error, result) => {
//             if (error) {
//               throw error
//             }

//             addQrcount(data.user_id);
//             pool.query('UPDATE qrcodes SET count = count + 1 WHERE island_id=$1 and qr_id=$2', [parseInt(data.island_id), parseInt(data.qr_id)], (error, results)  => {
//               if (error) {
//                 throw error
//               }
//               else {
//                 response.status(200).send('success');
//               }
//             })
            
//           })
//         }

        


//       });
      
//     }
//     else{
//       response.status(401).send('there is no id!');
//     }
//   })

  
// }


// const getPleges = (request, response) => {
//   const data = request.body;
//   //user_id
//   //island_id
//   console.log(data);

//   pool.query('SELECT pleges FROM users WHERE user_id=$1;', 
//   [data.user_id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     if(results.rows.length > 0){
//       console.log(results.rows[0]);
//       response.status(201).send(results.rows[0]);
//     }
//     else{
//       response.status(401).send('there is no id!');
//     }
//   })

  
// }

// const addPleges = (request, response)=> {
//   const data = request.body;
//   //user_id
//   //island_id
//   console.log(data);

//   pool.query('SELECT * FROM users WHERE user_id=$1;', 
//   [data.user_id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     if(results.rows.length > 0){
//       pool.query('UPDATE users SET pleges = array_append(pleges, $1) WHERE user_id=$2', [parseInt(data.island_id), data.user_id], (error, results)  => {
//         if (error) {
//           throw error
//         }

//         response.status(200).send('success');
//       })
//     }
//     else{
//       response.status(401).send('there is no id!');
//     }
//   })

  
// }

// const getMyQrcodes = (request, response) => {
//   const data = request.body;
//   //user_id
//   pool.query('SELECT island_id, qr_id FROM qrcode_logs WHERE user_id=$1;', 
//   [data.user_id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     if(results.rows.length > 0){
//       console.log(results.rows);
//       let qrcodes = []
//       //let qrcode
//       for(i=0;i<results.rows.length;i++){
//         //qrcode = results.rows[i]
//         qrcodes.push([results.rows[i].island_id, results.rows[i].qr_id]);
//       }
//       console.log(qrcodes);
      
//       //response.status(200).send(results.rows);
//       response.status(200).send(qrcodes);
//     }
//     else{
//       response.status(401).send('there is no record!');
//     }
//   })
    
// }

// const addQrcount = (id) => {
//   pool.query('UPDATE users SET qr_count = qr_count + 1 WHERE user_id=$1', [id], (error, results)  => {
//     if (error) {
//       throw error
//     }
//   })
// }

// const validateid = (id) => {
//   console.log(id);
//   pool.query('SELECT * FROM users WHERE user_id=$1;', 
//   [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     console.log(results.rows);
//     console.log(results.rows.length);
//     if(results.rows.length > 0){
//       console.log(true);
//       return true;
//     }
//     else{
//       console.log(false);
//       return false;
//     }
//   })

  
// }

// module.exports = {
//   getUsers,
//   getUserById,
//   getUserByEmail,
//   getQrCount,

//   logintest,

//   createUser,
//   signinProcess,
//   signin,

//   getQrcodes,
//   getQrcodelogs,
//   addQrcodelog,

//   showRanking,
//   getPleges,
//   addPleges,
//   getMyQrcodes
// }