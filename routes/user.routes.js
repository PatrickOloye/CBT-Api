const express = require('express');
const { createUser, 
    verifyEmail, 
    cbtLogin, 
    studentViewDetails, 
    studentUpdateDetail, 
    studentViewResult } = require('../controller/user.controller');
const { isAuth } = require('../middleware/cbtAuth');
const  ApiRateLimiter  = require('../middleware/rateLimit');
const router = express.Router();

router.post('/studentSignUp', createUser);
router.get('/emailVerification/:id', verifyEmail);
router.post('/userLogin', ApiRateLimiter, cbtLogin);
router.get('/viewDetail', isAuth, studentViewDetails);
router.put('/updateDetail', isAuth, studentUpdateDetail);
router.get('/viewResult', isAuth, studentViewResult)

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - username
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The user was added to the system
 *       example:
 *         id: 5f5c5c5f5c5f5c5f5c5f5c5f
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@gmail.com
 *         password: 123456
 *         username: john
 *         isActive: true
 *         roles: admin         
 *         createdAt: 2019-02-17T14:00:00.000Z
 *         updatedAt: 2019-02-17T14:00:00.000Z
 *         __v: 0
 * 
 */


/**
 * @swagger
 * tags:
 *  name: User Controller
 *  description: These API endpoints are used to manage the CBT
 */


/**
 * @swagger
 *  /api/cbt/studentSignUp:
 *    post:
 *      summary: Create new users
 *      tags: {User to sign up}
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: user created successfully
 *          contents:
 *            application/json:
 *              schema:
 *                
 * 
*/


/**
 * @swagger
 *  /api/cbt/viewDetail:
 *    get:
 *      summary: user view his detail
 *      tags: {User to view detail}    
 *      responses:
 *        "200":
 *          description: user successfully view his detail
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                 $ref: '#/components/schemas/User'
 *                
 * 
*/



/**
 * @swagger
 *  /api/cbt/updateDetail:
 *    put:
 *      summary: user update his detail
 *      tags: {User to update his detail}
 *      parameters:
 *        - in: path
 *          name: firstName
 *          schema:
 *              description: firstName of the user
 *        - in: path
 *          name: lastName
 *          schema:
 *              description: the lastName of the user
 *      responses:
 *        "200":
 *          description: user successfully updated his detail
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                 $ref: '#/components/schemas/User'
 *                
 * 
*/


/**
 * @swagger
 *  /api/cbt/viewResult:
 *    get:
 *      summary: user view his Result
 *      tags: {User to view Result}    
 *      responses:
 *        "200":
 *          description: user successfully view his detail
 *          
 * 
*/