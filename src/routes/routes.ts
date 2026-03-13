import { Router } from 'express';
import { CreateUserController } from '../controllers/user/create.controller';
import { LoginUserController } from '../controllers/user/login.controller';
import { SearchUsersController } from '../controllers/user/search-users-db.controller';
import { LeadCreateController } from '../controllers/lead/create.controller';
import { GetLeadsController } from '../controllers/lead/get-leads.controller';
import { StagePutController } from '../controllers/lead/stage.controller';
import { DeleteLeadController } from '../controllers/lead/delete.controller';
import { DeleteUserController } from '../controllers/user/delete.controller';
import { EditInfoController } from '../controllers/lead/editInfos.controller';

export const router = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const searchUsersController = new SearchUsersController();
const leadCreateService = new LeadCreateController();
const getLeadsController = new GetLeadsController();
const stagePutController = new StagePutController();
const deleteLeadController = new DeleteLeadController();
const deleteUserController = new DeleteUserController();
const editInfoController = new EditInfoController();


// ========================================================================================================= //
// Users

// Register User
router.post('/users', (req, res) => createUserController.handle(req, res));
// Find db
router.get('/users', (req, res) => searchUsersController.handle(req, res));
// Login user
router.post('/auth/login', (req, res) => loginUserController.handle(req, res));
router.delete('/user/:id', (req, res) => deleteUserController.handle(req, res));

// ========================================================================================================= //

// Lead

router.post('/users/:userId/lead', (req, res) => leadCreateService.handle(req, res));
router.get('/users/:userId/leads', (req, res) => getLeadsController.handle(req, res))
router.put('/users/:userId/leads/:leadId/stage', (req, res) => stagePutController.handle(req, res));
router.put('/users/:userId/leads/:leadId/editInfo', (req, res) => editInfoController.handle(req, res))

router.delete('/users/:userId/leads/:leadId', (req, res) => deleteLeadController.handle(req, res));
