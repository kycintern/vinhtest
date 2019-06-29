
//https://nongsanvn.herokuapp.com/getMemberCMS
var idatadetail = null;
var cboProvincial = document.getElementById("cboProvincial");
var cboPosition = document.getElementById("cboPosition");
var cboPosition2 = document.getElementById("cboPosition2");
var cboDistricts = document.getElementById("cboDistricts");
var cboWards = document.getElementById("cboWards");
var cbolimit = document.getElementById('cbolimit');
var cboDate = document.getElementById("cboDate");
var datepk1 = document.getElementById("datepk1");
var datepk2 = document.getElementById("datepk2");
var ipMode = document.getElementById('mode');
var datatable;
var datatable1;
var objProvincials;
var objDistricts;
var objWards;
var objBranch;
var queryResult;
var menu;
function cboLevelChange(event) {
    var value = event.value;
    if (value == '1') {
        setDataPosition(arrPosition[0], arrLayer[0]);
        setDataPosition2(arrPosition_[0], arrLayer_[0]);
    } else if (value == '2') {
        setDataPosition(arrPosition[1], arrLayer[1]);
        setDataPosition2(arrPosition_[1], arrLayer_[1]);
    } else if (value == '3') {
        setDataPosition(arrPosition[2], arrLayer[2]);
        setDataPosition2(arrPosition_[2], arrLayer_[2]);
    } else if (value == '4') {
        setDataPosition(arrPosition[3], arrLayer[3]);
        setDataPosition2(arrPosition_[3], arrLayer_[3]);
    } else {
        setDataPosition(arrPosition[4], arrLayer[4]);
        setDataPosition2(arrPosition_[4], arrLayer_[4]);
    }
};

function setDataPosition(position, layer) {
    while (cboPosition.length > 0) {
        cboPosition.remove(0);
    }
    var o = new Option("Tất cả", "0");
    //o.selected=true;
    $("#cboPosition").append(o);
    for (var i = 0, len = position.length; i < len; ++i) {
        var o = new Option(position[i], layer[i]);
        $("#cboPosition").append(o);
    }
    var value = cboPosition[cboPosition.selectedIndex].text;
    var valueLevel = cboLevel[cboLevel.selectedIndex].value;
};

function loadPosition() {
    var position1 = [];
    var arrLayer1 = [];
    var position2 = [];
    var arrLayer2 = [];
    var position3 = [];
    var arrLayer3 = [];
    var position4 = [];
    var arrLayer4 = [];
    var position5 = [];
    var arrLayer5 = [];
    var objPosition;
    $.ajax({
        dataType: "json",
        url: "/getPosition",
        data: objPosition,
        success: function (data) {
            objPosition = data;
            for (var i = 0, len = objPosition.length; i < len; ++i) {
                var value = objPosition[i].Level;
                if (value == '1') {
                    position1.push(objPosition[i].Name);
                    arrLayer1.push(objPosition[i].Layer);
                } else if (value == '2') {
                    position2.push(objPosition[i].Name);
                    arrLayer2.push(objPosition[i].Layer);
                } else if (value == '3') {
                    position3.push(objPosition[i].Name);
                    arrLayer3.push(objPosition[i].Layer);
                } else if (value == '4') {
                    position4.push(objPosition[i].Name);
                    arrLayer4.push(objPosition[i].Layer);
                } else {
                    position5.push(objPosition[i].Name);
                    arrLayer5.push(objPosition[i].Layer);
                }
            }
            arrPosition = [position1, position2, position3, position4, position5];
            arrLayer = [arrLayer1, arrLayer2, arrLayer3, arrLayer4, arrLayer5];
            setDataPosition(arrPosition[0], arrLayer[0]);
        }
    });
};
loadPosition();

function setDataPosition2(position, layer) {
    while (cboPosition2.length > 0) {
        cboPosition2.remove(0);
    }
    var o = new Option("Tất cả", "0");
    //o.selected=true;
    $("#cboPosition2").append(o);
    for (var i = 0, len = position.length; i < len; ++i) {
        var o = new Option(position[i], layer[i]);
        $("#cboPosition2").append(o);
    }
    var value = cboPosition2[cboPosition2.selectedIndex].text;
    var valueLevel = cboLevel[cboLevel.selectedIndex].value;
};

function loadPosition2() {
    var position1 = [];
    var arrLayer1 = [];
    var position2 = [];
    var arrLayer2 = [];
    var position3 = [];
    var arrLayer3 = [];
    var position4 = [];
    var arrLayer4 = [];
    var position5 = [];
    var arrLayer5 = [];
    var objPosition;
    $.ajax({
        dataType: "json",
        url: "/getPosition2",
        data: objPosition,
        success: function (data) {
            objPosition = data;
            for (var i = 0, len = objPosition.length; i < len; ++i) {
                var value = objPosition[i].Level;
                if (value == '1') {
                    position1.push(objPosition[i].Name);
                    arrLayer1.push(objPosition[i].Layer);
                } else if (value == '2') {
                    position2.push(objPosition[i].Name);
                    arrLayer2.push(objPosition[i].Layer);
                } else if (value == '3') {
                    position3.push(objPosition[i].Name);
                    arrLayer3.push(objPosition[i].Layer);
                } else if (value == '4') {
                    position4.push(objPosition[i].Name);
                    arrLayer4.push(objPosition[i].Layer);
                } else {
                    position5.push(objPosition[i].Name);
                    arrLayer5.push(objPosition[i].Layer);
                }
            }
            arrPosition_ = [position1, position2, position3, position4, position5];
            arrLayer_ = [arrLayer1, arrLayer2, arrLayer3, arrLayer4, arrLayer5];
            setDataPosition2(arrPosition_[0], arrLayer_[0]);
        }
    });
};
loadPosition2();

function LoadCboProvincials() {
    var selectElemRef = document.getElementById("cboProvincial");
    $.ajax({
        dataType: "json",
        url: "/getProvincial",
        data: objProvincials,
        success: function (data) {
            objProvincials = data;
            while (selectElemRef.length > 0) {
                selectElemRef.remove(0);
            }
            if (objProvincials.length == 1) {
                var o = new Option(objProvincials[0].Type + ' ' + objProvincials[0].Name, objProvincials[0]._id);
                $("#cboProvincial").append(o);
                LoadCboDistricts(objProvincials[0]._id);
            } else {
                var o = new Option("Tất cả", "0");
                $("#cboProvincial").append(o);
                for (var i = 1, len = objProvincials.length + 1; i < len; ++i) {
                    var o = new Option(objProvincials[i - 1].Type + ' ' + objProvincials[i - 1].Name, objProvincials[i - 1]._id);
                    $("#cboProvincial").append(o);
                }
            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã bị time out");
                window.location.href = 'login.html';
            }
        }
    });
};
LoadCboProvincials();

function onCboProvincialsChange(event) {
    if (event.selectedIndex > 0) {
        var value = event.value;
        LoadCboDistricts(value);
    }
};

function LoadCboDistricts(idProvincial) {
    var selectElemRef = document.getElementById("cboDistricts");

    $.ajax({
        dataType: "json",
        url: "/getDistrict?idProvincial=" + idProvincial,
        data: objDistricts,
        success: function (data) {
            objDistricts = data;
            while (selectElemRef.length > 0) {
                selectElemRef.remove(0);
            }
            if (objDistricts.length == 1) {
                var o = new Option(objDistricts[0].Type + ' ' + objDistricts[0].Name, objDistricts[0]._id);
                $("#cboDistricts").append(o);
                LoadCboWards(objDistricts[0]._id);
            } else {
                var o = new Option("Tất cả ", "0");
                $("#cboDistricts").append(o);
                for (var i = 1, len = objDistricts.length + 1; i < len; ++i) {
                    var o = new Option(objDistricts[i - 1].Type + ' ' + objDistricts[i - 1].Name, objDistricts[i - 1]._id);
                    $("#cboDistricts").append(o);
                }

            }
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã bị time out");
                window.location.href = 'login.html';
            }
        }
    });
};

function onCboDistrictsChange(event) {
    if (event.selectedIndex > 0) {
        var value = event.value;
        LoadCboWards(value);
    }
};

function LoadCboWards(idDistrict) {
    var selectElemRef = document.getElementById("cboWards");
    var objWards;
    $.ajax({
        dataType: "json",
        url: "/getWards?idDistrict=" + idDistrict,
        data: objWards,
        success: function (data) {
            objWards = data;
            while (selectElemRef.length > 0) {
                selectElemRef.remove(0);
            }
            if (objWards.length == 1) {
                var o = new Option(objWards[0].Type + ' ' + objWards[0].Name, objWards[0]._id);
                $("#cboWards").append(o);
                LoadCboBranch(objWards[0]._id)
            } else {
                var o = new Option("Tất cả", "0");
                $("#cboWards").append(o);
                for (var i = 1, len = objWards.length + 1; i < len; ++i) {
                    var o = new Option(objWards[i - 1].Type + ' ' + objWards[i - 1].Name, objWards[i - 1]._id);
                    $("#cboWards").append(o);
                }
            }

        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã bị time out");
                window.location.href = 'login.html';
            }
        }
    });
};

function onCboWardChange(event) {
    if (event.selectedIndex > 0) {
        var value = event.value;
        LoadCboBranch(value);
    }
};

function LoadCboBranch(idward) {
    var selectElemRef = document.getElementById("cboBranch");
    var objBranch;
    $.ajax({
        dataType: "json",
        url: "/getBranch?IdWards=" + IdWards,
        data: objBranch,
        success: function (data) {
            objBranch = data;
            while (selectElemRef.length > 0) {
                selectElemRef.remove(0);
            }
            if (objBranch.length == 1) {
                var o = new Option(objBranch[0].Name, objBranch[0]._id);
                $("#cboBranch").append(o);
            } else {
                var o = new Option("Tất cả", "0");
                $("#cboBranch").append(o);
                for (var i = 1, len = objBranch.length + 1; i < len; ++i) {
                    var o = new Option(objBranch[i - 1].Name, objBranch[i - 1]._id);
                    $("#cboBranch").append(o);
                }
            }

        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã bị time out");
                window.location.href = 'login.html';
            }
        }
    });
};

function cboDateChange(event) {
    if (event.selectedIndex == '5') {
        document.getElementById("date1").style.display = 'inline';
        document.getElementById("date2").style.display = 'inline';
    } else {
        document.getElementById("date1").style.display = 'none';
        document.getElementById("date2").style.display = 'none';
    }
}

function SearchMember() {
    var data = getQuery();
    var sample;
    $('#parentTable1').show();
    $('#parentTable2').hide();
    $('#parent-menu-report ul li').not('.divider').prop('class', '');
    $('#parent-menu-report > ul > li:nth-child(1)').attr('class', 'active');
    $('#parent-menu-report > div > div > ul > li:nth-child(1)').attr('class', 'active');
    $.ajax({
        dataType: "json",
        data: data,
        url: "/getQueryReport",
        success: function (data) {
            sample = data[0].sample;
            drawTable(sample);
            queryResult=data[0];
            var menu = $('#parent-menu-report ul li');
            for (let index = 0; index < menu.length; index++) {
                const element = menu.eq(index);
                let text=element.text();
                text = text.replace(/\d/g, "");
                text=text.trim();
                var spanTotail = element.children().eq(0).children().eq(0);
                spanTotail.text('0');
                try {
                    switch (text) {
                        case 'Tổng số':
                            spanTotail.text(queryResult.Totail[0].Totail);
                            break;
                        case 'Tỉnh/Thành phố':
                            spanTotail.text(queryResult.grProvincial.length);
                            break;
                        case 'Quận/Huyện':
                            spanTotail.text(queryResult.grDistrict.length);
                            break;
                        case 'Xã/Phường':
                            spanTotail.text(queryResult.grWard.length);
                            break;
                        case 'Tổ/thôn/xóm':
                            spanTotail.text(queryResult.grBranch.length);
                            break;
                        case 'Đơn vị':
                            spanTotail.text(queryResult.grLevel.length);
                            break;
                        case 'Chức danh tại Hội':
                            spanTotail.text(queryResult.grPosition.length);
                            break;
                        case 'Chức danh tại Đoàn':
                            spanTotail.text(queryResult.grPosition2.length);
                            break;
                        case 'Ngày đăng ký':
                            spanTotail.text(queryResult.grTime.length);
                            break;
                        case 'Thông tin xác thực':
                            spanTotail.text(queryResult.grActive.length);
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    
                }
                
            }
            
        },
        error: function (err) {
            if (err.responseText == 'Unauthorized') {
                alert("Bạn đã bị time out");
                // window.location.href = 'login.html';
            }
        }
    });
    
};

function loadStart() {
    $('#loading').show();
    $('#col-sm-12').hide();
}

function loadStop() {
    $('#loading').hide();
    $('#col-sm-12').show();
}

function getDate() {
    value = cboDate.value;
    var data = {};
    var d = new Date();
    data.date1 = new Date();
    data.date2 = new Date();
    if (value == '0' || !$(cboDate).is(':visible'))
        return '';
    if (value == '1') {
        data.date1.setDate(d.getDate());
        data.date2.setDate(d.getDate() + 1);
    }
    if (value == '2') {
        data.date1.setDate(d.getDate() - 1);
        data.date2.setDate(d.getDate());
    }
    if (value == '3') {
        data.date1.setDate(1);
        data.date2.setDate(d.getDate() + 1);
    }
    if (value == '4') {
        data.date1.setDate(1);
        data.date1.setMonth(d.getMonth() - 1);
        data.date2.setDate(1);
    }
    if (value == '5') {
        data.date1 = new Date(datepk1.value);
        data.date2 = new Date(datepk2.value);
    }
    data.date1.setHours(0);
    data.date1.setMinutes(0);
    data.date2.setHours(0);
    data.date2.setMinutes(0);
    data.date1 = data.date1.toISOString();
    data.date2 = data.date2.toISOString();
    return data;
}
//////////////////////////
function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/////////////////////////////////////////////////////


function getQuery(){
    var d = {};
    var name = "";
    var IdProvincial = '';
    var IdDistrict = '';
    var IdWard = '';
    var Branch = '';
    var position = "";
    var position2 = "";
    var level = "";
    var mode = cboType.value;
    var limit = 10;
    if ($('#txtName').val() != "" && $('#txtName').val() != undefined && $('#txtName').is(':visible'))
        name = $("#txtName").val();
    if (cboProvincial.value != 0 && $(cboProvincial).is(':visible'))
        IdProvincial = cboProvincial[cboProvincial.selectedIndex].value;
    if (cboDistricts.value != 0 && $(cboDistricts).is(':visible'))
        IdDistrict = cboDistricts[cboDistricts.selectedIndex].value;
    if (cboWards.value != 0 && $(cboWards).is(':visible'))
        IdWard = cboWards[cboWards.selectedIndex].value;
    if (cboBranch.value != 0 && $(cboBranch).is(':visible'))
        Branch = cboBranch[cboBranch.selectedIndex].text;
    if ($(cboLevel).is(':visible'))
        level = cboLevel.value;
    if (cboPosition.value != 0 && $(cboPosition).is(':visible'))
        position = cboPosition[cboPosition.selectedIndex].text;
    if (cboPosition2.value != 0 && $(cboPosition2).is(':visible'))
        position2 = cboPosition2[cboPosition2.selectedIndex].text;
    d.date = getDate();
    if ($("#txtPhone").is(':visible'))
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
    if (Branch != '')
        d.branch = Branch;
    d.level = level;
    d.active = cboVal.value;
    if (!$(cboVal).is(':visible')) d.active = '';
    return d;
}
$('#parent-menu-report ul li').click(function () {
    console.log('');
    let text=$(this).text();
    text = text.replace(/\d/g, "");
    text = text.trim();
    menu=text;
    $('#parentTable1').hide();
    $('#parentTable2').show();
    $('#parent-menu-report ul li').not('.divider').prop('class', '');
    $(this).prop('class', 'active');
    switch (text) {
        case 'Tổng số':
            $('#parentTable1').show();
            $('#parentTable2').hide();
            drawTable(queryResult.sample);
            break;
        case 'Tỉnh/Thành phố':
            drawTable1(queryResult.grProvincial);
            break;
        case 'Đơn vị':
            drawTable1(queryResult.grLevel);
            break;
        case 'Quận/Huyện':
            drawTable1(queryResult.grDistrict);
            break;
        case 'Xã/Phường':
            drawTable1(queryResult.grWard);
            break;
        case 'Tổ/thôn/xóm':
            drawTable1(queryResult.grBranch);
            break;
        case 'Chức danh tại Hội':
            drawTable1(queryResult.grPosition);
            break;
        case 'Chức danh tại Đoàn':
            drawTable1(queryResult.grPosition2);
            break;
        case 'Ngày đăng ký':
            drawTable1(queryResult.grTime);
            break;
        case 'Thông tin xác thực':
            drawTable1(queryResult.grActive, text);
            break;
        default:
            break;
    }
});
function drawTable(sample) {
    if (datatable == null) {
        $('#preview').show();
        datatable = $('#grvResult').DataTable({
            "searching": false,
            "paging": false,
            "info": false,
            scrollX: true,
            scrollY: '595px',
            scrollCollapse: true,
            paging: false,
            columnDefs: [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }, {
                'targets': 3,
                'width': '100px'
            }],
            fixedColumns: true,
            order: [
                [2, 'asc']
            ],
            buttons: [],
            data: sample,
            columns: [{
                    data: null,
                    render: function (data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                {
                    defaultContent: "",
                    data: 'ImgUrl',
                    render: function (data, type, row, meta) {
                        // return '<img src="' + data + '" height="80" width="80" onerror="loadFaildimg(this)" psid="' + row._id + '">';
                        // return `<img src="${data}" width="80" height="80" onerror="loadFaildimg(this)" psid="${row._id}"
                        //         error-src="${row.ImgUrl2}"
                        //         />`;
                        return `<img src="${data}" width="80" height="80" onerror="loadFaildimg(this)" psid="${row._id}"
                                error-src="${row.ImgUrl2}"
                                />`;
                    }
                },
                {
                    data: 'LevelName',
                    render: function (data, type, row, meta) {
                        if (data != null && typeof (data) == 'string')
                            return data.replace('(hoặc tương đương)', '');
                        return '';

                    },
                    defaultContent: ""

                },
                {
                    data: 'Name',
                    class: 'name',
                    render: function (data, type, row, meta) {
                        return '<a href="#" data-toggle="modal" data-target="#myModal" style="white-space: nowrap;">' + data + '</a>';
                    }
                },
                {
                    data: 'Position2',
                    defaultContent: ""
                }, {
                    data: 'Position',
                    defaultContent: ""
                }, {
                    data: 'Provincial',
                    defaultContent: ""
                }, {
                    data: 'District',
                    defaultContent: ""
                }, {
                    data: 'Ward',
                    defaultContent: ""
                }, {
                    data: 'Branch',
                    defaultContent: ''
                },
            ]
        });
        datatable.on('order.dt search.dt', function () {
            datatable.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

    } else {
        datatable.clear().rows.add(sample).draw();
    }

    $('#grvResult tbody').on('click', 'td.name', function () {
        var tr = $(this).closest('tr');
        var data = datatable.row(tr).data();
        document.getElementById('avatar').src = data.ImgUrl;
        $('#avatar').attr('error-src', data.ImgUrl2);
        document.getElementById('username').innerText = data.Name;
        document.getElementById('phone').innerHTML = '<i class="glyphicon glyphicon-phone" ></i>  ' + data.Phone;
        document.getElementById('email').innerHTML = '<i class="glyphicon glyphicon-envelope" ></i>  ' + data.Email;
        document.getElementById('brithday').innerHTML = '<i class="glyphicon glyphicon-gift" ></i>  ' + data.Birthday;
        document.getElementById('uname').innerText = data.Name;
        document.getElementById('uphone').innerText = data.Phone;
        document.getElementById('umail').innerText = data.Email;
        document.getElementById('ublood').innerText = data.Blood_type;
        document.getElementById('uwork').innerText = data.Work;
        document.getElementById('uhobby').innerText = data.Hobby;

        if (data.Type == 'DHT') {
            document.getElementById('position').innerText = 'Đoàn viên';
        } else {
            document.getElementById('position').innerText = data.Position2 + ', ' + data.Position;
        }
        var str = '';
        if (data.Provincial != 'NA' && data.Provincial != null) str += data.Provincial;
        if (data.District != 'NA' && data.District != null) str += ' - ' + data.District;
        if (data.Ward != 'NA' && data.Ward != null) str += ' - ' + data.Ward;
        if (data.Branch != 'NA' && data.Branch != null) str += ' - ' + data.Branch;
        // if (data.BranchCD != 'NA' && data.BranchCD != null) str += ' - ' + data.BranchCD;
        document.getElementById('address').innerText = str;
        document.getElementById('ugeo').innerText = str;
    });
}
function drawTable1(data){
    if(datatable1==null){
        datatable1 = $('#grvResult1').DataTable({
            "searching": true,
            "paging": false,
            "info": false,
            scrollX: true,
            scrollY: '595px',
            scrollCollapse: true,
            paging: false,
            fixedColumns: true,
            buttons: [],
            data: data,
            columns: [ {
                    data: '_id',
                    render: function (data, type, row, meta) {
                        var rs='';
                        switch (menu) {
                            case 'Đơn vị':
                                if (data == 1) rs= ' Trung Ương';
                                if (data == 2) rs= ' Tỉnh/TP';
                                if (data == 3) rs= 'Quận/Huyện';
                                if (data == 4) rs= 'Xã/Phường';
                                if (data == 5) rs= 'Chi đoàn/chi hội';
                                if (data == 8) rs= 'Đoàn viên';
                                break;
                            // case 'Ngày đăng ký':
                            //     rs= data.day + ' - ' + data.month + ' - '+data.year;
                            //     break;
                            case 'Thông tin xác thực':
                                if (data == null) rs= 'Chưa được xác thực ';
                                if (data == '1') rs= 'Thông tin đúng';
                                if (data == '0') rs= 'Thông tin sai';
                                break;
                            default:
                                rs= data;
                                break;
                        }
                        return rs;
                    },
                    defaultContent: ""
                }, {
                    data: 'count',
                    defaultContent: ''
                },
            ]
        });
    }else{
        datatable1.clear().rows.add(data).draw();
    }
}
