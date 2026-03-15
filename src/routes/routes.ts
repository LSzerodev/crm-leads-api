import { Router } from 'express';
import {
  CreateUserController,
  DeleteLeadController,
  DeleteUserController,
  EditInfoController,
  GetLeadsController,
  LeadCreateController,
  LeadDashboardController,
  LoginUserController,
  SearchUsersController,
  StagePutController,
} from '../controllers';

export const router = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const searchUsersController = new SearchUsersController();
const leadCreateController = new LeadCreateController();
const getLeadsController = new GetLeadsController();
const leadDashboardController = new LeadDashboardController();
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

router.post('/users/:userId/lead', (req, res) => leadCreateController.handle(req, res));
router.get('/users/:userId/leads', (req, res) => getLeadsController.handle(req, res));
router.get('/users/:userId/leads/dashboard', (req, res) =>
  leadDashboardController.handle(req, res),
);
router.put('/users/:userId/leads/:leadId/stage', (req, res) => stagePutController.handle(req, res));
router.put('/users/:userId/leads/:leadId/editInfo', (req, res) => editInfoController.handle(req, res));

router.delete('/users/:userId/leads/:leadId', (req, res) => deleteLeadController.handle(req, res));
