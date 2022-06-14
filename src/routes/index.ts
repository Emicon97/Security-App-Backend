const { Router } = require('express');

import loginRoutes from './logIn';
import userRoutes from './user';
import todosRoutes from './toDos'
import reportRoutes from './report';
import paginatedRoutes from './paginated';
import logoutRoutes from './logout'
import verificationRoutes from './verification';
import environment from './environment'
import emailRoutes from './email';

const router = Router();

router.use('/logout', logoutRoutes);
router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/todos', todosRoutes);
router.use('/report', reportRoutes);
router.use('/paginated', paginatedRoutes);
router.use('/verification', verificationRoutes);
router.use('/environment', environment)
router.use('/email', emailRoutes);

export = router;
