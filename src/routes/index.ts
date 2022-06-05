const { Router } = require('express');

import loginRoutes from './logIn';
import userRoutes from './user';
import todosRoutes from './toDos'
import reportRoutes from './report';
import paginated from './paginated';

const router = Router();

router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/todos', todosRoutes);
router.use('/report', reportRoutes);
router.use('/paginated', paginated)

export = router;
