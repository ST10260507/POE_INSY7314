// src/routes/detailsRoutes.js (FINAL CORRECTED VERSION)

/*Route-level clarity mirrors the lab brief: public reads; author-only draft ops; 
editor/admin publish; admin delete.
*/
const router = require('express').Router();
const Detail = require('../models/Details');

// 1. FIX: Only import 'protect', 'client', and 'admin' from the unified authMiddleware.
const { protect, client, admin } = require('../middleware/authMiddleware');

// 2. 🛑 ELIMINATE THIS LINE IF IT EXISTS:
// const { onlyClients, onlyAdmins } = require('../middleware/roles');

const ctrl = require('../controllers/DetailsController'); 

router.get('/getDetail', protect, client, ctrl.getDetail); 

// Public reads
router.get('/', ctrl.listDetails);
router.get('/:detailsId', ctrl.getDetail);

// Author actions (Client POST route)
// Line 18 (Now Line 15)
router.post('/', protect, client, ctrl.addDetails);

// Publish (Client post action)
// Line 24 (Now Line 18)
router.post('/:detailsId/add', protect, client, ctrl.addDetails);

router.put('/:id/approve', protect, admin, ctrl.approveTransaction);
router.put('/:id/reject', protect, admin, ctrl.rejectTransaction);


module.exports = router;