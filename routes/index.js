var express=require('express');
var router =express.Router();
router.get('/wvproduct', function(req, res, next) {
 res.send('ok')
});
module.exports=router;