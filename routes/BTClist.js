var express=require('express');
var router =express.Router();
var FiiterBTC=require('../object/FiiterBTC.js');
router.get('/',function(req,res)
{
	res.render('index',
		{page: 'Home ',
        menuId: 'Home',
        parentMenu: 'Home'})
})
router.get('/BTClist',function(req,res)
{
	res.render('BTClist',{
        page: 'Hoạt Động ',
        menuId: 'Khách hàng',
        parentMenu: 'Khách hàng',
    });

})

router.get('/GetProvincialByName',function(req,res){
	let query={};
	FiiterBTC.GetProvincialByName(query,function(ret)
	{
		res.send(ret)
	})
})
router.get('/GetBTClistByName',function(req,res)
{
	let Name=req.query.Name;
	let match={
		$match:{
			Provincial:Name
		}
	}
	let lookup={$lookup: {
                    from:'BTCFile',
                    localField:'_id',
                    foreignField:'psid',
                    as: 'BTCFileL'
                }};
      let project={
    	$project:{
    		'Name':1,
    		'Birthday':1,
    		'Provincial':1,
    		'TeamId':1,
    		'Type':1,
    		'Phone':1,
    		'Email':1,
    		'ImgUrl':1,
    		'ApprovedId':1,
    		'ApprovedName':1,
    		'InsertDate':1,
    		'UpdateDate':1,
    		'BTCFileL._id':1
    	}
    }
	FiiterBTC.GetBTClist([match,lookup,project],function(ret)
	{
		res.send(ret)
	})
})

router.get('/GetBTClistByNames',function(req,res)
{
	let lookup={$lookup: {
                    from:'BTCFile',
                    localField:'_id',
                    foreignField:'psid',
                    as: 'BTCFileL'
                }};
     let project={
    	$project:{
    		'Name':1,
    		'Birthday':1,
    		'Provincial':1,
    		'TeamId':1,
    		'Type':1,
    		'Phone':1,
    		'Email':1,
    		'ImgUrl':1,
    		'ApprovedId':1,
    		'ApprovedName':1,
    		'InsertDate':1,
    		'UpdateDate':1,
    		'BTCFileL._id':1
    	}
    }
	FiiterBTC.GetBTClist([lookup,project],function(ret)
	{
		res.send(ret)
	})
})

router.get('/GetBTCFile',function(req,res)
{
	let psid=req.query.psid;
	let match={
		$match:{
			psid:psid
		}
	}
	let lookup={$lookup: {
                    from:'BTCContent',
                    localField:'ContentId',
                    foreignField:'ContentId',
                    as: 'BTCContentId'
                }};
    let project={
    	$project:{
    		'ContentId':1,
    		'TitleId':1,
    		'FileName':1,
    		'FileLink':1,
    		'LinkNote':1,
    		'psid':1,
    		'UserName':1,
    		'Provincial':1,
    		'InputDate':1,
    		'BTCContentId.Name':1
    	}
    }
	FiiterBTC.GetBTCCfile([match,lookup,project],function(ret)
	{
		res.send(ret)
	})
})


router.get('/MemberByid',function(req,res)
{
	let id=req.query.id;
	FiiterBTC.GetMemberByID(id,function(ret)
	{
		res.send(ret)
	})
})


router.get('/GetBtcContent',function(req,res)
{
		let id=req.query.id;
     let match={
     	$match:{
     			TeamId:id
     	}
     }
	let lookup={$lookup: {
                    from:'BTCPoint',
                    localField:'TeamId',
                    foreignField:'TeamId',
                    as: 'BtcContent'
                }};
 
	FiiterBTC.GetBtcContent([match,lookup],function(ret)
	{
		res.send(ret)
	})
})

module.exports=router;