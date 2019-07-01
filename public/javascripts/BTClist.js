let Provincial=[];
let Name;
let CurenProv;
let psid;
let Done;
let Tema=[];
let idTeam;
let Teamsss=[];
let Temalenfht=[];
let kq;
$(document).ready(function(){
GetProvincialByName()
GetprovincialByNameContent()
getteam()
});

function GetprovincialByNameContent()
{
  $('#iDprovencial')[0].innerHTML =`<option value="0">Tất cả các tỉnh</option>`
    $.ajax({
    url:"GetProvincialByName",
    type:"GET",
    success:function(retsult)
    {
      retsult.forEach(Provincial => {
                $('#iDprovencial')[0].innerHTML += `<option value=\'${Provincial.Name}\'>${Provincial.Name}</option>`;

              });
    }
})
}

$('#iDprovencial').change((event) =>
{
    let Namepoin =event.target.value;
    Getpoirn(Namepoin)
})
$('#idNameTeam').change((event) =>
{
      $('#iDprovencial').css({"display":""})

    let NameID =event.target.value;
    idTeam=NameID;
 
})

function getteam()
{
  $.ajax({
    type: 'GET',
    url:'GetTeam',
    success: (results) => {
      results.forEach((x)=>
      {
        $('#idNameTeam')[0].innerHTML+=`<option id="NameTeam" value=\'${x._id}\'>${x.Name}</option>`
      })
    }
  });
}

function Getpoirn(idoripoin) {
  let url = '/GetPoins?provId='+encodeURIComponent(idoripoin);
  $.ajax({
    type: 'GET',
    url: url,
    success: (results) => {
      results.forEach((data)=>
      {
        if(data.TeamId==idTeam)
        {
          Teamsss.push(data)
        }

      })
         Teamsss.forEach((x)=>
         {
          if(x.TeamPsid)
          {
            Temalenfht.push(x.TeamPsid)
          }
         })
        kq=(Number(Temalenfht.length)*100)/ Number(Teamsss.length);
         $('#Teameid')[0].innerHTML=`${String(kq).substring(0,2)}%`


    }
  });
}



function GetProvincialByName()
{
	$('#Provincial')[0].innerHTML='<option value="0">Vui lòng chọn tỉnh</option>';
	$.ajax({
		url:"GetProvincialByName",
		type:"GET",
		success:function(retsult)
		{
				Provincial = retsult.sort((a, b) => {
		        if (a.Name > b.Name) {
		          return 1;
		        } else if (a.Name === b.Name) {
		          return 0;
		        } else {
		          return -1;
		        }
		      });

				Provincial.forEach(Provincial => {
				        $('#Provincial')[0].innerHTML += `<option value=\'${Provincial.Name}\'>${Provincial.Name}</option>`;
				      });
		}
	})
}

$('#Provincial').change((event) => {
  let Name =event.target.value;
  CurenProv=Name;
	$('#spinnner').css({"display":""})
    $('#datatableBTC').css({"display":"none"})
	Getlist(CurenProv)
	 // if(CurenProv=="all")
		//   {
		//   	Getlistall()
		//   }
});

function Getlist(CurenProv) {
  let url = '/GetBTClistByName?Name='+encodeURIComponent(CurenProv);
  $.ajax({
    type: 'GET',
    url: url,
    success: (results) => {

    	$('#spinnner').css({"display":"none"})
    	$('#datatableBTC').css({"display":""})
      	draw(document.getElementById('datatableBTC'),results)
    }
  });
}

// function Getlistall() {
//   $.ajax({
//     type: 'GET',
//     url:'/GetBTClistByNames',
//     success: (results) => {
//     	console.log(results)
//     	$('#spinnner').css({"display":"none"})
//     	$('#datatableBTC').css({"display":""})
//       	draw(document.getElementById('datatableBTC'),results)
//     }
//   });
// }
let table = null;
function draw(grvResultCuren,data){  
    ///grvResultCuren.a
      if (table !== null) {
		    table.destroy();
		  }
    var tableBodyRef = grvResultCuren.getElementsByTagName('tbody')[0];
    ///tableBodyRef.remove();
    while(tableBodyRef.rows.length > 0) {
        tableBodyRef.deleteRow(0);
    }
    let a=1;
    for (var i = 0;i<data.length ; i++) {
    	  var idx=parseInt(tableBodyRef.rows.length);
          let newRow   = tableBodyRef.insertRow(idx);
          if(data[i].BTCFileL.length > 0)
          {
          newRow.innerHTML = '<td>'+(a++)+'</td><td style="vertical-align: middle;width:auto"><a href="#" onclick="infoMember(\''+data[i]._id+'\')" data-toggle="modal" data-target="#member-modal"><img class="imgu" height="60px" width="60px" style="border-radius: 100%;margin-right:10px"  src="'+data[i].ImgUrl+'" onerror="loadFaildimg(this)" psid="'+data[i]._id+'" error-src="'+data[i].ImgUrl2+'" />'+data[i].Name+'</a></td><td style="vertical-align: middle;width:auto">'+data[i].Birthday+'</td><td style="vertical-align: middle;width:auto">'+new Date(data[i].InsertDate).toLocaleString()+'</td><td style="vertical-align: middle;width:auto">'+data[i].Phone+'</td><td style="vertical-align: middle;" ><a href="#" onclick="GetproofByName(\''+data[i]._id+'\')" data-toggle="modal" data-target="#modal-foof">Xem Minh chứng</a></td>'; 
          }
          else
          {
          newRow.innerHTML = '<td>'+(a++)+'</td><td style="vertical-align: middle;width:auto"><a href="#" onclick="infoMember(\''+data[i]._id+'\')" data-toggle="modal" data-target="#member-modal"><img class="imgu" height="60px" width="60px" style="border-radius: 100%;margin-right:10px"  src="'+data[i].ImgUrl+'" onerror="loadFaildimg(this)" psid="'+data[i]._id+'" error-src="'+data[i].ImgUrl2+'" />'+data[i].Name+'</a></td><td style="vertical-align: middle;width:auto">'+data[i].Birthday+'</td><td style="vertical-align: middle;width:auto">'+new Date(data[i].InsertDate).toLocaleString()+'</td><td style="vertical-align: middle;width:auto">'+data[i].Phone+'</td><td style="vertical-align: middle;" ><a href="#" onclick="GetproofByName(\''+data[i]._id+'\')" data-toggle="modal" data-target="#modal-foof"></a></td>'; 

          }

    }
      
   table = $('#datatableBTC').DataTable({
    oLanguage: {
      sZeroRecords: "Không có tài khoản nào"
    },
    destroy: true,
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    "order": []
  });
  $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    
};


function loadFaildimg(element){
   var url = $(element).attr('error-src');
   $(element).attr('error-src', 'https://s3-ap-southeast-1.amazonaws.com/nosa/Avatar/defaul.png');
   $(element).attr('src', url);
}


function GetproofByName(psid)
{
	$('#spinesssr').css({"display":""})
	$('#datatablesfoof').css({"display":"none"})
	document.getElementById('id-modal-foof').innerHTML='';
	$.ajax({
		url:'GetBTCFile?psid='+psid,
		type:'GET',
		success:function(ret)
		{
			$('#spinesssr').css({"display":"none"})
			$('#datatablesfoof').css({"display":""})
			draw2(document.getElementById('datatablesfoof'),ret)
		}
	})

}


let table2 = null;
let FileLink;
let FileName;
let FileNote;
function draw2(grvResultCuren,data){  
    ///grvResultCuren.a
      if (table2 !== null) {
		    table2.destroy();
		  }
    var tableBodyRef = grvResultCuren.getElementsByTagName('tbody')[0];
    ///tableBodyRef.remove();
    while(tableBodyRef.rows.length > 0) {
        tableBodyRef.deleteRow(0);
    }
    let a=1;
    let NameContent;
		 	for (var i = 0;i<data.length ; i++) {
		 		    if(data[i].BTCContentId.length>0)
		 		    {
		 		    	NameContent=data[i].BTCContentId[0].Name
		 		    }
		    		FileLink=data[i].FileLink;
		    		FileName=data[i].FileName;
		    	  var idx=parseInt(tableBodyRef.rows.length);
		          let newRow   = tableBodyRef.insertRow(idx);

		          
		         
		          newRow.innerHTML = '<td style="vertical-align: middle;">'+new Date(data[i].InputDate).toLocaleString()+'</td><td style="vertical-align: middle;">'+NameContent+'</td><td style="vertical-align: middle;">'+FileName+'</td><td style="vertical-align: middle;"><p style="width:300px;overflow:auto">'+FileLink+'</p></td>'; 
		 }
      
};


function infoMember(id)
{
         $('#member-loading').css({"display":""});
         $('#body-member').css({"display":"none"});
  $.ajax({
    url:"/MemberByid?id="+id,
    type:"GET",
    success:function(ret)
    {
         $('#member-loading').css({"display":"none"});
         $('#body-member').css({"display":""});
      ret.forEach((data)=>
      {        
             document.getElementById('detailName').innerHTML='<h4>'+'<b>'+data.Name+'</b></h4>';
             document.getElementById('detailUName').innerHTML=data.Name;
             document.getElementById('address').innerHTML=data.Provincial;
              document.getElementById('Img-detail').innerHTML=`<img src="${data.ImgUrl}" width="150px" height="150px" style="border-radius: 100%" onerror="loadFaildimg(this)" psid="${data._id}"
                               error-src="${data.ImgUrl2}"
                               />`;
             document.getElementById('phone-membr').innerHTML='<i class="mdi mdi-email">'+''+data.Email+'</i>';
             document.getElementById('email-member').innerHTML='<i class="mdi mdi-tablet-android">'+''+data.Phone+'</i>';
             document.getElementById('brithday-member').innerHTML='<i class="mdi mdi-gift">'+''+data.Birthday+'</i>';
             document.getElementById('detailphone').innerHTML=data.Phone;
             document.getElementById('detailmail').innerHTML=data.Email;
             document.getElementById('detaoladdress').innerHTML=data.Provincial;
      })
    }
  })
}