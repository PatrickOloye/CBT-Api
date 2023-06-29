const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/cbtAuth');
const { 
    adminCreateExams, 
    adminGetExams, 
    adminGetExamsBySubject, 
    adminViewUser, 
    adminUpdateExam, 
    adminViewUserByUsername, 
    adminDeleteExam, 
    adminUpdateUserRoles,
    adminViewAllAnswer,
    adminViewAllAnswerByUsername} = require('../controller/admin.controller');

router.post('/adminPost', isAuth, adminCreateExams);
router.get('/adminGet', isAuth, adminGetExams);
router.get('/adminGet/:subject', isAuth, adminGetExamsBySubject);
router.get('/adminView', isAuth, adminViewUser);
router.put('/adminUpdate', isAuth, adminUpdateExam);
router.get('/adminViewUser/:username', isAuth, adminViewUserByUsername);
router.delete('/adminDelete/:nameOfSubject', isAuth, adminDeleteExam);
router.put('/adminUpdateRoles', isAuth, adminUpdateUserRoles);
router.get('/adminGetAllAnswers', isAuth, adminViewAllAnswer);
router.get('/adminGetAnswerByUsername/:username', isAuth, adminViewAllAnswerByUsername);

module.exports = router;


/**
 * @swagger
 *  /api/admin/adminGet:
 *    get:
 *      summary: Admin get all questions
 *      tags: {Admin getting all questions}
 *      responses:
 *        "200":
 *          description: admin get all questions successfully
 *          contents:
 *            application/json:
 *              schema:
 *
 */  


/**
 * @swagger
 *  /api/admin/adminGetAllAnswers:
 *    get:
 *      summary: Admin get all answers
 *      tags: {Admin getting all answers}
 *      responses:
 *        "200":
 *          description: all answers gotten successfully
 *          contents:
 *            application/json:
 *              schema:
 *
 */  


/**
 * @swagger
 *  /api/admin/adminView:
 *    get:
 *      summary: Admin view user
 *      tags: {Admin view user}
 *      responses:
 *        "200":
 *          description: admin get all questions successfully
 *          contents:
 *            application/json:
 *              schema:
 *
 */  


/**
 * @swagger
 *  /api/cbt/adminUpdate:
 *    put:
 *      summary: admin update the exam 
 *      tags: {Admin to update the exam content}
 *      parameters:
 *        - in: path
 *          name: nameOfSubject
 *          schema:
 *              description: The Subject name
 *        - in: path
 *          name: duration
 *          schema:
 *              description: duration for the exam 
 *        - in: path
 *          name: instruction
 *          schema:
 *              description: instructions for the students
 *        - in: path
 *          name: question
 *          schema:
 *              description: questions
 *      responses:
 *        "200":
 *          description: exam successfully updated
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
 *  /api/cbt/adminUpdateRoles:
 *    put:
 *      summary: admin to update roles of users
 *      tags: {Admin to update user roles}
 *      parameters:
 *        - in: path
 *          name: role
 *          schema:
 *              description: title
 *      responses:
 *        "200":
 *          description: role successfully updated
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
 *  /api/admin/adminPost:
 *    post:
 *      summary: Admin Create new questions
 *      tags: {Admin creating questions}
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin'
 *      responses:
 *        "201":
 *          description: admin created questions successfully
 *          contents:
 *            application/json:
 *              schema:
 *                
 * 
 */

/**
   * @swagger
   * '/api/admin/adminGet/{subject}':
   *  get:
   *     tags:
   *     - Admin to get exam
   *     summary: Get a single exam by the subject
   *     parameters:
   *      - name: XamIdId
   *        in: path
   *        description: The subject of the exam
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Exam'
   *       404:
   *         description: Subject not found
   */

/**
 * @swagger
 * /api/admin/adminDelete/{nameOfSubject}:
 *  delete:
 *   summary: delete exam
 *   description: delete exam
 *   parameters:
 *    - in: path
 *      name: name of subject
 *      schema:
 *       type: string
 *      required: true
 *      description: name of subject
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */

/**
   * @swagger
   * '/api/admin/adminViewUser/{userName}':
   *  get:
   *     tags:
   *     - Admin to get a particular user
   *     summary: Get a single user by the userName
   *     parameters:
   *      - name: userName
   *        in: path
   *        description: the userName of the particular user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Exam'
   *       404:
   *         description: Subject not found
   */
/**
   * @swagger
   * '/api/admin/adminGetAnswerByUsername/{userName}':
   *  get:
   *     tags:
   *     - Admin to get all answers by userName
   *     summary: Get a s by the userName
   *     parameters:
   *      - name: userName
   *        in: path
   *        description: the userName for the answer
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Exam'
   *       404:
   *         description: Subject not found
   */

