
var map;
$(document).ready(function () {
    // prettyPrint();
    map = new GMaps({
        div: '#map',
        lat: 21.028511,
        lng: 105.804817
    });
    GMaps.geolocate({
        success: function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            map.setCenter(lat, lng);
            
        },
        error: function (error) {
            alert('Geolocation failed: ' + error.message);
        },
        not_supported: function () {
            alert("Your browser does not support geolocation");
        },
        always: function () {

        }
    });

    GMaps.on('click', map.map, function (event) {
        var index = map.markers.length;
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        console.log(lat,lng);
        var data={
            'format' : 'json' ,
            'lat' : lat,
            'lon': lng,
            'accept-language' :'vi',
        };
        var url = 'https://locationiq.com/v1/reverse_sandbox.php?'+jQuery.param(data);
        $.ajax({
            type:'get',
            url: '/getInfoPosition',
            data:{url:url},
            success: function (data) {
                var data=JSON.parse(data);
                city.value=data.address.city;
                district.value=data.address.county;
                // ward.value=data.address.road;
                addressFull.value=data.display_name;
                var content='<h4>Chọn địa chỉ kho:</h4>'+
                '<p>' + data.display_name + '</p>';
                

                // var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);
                map.removeMarkers();
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    infoWindow: {
                        content: content
                    }
                });
            },
            error:function (error){
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    infoWindow: {
                        content: '<h4>Chọn địa chỉ kho:</h4>'
                    }
                });
            }
           
        });
        // GMaps.geocode({
        //     location: {lat:lat,lng:lng},
        //     callback: function (results, status) {
        //         if (status == 'OK') {
        //             var latlng = results[0].geometry.location;
        //             map.setCenter(latlng.lat(), latlng.lng());
        //             map.addMarker({
        //                 lat: lat,
        //                 lng: lng,
        //                 title:'Địa chỉ Kho hàng',
        //                 infoWindow:{
        //                     content: results[0].formatted_address
        //                 }
        //             });
        //         }else{
        //             var template = $('#edit_marker_template').text();

        //             var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);
        //             map.removeMarkers();
        //             map.addMarker({
        //                 lat: lat,
        //                 lng: lng,
        //                 title: 'Marker #' + index,
        //                 infoWindow: {
        //                     content: content
        //                 }
        //             });
        //         }
        //     }
        // });
        
    });
    if (window.location.href.indexOf('admin')>=0){
        $('#frWareHouse').hide();
    }else{
        $.ajax({
            type:'GET',
            url:'/getWHRoot',
            success: function(ret){
                parentWH.remove(0);
                ret.forEach(element => {
                    var o = new Option(element.Name,element._id);
                    parentWH.add(o);
                });
            },
            error:function(error){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Xuất hiện lỗi!',
                    footer: '<a href="#">Liên hệ với chúng tôi để được hỗ trợ</a>'
                });
            }
        });
    }
        
});
function gps(){
    GMaps.geolocate({
        success: function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            map.setCenter(lat, lng);
            var data = {
                'format': 'json',
                'lat': lat,
                'lon': lng,
                'accept-language': 'vi',
            };
            var url = 'https://locationiq.com/v1/reverse_sandbox.php?' + jQuery.param(data);
            $.ajax({
                type: 'get',
                url: '/getInfoPosition',
                data: {
                    url: url
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    objAddress = data;
                    city.value = data.address.city;
                    district.value = data.address.county;
                    // ward.value=data.address.road;
                    addressFull.value = data.display_name;
                    var content = '<h4>Chọn địa chỉ kho:</h4>' +
                        '<p>' + data.display_name + '</p>';


                    // var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);
                    map.removeMarkers();
                    map.addMarker({
                        lat: lat,
                        lng: lng,
                        infoWindow: {
                            content: content
                        }
                    });
                }

            });

        },
        error: function (error) {
            alert('Geolocation failed: ' + error.message);
        },
        not_supported: function () {
            alert("Your browser does not support geolocation");
        },
        always: function () {

        }
    });
}
function submit(){
    // var myData = getFormResults(document.getElementById('FrWareHouse'));
    // console.log(myData);
    var d={};
    d.Name = nameWH.value;
    d.Phone = phone.value;
    d.Email = email.value;
    d.Parent_warehouse = parentWH.value;
    d.Provincial = city.value;
    d.District = district.value;
    d.Ward = ward.value;
    d.Address = addressFull.value;
    d.lat='';
    d.lng='';
    if (map.markers.length==1){
        d.lat = map.markers[0].position.lat();
        d.lng = map.markers[0].position.lng();
    }
    $('#btnSubmit').prop('disabled', true);
    $.ajax({
        type: 'GET',
        datatype:'json',
        url: window.location.pathname + '/add',
        data: d,
        timeout: 5000,
        success: function (ret) {
            $('#btnSubmit').prop('disabled', false);
            Swal.fire(
                'Thêm kho hoàn thành',
                'nhấn vào nút!',
                'success'
            );
        },
        error: function (error) {
            $('#btnSubmit').prop('disabled', false);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Thêm thất bại!',
                footer: '<a href>Liên hệ với chúng tôi để được hỗ trợ</a>'
            });
        }
    });
}
// function setOrPush(target, val) {
//     var result = val;
//     if (target) {
//         result = [target];
//         result.push(val);
//     }
//     return result;
// }

// function getFormResults(formElement) {
//     var formElements = formElement.elements;
//     var formParams = {};
//     var i = 0;
//     var elem = null;
//     for (i = 0; i < formElements.length; i += 1) {
//         elem = formElements[i];
//         switch (elem.type) {
//             case 'submit':
//                 break;
//             case 'radio':
//                 if (elem.checked) {
//                     formParams[elem.name] = elem.value;
//                 }
//                 break;
//             case 'checkbox':
//                 if (elem.checked) {
//                     formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
//                 }
//                 break;
//             default:
//                 formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
//         }
//     }
//     return formParams;
// }