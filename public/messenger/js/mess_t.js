var options = ["op-infoUser", "op-location"];


$(window).ready(function(){
    $('#op-position').hide();
    $('#op-time').hide();
    $('#op-status').hide();
    $('#preview').hide();
    $('#option-search li a').on('click', function (event) {

        var $target = $(event.currentTarget),
            val = $target.attr('data-value'),
            $inp = $target.find('input'),
            idx;

        if ((idx = options.indexOf(val)) > -1) {
            options.splice(idx, 1);
            setTimeout(function () {
                $inp.prop('checked', false)
            }, 0);
        } else {
            options.push(val);
            setTimeout(function () {
                $inp.prop('checked', true)
            }, 0);
        }      
        $(event.target).blur();
        $('#op-infoUser').hide();
        $('#op-location').hide();
        $('#op-position').hide();
        $('#op-time').hide();
        $('#op-status').hide();
        options.forEach(element => {
            $('#' + element).show();
        });
        console.log(options);
        return false;
    });
    var w = window.innerWidth;
    if(w<800){
        $('#parent-menu-report').children().eq(0).hide();
        $('#parent-menu-report').children().eq(1).show();
    }else{
        $('#parent-menu-report').children().eq(1).hide();
        $('#parent-menu-report').children().eq(0).show();
    }
   
});


//<![CDATA[
    var srcFolderImg = "https://platform.messnow.com/",/// Thư mục ảnh
    srcAddImg = "upload", /// Thêm ảnh
    srcQueue = 'QueueMessenger',
    srcRmImg = "/bots/rmImage/129415371237192",/// Xóa ảnh
    srcAddFile = "uploadfb", /// Thêm File
    srcRmFile = "/bots/rmFile/129415371237192",/// Xóa file
    ajaxSave = "/previewmess", /// Lưu thông tin toàn bộ thẻ 
    urlBuild = "https://m.me/1113824118828101", /// Về trang thiết lập
    srcRmcard = "/bots/rmCard", //// Xóa thẻ
    srcLayoutModule = "/bots/getLayoutModule/5c7e384dc941487ab0febce7",
    srcGetStates = "/bots/getState",
    srcGetCities = "/bots/getCity",
    srcClipboard = "/api/shortener",
    httpLink = "https://platform.messnow.com/link/",
    botId = "5c7e384dc941487ab0febce7",
    txtCard1 = "Nội dung",
    txtCard2 = "Nhập nội dung",
    txtCard3 = "Số lượng",
    txtCard4 = "Nhập số lượng",
    txtCard5 = "Giá",
    txtCard6 = "Nhập giá",
    txtCard7 = "Nội dung",
    txtCard8 = "Số lượng",
    txtCard9 = "Bắt buộc phải điền vào \"Phụ đề hoặc mô tả\" hay thêm nút hoặc hình ảnh",
    txtCard10 = "Thẻ mô-đun bắt buộc phải nằm cuối cùng dưới tất cả các thẻ còn lại",
    txtCard11 = "Tải âm thanh lên",
    txtCard12 = "Tải video lên",
    txtCard13 = "Tải tệp lên",
    txtCard14 = "Tải ảnh lên",
    txtCard15 = "Thay thế",
    txtCard16 = "Xóa",
    txtCard17 = "Tiêu đề (bắt buộc)",
    txtCard18 = "Phụ đề hoặc mô tả",
    txtCard19 = "Thêm nút",
    txtCard20 = "Nhập văn bản",
    txtCard21 = "Mô-đun",
    txtCard22 = "Bạn có chắc chắn muốn gửi đi tin nhắn này?",
    txtCard23 = "Bạn có chắc chắn muốn xóa nút này không?",
    txtCard24 = "Bạn có chắc chắn muốn xóa Trả lời nhanh không?",
    txtCard25 = "Chia sẻ",
    txtCard26 = "Chia sẻ thẻ này",
    txtCard27 = "Gửi vị trí",
    txtCard28 = "Nút trả lời nhanh cho phép người dùng gửi vị trí của mình lên cho bot.",
    txtCard29 = "Số điện thoại",
    txtCard30 = "Nút \"số điện thoại\" cho phép người dùng gửi số điện thoại của mình lên cho bot.",
    txtCard31 = "Nút \"email\" cho phép người dùng gửi email của mình lên cho bot.",
    txtCard32 = "Mua sản phẩm này",
    txtCard33 = "Nhập tên nút",
    txtCard34 = "Thẻ",
    txtCard35 = "Điện thoại",
    txtCard36 = "Mô-đun",
    txtCard37 = "Chia sẻ",
    txtCard38 = "Vị trí",
    txtCard39 = "Số điện thoại",
    txtCard40 = "Mua",
    txtCard41 = "Chọn  thẻ của bạn",
    txtCard42 = "Hủy",
    txtCard43 = "Xong",
    txtCard44 = "Nhập Url",
    txtCard45 = "Nhập số điện thoại của bạn",
    txtCard46 = "Nhấn vào nút này thì sẽ mở ra nút chia sẻ",
    txtCard47 = "Chọn mô-đun",
    txtCard48 = "Nút trả lời nhanh cho phép người dùng gửi vị trí của mình lên cho bot.",
    txtCard49 = "Nhập giá sản phẩm của bạn",
    txtCard50 = "Nhập thuế GTGT của sản phẩm",
    txtCard51 = "Giảm giá",
    txtCard52 = "Thêm giảm giá",
    txtCard53 = "Bắt buộc phải điền \"Tiêu đề\"",
    txtCard54 = "Bắt buộc phải điền \"Tiêu đề\" và một hình ảnh",
    txtCard55 = "Vui lòng nhập một đường dẫn URL hợp lệ",
    txtCard56 = "Tối thiểu là 2 mục, tối đa là 4 mục bao gồm cả banner",
    txtCard57 = "Lỗi...",
    txtCard58 = "Một trong các thẻ của bạn đang bị lỗi.",
    txtCard59 = "Đồng ý",
    txtCard60 = "Hủy",
    arLink    = [];
    function card(){
        var htmlListCard ='<optgroup label="Nhóm 1"></optgroup>';        return htmlListCard;
    }

    function module(){
        var htmlListModule ='';        return htmlListModule;
    }
//]]>
var cb1=document.getElementById('cb1');
var cb2= document.getElementById('cb2');
var dvTypeProperty = document.getElementById("dvTypeProperty");
var dvAddProperty = document.getElementById("dvAddProperty");
var btnText=document.getElementById("dvAddProperty");
var btnQr=document.getElementById("btnQr");
var btnUrl=document.getElementById("btnUrl");
var btnCall=document.getElementById("btnCall");
var btnShare=document.getElementById("btnShare");
var option=null;
var objListOption={};
var countButton=0;
function sendMess() {
    var r = confirm("Bạn có muốn gửi tin nhắn ?");
    if (r == true) {
        var d={};
        var name = "";
        var IdProvincial = '';
        var IdDistrict = '';
        var IdWard = '';
        var position = "";
        var position2 = "";
        var level = "";
        var limit;
        if ($('#txtName').val() != "" && $('#txtName').val() != undefined)
            name = $("#txtName").val();
        if (cboProvincial.selectedIndex != 0)
            IdProvincial = cboProvincial[cboProvincial.selectedIndex].value;
        if (cboDistricts.selectedIndex != 0)
            IdDistrict = cboDistricts[cboDistricts.selectedIndex].value;
        if (cboWards.selectedIndex != 0)
            IdWard = cboWards[cboWards.selectedIndex].value;
        level = cboLevel.value;
        if (cboPosition.selectedIndex != 0)
            position = cboPosit1ion[cboPosition.selectedIndex].text;
        if (cboPosition2.selectedIndex != 0)
            position2 = cboPosition2[cboPosition2.selectedIndex].text;
        if (cbolimit.value != '0') {
            limit = parseInt(cbolimit.value);
        }
        d.date = getDate();
        d.phone = $("#txtPhone").val();
        d.name = name;
        d.position = position;
        d.position2 = position2;
        d.limit = limit;
        d.type = mode;
        if (IdProvincial != '')
            d.IdProvincial = IdProvincial;
        if (IdDistrict != '')
            d.IdDistrict = IdDistrict;
        if (IdWard != '')
            d.IdWard = IdWard;
        d.level = level;
        if (txtMess.checked&&(txtMess.value == undefined || txtMess.value == "")) {
            alert("Bạn phải nhập nội dung tin nhắn");
            txtMess.focus();
            return;
        }
        d.Msg = txtMess.value;
        d.model = cboMode.value;
        d.Option=objListOption;
        //alert(objAi.Id);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(d),
            contentType: 'application/json',
            url: '/sendbroadcast.bot',
            success: function (data) {

                //console.log('success');
                alert(data.ss);
                console.log(data);

            },
            error: function (err) {
                if (err.responseText = -'Unauthorized')
                    alert("Bạn đã bị time out");
                window.location.href = 'login.html';
            }
        });
    }



}
// var datatable2 = $('#grvMessResult').DataTable({
//     scrollY: 400,
//     scrollX: true,
//     scrollCollapse: true,
//     select: true,
//     dom: 'Bfrtip',
//     buttons: [{
//             extend: 'excelHtml5',
//         },
//         {
//             extend: 'pdfHtml5',
//         }
//     ],
//     processing: true,
//     ajax: {
//         dataType: "json",
//         url: "/getMessagesReads",
//         data: function (d) {

//         },
//         dataSrc: ""
//     },
//     columns: [{
//             data: 'Msg',
//             defaultContent: ""
//         },
//         {
//             data: 'InsertDate',
//             render: function (data, type, row, meta) {
//                 return GetDate(data);
//             }
//         },
//         {
//             data: 'Totail',
//             defaultContent: ""
//         },
//         {
//             data: 'Detail',
//             render: function (data, type, row, meta) {
//                 return GetRead(data);
//             }
//         }
//     ]
// });

function getMess() {
    datatable2.ajax.reload();
    datatable2.draw();
};

function GetDate(data) {
    var date = new Date(data);
    var value = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return value;
};

function GetRead(data) {
    var value = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].Status == 'C')
            value = value + 1;
    }
    return value;
}

function cboModechange() {
    if (cboMode.value != '0') {
        txtMess.disabled = true;
    }else{
        txtMess.disabled = false;
    }
}

function messTypeClick(value) {
    //var value = value;
	option=value;
	var startTable='<form class="form-horizontal">';
	var endTable='</form>';
	var conten='';
	if(value=='BUTTON')
	{
		conten='<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Nhãn BT</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtLable" name="txtLable" required=true class="form-control" maxlength="20"></div></div>';
		
		
		conten=conten+'<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Payload</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtCode" name="txtCode" required=true class="form-control"></div></div>';
		
	}else if(value=='BUTTON_URL'){
        
        //  btnText
        //  btnQr
        //  btnUrl
        //  btnCall
        //  btnShare
		conten='<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Nhãn BT</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtLable" name="txtLable" required=true class="form-control" maxlength="20"></div></div>';
		
		
		///conten=conten+'<div class="col-sm-10"><input type="text" id="txtCode" name="txtCode" required=true class="form-control"></div></div>';
		
		conten=conten+'<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">URL</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtCode" name="txtCode" required=true class="form-control"></div></div>';
		conten=conten+'<div class="form-group"><div class="col-sm-offset-2 col-sm-10"><div class="checkbox"><label><input type="checkbox" value="isWebView" id="ckIsWebView">Web view</label></div></div></div>';
	
	}else if(value=='BUTTON_CALL'){
		
		conten='<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Nhãn BT</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtLable" name="txtLable" required=true class="form-control" maxlength="20"></div></div>';
		
		
		conten=conten+'<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">ĐT</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtCode" name="txtCode" required=true class="form-control"></div></div>';
		
	}else if(value=='QUICK_REPLY'){
		
		
		conten='<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Nhãn QR</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtLable" name="txtLable" required=true class="form-control" maxlength="20"></div></div>';
		
		conten=conten+'<div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Payload</label>';
		conten=conten+'<div class="col-sm-10"><input type="text" id="txtCode" name="txtCode" required=true class="form-control"></div></div>';
			
	}
	dvTypeProperty.innerHTML=startTable+conten+endTable;
 
};
function addOption(){
    if(countButton<3)
    {
        var obj={};
       
        var txtLable= document.getElementById("txtLable");
        var txtCode= document.getElementById("txtCode");
        
        obj.Name=txtLable.value;
        obj.Value=txtCode.value;
        var buttonKey=new Date().getTime();/// Tạo key cho button
        if(option=='QUICK_REPLY'){
           
            dvAddProperty.innerHTML=dvAddProperty.innerHTML+'<button type="button" class="btn btn-default"  onClick="removeOption(this)" value="'+buttonKey+'">'+txtLable.value+'</button>';
        } else if(option=='BUTTON_URL') 
        {
        // btnText.disabled = true;
            // btnQr
            btnUrl.disabled = false;
            btnCall.disabled = false;
            obj.Type='BTURL';
            var ckIsWebView = document.getElementById("ckIsWebView");
            obj.IsWebView=ckIsWebView.checked;
          
            dvAddProperty.innerHTML=dvAddProperty.innerHTML+'<button type="button" class="btn btn-default" onClick="removeOption(this)" value="'+buttonKey+'">'+txtLable.value+'</button>';
        }else if(option=='BUTTON_CALL') 
        {
        /// btnText.disabled = true;
            // btnQr
            btnUrl.disabled = false;
            btnCall.disabled = false;
        // btnShare.disabled = true;
          
            obj.Type='BTCALL';
            dvAddProperty.innerHTML=dvAddProperty.innerHTML+'<button type="button" class="btn btn-default" onClick="removeOption(this)" value="'+buttonKey+'">'+txtLable.value+'</button>';
        }
        
        objListOption[buttonKey]=obj;/// gán đối tượng button vào object cùng key với button
        countButton=countButton+1;
    }else
    {
        alert('Tối đa chỉ được đính kèm 3 button');
    }
};
function removeOption(obj){
    var elem = obj;
    var r = confirm("Bạn có muốn xóa button "+obj.outerText);
    if (r == true) {
        delete objListOption[elem.value];
        countButton=countButton-1;
        elem.parentNode.removeChild(elem);
    } else {
       // txt = "You pressed Cancel!";
    }
    return false;
}
function clearOption(){
    countButton=0;
    objListOption={};
	var txtLable= document.getElementById("txtLable");
    dvAddProperty.innerHTML=null;
   /// btnText.disabled = false;
    btnUrl.disabled = false;
    btnCall.disabled = false;
   // option=null;
 //   btnShare.disabled = false;
};
function loadFaildimg(v){

};
function getQuery(){
    
}