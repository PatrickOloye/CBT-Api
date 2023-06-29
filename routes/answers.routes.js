const express = require('express');
const { answerTaking } = require('../controller/answer.controller');
const { isAuth } = require('../middleware/cbtAuth');
const router = express.Router();


router.post('/postAnswers', isAuth, answerTaking);

module.exports= router;



/**
 * @swagger
 * components:
 *   schemas:
 *     AnswerController:
 *       type: object
 *       required:
 *         - nameOfSubject
 *         - questions: [question, options, answerPosition]
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         nameOfSubject: 
 *           type: string
 *           description: The name of the subject
 *         questions: 
 *           type: array
 *           description: The questions of the subject and the answer
 *         
 *       example:
 *           id:  56uhgbbnjjkbn
 *           nameOfSubject: "Maths"
 *           questions:
 *             - question: "What is 2 + 2?"
 *             - options:
 *               - answerPosition: 1
 *               - answerPosition: 2
 *               - answerPosition: 3
 *               - answerPosition: 4
 *               - answerPosition: 5
 *             - answerPosition: 3
 * 
 * 
 *
 *         
 * 
 */




/**
 * @swagger
 *  /api/cbt/postAnswers:
 *    post:
 *      summary: store answers in the database
 *      tags: { stored data from user }
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerController'
 *      responses:
 *        "201":
 *          description: user's answer successfully created
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                 $ref: '#/components/schemas/AnswerController'
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
 *                 $ref: '#/components/schemas/AnswerController'
 *                
 * 
*/
