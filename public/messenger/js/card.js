$(document).ready(function () {

    //var bootbox_txt = {OK : 'Đồng ý',CANCEL : 'Hủy',CONFIRM : 'Xác nhận'};
    //bootbox.addLocale('vi', bootbox_txt);
    //bootbox.setDefaults("locale", "vi");

    // ====================================================================
    // ========================== Card List ===============================
    // ====================================================================

    $('#multi').on('click', '.list-wrct input', function () {
        $(this).prop('readonly', '');
        $(this).focus();
    })
    $('#multi').on('blur', '.list-wrct input', function () {
        $(this).prop('readonly', 'readonly');
    });

    $('#multi').on('click', '.list_itemBt[type-button="element_add"]', function (event) {
        event.preventDefault();
        var str_popup = htmlPopup($(this));
        $('#modal_button').append(str_popup);
        $('.blSelect .select').select2();
        $(this).before('<div id="thisElement"></div>');
        $("#modal_button").modal("show");
    });


    $('#multi').on('click', '.list_img', function (event) {
        if (!$(this).hasClass('hasImg')) {
            $(this).siblings('.list_inputfile').trigger('click');
        } else {
            $(this).css('background-image', 'none');
            $(this).removeClass('hasImg');
            $(this).find('i.icon-cross3').addClass('icon-camera');
            $(this).find('i.icon-cross3').removeClass('icon-cross3');
        }
    });

    $('#multi').on('change', '.list_inputfile', function (event) {
        var el = $(this).siblings('.list_img');
        var file = $(this)[0].files[0];
        if (file && file.type.match('image.*')) {
            el.removeClass('error');
            el.append('<div class="img-loading"><i class="icon-spinner4 spinner"></i></div>');
            data = new FormData();
            data.append('file', file);
            data.append('botId', botId);
            
            $.ajax({
                    url: srcAddImg,
                    type: "POST",
                    data: data,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false
                })
                .done(function (val) {
                    val = JSON.parse(val);
                    el.css('background-image', 'url("' + val.url + '")');
                    el.find('i.icon-camera').addClass('icon-cross3');
                    el.find('i.icon-camera').removeClass('icon-camera');
                    el.addClass('hasImg');
                    el.find('.img-loading').remove();
                })
        } else {
            if (file) {
                el.addClass('error');
            }
        }
    })

    $('#multi').on({
        mouseenter: function () {
            if ($(this).attr('type-button') != 'element_add') {
                var str_bthv = '<div class="action_bt">' +
                    '<span class="list_edBt"><i class="icon-pencil6"></i></span>' +
                    '<span class="list_rmBt"><i class="icon-bin"></i></span>' +
                    '</div>';
                $(this).append(str_bthv);
            }
        },

        mouseleave: function () {
            $(this).find('.action_bt').remove();
        }
    }, '.list_itemBt');

    $('#multi').on('click', '.list_rmBt', function (event) {
        $(this).parents('.list_itemBt').remove();
    });

    $('#multi').on('click', '.list_edBt', function (event) {
        var el_share = true;
        var str_popup = '';
        var el = $(this).parents('div.list_itemBt');
        el.attr('id', 'thisElement');
        $('#modal_button').empty();
        if (el.attr('type-button') == 'element_share') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_share'));
        } else if (el.attr('type-button') == 'postback') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            $('#modal_button .modal-body .blSelect .select option[value="' + $(el).find('.bt_ct span').attr('postback-id') + '"]').attr('selected', 'selected');
            $('#modal_button .modal-body .blSelect .select').select2({
                // minimumResultsForSearch: "-1"
            });
        } else if (el.attr('type-button') == 'web_url') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_url'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            $('#modal_button .modal-body .bt_url').val(el.find('.bt_ct').text());
            $('#modal_button .modal-body .wrUrlSize input[name="urlSize"][value="' + el.find('.bt_ct').attr('webview_height_ratio') + '"]').trigger("click");
        } else if (el.attr('type-button') == 'phone_number') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_phone'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            $('#modal_button .modal-body .bt_phone').val(el.find('.bt_ct').text());
        } else if (el.attr('type-button') == 'module') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_module'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            var moduleId = el.find('.bt_ct span').attr('module-id').split(/_|&/);
            $("#modal_button .modal-body .blSelectModule select").select2("val", moduleId[0]);
            if (moduleId.length > 0) {
                $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
                $('#modal_button .modal-body .blSelectModule select').after('<div class="moduleExtension"><div class="loadingModule"><i class="icon-spinner3 spinner"></i></div></div>');
                var idMo = moduleId[0];
                moduleId.splice(0, 1);
                $.ajax({
                        url: srcLayoutModule,
                        type: 'POST',
                        data: {
                            id: idMo,
                            dataMo: moduleId
                        },
                    })
                    .done(function (val) {
                        if (val != '') {
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').empty();
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').append(val);
                        } else {
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
                        }
                    });
            } else {
                $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
            }
        } else if (el.attr('type-button') == 'buy') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_buy'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            var arBuy = $(this).parents('.list_itemBt').find('.bt_ct span').attr('buy-id').split("_")[1];
            var price = b64DecodeUnicode(arBuy).slice(0, b64DecodeUnicode(arBuy).indexOf('_'));
            var vat = b64DecodeUnicode(arBuy).slice(parseInt(b64DecodeUnicode(arBuy).lastIndexOf('_')) + 1);
            var discount = b64DecodeUnicode(arBuy).slice(parseInt(b64DecodeUnicode(arBuy).indexOf('_')) + 1, parseInt(b64DecodeUnicode(arBuy).lastIndexOf('_')));
            discount = JSON.parse(discount);
            $('#modal_button .bl_bt_input input[name="product_price"]').val(price);
            $('#modal_button .bl_bt_input input[name="product_vat"]').val(vat);
            var htmlDiscount = '';
            if ('discount' in discount[0]) {
                for (var h = 0; h < discount.length; h++) {
                    htmlDiscount += '<div class="row">' +
                        '<div class="col-sm-4">';

                    if (h == 0) {
                        htmlDiscount += '<label>' + txtCard1 + '</label>';
                    }

                    htmlDiscount += '<input type="text" name="product_content" placeholder="' + txtCard2 + '" class="form-control" value="' + discount[h].name + '">' +
                        '</div>' +
                        '<div class="col-sm-3">';

                    if (h == 0) {
                        htmlDiscount += '<label>' + txtCard3 + '</label>';
                    }

                    htmlDiscount += '<input type="text" name="product_amount" placeholder="' + txtCard4 + '" class="form-control number" value="' + discount[h].amount + '">' +
                        '</div>' +
                        '<div class="col-sm-4">';

                    if (h == 0) {
                        htmlDiscount += '<label>' + txtCard5 + '</label>';
                    }

                    htmlDiscount += '<input type="text" name="product_priceDiscount" placeholder="' + txtCard6 + '" class="form-control number" value="' + discount[h].discount + '">' +
                        '</div>' +
                        '<div class="col-sm-1">';

                    if (h == 0) {
                        htmlDiscount += '<label>&nbsp;&nbsp;&nbsp;&nbsp;</label>';
                    }

                    htmlDiscount += '<i class="mt10px icon-cross3 rmDiscount"></i>' +
                        '</div>';

                    htmlDiscount += '</div>';
                }
            }
            $('#modal_button .bl_bt_input .wr-discount').prepend(htmlDiscount);
        }
        $("#modal_button").modal("show");
    });

    // ====================================================================
    // ========================== End Card List ===========================
    // ====================================================================


    // ====================================================================
    // =========================== Buy ====================================
    // ====================================================================

    $('#modal_button').on('click', '.addDiscount', function (event) {
        event.preventDefault();
        var count = $('.wr-discount .row').length;
        var title1 = count <= 1 ? '<label>' + txtCard1 + '</label>' : '';
        var title2 = count <= 1 ? '<label>' + txtCard3 + '</label>' : '';
        var title3 = count <= 1 ? '<label>' + txtCard5 + '</label>' : '';
        var title4 = count <= 1 ? '<label>&nbsp;&nbsp;&nbsp;&nbsp;</label>' : '';

        var html = '<div class="row">' +
            '<div class="col-sm-4">' +
            title1 +
            '<input type="text" name="product_content" placeholder="' + txtCard2 + '" class="form-control">' +
            '</div>' +
            '<div class="col-sm-3">' +
            title2 +
            '<input type="text" name="product_amount" placeholder="' + txtCard4 + '" class="form-control number">' +
            '</div>' +
            '<div class="col-sm-4">' +
            title3 +
            '<input type="text" name="product_priceDiscount" placeholder="' + txtCard6 + '" class="form-control number">' +
            '</div>' +
            '<div class="col-sm-1">' +
            title4 +
            '<i class="mt10px icon-cross3 rmDiscount"></i>' +
            '</div>' +
            '</div>';
        $(this).parents('.row').before(html);
    });

    $('#modal_button').on('click', '.rmDiscount', function (event) {
        event.preventDefault();
        $(this).parents('.row').find('input').slideUp('400', function () {
            $(this).parents('.row').remove();
        });
    });

    // ====================================================================
    // ============================ End Buy ===============================
    // ====================================================================


    // $("#modal_button").modal("show");
    // $('.blSelect .select').select2({
    //     minimumResultsForSearch: "-1"
    // });

    // ====================================================================
    // ==========================Loading Page==============================
    // ====================================================================
    if ($('#wr_multi .content').length > 0) {
        var MultiWidth = $('#multi').width();
        var classMulti = '';
        $('#wr_multi .content').each(function (index, el) {
            var widthContent = $(this).find('.layer').length;
            if (widthContent <= 10) {
                widthContent = (widthContent + 1) * 264;
            } else {
                widthContent = widthContent * 264;
            }
            if (MultiWidth < widthContent) {
                MultiWidth = widthContent;
                classMulti = 'scroll';
            }
        });
        $('#multi').width(MultiWidth);
        $('#wr_multi').addClass(classMulti);
    }
    if ($('#multi .content').length <= 0) {
        $('.card_quickReply').addClass('disable');
    }

    // ====================================================================
    // =======================End Loading Page=============================
    // ====================================================================

    // ====================================================================
    // ============================Sortable================================
    // ====================================================================
    // $('#multi .content').sortable({
    //     items: ':not(.layer_add)',
    //     handle: '.layer_move .icon-move,.bt_move_vertical'
    // });
    $('#blReply').sortable({
        items: ':not(.add_reply)',
        handle: '.reply_move'
    });
    // ====================================================================
    // ==========================End Sortable==============================
    // ====================================================================


    // ====================================================================
    // ============================== Module ==============================
    // ====================================================================

    $('#multi .blSelectModule>select').select2({
        minimumResultsForSearch: "-1"
    }).on("change", function (e) {
        if ($('#multi .blSelectModule select option[value="' + e.val + '"]').attr('attr-template') == 'true') {
            $('#multi .bl_bt_input .blSelectModule .moduleExtension').remove();
            $('#multi .bl_bt_input .blSelectModule>select').after('<div class="moduleExtension"><div class="loadingModule"><i class="icon-spinner3 spinner"></i></div></div>');
            $.ajax({
                    url: srcLayoutModule,
                    type: 'POST',
                    data: {
                        id: e.val
                    },
                })
                .done(function (val) {
                    if (val != '') {
                        $('#multi .bl_bt_input .blSelectModule .moduleExtension').empty();
                        $('#multi .bl_bt_input .blSelectModule .moduleExtension').append(val);
                    }
                });
        } else {
            $('#multi .bl_bt_input .blSelectModule .moduleExtension').remove();
        }
    });

    $('#multi, #modal_button').on('change', '.moduleExtension .group-radio .radio input[type="radio"]', function () {
        if ($(this).attr('action') === undefined || $(this).attr('action') === null) {
            // do something
        } else {
            var arr = $(this).attr('action').split("_");
            if (arr[1] == 'show') {
                $('[attr-id=' + arr[0] + ']').removeClass('hidden');
                $('[attr-id=' + arr[0] + ']').next().removeClass('hidden');
            } else if (arr[1] == 'hide') {
                $('[attr-id=' + arr[0] + ']').addClass('hidden');
                $('[attr-id=' + arr[0] + ']').next().addClass('hidden');
            }
            $('[attr-id=' + arr[0] + ']').next().val('');
        }
    })

    // ====================================================================
    // =========================== End Module =============================
    // ====================================================================

    // ====================================================================
    // ============================== Save Card============================
    // ====================================================================

    // Check has attribute
    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };
    // End check has attribute
    
    $('#save_card').click(function (event) {
        if (ipId.value==''){
            alert('chưa nhập id');
            return;
        }
        var data=GetCardData();
        data._id = ipId.value;
        if(data==null) return;
        $('#save_card').prop("disabled", true);
        $('#save_card span').text(' Xin chờ ...');
        $.ajax({
            url: ajaxSave,
            type: 'POST',
            data: data,
        }).done(function (val) {
            window.open(urlBuild, "_blank");
            $('#save_card').prop("disabled", false);
            $('#save_card span').text(' Xem tin mẫu');
        }).fail(function () {
            $('#save_card').prop("disabled", false);
            $('#save_card span').text(' Xem tin mẫu');
        });
    });
    $('#btnQueue').click(function(event){
        
        var data = GetCardData();
        if (data == null) return;
        var query = JSON.stringify(getQuery());
        data.query=query;
        if(queryResult==null){
            return alert('Lọc thành viên trước khi gửi');
        }
        data.totail = queryResult.Totail[0].Totail;
        
        $('#btnQueue').prop("disabled", true);
        $('#btnQueue').text(' Xin chờ ...');
        $.ajax({
            url: srcQueue,
            type: 'POST',
            data: data,
        }).done(function (val) {
            window.open(urlBuild, "_blank");
            $('#btnQueue').prop("disabled", false);
            $('#btnQueue').text(' Đặt lệnh gửi');
        }).fail(function () {
            $('#btnQueue').prop("disabled", false);
            $('#btnQueue').text(' Đặt lệnh gửi');
        });
    });
    // ====================================================================
    // ============================End Save Card===========================
    // ====================================================================

    // ====================================================================
    // =============================Add Card===============================
    // ====================================================================

    autosize($('.content-text'));
    $('.card_galery').click(function (event) {
        var str_galery = '<div class="content" card="galery">' +
            '<div class="bt_move_vertical">' +
            '<i class="icon-x"></i>' +
            '<i class=" icon-arrow-up13"></i>' +
            '<i class="icon-arrow-down132"></i>' +
            '</div>' +
            '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_move">' +
            // '<i class="icon-arrow-left13 pull-left"></i>' +
            // '<i class="icon-move"></i>' +
            // '<i class="icon-arrow-right14 pull-right"></i>' +
            '</div>' +
            '<div class="layer_rm">' +
            '<i class="icon-bin"></i>' +
            '</div>' +
            '</div>' +
            '<div class="wr_image">' +
            '<input class="inputfile" type="file" accept="image/*"/>' +
            '<div class="clickinput"><i class="icon-camera"></i><br>' + txtCard14 + '</div>' +
            '<span class="hide">' +
            '<a class="img-rp"><i class="icon-rotate-ccw3"></i><br>' + txtCard15 + '</a>' +
            '<a class="img-rm"><i class="icon-cross2"></i><br>' + txtCard16 + '</a>' +
            '</span>' +
            '</div>' +
            '<div class="wr_title">' +
            '<div class="head">' +
            '<textarea placeholder="' + txtCard17 + '" maxlength="80"></textarea>' +
            '<span>80</span>' +
            '</div>' +
            '<div class="sub">' +
            '<textarea placeholder="' + txtCard18 + '" maxlength="80"></textarea>' +
            '<span>80</span>' +
            '</div>' +
            '<div class="url">' +
            '<input type="text" placeholder="URL">' +
            '</div>' +
            '</div>' +
            '<div class="wr_button">' +
            '<div class="bt" type-button="element_add">' +
            '<div class="bt_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '</div>' +
            '</div><div class="layer_add">' +
            '<i class="icon-plus3"></i>' +
            '</div>' +
            '</div>';
        $('#multi').html('');
        $('#multi').append(str_galery);
        if ($('#multi .content[card="module"]').length <= 0) {
            $('.card_quickReply').removeClass('disable');
        }
    });
    $('.card_text').click(function (event) {
        var str_card_text = '<div class="content" card="text">' +
            '<div class="bt_move_vertical">' +
            // '<i class="icon-x"></i>' +
            // '<i class="icon-arrow-up13"></i>' +
            // '<i class="icon-arrow-down132"></i>' +
            '</div>' +
            '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_rm">' +
            '<i class="icon-bin"></i>' +
            '</div>' +
            '</div>' +
            '<div class="wr_title wr_title_noborder">' +
            '<div class="wr-content-text">' +
            '<textarea class="content-text" placeholder="' + txtCard20 + '" maxlength="640"></textarea>' +
            '<span>640</span>' +
            '</div>' +
            '</div>' +
            '<div class="wr_button">' +
            '<div class="bt" type-button="element_add">' +
            '<div class="bt_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#multi').html('');
        $('#multi').append(str_card_text);
        autosize($('.content-text'));
        if ($('#multi .content[card="module"]').length <= 0) {
            $('.card_quickReply').removeClass('disable');
        }
    });
    $('.card_image').click(function (event) {
        var str_image = '<div class="content" card="image">' +
            '<div class="bt_move_vertical">' +
            // '<i class="icon-x"></i>' +
            // '<i class=" icon-arrow-up13"></i>' +
            // '<i class="icon-arrow-down132"></i>' +
            '</div>' +
            '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_rm">' +
            '<i class="icon-bin"></i>' +
            '</div>' +
            '</div>' +
            '<div class="wr_image bl_image">' +
            '<input class="inputfile" type="file" accept="image/*"/>' +
            '<div class="clickinput"><i class="icon-camera"></i><br>' + txtCard14 + '</div>' +
            '<span class="hide">' +
            '<a class="img-rp"><i class="icon-rotate-ccw3"></i><br>' + txtCard15 + '</a>' +
            '<a class="img-rm"><i class="icon-cross2"></i><br>' + txtCard16 + '</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#multi').html('');
        $('#multi').append(str_image);
        if ($('#multi .content[card="module"]').length <= 0) {
            $('.card_quickReply').removeClass('disable');
        }
    });
    $('.card_audio').click(function (event) {
        var str_audio = '<div class="content" card="audio">' +
            // '<div class="bt_move_vertical"><i class="icon-x"></i><i class=" icon-arrow-up13"></i><i class="icon-arrow-down132"></i></div>' +
            '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_rm"><i class="icon-bin"></i></div>' +
            '</div>' +
            '<div class="wr_file">' +
            '<input class="input_file1" type="file" accept="audio/*">' +
            '<div class="click_input_file1">' +
            '<i class="icon-volume-medium"></i><br>' +
            '<span>' + txtCard11 + '</span></div>' +
            '<span class="hide">' +
            '<a class="file-rp"><i class="icon-rotate-ccw3"></i><br>' + txtCard15 + '</a>' +
            '<a class="file-rm"><i class="icon-cross2"></i><br>' + txtCard16 + '</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#multi').html('');
        $('#multi').append(str_audio);
        if ($('#multi .content[card="module"]').length <= 0) {
            $('.card_quickReply').removeClass('disable');
        }
    });
    $('.card_video').click(function (event) {
        var str_audio = '<div class="content" card="video">' +
            // '<div class="bt_move_vertical"><i class="icon-x"></i><i class=" icon-arrow-up13"></i><i class="icon-arrow-down132"></i></div>' +
            '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_rm"><i class="icon-bin"></i></div>' +
            '</div>' +
            '<div class="wr_file">' +
            '<input class="input_file1" type="file" accept="video/*">' +
            '<div class="click_input_file1">' +
            '<i class="icon-film"></i><br>' +
            '<span>' + txtCard12 + '</span></div>' +
            '<span class="hide">' +
            '<a class="file-rp"><i class="icon-rotate-ccw3"></i><br>' + txtCard15 + '</a>' +
            '<a class="file-rm"><i class="icon-cross2"></i><br>' + txtCard16 + '</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#multi').html('');
        $('#multi').append(str_audio);
        if ($('#multi .content[card="module"]').length <= 0) {
            $('.card_quickReply').removeClass('disable');
        }
    });
    $('.card_file').click(function (event) {
        var str_audio = '<div class="content" card="file">' +
            // '<div class="bt_move_vertical"><i class="icon-x"></i><i class=" icon-arrow-up13"></i><i class="icon-arrow-down132"></i></div>' +
            '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_rm"><i class="icon-bin"></i></div>' +
            '</div>' +
            '<div class="wr_file">' +
            '<input class="input_file1" type="file" accept="*">' +
            '<div class="click_input_file1">' +
            '<i class="icon-attachment"></i><br>' +
            '<span>' + txtCard13 + '</span></div>' +
            '<span class="hide">' +
            '<a class="file-rp"><i class="icon-rotate-ccw3"></i><br>' + txtCard15 + '</a>' +
            '<a class="file-rm"><i class="icon-cross2"></i><br>' + txtCard16 + '</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#multi').html('');
        $('#multi').append(str_audio);
        if ($('#multi .content[card="module"]').length <= 0) {
            $('.card_quickReply').removeClass('disable');
        }
    });
    $('.card_module').click(function (event) {
        var str_module = '<div class="content" card="module">' +
            '<div class="bt_move_vertical" draggable="true">' +
            // '<i class="icon-x"></i>' +
            // '<i class="icon-arrow-up13"></i>' +
            // '<i class="icon-arrow-down132"></i>' +
            '</div>' +
            '<div class="layer tile" draggable="true">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_rm"><i class="icon-bin"></i></div>' +
            '</div>' +
            '<div class="wr_module">' +
            '<div class="module_child">' +
            '<h2>' + txtCard21 + '</h2>' +
            '</div>' +
            '</div>' +
            '<div class="wr_value">' +
            '<div class="bl_module" action="add">' +
            '<div class="bl_bt_content">' +
            '<div class="bl_bt_input">' +
            '<div class="blSelectModule">' +
            '<select>' +
            module() +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        if (!$(this).hasClass('disable')) {
            $('#multi').append(str_module);
        }
        $(this).addClass('disable');
        $('#wr_reply').hide();
        $('.card_quickReply').addClass('disable');

        $('#multi .blSelectModule>select').select2({
            minimumResultsForSearch: "-1"
        }).on("change", function (e) {
            if ($('#multi .blSelectModule>select option[value="' + e.val + '"]').attr('attr-template') == 'true') {

                $('#multi .bl_bt_input .blSelectModule .moduleExtension').remove();
                $('#multi .bl_bt_input .blSelectModule>select').after('<div class="moduleExtension"><div class="loadingModule"><i class="icon-spinner3 spinner"></i></div></div>');
                $.ajax({
                        url: srcLayoutModule,
                        type: 'POST',
                        data: {
                            id: e.val
                        },
                    })
                    .done(function (val) {
                        if (val != '') {
                            $('#multi .bl_bt_input .blSelectModule .moduleExtension').empty();
                            $('#multi .bl_bt_input .blSelectModule .moduleExtension').append(val);
                        }
                    });
            } else {
                $('#multi .bl_bt_input .blSelectModule .moduleExtension').remove();
            }
        });

    });

    $('.card_list').click(function (event) {
        var str_list = '<div class="content" card="list">' +
            // '<div class="bt_move_vertical"><i class="icon-x"></i><i class=" icon-arrow-up13"></i><i class="icon-arrow-down132"></i></div>' +
            '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_rm"><i class="icon-bin"></i></div>' +
            '</div>' +
            '<div class="wr_image">' +
            '<input class="inputfile" type="file" accept="image/*">' +
            '<div class="clickinput"><i class="icon-camera"></i><br>' + txtCard14 + '</div>' +
            '<span class="hide"><a class="img-rp"><i class="icon-rotate-ccw3"></i><br>' + txtCard15 + '</a><a class="img-rm"><i class="icon-cross2"></i><br>' + txtCard16 + '</a></span>' +
            '<div class="list-wrct list-wrct-top">' +
            '<input type="text" class="list_title" placeholder="' + txtCard17 + '" readonly value="">' +
            '<input type="text" class="list_subtitle" placeholder="' + txtCard18 + '" readonly value="">' +
            '<input type="text" class="list_link" placeholder="URL" readonly value="">' +
            '<div class="list_itemBt" type-button="element_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="wr_title">' +
            '<div class="list_item">' +
            '<div class="list-wrct">' +
            '<input type="text" class="list_title" placeholder="' + txtCard17 + '" readonly value="">' +
            '<input type="text" class="list_subtitle" placeholder="' + txtCard18 + '" readonly value="">' +
            '<input type="text" class="list_link" placeholder="URL" readonly value="">' +
            '<div class="list_itemBt" type-button="element_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '<div class="list_img">' +
            '<i class="icon-camera"></i>' +
            '</div>' +
            '<input class="list_inputfile" type="file" accept="image/*">' +
            '</div>' +
            '<div class="list_item">' +
            '<div class="list-wrct">' +
            '<input type="text" class="list_title" placeholder="' + txtCard17 + '" readonly value="">' +
            '<input type="text" class="list_subtitle" placeholder="' + txtCard18 + '" readonly value="">' +
            '<input type="text" class="list_link" placeholder="URL" readonly value="">' +
            '<div class="list_itemBt" type-button="element_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '<div class="list_img">' +
            '<i class="icon-camera"></i>' +
            '</div>' +
            '<input class="list_inputfile" type="file" accept="image/*">' +
            '</div>' +
            '<div class="list_item">' +
            '<div class="list-wrct">' +
            '<input type="text" class="list_title" placeholder="' + txtCard17 + '" readonly value="">' +
            '<input type="text" class="list_subtitle" placeholder="' + txtCard18 + '" readonly value="">' +
            '<input type="text" class="list_link" placeholder="URL" readonly value="">' +
            '<div class="list_itemBt" type-button="element_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '<div class="list_img">' +
            '<i class="icon-camera"></i>' +
            '</div>' +
            '<input class="list_inputfile" type="file" accept="image/*">' +
            '</div>' +
            '<div class="list_item">' +
            '<div class="list-wrct">' +
            '<input type="text" class="list_title" placeholder="' + txtCard17 + '" readonly value="">' +
            '<input type="text" class="list_subtitle" placeholder="' + txtCard18 + '" readonly value="">' +
            '<input type="text" class="list_link" placeholder="URL" readonly value="">' +
            '<div class="list_itemBt" type-button="element_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '<div class="list_img">' +
            '<i class="icon-camera"></i>' +
            '</div>' +
            '<input class="list_inputfile" type="file" accept="image/*">' +
            '</div>' +
            '</div>' +
            '<div class="wr_button">' +
            '<div class="bt" type-button="element_add">' +
            '<div class="bt_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#multi').html('');
        $('#multi').append(str_list);
        if ($('#multi .content[card="module"]').length <= 0) {
            $('.card_quickReply').removeClass('disable');
        }
    });

    $('.card_quickReply').click(function (event) {
        if (!$(this).hasClass('disable')) {
            $(this).addClass('disable');
            $('#wr_reply').show();
            $('.add_reply').trigger('click')
        }
    });
    $('div.addCard ul.list-inline li').click(function(){
        if ($(this).attr('class').indexOf('card_quickReply')!=-1 ) return;
        $('div.addCard ul.list-inline li').prop('style','background-Color:white');
        $(this).prop('style', 'background-Color:#80d4ff');
    });
    // ====================================================================
    // =============================End Add Card===========================
    // ====================================================================

    // ====================================================================
    // =============================Remove Card============================
    // ====================================================================
    $('#rmCard').click(function (event) {
        var el = $(this);
        var block = $('body');

        bootbox.confirm({
            message: txtCard22,
            buttons: {
                confirm: {
                    label: txtCard59,
                    className: 'btn-primary'
                },
                cancel: {
                    label: txtCard60,
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    $(block).block({
                        message: '<i class="icon-spinner4 spinner"></i>',
                        overlayCSS: {
                            backgroundColor: '#000',
                            opacity: 0.8,
                            cursor: 'wait'
                        },
                        css: {
                            border: 0,
                            padding: 0,
                            backgroundColor: 'transparent'
                        }
                    });
                    $.ajax({
                        url: srcRmcard,
                        type: 'POST',
                        data: {
                            id: $('#idCard').val()
                        },
                    }).done(function (val) {
                        if (val) {
                            window.location.href = urlBuild;
                        } else {
                            $(block).unblock();
                        }
                    }).fail(function () {
                        $(block).unblock();
                    });
                }
            }
        });
    });
    // ====================================================================
    // ============================End Remove Card=========================
    // ====================================================================


    // ====================================================================
    // =============================Quick Reply============================
    // ====================================================================
    // Add Button


    $('#wr_reply').on('click', '.add_reply', function (event) {
        var str_reply = '<li id="thisElement"></li>';
        $(this).before(str_reply);
        $('#modal_button').empty();
        var str_popup = htmlPopup($(this));
        $('#modal_button').append(str_popup);
        $('.blSelect .select').select2({
            // minimumResultsForSearch: "-1"
        });
        $("#modal_button").modal("show");
    });

    // Edit Button
    $('#wr_reply').on('click', 'ul li.reply .wr_reply_btcontent', function (event) {
        $(this).parents('.reply').attr('id', 'thisElement');
        $('#modal_button').empty();
        var str_popup = htmlPopup($(this));
        $('#modal_button').append(str_popup);

        $("#modal_button").modal("show");

        if ($(this).attr('attr-reply') == 'location') {
            actionTabPopup($('.add_location'));
        } else if ($(this).attr('attr-reply') == 'user_phone_number') {
            actionTabPopup($('.user_phone_number'));
        } else if ($(this).attr('attr-reply') == 'user_email') {
            actionTabPopup($('.user_email'));
        } else if ($(this).attr('attr-reply') == 'postback') {

            $('#modal_button .modal-header .bt_name').val($(this).children('.name-button').text());
            $('#modal_button .modal-body .blSelect .select option[value="' + $(this).find('.reply_btcontent span').attr('postback-id') + '"]').attr('selected', 'selected');
            $('#modal_button .modal-body .blSelect .select').select2({
                // minimumResultsForSearch: "-1"
            });

            if ($(this).find('i').length) {
                $('.icon_button').css('background-image', $(this).children('i').css('background-image'));
                $('.icon_button').css('attachment_id', $(this).children('i').attr('attachment_id'));
            }

        } else if ($(this).attr('attr-reply') == 'module') {

            actionTabPopup($('.add_module'));
            $('#modal_button .modal-header .bt_name').val($(this).children('.name-button').text());
            if ($(this).find('i').length) {
                $('.icon_button').css('background-image', $(this).children('i').css('background-image'));
                $('.icon_button').css('attachment_id', $(this).children('i').attr('attachment_id'));
            }

            var moduleId = $(this).find('.reply_btcontent span').attr('module-id').split(/_|&/);
            $("#modal_button .modal-body .blSelectModule select").select2("val", moduleId[0]);

            if (moduleId.length > 0) {
                $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
                $('#modal_button .modal-body .blSelectModule select').after('<div class="moduleExtension"><div class="loadingModule"><i class="icon-spinner3 spinner"></i></div></div>');
                var idMo = moduleId[0];
                moduleId.splice(0, 1);
                $.ajax({
                        url: srcLayoutModule,
                        type: 'POST',
                        data: {
                            id: idMo,
                            dataMo: moduleId
                        },
                    })
                    .done(function (val) {
                        if (val != '') {
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').empty();
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').append(val);
                        } else {
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
                        }
                    });
            } else {
                $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
            }

        }
    });
    // Remove Button
    $('#wr_reply').on('click', '.reply_rm', function (event) {
        var el = $(this);
        bootbox.confirm({
            message: txtCard23,
            buttons: {
                confirm: {
                    label: txtCard59,
                    className: 'btn-primary'
                },
                cancel: {
                    label: txtCard60,
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    el.parents('.reply').remove();
                }
            }
        });
    })
    $('#wr_reply').on('click', '.rm_wrReply', function (event) {
        var el = $(this);
        bootbox.confirm({
            message: txtCard24,
            buttons: {
                confirm: {
                    label: txtCard59,
                    className: 'btn-primary'
                },
                cancel: {
                    label: txtCard60,
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    el.parents('#wr_reply').hide();
                    el.parents('#wr_reply').find('li.reply').remove();
                    $('.card_quickReply').removeClass('disable');
                }
            }
        });
    })

    // Action Icon Popup
    $('#modal_button').on('click', '.icon_button', function (event) {
        $(this).parents('.reply_title_input').find('.iconFileReply').trigger('click');
    })
    $('#modal_button').on('change', '.iconFileReply', function (event) {
        var file = $(this)[0].files[0];
        var el = $(this);
        var srcImg = $(this).parents('.reply_title_input').find('.icon_button').css('background-image');
        var attachment_id = '';

        if (typeof $(this).parents('.reply_title_input').find('.icon_button').attr('attachment_id') !== typeof undefined &&
            $(this).parents('.reply_title_input').find('.icon_button').attr('attachment_id') !== false &&
            $(this).parents('.reply_title_input').find('.icon_button').attr('attachment_id') != ''
        ) {
            attachment_id = $(this).parents('.reply_title_input').find('.icon_button').attr('attachment_id');
        }

        if (file && file.type.match('image.*')) {
            data = new FormData();
            data.append('file', file);
            data.append('botId', botId);
            $('#modal_button .icon_button').html('<i class="icon-spinner3 spinner"></i>');
            $.ajax({
                    url: srcAddImg,
                    type: "POST",
                    data: data,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false
                })
                .done(function (val) {
                    val = JSON.parse(val);
                    if (srcImg != 'none') {
                        removeImage(srcImg, attachment_id);
                    }
                    Rs_attachment_id = 0;
                    if (val.attachment_id != '') {
                        Rs_attachment_id = val.attachment_id;
                    }
                    el.parents('.reply_title_input').find('.icon_button').attr('attachment_id', Rs_attachment_id);
                    el.parents('.reply_title_input').find('.icon_button').css('background-image', 'url("' + val.url + '")');
                    el.parents('.reply_title_input').find('.icon_button').html('');
                });
        }
    })
    // ====================================================================
    // =============================End Quick Reply========================
    // ====================================================================


    // ====================================================================
    // ====================Resize Content Card Text========================
    // ====================================================================
    $('.content-text').autogrow();
    $('#multi').on('keyup', '.content-text', function (event) {
        var str_head = $(this).val().length;
        $(this).siblings('span').html(640 - str_head);
        if (str_head >= 630) {
            $(this).siblings('span').addClass("error");
        } else {
            $(this).siblings('span').removeClass("error");
        }
    });
    $('#multi').on('focusout', '.content-text', function (event) {
        if ($(this).val().trim() == '') {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    // ====================================================================
    // ====================End Resize Content Card Text====================
    // ====================================================================

    // ====================================================================
    // ============================Action Layer============================
    // ====================================================================
    $('#multi').on('click', '.layer_rm', function (event) {
        var el = $(this);
        bootbox.confirm({
            message: txtCard22,
            buttons: {
                confirm: {
                    label: txtCard59,
                    className: 'btn-primary'
                },
                cancel: {
                    label: txtCard60,
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    if (el.parents('#multi').find('.content').length <= 1) {
                        $('.card_quickReply').addClass('disable');
                        $('#wr_reply').hide();
                        $('#blReply .reply').remove();
                    }
                    if (el.parents('.content').find('.layer').length <= 1) {
                        el.parents('.content').remove();
                    } else {
                        el.parents('.layer').remove();
                    }

                    if (el.parents('.content').attr('card') == 'module') {
                        $('.addCard .card_module').removeClass('disable');
                        if ($('#multi .content').length > 0) {
                            $('.card_quickReply').removeClass('disable');
                        }
                    }
                }
            }
        });
    });
    $('#multi').on('click', '.icon-arrow-right14', function (event) {

        $(this).parents('.layer').find('input').each(function (index1, el1) {
            $(el1).attr('value', $(el1).val());
        });
        $(this).parents('.layer').find('textarea').each(function (index1, el1) {
            $(el1).text($(el1).val());
        });

        var html_move = '<div class="layer tile" style="display:none">' + $(this).parents('.layer').html() + '</div>';
        var index_move = $(this).parents('.layer').index();
        $(this).parents('.layer').slideUp('slow', function () {
            $(this).parents('.content').find('.layer').eq(index_move).after(html_move);
            $(this).parents('.content').find('.layer').eq(index_move + 1).slideDown('slow');
            $(this).remove();
        });
    });
    $('#multi').on('click', '.icon-arrow-left13', function (event) {

        $(this).parents('.layer').find('input').each(function (index1, el1) {
            $(el1).attr('value', $(el1).val());
        });
        $(this).parents('.layer').find('textarea').each(function (index1, el1) {
            $(el1).text($(el1).val());
        });

        var html_move = '<div class="layer tile" style="display:none">' + $(this).parents('.layer').html() + '</div>';
        var index_move = $(this).parents('.layer').index();
        $(this).parents('.layer').slideUp('slow', function () {
            $(this).parents('.content').find('.layer').eq(index_move - 2).before(html_move);
            $(this).parents('.content').find('.layer').eq(index_move - 2).slideDown('slow');
            $(this).remove();
        });
    });
    $('#multi').on('click', '.icon-arrow-down132', function (event) {
        el = $(this);
        var index_move = el.parents('.content').index();

        el.parents('.content').find('input').each(function (index1, el1) {
            $(el1).attr('value', $(el1).val());
        });
        el.parents('.content').find('textarea').each(function (index1, el1) {
            $(el1).text($(el1).val());
        });

        el.parents('.content').slideUp('slow', function (e) {
            var html_move = el.parents('.content').prop('outerHTML');
            el.parents('#multi').find('.content').eq(index_move + 1).after(html_move);
            el.parents('#multi').find('.content').eq(index_move + 2).slideDown('slow');
            $(this).remove();
        });
    });
    $('#multi').on('click', '.icon-arrow-up13', function (event) {
        el = $(this);
        var index_move = el.parents('.content').index();

        el.parents('.content').find('input').each(function (index1, el1) {
            $(el1).attr('value', $(el1).val());
        });
        el.parents('.content').find('textarea').each(function (index1, el1) {
            $(el1).text($(el1).val());
        });

        el.parents('.content').slideUp('slow', function () {

            var html_move = el.parents('.content').prop('outerHTML');
            el.parents('#multi').find('.content').eq(index_move - 1).before(html_move);
            el.parents('#multi').find('.content').eq(index_move - 1).slideDown('slow');
            $(this).remove();
        });
    });
    $('#multi').on('click', '.icon-x', function (event) {
        var el = $(this);
        var widthMulti = 0;
        var layerwidth = 1;
        var content_index = $(this).parents('.content').index();
        $('#multi .content').each(function (index, el) {
            if (content_index != index) {
                if ($(this).find('.layer_add').css('display') == 'none') {
                    layerwidth = 0;
                }
                if (($(this).find('.layer').length + layerwidth) * 264 >= widthMulti) {
                    widthMulti = ($(this).find('.layer').length + layerwidth) * 264;
                }
            }
        });
        bootbox.confirm({
            message: txtCard22,
            buttons: {
                confirm: {
                    label: txtCard59,
                    className: 'btn-primary'
                },
                cancel: {
                    label: txtCard60,
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    if (el.parents('#multi').find('.content').length <= 1) {
                        $('.card_quickReply').addClass('disable');
                        $('#wr_reply').hide();
                        $('#blReply .reply').remove();
                        if (el.parents('.content').attr('card') == 'module') {
                            $('.addCard .card_module').removeClass('disable');
                        }
                    } else {
                        if (el.parents('.content').attr('card') == 'module') {
                            $('.addCard .card_module').removeClass('disable');
                            $('.addCard .card_quickReply').removeClass('disable');
                        }
                    }
                    el.parents('.content').remove();
                    if (widthMulti == 0) {
                        widthMulti = $('#wr_multi').width() - 30;
                        $('#multi').width(widthMulti);
                    } else {
                        $('#multi').width(widthMulti);
                    }
                }
            }
        });
    })
    // ====================================================================
    // ==========================End Action Layer==========================
    // ====================================================================

    // ====================================================================
    // ============================Add Layer===============================
    // ====================================================================
    $('#multi').on('click', '.layer_add', function (event) {
        var multi_now = $('#multi').width();
        var multi_resize = ($(this).parents('.content').find('.layer').length + 2) * 264;
        var classMulti = '';
        if (multi_now < multi_resize) {
            if ($(this).parents('.content').find('.layer').length >= 9) {
                $('#multi').css('width', ($(this).parents('.content').find('.layer').length + 1) * 264);
            } else {
                $('#multi').css('width', ($(this).parents('.content').find('.layer').length + 2) * 264);
            }
            $('#wr_multi').addClass('scroll');
        }
        var htmlLayerAdd = '<div class="layer tile">' +
            '<div class="bt_move_horizontal">' +
            '<div class="layer_move">' +
            '<i class="icon-arrow-left13 pull-left"></i>' +
            '<i class="icon-move"></i>' +
            '<i class="icon-arrow-right14 pull-right"></i>' +
            '</div>' +
            '<div class="layer_rm">' +
            '<i class="icon-bin"></i>' +
            '</div>' +
            '</div>' +
            '<div class="wr_image">' +
            '<input class="inputfile" type="file" accept="image/*"/>' +
            '<div class="clickinput"><i class="icon-camera"></i><br>' + txtCard14 + '</div>' +
            '<span class="hide">' +
            '<a class="img-rp"><i class="icon-rotate-ccw3"></i><br>' + txtCard15 + '</a>' +
            '<a class="img-rm"><i class="icon-cross2"></i><br>' + txtCard16 + '</a>' +
            '</span>' +
            '</div>' +
            '<div class="wr_title">' +
            '<div class="head">' +
            '<textarea placeholder="' + txtCard17 + '" maxlength="80"></textarea>' +
            '<span>80</span>' +
            '</div>' +
            '<div class="sub">' +
            '<textarea placeholder="' + txtCard18 + '" maxlength="80"></textarea>' +
            '<span>80</span>' +
            '</div>' +
            '<div class="url">' +
            '<input type="text" placeholder="URL">' +
            '</div>' +
            '</div>' +
            '<div class="wr_button">' +
            '<div class="bt" type-button="element_add">' +
            '<div class="bt_add"><i class="icon-plus2"></i> ' + txtCard19 + '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $(htmlLayerAdd).insertBefore(this);
        $('#multi .content').sortable('destroy');
        $('#multi .content').sortable({
            items: ':not(.layer_add)',
            handle: '.layer_move .icon-move,.bt_move_vertical'
        });
    });

    // ====================================================================
    // ============================End Add Layer===========================
    // ====================================================================

    // ====================================================================
    // ==========================Action Popup==============================
    // ====================================================================
    // Validate Title Input
    $('#modal_button').checkLengthInput({
        element: ".pr_bt_name input"
    })
    // End Validate Title Input

    $('#modal_button').on('hidden.bs.modal', function () {
        $('#modal_button').empty();
        $('.select2-hidden-accessible').remove();
        if ($('#thisElement').hasClass('bt') || $('#thisElement').hasClass('reply') || $('#thisElement').hasClass('list_itemBt')) {
            $('#thisElement').removeAttr('id');
        } else {
            $('#thisElement').remove();
        }
    });

    // Validate Content Input
    $('#modal_button').on('select2-close', '.select', function (event) {
        if ($(this).select2('val').length <= 0) {
            $(this).parents('.bl_bt_input').find('.blSelect').addClass('error');
        } else {
            $(this).parents('.bl_bt_input').find('.blSelect').removeClass('error');
        }
    });
    $('#modal_button').on('focusout', '.bt_url', function (event) {
        if ($(this).val().length <= 0) {
            $(this).addClass('error');
        } else {
            if (!isURL($(this).val())) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        }
    })
    $('#modal_button').on('focusout', '.bt_phone', function (event) {
        if ($(this).val().length <= 0) {
            $(this).parents('.wrPhone').addClass('error');
        } else {
            if (!validatePhone($(this).val())) {
                $(this).parents('.wrPhone').addClass('error');
            } else {
                $(this).parents('.wrPhone').removeClass('error');
            }
        }
    })
    $('#modal_button').on('keyup', '.bt_phone', function (event) {
        if ($(this).val().slice(0, 1) == '+' && $(this).val().length <= 5 && $(this).val().length >= 2) {
            var elbtphone = $(this).val().slice(1);
            if (numberRegion(elbtphone) != false) {
                var elnumberRegion = numberRegion(elbtphone);
                $('.selectbox option[selected]').removeAttr('selected');
                $('.selectbox option[value=' + elnumberRegion + ']').attr('selected', 'selected');
                $('.selectbox').data("selectBox-selectBoxIt").refresh();
            }
        }
    })
    // End Validate Content Input
    // Menu Button
    $("#modal_button").on('click', '.bl_bt_a', function (event) {
        el = $(this);
        if (!$(this).hasClass('active')) {
            actionTabPopup(el);
        }
    });
    // End Menu Button

    // Done Button
    $('#modal_button').on('click', '.bt_done', function (event) {
        var str_btct = '',
            el = $(this),
            elContent = el.parents('.modal-content'),
            elTitle = elContent.find('.modal-header .pr_bt_name .bt_name'),
            str_bt_title = elTitle.val().trim(),
            popup_check = true,
            type_button = '',
            regionPhoneNumber = '',
            popupUrl = '',
            iconTitle = '',
            classTitle = 'no-img';

        if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('add_card')) {
            var done_data = elContent.find(".modal-body .bl_bt_content .bl_bt_input .select").select2("data");
            type_button = 'postback';

            if (str_bt_title == '') {
                popup_check = false;
                elTitle.addClass('error');
            } else {
                elTitle.removeClass('error');
            }
            if (elContent.find(".modal-body .bl_bt_content .bl_bt_input .select").select2("val").length <= 0) {
                popup_check = false;
                elContent.find(".modal-body .bl_bt_content .bl_bt_input .blSelect").addClass('error');
            } else {
                elContent.find(".modal-body .bl_bt_content .bl_bt_input .blSelect").removeClass('error');
                str_btct += '<span postback-id="' + done_data.id + '">' + done_data.text + '</span>';
            }

        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('add_url')) {
            str_btct = elContent.find('.modal-body .bl_bt_content .bt_url').val();
            type_button = 'web_url';
            popupUrl = 'webview_height_ratio="' + elContent.find('.modal-body .bl_bt_content .wrUrlSize input[name="urlSize"]:checked').val() + '"';
            if (str_bt_title == '') {
                popup_check = false;
                elTitle.addClass('error');
            } else {
                elTitle.removeClass('error');
            }
            if (str_btct == '' || !isURL(str_btct)) {
                popup_check = false;
                elContent.find('.modal-body .bl_bt_content .bt_url').addClass('error');
            } else {
                elContent.find('.modal-body .bl_bt_content .bt_url').removeClass('error');
            }
        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('add_phone')) {
            var str_bt_phone = elContent.find('.modal-body .bl_bt_content .bt_phone').val();
            type_button = 'phone_number';
            regionPhoneNumber = ' region="' + elContent.find('.modal-body .bl_bt_content .selectbox').val() + '"';
            if (str_bt_phone.indexOf('+') < 0) {
                str_btct = '+' + elContent.find('.modal-body .bl_bt_content .selectbox').val() + str_bt_phone.slice(1);
            } else {
                str_btct = str_bt_phone;
            }

            if (str_bt_title == '') {
                popup_check = false;
                elTitle.addClass('error');
            } else {
                elTitle.removeClass('error');
            }

            if (elContent.find('.modal-body .bt_phone').val().trim() == '' || !validatePhone(elContent.find('.modal-body .bt_phone').val())) {
                popup_check = false;
                elContent.find('.modal-body .wrPhone').addClass('error');
            } else {
                elContent.find('.modal-body .wrPhone').removeClass('error');
            }

        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('add_share')) {
            str_bt_title = txtCard25;
            str_btct = txtCard26;
            type_button = 'element_share';
        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('add_module')) {
            if (str_bt_title == '') {
                popup_check = false;
                elTitle.addClass('error');
            } else {
                elTitle.removeClass('error');
            }

            var modExt = '';
            if (el.parents('.modal-content').find('.bl_bt .moduleExtension').length > 0) {
                var elRadio = '';
                el.parents('.modal-content').find('.bl_bt .moduleExtension').find('.form-control, .group-radio').each(function (index, el) {
                    var module_check = true;

                    if (!$(this).hasClass('hidden')) {

                        if ($(this).hasClass('required')) {
                            if (!$(this).hasClass('group-radio')) {
                                if ($(this).val().trim() == '') {
                                    popup_check = false;
                                    module_check = false;
                                    $(this).addClass('error');
                                }
                            } else {
                                elRadio = $(this).find('input').attr('name');
                                if (!$(this).find('input[name="' + elRadio + '"]').is(':checked')) {
                                    popup_check = false;
                                    module_check = false;
                                    $(this).addClass('error');
                                }
                            }
                        }

                        if ($(this).hasClass('validUrl')) {
                            if (!isURL($(this).val())) {
                                popup_check = false;
                                module_check = false;
                                $(this).addClass('error');
                            }
                        }

                        if ($(this).hasClass('validLocale')) {
                            if (!isLocale($(this).val())) {
                                popup_check = false;
                                module_check = false;
                                $(this).addClass('error');
                            }
                        }

                        if ($(this).hasClass('isNumber')) {
                            if (!isNumber(parseInt($(this).val())) || $(this).val() <= 0) {
                                popup_check = false;
                                module_check = false;
                                $(this).addClass('error');
                            }
                        }
                    }

                    if (module_check) {
                        $(this).removeClass('error');
                        var valueInput = '';
                        if ($(this).hasClass('group-radio')) {
                            valueInput = $(this).find('input[name="' + elRadio + '"]:checked').val();
                        } else {
                            if ($(this).val() == '') {
                                valueInput = 0;
                            } else {
                                valueInput = $(this).val();
                            }
                        }

                        if (index <= 0) {
                            modExt += b64EncodeUnicode(valueInput);
                        } else {
                            modExt += "&" + b64EncodeUnicode(valueInput);
                        }
                    }
                });
            }
            var moduleExt = "_" + modExt;
            var done_data = elContent.find(".modal-body .bl_bt_content .bl_bt_input .select").select2("data");
            str_btct = '<span module-id="' + done_data.id + moduleExt + '">' + done_data.text + '</span>';
            type_button = 'module';
        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('add_location')) {
            str_bt_title = txtCard27;
            str_btct = txtCard28;
            type_button = 'location';
            iconTitle = '<i class="icon-location3"></i>';
            classTitle = '';
        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('user_phone_number')) {
            str_bt_title = txtCard29;
            str_btct = txtCard30;
            type_button = 'user_phone_number';
            iconTitle = '<i class="icon-phone-outgoing"></i>';
            classTitle = '';
        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('user_email')) {
            str_bt_title = 'Email';
            str_btct = txtCard31;
            type_button = 'user_email';
            iconTitle = '<i class="icon-mail5"></i>';
            classTitle = '';
        } else if (elContent.find('.modal-body .bl_bt_content li.active').hasClass('add_buy')) {

            $('.bl_bt_input input[type="text"]').each(function (index, el) {
                if ($(this).val() == '') {
                    $(this).addClass('error');
                    popup_check = false;
                } else {
                    if ($(this).hasClass('number') &&
                        (
                            !isNumber(parseInt($(this).val())) ||
                            parseInt($(this).val()) < 0 ||
                            ($(this).hasClass('vat') && (parseInt($(this).val()) < 0 || parseInt($(this).val()) > 100))
                        )
                    ) {
                        $(this).addClass('error');
                        popup_check = false;
                    } else {
                        $(this).removeClass('error');
                    }
                }
            });

            if ($('#thisElement.bt').length > 0) {
                var arBuy = $('#thisElement.bt p.bt_ct span').attr('buy-id');
                var idProduct = $('#idProduct').val();
                if (typeof arBuy != 'undefined') {
                    arBuy = arBuy.split("_")[0];
                    idProduct = JSON.parse(b64DecodeUnicode(arBuy)).idProduct;
                }
            } else {
                var idProduct = $('#idProduct').val();
            }

            var info = {
                'idBot': $('#botId').val(),
                'idCard': $('#idCard').val(),
                'idProduct': idProduct
            };
            var stringInfo = JSON.stringify(info);

            var price = $('[name="product_price"]').val();
            var discount = [];
            if ($('#modal_button .bl_bt_input .wr-discount>.row').length > 1) {
                $('#modal_button .bl_bt_input .wr-discount>.row').each(function (index, el) {
                    if ($(this).find('.addDiscount').length <= 0) {
                        var elDiscount = {
                            'amount': $(this).find('[name="product_amount"]').val(),
                            'name': $(this).find('[name="product_content"]').val(),
                            'discount': $(this).find('[name="product_priceDiscount"]').val()
                        }
                        discount.push(elDiscount);
                    }
                });
            }
            var stringDiscount = JSON.stringify(discount);
            var tax = $('[name="product_vat"]').val();

            var url = b64EncodeUnicode(stringInfo) + '_' + b64EncodeUnicode(price + '_' + stringDiscount + '_' + tax);

            if (str_bt_title == '') {
                popup_check = false;
                elTitle.addClass('error');
            } else {
                elTitle.removeClass('error');
            }

            str_btct = '<span buy-id="' + url + '">' + txtCard32 + '</span>';
            type_button = 'buy';
        }

        if (popup_check) {
            if ($('#thisElement').parents('#wr_multi').length > 0) {
                if ($('#thisElement').parents('.list-wrct').length > 0) {
                    var str_bt = '<div class="list_itemBt" type-button="' + type_button + '">' +
                        '<p class="bt_title">' + str_bt_title + '</p>' +
                        '<p class="bt_ct" ' + popupUrl + ' ' + regionPhoneNumber + '>' + str_btct + '</p>' +
                        '</div>';
                } else {
                    var str_bt = '<div class="bt" type-button="' + type_button + '">' +
                        '<p class="bt_title">' + str_bt_title + '</p>' +
                        '<p class="bt_ct" ' + popupUrl + ' ' + regionPhoneNumber + '>' + str_btct + '</p>' +
                        '</div>';
                }

                if (type_button == 'buy' && $('#thisElement.bt').length <= 0) {
                    $('#idProduct').val(parseInt($('#idProduct').val()) + 1);
                }

                $('#thisElement').replaceWith(str_bt);
                $('.select2-hidden-accessible').remove();
                $("#modal_button").modal("hide");

            } else {

                var imgIcon = el.parents('#modal_button').find('.modal-content .modal-header .icon_button').css('background-image');

                if (imgIcon != 'none' && iconTitle == '') {
                    classTitle = ''
                    var attachment_id = el.parents('#modal_button').find('.modal-content .modal-header .icon_button').attr('attachment_id');
                    iconTitle = "<i attachment_id=" + attachment_id + " style='background-image:" + imgIcon + "'></i>";
                }

                var str_bt = '<li class="reply">' +
                    '<div class="reply_action">' +
                    '<div class="reply_rm"><i class="icon-bin"></i></div>' +
                    '<div class="reply_move"><i class="icon-move"></i></div>' +
                    '</div>' +
                    '<div class="wr_reply_btcontent" attr-reply="' + type_button + '">' +
                    iconTitle +
                    '<div class="name-button ' + classTitle + '">' + str_bt_title + '</div>' +
                    '<div class="reply_btcontent">' + str_btct + '</div>' +
                    '</div>' +
                    '</li>';
                $('#thisElement').replaceWith(str_bt);
                $('.select2-hidden-accessible').remove();
                $("#modal_button").modal("hide");
                $('#blReply').sortable('destroy');
                $('#blReply').sortable({
                    items: ':not(.add_reply)',
                    handle: '.reply_move'
                });
            }
        }
    });
    // End Done Button
    // ====================================================================
    // ======================End Action Popup==============================
    // ====================================================================

    // ====================================================================
    // ===========================Action Title=============================
    // ====================================================================
    // Action Textarea Head
    // $('#multi').on('keypress', 'textarea', function(e) {
    //     if (e.which !== 0) {
    //         $(this).html($(this).val());
    //     }
    // })
    // $('#multi').on('keyup', 'textarea', function(e) {
    //     if(e.keyCode == 8 ||e.keyCode == 13){
    //         $(this).html($(this).val());
    //     }
    // })
    $('#multi').on('keyup', '.head textarea', function (event) {
        var str_head = $(this).val().length;
        $(this).siblings('span').html(80 - str_head);
        if (str_head >= 70) {
            $(this).siblings('span').addClass("error");
        } else {
            $(this).siblings('span').removeClass("error");
        }
    });
    $('#wr_multi').on('keydown', '.head textarea', function (event) {
        if (event.keyCode == 13) {
            return false;
        }
    });
    $('#multi').on('focusout', '.head textarea', function (event) {
        if ($(this).val().trim() == '') {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    // End Action Textarea Head

    // Action Textarea Sub
    $('#multi').on('keyup', '.sub textarea', function (event) {
        var str_head = $(this).val().length;
        $(this).siblings('span').html(80 - str_head);
        if (str_head >= 70) {
            $(this).siblings('span').addClass("error");
        } else {
            $(this).siblings('span').removeClass("error");
        }
    });
    // End Action Textarea Sub
    // ====================================================================
    // =======================End Action Title=============================
    // ====================================================================


    // ====================================================================
    // ======================Action Image Card=============================
    // ====================================================================
    $("body").on('click', '.clickinput', function (event) {
        $(this).parents('.wr_image').find('.inputfile').trigger('click');
    });
    $("body").on('click', '.img-rp', function (event) {
        // $(this).siblings('a').trigger('click');
        $(this).parents('.wr_image').find('.inputfile').trigger('click');
    })
    $("body").on('click', '.img-rm', function (event) {
        var elrm = $(this);
        var attachment_id = '';

        if (typeof elrm.parents('.wr_image').attr('attachment_id') !== typeof undefined &&
            elrm.parents('.wr_image').attr('attachment_id') !== false &&
            elrm.parents('.wr_image').attr('attachment_id') != ''
        ) {
            attachment_id = elrm.parents('.wr_image').attr('attachment_id');
        }

        var rs = removeImage(elrm.parents('.wr_image').css('background-image'), attachment_id);
        if (rs == 1) {
            elrm.parents('.wr_image').find('.clickinput').show();
            elrm.parents('span').addClass('hide');
            elrm.parents('.wr_image').css('background-image', '');
        }
    });
    $('#multi').on('change', '.inputfile', function (event) {
        var file = $(this)[0].files[0];
        var el = $(this);
        var attachment_id = '';

        if (typeof el.parents('.wr_image').attr('attachment_id') !== typeof undefined &&
            el.parents('.wr_image').attr('attachment_id') !== false &&
            el.parents('.wr_image').attr('attachment_id') != ''
        ) {
            attachment_id = el.parents('.wr_image').attr('attachment_id');
        }

        if (file && file.type.match('image.*')) {
            el.parents('.wr_image').removeClass('error');
            el.parents('.wr_image').append('<div class="img-loading"><i class="icon-spinner4 spinner"></i></div>');
            data = new FormData();
            data.append('file', file);
            data.append('botId', botId);
            // var urlUpload = srcAddImg;
            // if ($('#multi > div').attr('card') == 'image')

            $.ajax({
                    url: srcAddImg,
                    type: "POST",
                    data: data,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false
                })
                .done(function (val) {
                    val = JSON.parse(val);
                    if (el.parents('.wr_image').css('background-image') != 'none') {
                        removeImage(el.parents('.wr_image').css('background-image'), attachment_id);
                    }
                    el.parents('.wr_image').attr('attachment_id', val.attachment_id);
                    el.parents('.wr_image').css('background-image', 'url("' + val.url + '")');
                    el.parents('.wr_image').find('.clickinput').hide();
                    el.parents('.wr_image').find('span').removeClass('hide');
                    setTimeout(function () {
                        el.parents('.wr_image').find('.img-loading').remove();
                    }, 500);
                })
        } else {
            if (file) {
                el.parents('.wr_image').addClass('error');
            }
        }
    })
    // ====================================================================
    // ======================End Action Image Card=========================
    // ====================================================================

    // ====================================================================
    // =====================Action Audio & Video Card======================
    // ====================================================================
    $('body').on('click', '.click_input_file1', function (event) {
        $(this).parents('.wr_file').find('.input_file1').trigger('click');
    });
    $('body').on('change', '.input_file1', function (event) {
        var file = $(this)[0].files[0];
        var el = $(this);
        var extend_suport = '';
        var text_upload = '';
        if (el.parents('.content').attr('card') == 'audio') {
            extend_suport = 'audio.*';
        } else if (el.parents('.content').attr('card') == 'video') {
            extend_suport = 'video/*';
        }

        if (file && file.type.match(extend_suport) && file.size < 26214400) {// check file upload
            el.parents('.layer').removeClass('error');
            el.parents('.wr_file').append('<div class="img-loading"><i class="icon-spinner4 spinner"></i></div>');
            data = new FormData();
            data.append('file', file);
            data.append('botId', botId);
            data.append('type', el.parents('.content').attr('card'));
            $.ajax({
                    url: srcAddFile,
                    type: "POST",
                    data: data,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false
                })
                .done(function (val) {
                    val = JSON.parse(val);
                    el.parents('.wr_file').find('.click_input_file1 span').html(val.url);
                    el.parents('.wr_file').find('.click_input_file1 span').attr('attachment_id', val.attachment_id);
                    el.parents('.wr_file').attr('attachment_id', val.attachment_id);
                    el.parents('.wr_file').find('.hide').addClass('hasFile');
                    setTimeout(function () {
                        el.parents('.wr_file').find('.img-loading').remove();
                    }, 500);
                }).fail(function (val) {
                    el.parents('.wr_file').find('.img-loading').remove();
                    el.parents('.layer').addClass('error');
                });
        } else {
            el.parents('.layer').addClass('error');
        }
    })
    $('body').on('click', '.wr_file .hide .file-rm', function (event) {
        var elrm = $(this);
        if (elrm.parents('.content').attr('card') == 'audio') {
            text_upload = txtCard11;
        } else if (elrm.parents('.content').attr('card') == 'video') {
            text_upload = txtCard12;
        } else if (elrm.parents('.content').attr('card') == 'file') {
            text_upload = txtCard13;
        }


        // $.ajax({
        //     url: srcRmFile,
        //     method: "POST",
        //     data: {
        //         url: elrm.parents('.wr_file').find('.click_input_file1 span').text(),
        //         attachment_id: elrm.parents('.wr_file').find('.click_input_file1 span').attr('attachment_id')
        //     }
        // }).done(function (val) {
        //     if (val == 1) {
        //         elrm.parents('.wr_file').find('.input_file1').val('');
        //         elrm.parents('.wr_file').find('.click_input_file1 span').html(text_upload);
        //         elrm.parents('.wr_file').find('.hide').removeClass('hasFile');
        //     }
        // })
        // remove file action
        elrm.parents('.wr_file').find('.input_file1').val('');
        elrm.parents('.wr_file').find('.click_input_file1 span').html(text_upload);
        elrm.parents('.wr_file').find('.hide').removeClass('hasFile');
    })
    $('body').on('click', '.file-rp', function (event) {
        $(this).siblings('a').trigger('click');
        $(this).parents('.wr_file').find('.input_file1').trigger('click');
    })
    // ====================================================================
    // ======================End Action Audio & Video Card=================
    // ====================================================================

    // ====================================================================
    // ========================= Action Button ============================
    // ====================================================================

    // Add Button
    $('#multi').on('click', '.bt_add', function (event) {
        $('#modal_button').empty();
        var str_popup = htmlPopup($(this));
        $('#modal_button').append(str_popup);
        $('.blSelect .select').select2({
            // minimumResultsForSearch: "-1"
        });
        $(this).parents('.bt').before('<div id="thisElement"></div>');
        $("#modal_button").modal("show");
    });
    // End Add Button


    // Add Edit and Remove
    $('#multi').on({
        mouseenter: function () {
            if ($(this).attr('type-button') != 'element_add') {
                var str_bthv = '<div class="action_bt">' +
                    '<span class="bt_ed"><i class="icon-pencil6"></i></span>' +
                    '<span class="bt_rm"><i class="icon-bin"></i></span>' +
                    '</div>';
                $(this).append(str_bthv);
            }
        },

        mouseleave: function () {
            $(this).find('.action_bt').remove();
        }
    }, '.bt');
    // End Add Edit and Remove
    // Action Remove
    $('#multi').on('click', '.bt_rm', function (event) {
        $(this).parents('.bt').remove();
    });
    // End Action Remove
    // Action Edit
    $('#multi').on('click', '.bt_ed', function (event) {
        var el_share = true;
        var str_popup = '';
        var el = $(this).parents('div.bt');
        el.attr('id', 'thisElement');
        $('#modal_button').empty();
        if (el.attr('type-button') == 'element_share') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_share'));
        } else if (el.attr('type-button') == 'postback') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            $('#modal_button .modal-body .blSelect .select option[value="' + $(el).find('.bt_ct span').attr('postback-id') + '"]').attr('selected', 'selected');
            $('#modal_button .modal-body .blSelect .select').select2({
                // minimumResultsForSearch: "-1"
            });
        } else if (el.attr('type-button') == 'web_url') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_url'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            $('#modal_button .modal-body .bt_url').val(el.find('.bt_ct').text());
            $('#modal_button .modal-body .wrUrlSize input[name="urlSize"][value="' + el.find('.bt_ct').attr('webview_height_ratio') + '"]').trigger("click");
        } else if (el.attr('type-button') == 'phone_number') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_phone'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            $('#modal_button .modal-body .bt_phone').val(el.find('.bt_ct').text());
        } else if (el.attr('type-button') == 'module') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_module'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            var moduleId = el.find('.bt_ct span').attr('module-id').split(/_|&/);
            $("#modal_button .modal-body .blSelectModule select").select2("val", moduleId[0]);
            if (moduleId.length > 0) {
                $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
                $('#modal_button .modal-body .blSelectModule select').after('<div class="moduleExtension"><div class="loadingModule"><i class="icon-spinner3 spinner"></i></div></div>');
                var idMo = moduleId[0];
                moduleId.splice(0, 1);
                $.ajax({
                        url: srcLayoutModule,
                        type: 'POST',
                        data: {
                            id: idMo,
                            dataMo: moduleId
                        },
                    })
                    .done(function (val) {
                        if (val != '') {
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').empty();
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').append(val);
                        } else {
                            $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
                        }
                    });
            } else {
                $('#modal_button .modal-body .blSelectModule select').parent().children('.moduleExtension').remove();
            }
        } else if (el.attr('type-button') == 'buy') {
            str_popup = htmlPopup($(this));
            $('#modal_button').append(str_popup);
            actionTabPopup($('.add_buy'));
            $('#modal_button .modal-header .bt_name').val(el.find('.bt_title').text());
            $('#modal_button .modal-header span').text(20 - el.find('.bt_title').text().length);
            var arBuy = $(this).parents('.bt').find('.bt_ct span').attr('buy-id').split("_")[1];
            var price = b64DecodeUnicode(arBuy).slice(0, b64DecodeUnicode(arBuy).indexOf('_'));
            var vat = b64DecodeUnicode(arBuy).slice(parseInt(b64DecodeUnicode(arBuy).lastIndexOf('_')) + 1);
            var discount = b64DecodeUnicode(arBuy).slice(parseInt(b64DecodeUnicode(arBuy).indexOf('_')) + 1, parseInt(b64DecodeUnicode(arBuy).lastIndexOf('_')));
            discount = JSON.parse(discount);
            $('#modal_button .bl_bt_input input[name="product_price"]').val(price);
            $('#modal_button .bl_bt_input input[name="product_vat"]').val(vat);
            var htmlDiscount = '';
            if (discount.length > 0 && 'discount' in discount[0]) {
                for (var h = 0; h < discount.length; h++) {
                    htmlDiscount += '<div class="row">' +
                        '<div class="col-sm-4">';

                    if (h == 0) {
                        htmlDiscount += '<label>' + txtCard7 + '</label>';
                    }

                    htmlDiscount += '<input type="text" name="product_content" placeholder="' + txtCard2 + '" class="form-control" value="' + discount[h].name + '">' +
                        '</div>' +
                        '<div class="col-sm-3">';

                    if (h == 0) {
                        htmlDiscount += '<label>' + txtCard3 + '</label>';
                    }

                    htmlDiscount += '<input type="text" name="product_amount" placeholder="' + txtCard4 + '" class="form-control number" value="' + discount[h].amount + '">' +
                        '</div>' +
                        '<div class="col-sm-4">';

                    if (h == 0) {
                        htmlDiscount += '<label>' + txtCard5 + '</label>';
                    }

                    htmlDiscount += '<input type="text" name="product_priceDiscount" placeholder="' + txtCard6 + '" class="form-control number" value="' + discount[h].discount + '">' +
                        '</div>' +
                        '<div class="col-sm-1">';

                    if (h == 0) {
                        htmlDiscount += '<label>&nbsp;&nbsp;&nbsp;&nbsp;</label>';
                    }

                    htmlDiscount += '<i class="mt10px icon-cross3 rmDiscount"></i>' +
                        '</div>';

                    htmlDiscount += '</div>';
                }
            }

            $('#modal_button .bl_bt_input .wr-discount').prepend(htmlDiscount);
        }

        $("#modal_button").modal("show");
        // el.find('.bl_bt .bt_name').focus();
        // el.find('.bl_bt').fadeIn(10);
    });
    // End Action Edit
    // ====================================================================
    // ========================= End Action Button ========================
    // ====================================================================
});


// ====================================================================
// ============================Function ===============================
// ====================================================================
// Action check length input
(function ($) {
    $.fn.checkLengthInput = function (options) {
        var settings = $.extend({
            element: "input"
        }, options);

        this.on('keyup', options.element, function (event) {
            var str_head = $(this).val().length;
            var max_length = $(this).attr('maxlength');
            $(this).siblings('span').html(max_length - str_head);
            if (str_head >= 1) {
                $(this).removeClass('error');
            }
            if (str_head >= (max_length - 5)) {
                $(this).siblings('span').addClass("error");
            } else {
                $(this).siblings('span').removeClass("error");
            }
        });
        this.on('focusout', options.element, function (event) {
            if ($(this).val().length <= 0) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });

        return this;
    };
}(jQuery));
// End action check length input

/// HTML Popup
function htmlPopup(el, el_share = null, action = null) {

    var add_url = false,
        add_phone = false,
        add_share = false,
        add_location = false,
        add_buy = false,
        user_phone_number = false,
        user_email = false,

        // check menu
        menu_location = false,
        menu_phone_number = false,
        menu_email = false;

    if (el.parents('.content').length > 0) {
        add_url = true;
        add_phone = true;
        add_share = true;
        if (el.parents('.content').attr('card') == 'text' || el.parents('.bt').siblings('.bt[type-button="element_share"]').length > 0) {
            add_share = false;
        }
        if (el.parents('.content').attr('card') == 'galery' || el.parents('.content').attr('card') == 'list') {
            if (el.parents('.bt').siblings('.bt[type-button="buy"]').length > 0) {
                add_buy = false;
            } else {
                if (el.parents('.bt').length > 0 && el.parents('.content[card="list"]').length > 0) {
                    add_buy = false;
                } else {
                    if ($('#checkShop').val() == 'false') {
                        add_buy = false;
                    } else {
                        add_buy = true;
                    }
                }
            }
        }
    } else {
        add_location = true;
        user_phone_number = true,
            user_email = true;

        if ($('[attr-reply="location"]').length > 0) {
            if (el.attr('attr-reply') == 'location') {
                menu_location = true;
            } else {
                menu_location = false;
            }
        } else {
            menu_location = true;
        }

        if ($('[attr-reply="user_phone_number"]').length > 0) {
            if (el.attr('attr-reply') == 'user_phone_number') {
                menu_phone_number = true;
            } else {
                menu_phone_number = false;
            }
        } else {
            menu_phone_number = true;
        }

        if ($('[attr-reply="user_email"]').length > 0) {
            if (el.attr('attr-reply') == 'user_email') {
                menu_email = true;
            } else {
                menu_email = false;
            }
        } else {
            menu_email = true;
        }
    }

    var str_popup = '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">';
    if (add_location || user_phone_number || user_email) {
        str_popup += '<div class="reply_title_input"><strong class="icon_button">+ icon</strong>' +
            '<input type="file" class="iconFileReply" accept="image/*">' +
            '</div>';
    }
    str_popup += '<div class="pr_bt_name">' +
        '<input type="text" class="form-control bt_name" placeholder="' + txtCard33 + '" maxlength="20">' +
        '<span>20</span>' +
        '</div>' +
        '</div>' +

        '<div class="modal-body">' +
        '<div class="bl_bt">' +
        '<div class="bl_bt_content">' +
        '<ul class="list-inline">' +
        '<li class="bl_bt_a add_card active"><i class="icon-popout"></i> ' + txtCard34 + '</li>';
    if (add_url) {
        str_popup += '<li class="bl_bt_a add_url"><i class="icon-link"></i> URL</li>';
    }
    if (add_phone) {
        str_popup += '<li class="bl_bt_a add_phone"><i class="icon-phone2"></i> ' + txtCard35 + '</li>';
    }
    str_popup += '<li class="bl_bt_a add_module"><i class="icon-power-cord"></i> ' + txtCard36 + '</li>';
    if (add_share) {
        str_popup += '<li class="bl_bt_a add_share"><i class="icon-share2"></i> ' + txtCard37 + '</li>';
    }
    if (menu_location) {
        str_popup += '<li class="bl_bt_a add_location"><i class="icon-location3"></i>' + txtCard38 + '</li>';
    }
    if (menu_phone_number) {
        str_popup += '<li class="bl_bt_a user_phone_number"><i class="icon-phone-outgoing"></i> ' + txtCard39 + '</li>';
    }
    if (menu_email) {
        str_popup += '<li class="bl_bt_a user_email"><i class="icon-mail5"></i> Email</li>';
    }
    if (add_buy) {
        str_popup += '<li class="bl_bt_a add_buy"><i class="icon-cart5"></i> ' + txtCard40 + '</li>';
    }
    str_popup += '</ul>' +
        '<div class="bl_bt_input">' +
        '<div class="blSelect">' +
        '<select data-placeholder="' + txtCard41 + '" class="select"><option></option>' +
        card() +
        '</select>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">' + txtCard42 + '</button>' +
        '<button type="button" class="btn btn-primary bt_done">' + txtCard43 + '</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    return str_popup;
}

/// Action Tab Popup
function countChar(val) {
    var len = val.value.length;
    if (len >= 500) {
        val.value = val.value.substring(0, 500);
    } else {
        $('#charNum').text(500 - len);
    }
};
/// End Tab Popup

/// Action Tab Popup
function actionTabPopup(el) {
    el.siblings('li').removeClass('active');
    el.addClass('active');
    el.parents('.modal-content').find('.pr_bt_name .bt_name').show();
    el.parents('.modal-content').find('.pr_bt_name p').remove();

    $('.select2-hidden-accessible,.select2-drop-mask,.select2-drop').remove();
    if (el.hasClass('add_card')) {
        var str_card = '<div class="blSelect"><select data-placeholder="' + txtCard41 + '" class="select"><option></option>' +
            card() +
            '</select></div>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_card);
        $('.blSelect .select').select2({
            /*minimumResultsForSearch: "-1"*/ })
    } else if (el.hasClass('add_url')) {
        var str_url = '<input type="text" class="form-control bt_url" placeholder="' + txtCard44 + '"><hr><label class="">Kích cỡ khung hiển thị:</label><div class="wrUrlSize"><label class="ml10"><input type="radio" name="urlSize" value="compact"> Nhỏ</label><label class="ml10"><input type="radio" name="urlSize" value="tall"> Trung bình</label><label class="ml10"><input type="radio" name="urlSize" value="full" checked> Lớn</div></label></div>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_url);
    } else if (el.hasClass('add_phone')) {
        var str_phone = '<div class="wrPhone">';
        str_phone += '<div class="blPhone">';
        str_phone += '<select class="selectbox">';
        for (var i = 0; i < regionPhone().length; i++) {
            var dial = regionPhone()[i].dial;
            var country = regionPhone()[i].country;
            var selected = '';
            str_phone += '<option value="' + dial + '" data-iconurl="' + srcFolderImg + 'img/flags/' + country + '.png">';
            str_phone += regionPhone()[i].text + '(+' + dial + ')';
            str_phone += '</option>';
        }
        str_phone += '</select>';
        str_phone += '</div>';
        str_phone += '<input type="text" class="form-control bt_phone" placeholder="' + txtCard45 + '">';
        str_phone += '</div>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_phone);
        if ($('#thisElement').find('.bt_ct').length > 0) {
            var optionValue = $('#thisElement .bt_ct').attr('region');
            $('#modal_button .selectbox option[value=' + optionValue + ']').attr('selected', 'selected');
        } else {
            $('#modal_button .selectbox option[value=84]').attr('selected', 'selected');
        }

        $(".selectbox").selectBoxIt({
            autoWidth: false
        });
        $(".selectbox").bind({
            "close": function (ev, obj) {
                $('.bt_phone').val('+' + $(this).val());
            }
        });
    } else if (el.hasClass('add_share')) {
        var str_share = '<p>' + txtCard46 + '</p>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_share);
        el.parents('.modal-content').find('.pr_bt_name .bt_name').hide();
        el.parents('.modal-content').find('.pr_bt_name').append('<p><i class="icon-lock2"></i> ' + txtCard37 + '</p>');
    } else if (el.hasClass('add_module')) {
        var str_card = '<div class="blSelectModule"><select data-placeholder="' + txtCard47 + '" class="select"><option></option>' + module() + '</select></div>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_card);

        $('#modal_button .blSelectModule select').select2({
            minimumResultsForSearch: "-1"
        }).on("change", function (e) {
            if ($('#modal_button .blSelectModule select option[value="' + e.val + '"]').attr('attr-template') == 'true') {
                el.parents('.bl_bt_content').find('.bl_bt_input .blSelectModule .moduleExtension').remove();
                el.parents('.bl_bt_content').find('.bl_bt_input .blSelectModule select').after('<div class="moduleExtension"><div class="loadingModule"><i class="icon-spinner3 spinner"></i></div></div>');
                $.ajax({
                        url: srcLayoutModule,
                        type: 'POST',
                        data: {
                            id: e.val
                        },
                    })
                    .done(function (val) {
                        if (val != '') {
                            el.parents('.bl_bt_content').find('.bl_bt_input .blSelectModule .moduleExtension').empty();
                            el.parents('.bl_bt_content').find('.bl_bt_input .blSelectModule .moduleExtension').append(val);
                        }
                    });
            } else {
                el.parents('.bl_bt_content').find('.bl_bt_input .blSelectModule .moduleExtension').remove();
            }
        });

    } else if (el.hasClass('add_location')) {
        var str_share = '<p>' + txtCard48 + '</p>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_share);
        el.parents('.modal-content').find('.pr_bt_name .bt_name').hide();
        el.parents('.modal-content').find('.pr_bt_name').append('<p><i class="icon-location3"></i> Vị trí</p>');
        el.parents('.modal-content').find('.modal-header .reply_title_input').hide();
    } else if (el.hasClass('user_phone_number')) {
        var str_share = '<p>' + txtCard30 + '</p>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_share);
        el.parents('.modal-content').find('.pr_bt_name .bt_name').hide();
        el.parents('.modal-content').find('.pr_bt_name').append('<p><i class="icon-phone-outgoing"></i> Số điện thoại</p>');
        el.parents('.modal-content').find('.modal-header .reply_title_input').hide();
    } else if (el.hasClass('user_email')) {
        var str_share = '<p>' + txtCard31 + '</p>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_share);
        el.parents('.modal-content').find('.pr_bt_name .bt_name').hide();
        el.parents('.modal-content').find('.pr_bt_name').append('<p><i class="icon-mail5"></i> Email</p>');
        el.parents('.modal-content').find('.modal-header .reply_title_input').hide();
    } else if (el.hasClass('add_buy')) {
        var str_share = '<div class="wrapper_buy">' +
            '<div class="form-group">' +
            '<div class="row">' +
            '<div class="col-sm-6">' +
            '<label>Giá</label>' +
            '<input type="text" name="product_price" placeholder="' + txtCard49 + '" class="form-control number">' +
            '</div>' +

            '<div class="col-sm-6">' +
            '<label>VAT (0-100%)</label>' +
            '<input type="text" name="product_vat" placeholder="' + txtCard50 + '" class="form-control number vat">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<label class="text-bold">' + txtCard51 + '</label>' +
            '<div class="form-group wr-discount">' +
            '<div class="row">' +
            '<div class="col-sm-4">' +
            '<button class="btn btn-success addDiscount"><i class="icon-plus2"></i> ' + txtCard52 + '</button>'
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
        el.parents('.bl_bt_content').find('.bl_bt_input').html(str_share);
        // el.parents('.modal-content').find('.pr_bt_name .bt_name').hide();
        // el.parents('.modal-content').find('.pr_bt_name').append('<p><i class="icon-cart5"></i> Mua</p>');
        // el.parents('.modal-content').find('.modal-header .reply_title_input').hide();
    }
}
/// End Action Tab Popup

/// Check is number Region
function numberRegion(a) {
    var ar_numberRegion = [1876, 1869, 1868, 1784, 1767, 1758, 1684, 1671, 1670, 1664, 1649, 1473, 1441, 1345, 1340, 1284, 1268, 1264, 1246, 1242, 998, 996, 995, 994, 993, 992, 977, 976, 975, 974, 973, 972, 971, 970, 968, 967, 966, 965, 964, 963, 962, 961, 960, 886, 880, 856, 855, 853, 852, 850, 692, 691, 690, 689, 688, 687, 686, 685, 683, 682, 681, 680, 679, 678, 677, 676, 675, 674, 673, 672, 670, 598, 597, 596, 595, 594, 593, 592, 591, 590, 509, 508, 507, 506, 505, 504, 503, 502, 501, 500, 423, 421, 420, 389, 387, 386, 385, 382, 381, 380, 378, 377, 376, 375, 374, 373, 372, 371, 370, 359, 358, 357, 356, 355, 354, 353, 352, 351, 350, 299, 298, 297, 291, 290, 269, 268, 267, 266, 265, 264, 263, 262, 261, 260, 258, 257, 256, 255, 254, 253, 252, 251, 250, 249, 248, 246, 245, 244, 243, 242, 241, 240, 239, 238, 237, 236, 235, 234, 233, 232, 231, 230, 229, 228, 227, 226, 225, 224, 223, 222, 221, 220, 218, 216, 213, 212, 98, 95, 94, 93, 92, 91, 90, 86, 84, 82, 81, 66, 65, 64, 63, 62, 61, 60, 58, 57, 56, 55, 54, 53, 52, 51, 49, 48, 47, 46, 45, 44, 43, 41, 40, 39, 36, 34, 33, 32, 31, 30, 27, 20, 7, 1];
    a = parseInt(a);
    if (ar_numberRegion.indexOf(a) < 0) {
        return false;
    } else {
        return ar_numberRegion[ar_numberRegion.indexOf(a)];
    }
}
/// End Check is number Phone

/// Check is Url in Popup
function isURL(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}
/// End Check is Url in Popup

/// Check is Locale in Popup
function isLocale(l) {
    var arLocale = l.split(",");
    var latitude = arLocale[0];
    var longitude = arLocale[1];
    var reg = /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.[0-9]{1,6}$/;

    if (typeof latitude !== "undefined" && typeof longitude !== "undefined") {
        latitude = latitude.trim();
        longitude = longitude.trim();
        if (!reg.test(latitude) || !reg.test(longitude)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
/// End Check is Locale in Popup

// Check Number
function isNumber(n) {
    return Number(n) === n && n % 1 === 0;
}

/// Check is Phone
function validatePhone(phone) {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (regex.test(phone)) {
        return true;
    } else {
        if (!isNaN(phone) && parseInt(Number(phone)) == phone && !isNaN(parseInt(phone, 10))) {
            return true;
        }
        return false;
    }
}
/// End Check is Phone

/// Check is region Phone
function regionPhone() {
    var region = [{
            "dial": "84",
            "country": "vn",
            "text": "Vietnam (Việt Nam)"
        }, {
            "dial": "1",
            "country": "us",
            "text": "United States"
        },
        {
            "dial": "93",
            "country": "af",
            "text": "Afghanistan (‫افغانستان‬‎)"
        }, {
            "dial": "355",
            "country": "al",
            "text": "Albania (Shqipëri)"
        },
        {
            "dial": "213",
            "country": "dz",
            "text": "Algeria (‫الجزائر‬‎)"
        }, {
            "dial": "1684",
            "country": "as",
            "text": "American Samoa"
        },
        {
            "dial": "376",
            "country": "ad",
            "text": "Andorra"
        }, {
            "dial": "244",
            "country": "ao",
            "text": "Angola"
        },
        {
            "dial": "1264",
            "country": "ai",
            "text": "Anguilla"
        }, {
            "dial": "1268",
            "country": "ag",
            "text": "Antigua and Barbuda"
        },
        {
            "dial": "54",
            "country": "ar",
            "text": "Argentina"
        }, {
            "dial": "374",
            "country": "am",
            "text": "Armenia (Հայաստան)"
        },
        {
            "dial": "297",
            "country": "aw",
            "text": "Aruba"
        }, {
            "dial": "61",
            "country": "au",
            "text": "Australia"
        },
        {
            "dial": "43",
            "country": "at",
            "text": "Austria (Österreich)"
        }, {
            "dial": "994",
            "country": "az",
            "text": "Azerbaijan (Azərbaycan)"
        },
        {
            "dial": "1242",
            "country": "bs",
            "text": "Bahamas"
        }, {
            "dial": "973",
            "country": "bh",
            "text": "Bahrain (‫البحرين‬‎)"
        },
        {
            "dial": "880",
            "country": "bd",
            "text": "Bangladesh (বাংলাদেশ)"
        }, {
            "dial": "1246",
            "country": "bb",
            "text": "Barbados"
        },
        {
            "dial": "375",
            "country": "by",
            "text": "Belarus (Беларусь)"
        }, {
            "dial": "32",
            "country": "be",
            "text": "Belgium (België)"
        },
        {
            "dial": "501",
            "country": "bz",
            "text": "Belize"
        }, {
            "dial": "229",
            "country": "bj",
            "text": "Benin (Bénin)"
        },
        {
            "dial": "1441",
            "country": "bm",
            "text": "Bermuda"
        }, {
            "dial": "975",
            "country": "bt",
            "text": "Bhutan (འབྲུག)"
        },
        {
            "dial": "591",
            "country": "bo",
            "text": "Bolivia"
        }, {
            "dial": "387",
            "country": "ba",
            "text": "Bosnia and Herzegovina (Босна и Херцеговина)"
        },
        {
            "dial": "267",
            "country": "bw",
            "text": "Botswana"
        }, {
            "dial": "55",
            "country": "br",
            "text": "Brazil (Brasil)"
        },
        {
            "dial": "246",
            "country": "io",
            "text": "British Indian Ocean Territory"
        },
        {
            "dial": "1284",
            "country": "vg",
            "text": "British Virgin Islands"
        }, {
            "dial": "673",
            "country": "bn",
            "text": "Brunei"
        },
        {
            "dial": "359",
            "country": "bg",
            "text": "Bulgaria (България)"
        }, {
            "dial": "226",
            "country": "bf",
            "text": "Burkina Faso"
        },
        {
            "dial": "257",
            "country": "bi",
            "text": "Burundi (Uburundi)"
        }, {
            "dial": "855",
            "country": "kh",
            "text": "Cambodia (កម្ពុជា)"
        },
        {
            "dial": "237",
            "country": "cm",
            "text": "Cameroon (Cameroun)"
        },
        {
            "dial": "238",
            "country": "cv",
            "text": "Cape Verde (Kabu Verdi)"
        },
        {
            "dial": "1345",
            "country": "ky",
            "text": "Cayman Islands"
        },
        {
            "dial": "236",
            "country": "cf",
            "text": "Central African Republic (République centrafricaine)"
        },
        {
            "dial": "235",
            "country": "td",
            "text": "Chad (Tchad)"
        }, {
            "dial": "56",
            "country": "cl",
            "text": "Chile"
        },
        {
            "dial": "86",
            "country": "cn",
            "text": "China (中国)"
        }, {
            "dial": "57",
            "country": "co",
            "text": "Colombia"
        },
        {
            "dial": "269",
            "country": "km",
            "text": "Comoros (‫جزر القمر‬‎)"
        },
        {
            "dial": "243",
            "country": "cd",
            "text": "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)"
        },
        {
            "dial": "242",
            "country": "cg",
            "text": "Congo (Republic) (Congo-Brazzaville)"
        },
        {
            "dial": "682",
            "country": "ck",
            "text": "Cook Islands"
        }, {
            "dial": "506",
            "country": "cr",
            "text": "Costa Rica"
        },
        {
            "dial": "225",
            "country": "ci",
            "text": "Côte d’Ivoire"
        }, {
            "dial": "385",
            "country": "hr",
            "text": "Croatia (Hrvatska)"
        },
        {
            "dial": "53",
            "country": "cu",
            "text": "Cuba"
        },
        {
            "dial": "357",
            "country": "cy",
            "text": "Cyprus (Κύπρος)"
        }, {
            "dial": "420",
            "country": "cz",
            "text": "Czech Republic (Česká republika)"
        },
        {
            "dial": "45",
            "country": "dk",
            "text": "Denmark (Danmark)"
        }, {
            "dial": "253",
            "country": "dj",
            "text": "Djibouti"
        },
        {
            "dial": "1767",
            "country": "dm",
            "text": "Dominica"
        },
        {
            "dial": "593",
            "country": "ec",
            "text": "Ecuador"
        }, {
            "dial": "20",
            "country": "eg",
            "text": "Egypt (‫مصر‬‎)"
        },
        {
            "dial": "503",
            "country": "sv",
            "text": "El Salvador"
        }, {
            "dial": "240",
            "country": "gq",
            "text": "Equatorial Guinea (Guinea Ecuatorial)"
        },
        {
            "dial": "291",
            "country": "er",
            "text": "Eritrea"
        }, {
            "dial": "372",
            "country": "ee",
            "text": "Estonia (Eesti)"
        },
        {
            "dial": "251",
            "country": "et",
            "text": "Ethiopia"
        }, {
            "dial": "500",
            "country": "fk",
            "text": "Falkland Islands (Islas Malvinas)"
        },
        {
            "dial": "298",
            "country": "fo",
            "text": "Faroe Islands (Føroyar)"
        }, {
            "dial": "679",
            "country": "fj",
            "text": "Fiji"
        },
        {
            "dial": "33",
            "country": "fr",
            "text": "France"
        }, {
            "dial": "594",
            "country": "gf",
            "text": "French Guiana (Guyane française)"
        },
        {
            "dial": "689",
            "country": "pf",
            "text": "French Polynesia (Polynésie française)"
        },
        {
            "dial": "241",
            "country": "ga",
            "text": "Gabon"
        }, {
            "dial": "220",
            "country": "gm",
            "text": "Gambia"
        },
        {
            "dial": "995",
            "country": "ge",
            "text": "Georgia (საქართველო)"
        }, {
            "dial": "49",
            "country": "de",
            "text": "Germany (Deutschland)"
        },
        {
            "dial": "233",
            "country": "gh",
            "text": "Ghana (Gaana)"
        }, {
            "dial": "350",
            "country": "gi",
            "text": "Gibraltar"
        },
        {
            "dial": "30",
            "country": "gr",
            "text": "Greece (Ελλάδα)"
        }, {
            "dial": "299",
            "country": "gl",
            "text": "Greenland (Kalaallit Nunaat)"
        },
        {
            "dial": "1473",
            "country": "gd",
            "text": "Grenada"
        }, {
            "dial": "590",
            "country": "gp",
            "text": "Guadeloupe"
        },
        {
            "dial": "1671",
            "country": "gu",
            "text": "Guam"
        }, {
            "dial": "502",
            "country": "gt",
            "text": "Guatemala"
        }, {
            "dial": "224",
            "country": "gn",
            "text": "Guinea (Guinée)"
        },
        {
            "dial": "245",
            "country": "gw",
            "text": "Guinea-Bissau (Guiné Bissau)"
        }, {
            "dial": "592",
            "country": "gy",
            "text": "Guyana"
        },
        {
            "dial": "509",
            "country": "ht",
            "text": "Haiti"
        }, {
            "dial": "504",
            "country": "hn",
            "text": "Honduras"
        },
        {
            "dial": "852",
            "country": "hk",
            "text": "Hong Kong (香港)"
        }, {
            "dial": "36",
            "country": "hu",
            "text": "Hungary (Magyarország)"
        },
        {
            "dial": "354",
            "country": "is",
            "text": "Iceland (Ísland)"
        }, {
            "dial": "91",
            "country": "in",
            "text": "India (भारत)"
        },
        {
            "dial": "62",
            "country": "id",
            "text": "Indonesia"
        }, {
            "dial": "98",
            "country": "ir",
            "text": "Iran (‫ایران‬‎)"
        },
        {
            "dial": "964",
            "country": "iq",
            "text": "Iraq (‫العراق‬‎)"
        }, {
            "dial": "353",
            "country": "ie",
            "text": "Ireland"
        }, {
            "dial": "972",
            "country": "il",
            "text": "Israel (‫ישראל‬‎)"
        },
        {
            "dial": "39",
            "country": "it",
            "text": "Italy (Italia)"
        }, {
            "dial": "1876",
            "country": "jm",
            "text": "Jamaica"
        },
        {
            "dial": "81",
            "country": "jp",
            "text": "Japan (日本)"
        },
        {
            "dial": "962",
            "country": "jo",
            "text": "Jordan (‫الأردن‬‎)"
        },
        {
            "dial": "254",
            "country": "ke",
            "text": "Kenya"
        }, {
            "dial": "686",
            "country": "ki",
            "text": "Kiribati"
        },
        {
            "dial": "965",
            "country": "kw",
            "text": "Kuwait (‫الكويت‬‎)"
        },
        {
            "dial": "996",
            "country": "kg",
            "text": "Kyrgyzstan (Кыргызстан)"
        }, {
            "dial": "856",
            "country": "la",
            "text": "Laos (ລາວ)"
        },
        {
            "dial": "371",
            "country": "lv",
            "text": "Latvia (Latvija)"
        }, {
            "dial": "961",
            "country": "lb",
            "text": "Lebanon (‫لبنان‬‎)"
        },
        {
            "dial": "266",
            "country": "ls",
            "text": "Lesotho"
        }, {
            "dial": "231",
            "country": "lr",
            "text": "Liberia"
        },
        {
            "dial": "218",
            "country": "ly",
            "text": "Libya (‫ليبيا‬‎)"
        }, {
            "dial": "423",
            "country": "li",
            "text": "Liechtenstein"
        },
        {
            "dial": "370",
            "country": "lt",
            "text": "Lithuania (Lietuva)"
        }, {
            "dial": "352",
            "country": "lu",
            "text": "Luxembourg"
        },
        {
            "dial": "853",
            "country": "mo",
            "text": "Macau (澳門)"
        }, {
            "dial": "389",
            "country": "mk",
            "text": "Macedonia (FYROM) (Македонија)"
        },
        {
            "dial": "261",
            "country": "mg",
            "text": "Madagascar (Madagasikara)"
        }, {
            "dial": "265",
            "country": "mw",
            "text": "Malawi"
        },
        {
            "dial": "60",
            "country": "my",
            "text": "Malaysia"
        }, {
            "dial": "960",
            "country": "mv",
            "text": "Maldives"
        },
        {
            "dial": "223",
            "country": "ml",
            "text": "Mali"
        }, {
            "dial": "356",
            "country": "mt",
            "text": "Malta"
        },
        {
            "dial": "692",
            "country": "mh",
            "text": "Marshall Islands"
        }, {
            "dial": "596",
            "country": "mq",
            "text": "Martinique"
        },
        {
            "dial": "222",
            "country": "mr",
            "text": "Mauritania (‫موريتانيا‬‎)"
        }, {
            "dial": "230",
            "country": "mu",
            "text": "Mauritius (Moris)"
        },
        {
            "dial": "262",
            "country": "yt",
            "text": "Mayotte"
        }, {
            "dial": "52",
            "country": "mx",
            "text": "Mexico (México)"
        },
        {
            "dial": "691",
            "country": "fm",
            "text": "Micronesia"
        }, {
            "dial": "373",
            "country": "md",
            "text": "Moldova (Republica Moldova)"
        },
        {
            "dial": "377",
            "country": "mc",
            "text": "Monaco"
        }, {
            "dial": "976",
            "country": "mn",
            "text": "Mongolia (Монгол)"
        },
        {
            "dial": "382",
            "country": "me",
            "text": "Montenegro (Crna Gora)"
        }, {
            "dial": "1664",
            "country": "ms",
            "text": "Montserrat"
        },
        {
            "dial": "212",
            "country": "ma",
            "text": "Morocco (‫المغرب‬‎)"
        }, {
            "dial": "258",
            "country": "mz",
            "text": "Mozambique (Moçambique)"
        },
        {
            "dial": "95",
            "country": "mm",
            "text": "Myanmar (Burma) (မြန်မာ)"
        }, {
            "dial": "264",
            "country": "na",
            "text": "Namibia (Namibië)"
        },
        {
            "dial": "674",
            "country": "nr",
            "text": "Nauru"
        }, {
            "dial": "977",
            "country": "np",
            "text": "Nepal (नेपाल)"
        },
        {
            "dial": "31",
            "country": "nl",
            "text": "Netherlands (Nederland)"
        },
        {
            "dial": "687",
            "country": "nc",
            "text": "New Caledonia (Nouvelle-Calédonie)"
        },
        {
            "dial": "64",
            "country": "nz",
            "text": "New Zealand"
        }, {
            "dial": "505",
            "country": "ni",
            "text": "Nicaragua"
        },
        {
            "dial": "227",
            "country": "ne",
            "text": "Niger (Nijar)"
        }, {
            "dial": "234",
            "country": "ng",
            "text": "Nigeria"
        },
        {
            "dial": "683",
            "country": "nu",
            "text": "Niue"
        }, {
            "dial": "672",
            "country": "nf",
            "text": "Norfolk Island"
        },
        {
            "dial": "850",
            "country": "kp",
            "text": "North Korea (조선 민주주의 인민 공화국)"
        },
        {
            "dial": "1670",
            "country": "mp",
            "text": "Northern Mariana Islands"
        }, {
            "dial": "47",
            "country": "no",
            "text": "Norway (Norge)"
        },
        {
            "dial": "968",
            "country": "om",
            "text": "Oman (‫عُمان‬‎)"
        }, {
            "dial": "92",
            "country": "pk",
            "text": "Pakistan (‫پاکستان‬‎)"
        },
        {
            "dial": "680",
            "country": "pw",
            "text": "Palau"
        }, {
            "dial": "970",
            "country": "ps",
            "text": "Palestine (‫فلسطين‬‎)"
        },
        {
            "dial": "507",
            "country": "pa",
            "text": "Panama (Panamá)"
        }, {
            "dial": "675",
            "country": "pg",
            "text": "Papua New Guinea"
        },
        {
            "dial": "595",
            "country": "py",
            "text": "Paraguay"
        }, {
            "dial": "51",
            "country": "pe",
            "text": "Peru (Perú)"
        },
        {
            "dial": "63",
            "country": "ph",
            "text": "Philippines"
        }, {
            "dial": "48",
            "country": "pl",
            "text": "Poland (Polska)"
        },
        {
            "dial": "351",
            "country": "pt",
            "text": "Portugal"
        },
        {
            "dial": "974",
            "country": "qa",
            "text": "Qatar (‫قطر‬‎)"
        },
        {
            "dial": "40",
            "country": "ro",
            "text": "Romania (România)"
        }, {
            "dial": "7",
            "country": "ru",
            "text": "Russia (Россия)"
        },
        {
            "dial": "250",
            "country": "rw",
            "text": "Rwanda"
        },
        {
            "dial": "290",
            "country": "sh",
            "text": "Saint Helena"
        }, {
            "dial": "1869",
            "country": "kn",
            "text": "Saint Kitts and Nevis"
        },
        {
            "dial": "1758",
            "country": "lc",
            "text": "Saint Lucia"
        },
        {
            "dial": "508",
            "country": "pm",
            "text": "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)"
        },
        {
            "dial": "1784",
            "country": "vc",
            "text": "Saint Vincent and the Grenadines"
        }, {
            "dial": "685",
            "country": "ws",
            "text": "Samoa"
        },
        {
            "dial": "378",
            "country": "sm",
            "text": "San Marino"
        },
        {
            "dial": "239",
            "country": "st",
            "text": "São Tomé and Príncipe (São Tomé e Príncipe)"
        },
        {
            "dial": "966",
            "country": "sa",
            "text": "Saudi Arabia (‫المملكة العربية السعودية‬‎)"
        },
        {
            "dial": "221",
            "country": "sn",
            "text": "Senegal (Sénégal)"
        },
        {
            "dial": "381",
            "country": "rs",
            "text": "Serbia (Србија)"
        }, {
            "dial": "248",
            "country": "sc",
            "text": "Seychelles"
        },
        {
            "dial": "232",
            "country": "sl",
            "text": "Sierra Leone"
        }, {
            "dial": "65",
            "country": "sg",
            "text": "Singapore"
        },
        {
            "dial": "421",
            "country": "sk",
            "text": "Slovakia (Slovensko)"
        },
        {
            "dial": "386",
            "country": "si",
            "text": "Slovenia (Slovenija)"
        }, {
            "dial": "677",
            "country": "sb",
            "text": "Solomon Islands"
        },
        {
            "dial": "252",
            "country": "so",
            "text": "Somalia (Soomaaliya)"
        }, {
            "dial": "27",
            "country": "za",
            "text": "South Africa"
        },
        {
            "dial": "82",
            "country": "kr",
            "text": "South Korea (대한민국)"
        },
        {
            "dial": "34",
            "country": "es",
            "text": "Spain (España)"
        }, {
            "dial": "94",
            "country": "lk",
            "text": "Sri Lanka (ශ්‍රී ලංකාව)"
        },
        {
            "dial": "249",
            "country": "sd",
            "text": "Sudan (‫السودان‬‎)"
        }, {
            "dial": "597",
            "country": "sr",
            "text": "Suriname"
        }, {
            "dial": "268",
            "country": "sz",
            "text": "Swaziland"
        },
        {
            "dial": "46",
            "country": "se",
            "text": "Sweden (Sverige)"
        }, {
            "dial": "41",
            "country": "ch",
            "text": "Switzerland (Schweiz)"
        },
        {
            "dial": "963",
            "country": "sy",
            "text": "Syria (‫سوريا‬‎)"
        }, {
            "dial": "886",
            "country": "tw",
            "text": "Taiwan (台灣)"
        },
        {
            "dial": "992",
            "country": "tj",
            "text": "Tajikistan"
        }, {
            "dial": "255",
            "country": "tz",
            "text": "Tanzania"
        },
        {
            "dial": "66",
            "country": "th",
            "text": "Thailand (ไทย)"
        }, {
            "dial": "670",
            "country": "tl",
            "text": "Timor-Leste"
        },
        {
            "dial": "228",
            "country": "tg",
            "text": "Togo"
        }, {
            "dial": "690",
            "country": "tk",
            "text": "Tokelau"
        },
        {
            "dial": "676",
            "country": "to",
            "text": "Tonga"
        }, {
            "dial": "1868",
            "country": "tt",
            "text": "Trinidad and Tobago"
        },
        {
            "dial": "216",
            "country": "tn",
            "text": "Tunisia (‫تونس‬‎)"
        }, {
            "dial": "90",
            "country": "tr",
            "text": "Turkey (Türkiye)"
        },
        {
            "dial": "993",
            "country": "tm",
            "text": "Turkmenistan"
        }, {
            "dial": "1649",
            "country": "tc",
            "text": "Turks and Caicos Islands"
        },
        {
            "dial": "688",
            "country": "tv",
            "text": "Tuvalu"
        }, {
            "dial": "1340",
            "country": "vi",
            "text": "U.S. Virgin Islands"
        },
        {
            "dial": "256",
            "country": "ug",
            "text": "Uganda"
        }, {
            "dial": "380",
            "country": "ua",
            "text": "Ukraine (Україна)"
        },
        {
            "dial": "971",
            "country": "ae",
            "text": "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)"
        },
        {
            "dial": "44",
            "country": "gb",
            "text": "United Kingdom"
        },
        {
            "dial": "598",
            "country": "uy",
            "text": "Uruguay"
        }, {
            "dial": "998",
            "country": "uz",
            "text": "Uzbekistan (Oʻzbekiston)"
        },
        {
            "dial": "678",
            "country": "vu",
            "text": "Vanuatu"
        },
        {
            "dial": "58",
            "country": "ve",
            "text": "Venezuela"
        }, {
            "dial": "681",
            "country": "wf",
            "text": "Wallis and Futuna"
        }, {
            "dial": "967",
            "country": "ye",
            "text": "Yemen (‫اليمن‬‎)"
        },
        {
            "dial": "260",
            "country": "zm",
            "text": "Zambia"
        }, {
            "dial": "263",
            "country": "zw",
            "text": "Zimbabwe"
        },
        {
            "dial": "358",
            "country": "ax",
            "text": "Åland Islands"
        }
    ];
    return region;
}
/// End Check is region Phone

/// Remove Image
function removeImage(url, id) {
    // var rs = 0;
    // $.ajax({
    //     url: srcRmImg,
    //     method: "POST",
    //     async: false,
    //     data: {
    //         url: url,
    //         attachment_id: id
    //     }
    // }).done(function (val) {
    //     rs = val;
    // })
    return 1;
}
/// End Remove Image

/// Encode/Decode Base64
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
/// End Encode/Decode Base64

/// Set Button
function buttonList(element) {
    var buttons = [];
    if ($(element).attr('type-button') == 'postback') {
        var postback_card = 'postback_card_';
        $(element).find('.bt_ct span').each(function (index, el) {
            if (index != 0) {
                postback_card += '&' + $(this).attr('postback-id');
            } else {
                postback_card += $(this).attr('postback-id');
            }

        });
        button_object = {
            "type": "postback",
            "title": $(element).find('.bt_title').text(),
            "payload": postback_card
        }
        buttons.push(button_object);
    } else if ($(element).attr('type-button') == 'module') {
        var postback_module = 'postback_module_' + $(element).find('.bt_ct span').attr('module-id');
        button_object = {
            "type": "postback",
            "title": $(element).find('.bt_title').text(),
            "payload": postback_module
        }
        buttons.push(button_object);
    } else if ($(element).attr('type-button') == 'web_url') {
        // Shortened Link
        var wbLink = $(element).find('.bt_ct').text();
        if ($(element).find('.bt_ct').hasAttr('short-id') &&
            $(element).find('.bt_ct').hasAttr('short-url')) {
            if ($(element).find('.bt_ct').attr('short-url') != wbLink) {
                arLink.push(wbLink);
            } else {
                wbLink = $('#shorlink').val() + "" + $(element).find('.bt_ct').attr('short-id');
            }
        } else {
            arLink.push(wbLink);
        }

        var attrwebview_height_ratio = $(element).find('.bt_ct').attr('webview_height_ratio');
        attrwebview = "full";
        if (typeof attrwebview_height_ratio !== typeof undefined && attrwebview_height_ratio !== false) {
            attrwebview = attrwebview_height_ratio;
        }

        // End shortened link
        button_object = {
            "type": "web_url",
            "title": $(element).find('.bt_title').text(),
            "url": wbLink,
            "webview_height_ratio": attrwebview
        }
        buttons.push(button_object);
    } else if ($(element).attr('type-button') == 'phone_number') {
        button_object = {
            "type": "phone_number",
            "title": $(element).find('.bt_title').text(),
            "payload": $(element).find('.bt_ct').text()
        }
        buttons.push(button_object);
    } else if ($(element).attr('type-button') == 'element_share') {
        button_object = {
            "type": "element_share"
        }
        buttons.push(button_object);
    } else if ($(element).attr('type-button') == 'buy') {
        var postback_buy = 'postback_buy_' + $(element).find('.bt_ct span').attr('buy-id');
        button_object = {
            "type": "postback",
            "title": $(element).find('.bt_title').text(),
            "payload": postback_buy
        }
        buttons.push(button_object);
    }

    return buttons;
}
/// End Set Button

// Text error button
function txtConfirmErrorList(a, b = 0) {
    if (a == 1) {
        var $str_er = '<div class="layer_error" style="top:' + b + 'px">' + txtCard9 + '</div>';
    } else if (a == 2) {
        var $str_er = '<div class="layer_error" style="top:' + b + 'px">' + txtCard53 + '</div>';
    } else if (a == 3) {
        var $str_er = '<div class="layer_error" style="top:' + b + 'px">' + txtCard54 + '</div>';
    } else if (a == 4) {
        var $str_er = '<div class="layer_error" style="top:' + b + 'px">' + txtCard55 + '</div>';
    } else {
        var $str_er = '<div class="layer_error">' + txtCard56 + '</div>';
    }
    return $str_er;
}

// ====================================================================
// ========================= End Function =============================
// ====================================================================

function GetCardData() {
    var $str_er = '<div class="layer_error">' + txtCard9 + '</div>',
        checkCard = true,
        card = [],
        listUpdate = [],
        arProduct = [];

    arLink = [];
    $('#wr_multi').removeClass('error');
    if ($('#multi .content').length > 0) {
        $('#multi .content').each(function (index, el) {
            if ($(this).attr('card') == 'galery') {
                var ar_galery = [];
                $(this).children('.layer').each(function (index, el) {
                    if ($(this).find('.wr_title .head textarea').val().trim() == '') {
                        $(this).find('.wr_title .head textarea').addClass('error');
                        checkCard = false;
                    } else {
                        if ($(this).find('.wr_image').css('background-image') == 'none' &&
                            $(this).find('.wr_title .sub textarea').val().trim() == ''
                            // && $(this).find('.wr_title .url input').val().trim()==''
                            &&
                            $(this).find('.wr_button .bt').length <= 1) {
                            $(this).addClass('error');
                            $(this).append($str_er);
                            checkCard = false;
                        } else if ($(this).find('.wr_title .url input').val().trim() != '' &&
                            !isURL($(this).find('.wr_title .url input').val())) {
                            $(this).find('.wr_title .url input').addClass('error');
                            checkCard = false;
                        } else {
                            $(this).removeClass('error');
                            $(this).find('.layer_error').remove();
                        }
                    }

                    if (checkCard) {
                        var title = $(this).find('.wr_title .head textarea').val();
                        var item_url = $(this).find('.wr_title .url input').val();
                        var subtitle = $(this).find('.wr_title .sub textarea').val();
                        var image_url = '';
                        if ($(this).find('.wr_image').css('background-image') != 'none') {
                            image_url = $(this).find('.wr_image').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
                        }

                        if (typeof $(this).find('.wr_image').attr('attachment_id') !== typeof undefined &&
                            $(this).find('.wr_image').attr('attachment_id') !== false &&
                            $(this).find('.wr_image').attr('attachment_id') != ''
                        ) {
                            var arAt = {
                                attachment_id: $(this).find('.wr_image').attr('attachment_id'),
                                type: 'rm'
                            }
                            listUpdate.push(arAt);
                        }

                        // Shortened Link
                        if (item_url != '') {
                            if ($(this).find('.wr_title .url input').hasAttr('short-id') &&
                                $(this).find('.wr_title .url input').hasAttr('short-url')) {
                                if ($(this).find('.wr_title .url input').attr('short-url') != item_url) {
                                    arLink.push(item_url);
                                } else {
                                    item_url = $('#shorlink').val() + "" + $(this).find('.wr_title .url input').attr('short-id');
                                }
                            } else {
                                arLink.push(item_url);
                            }
                        }
                        // End shortened link

                        var buttons = [];
                        $(this).find('.wr_button .bt').each(function (index, el) {
                            var button_object = {};
                            if ($(this).attr('type-button') == 'postback') {
                                var postback_card = 'postback_card_';
                                $(this).find('.bt_ct span').each(function (index, el) {
                                    if (index != 0) {
                                        postback_card += '&' + $(this).attr('postback-id');
                                    } else {
                                        postback_card += $(this).attr('postback-id');
                                    }

                                });
                                button_object = {
                                    "type": "postback",
                                    "title": $(this).find('.bt_title').text(),
                                    "payload": postback_card
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'module') {
                                var postback_module = 'postback_module_' + $(this).find('.bt_ct span').attr('module-id');
                                button_object = {
                                    "type": "postback",
                                    "title": $(this).find('.bt_title').text(),
                                    "payload": postback_module
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'web_url') {
                                var wbLink = $(this).find('.bt_ct').text();

                                // Shortened Link
                                if (wbLink != '') {
                                    if ($(this).find('.bt_ct').hasAttr('short-id') &&
                                        $(this).find('.bt_ct').hasAttr('short-url')) {
                                        if ($(this).find('.bt_ct').attr('short-url') != wbLink) {
                                            arLink.push(wbLink);
                                        } else {
                                            wbLink = $('#shorlink').val() + "" + $(this).find('.bt_ct').attr('short-id');
                                        }
                                    } else {
                                        arLink.push(wbLink);
                                    }
                                }

                                var attrwebview_height_ratio = $(this).find('.bt_ct').attr('webview_height_ratio');
                                attrwebview = "full";
                                if (typeof attrwebview_height_ratio !== typeof undefined && attrwebview_height_ratio !== false) {
                                    attrwebview = attrwebview_height_ratio;
                                }
                                // End shortened link
                                button_object = {
                                    "type": "web_url",
                                    "title": $(this).find('.bt_title').text(),
                                    "url": wbLink,
                                    "webview_height_ratio": attrwebview
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'phone_number') {
                                button_object = {
                                    "type": "phone_number",
                                    "title": $(this).find('.bt_title').text(),
                                    "payload": $(this).find('.bt_ct').text()
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'element_share') {
                                button_object = {
                                    "type": "element_share"
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'buy') {
                                var postback_buy = 'postback_buy_' + $(this).find('.bt_ct span').attr('buy-id');
                                var arBuy = $(this).find('.bt_ct span').attr('buy-id').split("_")[0];
                                var idProduct = JSON.parse(b64DecodeUnicode(arBuy)).idProduct;

                                button_object = {
                                    "type": "postback",
                                    "title": $(this).find('.bt_title').text(),
                                    "payload": postback_buy
                                }
                                buttons.push(button_object);

                                var product = {
                                    "id": idProduct,
                                    "title": title,
                                    "subtitle": subtitle,
                                    "item_url": item_url,
                                    "image_url": image_url,
                                    "detail": $(this).find('.bt_ct span').attr('buy-id')
                                }
                                arProduct.push(product);
                            } else {
                                return;
                            }
                        });
                        var galery_element = {
                            "title": title,
                            "item_url": item_url,
                            "image_url": image_url,
                            "subtitle": subtitle,
                            "buttons": buttons
                        };
                        ar_galery.push(galery_element);
                    }
                });
                var generic = {
                    "message": {
                        "attachment": {
                            "type": "template",
                            "payload": {
                                "template_type": "generic",
                                "elements": ar_galery
                            }
                        }
                    }
                };
                card.push(generic);
            } else if ($(this).attr('card') == 'text') {
                var template_text = {};
                if ($(this).find('.content-text').val().trim() == '') {
                    $(this).find('.content-text').addClass('error');
                    checkCard = false;
                } else {
                    $(this).find('.content-text').removeClass('error');
                }

                if (checkCard) {
                    if ($(this).find('.wr_button .bt').length <= 1) {
                        template_text = {
                            "message": {
                                "text": $(this).find('.wr_title .wr-content-text textarea').val()
                            }
                        }
                    } else {
                        var buttons = [];
                        $(this).find('.wr_button .bt').each(function (index, el) {
                            var button_object = {};
                            if ($(this).attr('type-button') == 'postback') {
                                var postback_card = 'postback_card_';
                                $(this).find('.bt_ct span').each(function (index, el) {
                                    if (index != 0) {
                                        postback_card += '&' + $(this).attr('postback-id');
                                    } else {
                                        postback_card += $(this).attr('postback-id');
                                    }

                                });
                                button_object = {
                                    "type": "postback",
                                    "title": $(this).find('.bt_title').text(),
                                    "payload": postback_card
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'module') {
                                var postback_module = 'postback_module_' + $(this).find('.bt_ct span').attr('module-id');
                                button_object = {
                                    "type": "postback",
                                    "title": $(this).find('.bt_title').text(),
                                    "payload": postback_module
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'web_url') {
                                var wbLink = $(this).find('.bt_ct').text();
                                // Shortened Link
                                if (wbLink != '') {
                                    if ($(this).find('.bt_ct').hasAttr('short-id') &&
                                        $(this).find('.bt_ct').hasAttr('short-url')) {
                                        if ($(this).find('.bt_ct').attr('short-url') != wbLink) {
                                            arLink.push(wbLink);
                                        } else {
                                            wbLink = $('#shorlink').val() + "" + $(this).find('.bt_ct').attr('short-id');
                                        }
                                    } else {
                                        arLink.push(wbLink);
                                    }
                                }
                                // End shortened link

                                var attrwebview_height_ratio = $(this).find('.bt_ct').attr('webview_height_ratio');
                                attrwebview = "full";
                                if (typeof attrwebview_height_ratio !== typeof undefined && attrwebview_height_ratio !== false) {
                                    attrwebview = attrwebview_height_ratio;
                                }

                                button_object = {
                                    "type": "web_url",
                                    "title": $(this).find('.bt_title').text(),
                                    "url": wbLink,
                                    "webview_height_ratio": attrwebview
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'phone_number') {
                                button_object = {
                                    "type": "phone_number",
                                    "title": $(this).find('.bt_title').text(),
                                    "payload": $(this).find('.bt_ct').text()
                                }
                                buttons.push(button_object);
                            } else if ($(this).attr('type-button') == 'element_share') {
                                button_object = {
                                    "type": "element_share"
                                }
                                buttons.push(button_object);
                            } else {
                                return;
                            }
                        });
                        template_text = {
                            "message": {
                                "attachment": {
                                    "type": "template",
                                    "payload": {
                                        "template_type": "button",
                                        "text": $(this).find('.wr_title .wr-content-text textarea').val(),
                                        "buttons": buttons
                                    }
                                }
                            }
                        }
                    }
                    card.push(template_text);
                }
            } else if ($(this).attr('card') == 'image') {
                if ($(this).find('.wr_image').css('background-image') == 'none') {
                    $(this).find('.layer').addClass('error');
                    checkCard = false;
                } else {
                    $(this).find('.layer').removeClass('error');
                }

                if (checkCard) {
                    var payload = '';
                    if ($(this).find('.wr_image').attr('attachment_id') == null) {
                        var srcImage = $(this).find('.wr_image').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
                        payload = {
                            "url": srcImage
                        };
                    } else {
                        payload = {
                            "attachment_id": $(this).find('.wr_image').attr('attachment_id')
                        };

                        var arAt = {
                            attachment_id: $(this).find('.wr_image').attr('attachment_id'),
                            type: 'edit'
                        }
                        listUpdate.push(arAt);
                    }

                    var template_image = {
                        "message": {
                            "attachment": {
                                "type": "image",
                                "payload": payload
                            }
                        }
                    };
                    card.push(template_image);
                }
            } else if ($(this).attr('card') == 'audio' || $(this).attr('card') == 'video' || $(this).attr('card') == 'file') {
                if ($(this).find('.wr_file').find('.click_input_file1 span').text() == txtCard11 ||
                    $(this).find('.wr_file').find('.click_input_file1 span').text() == txtCard12 ||
                    $(this).find('.wr_file').find('.click_input_file1 span').text() == txtCard13
                ) {
                    $(this).find('.layer').addClass('error');
                    checkCard = false;
                } else {
                    $(this).find('.layer').removeClass('error');
                }
                var type_card = $(this).attr('card');
                if (checkCard) {

                    var payload = '';
                    if ($(this).find('.wr_file').attr('attachment_id') == null) {
                        var srcVideo = $(this).find('.wr_file').find('.click_input_file1 span').text();
                        payload = {
                            "url": srcVideo
                        };
                    } else {
                        payload = {
                            "attachment_id": $(this).find('.wr_file').attr('attachment_id')
                        };
                        var arAt = {
                            attachment_id: $(this).find('.wr_file').attr('attachment_id'),
                            type: 'edit'
                        }
                        listUpdate.push(arAt);
                    }

                    var srcVideo = $(this).find('.wr_file').find('.click_input_file1 span').text();
                    var template_file = {
                        "message": {
                            "attachment": {
                                "type": type_card,
                                "payload": payload
                            }
                        }
                    };
                    card.push(template_file);
                }
            } else if ($(this).attr('card') == 'module') {
                var modExt = '';
                var elRadio = '';
                $(this).find('.moduleExtension .form-control,.moduleExtension .group-radio').each(function (index, el) {
                    var module_check = true;
                    var localtion_check = true;

                    if (!$(this).hasClass('hidden')) {

                        if ($(this).hasClass('required')) {
                            if (!$(this).hasClass('group-radio')) {
                                if ($(this).val().trim() == '') {
                                    checkCard = false;
                                    module_check = false;
                                    $(this).addClass('error');
                                }
                            } else {
                                elRadio = $(this).find('input').attr('name');
                                if (!$(this).find('input[name="' + elRadio + '"]').is(':checked')) {
                                    checkCard = false;
                                    module_check = false;
                                    $(this).addClass('error');
                                }
                            }
                        }

                        if ($(this).hasClass('validUrl')) {
                            if (!isURL($(this).val())) {
                                checkCard = false;
                                module_check = false;
                                $(this).addClass('error');
                            }
                        }

                        if ($(this).hasClass('validLocale')) {
                            if (!isLocale($(this).val())) {
                                checkCard = false;
                                module_check = false;
                                $(this).addClass('error');
                            }
                        }

                        if ($(this).hasClass('isNumber')) {
                            if (!isNumber(parseInt($(this).val())) || $(this).val() <= 0) {
                                checkCard = false;
                                module_check = false;
                                $(this).addClass('error');
                            }
                        }

                    } else {
                        if ($(this).hasClass('validLocale')) {
                            localtion_check = false;
                        }
                    }

                    if (module_check) {
                        $(this).removeClass('error');
                        var valueInput = '';
                        if ($(this).hasClass('group-radio')) {
                            valueInput = $(this).find('input[name="' + elRadio + '"]:checked').val();
                        } else {
                            if (!localtion_check && $(this).val() == '') {
                                valueInput = 0;
                            } else {
                                valueInput = $(this).val();
                            }
                        }

                        if (index <= 0) {
                            modExt += b64EncodeUnicode(valueInput);
                        } else {
                            modExt += "&" + b64EncodeUnicode(valueInput);
                        }
                    }

                });

                var moduleExt = "_" + modExt;

                var template_file = {
                    "module": $(this).find('.blSelectModule select').val() + moduleExt
                };
                card.push(template_file);
            } else if ($(this).attr('card') == 'list') {

                var elBanner = $(this).find('.wr_image');
                elBanner.siblings('.layer_error').remove();
                var countElement = 0;
                if (elBanner.css('background-image') != 'none' ||
                    elBanner.find('.list_title').val().trim() != '' ||
                    elBanner.find('.list_subtitle').val().trim() != '' ||
                    elBanner.find('.list_itemBt').length == 2
                ) {
                    countElement++;
                    if (elBanner.css('background-image') == 'none' || elBanner.find('.list_title').val().trim() == '') {
                        checkCard = false;
                        elBanner.addClass('error');
                        elBanner.parents('.layer').append(txtConfirmErrorList(3, 50));

                    } else if (elBanner.find('.list_link').val().trim() != '' && !isURL(elBanner.find('.list_link').val().trim())) {
                        checkCard = false;
                        elBanner.addClass('error');
                        elBanner.parents('.layer').append(txtConfirmErrorList(4, 50));
                    } else {
                        elBanner.removeClass('error');
                    }
                }

                $(this).find('.wr_title .list_item').each(function (index, el) {
                    if ($(el).find('.list_img').css('background-image') != 'none' ||
                        $(el).find('.list_title').val().trim() != '' ||
                        $(el).find('.list_subtitle').val().trim() != ''
                        //|| $(el).find('.list_link').val().trim()!=''
                        ||
                        $(el).find('.list_itemBt').length == 2
                    ) {
                        countElement++;
                        if (countElement <= 4) {
                            if ($(el).find('.list_title').val().trim() == '') {
                                checkCard = false;
                                $(el).addClass('error');
                                $(el).parents('.layer').append(txtConfirmErrorList(2, 220 + (index * 140)));
                            } else if ($(el).find('.list_img').css('background-image') == 'none' &&
                                $(el).find('.list_subtitle').val().trim() == '' &&
                                $(el).find('.list_link').val().trim() == '' &&
                                $(el).find('.list_itemBt').length < 2) {
                                checkCard = false;
                                $(el).addClass('error');
                                $(el).parents('.layer').append(txtConfirmErrorList(1, 220 + (index * 140)));
                            } else if ($(el).find('.list_link').val().trim() != '' && !isURL($(el).find('.list_link').val().trim())) {
                                checkCard = false;
                                $(el).addClass('error');
                                $(el).parents('.layer').append(txtConfirmErrorList(4, 220 + (index * 140)));
                            } else {
                                $(el).removeClass('error');
                            }
                        }
                    }
                })

                if ($(this).find('.layer_error').length <= 0 && (countElement > 4 || countElement < 2)) {
                    checkCard = false;
                    $(this).find('.layer').addClass('error');
                    $(this).find('.layer').append(txtConfirmErrorList(null));
                } else {
                    $(this).find('.layer').removeClass('error');
                }

                if (checkCard) {
                    var arElement = [];
                    var template_list = {};
                    var checkElementBanner = false;
                    var top_element_style = 'compact';

                    var list_title = $(this).find('.wr_image .list_title').val();

                    if (list_title.trim() != '') {
                        var list_subtitle = $(this).find('.wr_image .list_subtitle').val();
                        var list_item_url = $(this).find('.wr_image .list_link').val();
                        var list_image_url = '';
                        if ($(this).find('.wr_image').css('background-image') != 'none') {
                            list_image_url = $(this).find('.wr_image').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
                        }

                        // Shortened Link
                        if (list_item_url.trim() != '') {
                            if ($(this).find('.wr_image .list_link').hasAttr('short-id') &&
                                $(this).find('.wr_image .list_link').hasAttr('short-url')) {
                                if ($(this).find('.wr_image .list_link').attr('short-url') != list_item_url) {
                                    arLink.push(list_item_url.trim());
                                } else {
                                    list_item_url = $('#shorlink').val() + "" + $(this).find('.wr_image .list_link').attr('short-id')
                                }
                            } else {
                                arLink.push(list_item_url.trim());
                            }
                        }
                        // End shortened link


                        template_list = {
                            "title": list_title,
                            "image_url": list_image_url,
                            "subtitle": list_subtitle,
                            "buttons": buttonList($(this).find('.wr_image .list_itemBt'))
                        };

                        if (list_item_url.trim() != '') {
                            template_list['default_action'] = {
                                "type": "web_url",
                                "url": list_item_url,
                            };
                        }

                        // add product
                        if ($(this).find('.wr_image .list_itemBt[type-button="buy"]').length > 0) {
                            var arBuy = $(this).find('.wr_image .list_itemBt[type-button="buy"] .bt_ct span').attr('buy-id').split("_")[0];
                            var idProduct = JSON.parse(b64DecodeUnicode(arBuy)).idProduct;
                            var product = {
                                "id": idProduct,
                                "title": list_title,
                                "subtitle": list_subtitle,
                                "item_url": list_item_url,
                                "image_url": list_image_url,
                                "detail": $(this).find('.wr_image .list_itemBt[type-button="buy"] .bt_ct span').attr('buy-id')
                            }
                            arProduct.push(product);
                        }
                        // end add product


                        arElement.push(template_list);
                        checkElementBanner = true;
                        top_element_style = 'large';
                    }


                    $(this).find('.wr_title .list_item').each(function (index, el) {
                        if ((!checkElementBanner && index < 4) || (checkElementBanner && index < 3)) {
                            var list_title = $(this).find('.list_title').val();
                            var list_subtitle = $(this).find('.list_subtitle').val();
                            var list_item_url = $(this).find('.list_link').val();
                            var list_image_url = '';

                            if (list_title.trim() != '') {

                                if ($(this).find('.list_img').css('background-image') != 'none') {
                                    list_image_url = $(this).find('.list_img').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
                                }

                                // Shortened Link
                                if (list_item_url.trim() != '') {
                                    if ($(this).find('.list_link').hasAttr('short-id') &&
                                        $(this).find('.list_link').hasAttr('short-url')) {
                                        if ($(this).find('.list_link').attr('short-url') != list_item_url) {
                                            arLink.push(list_item_url.trim());
                                        } else {
                                            list_item_url = $('#shorlink').val() + "" + $(this).find('.list_link').attr('short-id');
                                        }
                                    } else {
                                        arLink.push(list_item_url.trim());
                                    }
                                }
                                // End shortened link

                                template_list = {
                                    "title": list_title,
                                    "image_url": list_image_url,
                                    "subtitle": list_subtitle,
                                    "buttons": buttonList($(this).find('.list_itemBt'))
                                };

                                if (list_item_url.trim() != '') {
                                    template_list['default_action'] = {
                                        "type": "web_url",
                                        "url": list_item_url,
                                    };
                                }

                                // add product
                                if ($(this).find('.list-wrct .list_itemBt[type-button="buy"]').length > 0) {
                                    var arBuy = $(this).find('.list-wrct .list_itemBt[type-button="buy"] .bt_ct span').attr('buy-id').split("_")[0];
                                    var idProduct = JSON.parse(b64DecodeUnicode(arBuy)).idProduct;
                                    var product = {
                                        "id": idProduct,
                                        "title": list_title,
                                        "subtitle": list_subtitle,
                                        "item_url": list_item_url,
                                        "image_url": list_image_url,
                                        "detail": $(this).find('.list-wrct .list_itemBt[type-button="buy"] .bt_ct span').attr('buy-id')
                                    }
                                    arProduct.push(product);
                                }
                                // end add product

                                arElement.push(template_list);
                            }
                        }
                    });

                    var template_fn = {
                        "message": {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "list",
                                    "top_element_style": top_element_style,
                                    "elements": arElement,
                                    "buttons": buttonList($(this).find('.wr_button .bt'))
                                }
                            }
                        }
                    };
                    card.push(template_fn);
                }
            }
        });
    } else {
        $('#wr_multi').addClass('error');
        checkCard = false;
    }

    if ($('#wr_reply #blReply li.reply').length > 0) {
        var ar_quickReply = [];
        var obj_quickReply = {};
        $('#wr_reply #blReply li.reply').each(function (index, el) {
            if ($(this).find('.wr_reply_btcontent').attr('attr-reply') == 'location') {
                obj_quickReply = {
                    "content_type": "location"
                };
                ar_quickReply.push(obj_quickReply);
            } else if ($(this).find('.wr_reply_btcontent').attr('attr-reply') == 'user_phone_number') {
                obj_quickReply = {
                    "content_type": "user_phone_number"
                };
                ar_quickReply.push(obj_quickReply);
            } else if ($(this).find('.wr_reply_btcontent').attr('attr-reply') == 'user_email') {
                obj_quickReply = {
                    "content_type": "user_email"
                };
                ar_quickReply.push(obj_quickReply);
            } else if ($(this).find('.wr_reply_btcontent').attr('attr-reply') == 'postback') {
                if ($(this).find('.wr_reply_btcontent').children('i').length > 0) {

                    if (typeof $(this).find('.wr_reply_btcontent').children('i').attr('attachment_id') !== typeof undefined &&
                        $(this).find('.wr_reply_btcontent').children('i').attr('attachment_id') !== false &&
                        $(this).find('.wr_reply_btcontent').children('i').attr('attachment_id') != ''
                    ) {
                        var arAt = {
                            attachment_id: $(this).find('.wr_reply_btcontent').children('i').attr('attachment_id'),
                            type: 'rm'
                        }
                        listUpdate.push(arAt);
                    }

                    var payload = '';
                    if ($(this).find('.reply_btcontent span').length > 0) {
                        payload += 'postback_card_';
                        $(this).find('.reply_btcontent span').each(function (index, el) {
                            if (index == 0) {
                                payload += $(this).attr('postback-id');
                            } else {
                                payload += '&' + $(this).attr('postback-id');
                            }
                        });
                    }
                    obj_quickReply = {
                        "content_type": "text",
                        "title": $(this).find('.wr_reply_btcontent .name-button').text(),
                        "payload": payload,
                        "image_url": $(this).find('.wr_reply_btcontent i').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "")
                    };
                    ar_quickReply.push(obj_quickReply);
                } else {
                    var payload = '';
                    if ($(this).find('.reply_btcontent span').length > 0) {
                        payload += 'postback_card_';
                        $(this).find('.reply_btcontent span').each(function (index, el) {
                            if (index == 0) {
                                payload += $(this).attr('postback-id');
                            } else {
                                payload += '&' + $(this).attr('postback-id');
                            }
                        });
                    }
                    obj_quickReply = {
                        "content_type": "text",
                        "title": $(this).find('.wr_reply_btcontent .name-button').text(),
                        "payload": payload
                    };
                    ar_quickReply.push(obj_quickReply);
                }
            } else if ($(this).find('.wr_reply_btcontent').attr('attr-reply') == 'module') {
                if ($(this).find('.wr_reply_btcontent').children('i').length > 0) {
                    var payload = '';
                    if ($(this).find('.reply_btcontent span').length > 0) {
                        payload += 'postback_module_' + $(this).find('.reply_btcontent span').attr('module-id');
                    }

                    if (typeof $(this).find('.wr_reply_btcontent i').attr('attachment_id') !== typeof undefined &&
                        $(this).find('.wr_reply_btcontent i').attr('attachment_id') !== false &&
                        $(this).find('.wr_reply_btcontent i').attr('attachment_id') != ''
                    ) {
                        var arAt = {
                            attachment_id: $(this).find('.wr_reply_btcontent i').attr('attachment_id'),
                            type: 'rm'
                        }
                        listUpdate.push(arAt);
                    }

                    obj_quickReply = {
                        "content_type": "text",
                        "title": $(this).find('.wr_reply_btcontent .name-button').text(),
                        "payload": payload,
                        "image_url": $(this).find('.wr_reply_btcontent i').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "")
                    };
                    ar_quickReply.push(obj_quickReply);
                } else {
                    var payload = '';
                    if ($(this).find('.reply_btcontent span').length > 0) {
                        payload += 'postback_module_' + $(this).find('.reply_btcontent span').attr('module-id');
                    }
                    obj_quickReply = {
                        "content_type": "text",
                        "title": $(this).find('.wr_reply_btcontent .name-button').text(),
                        "payload": payload
                    };
                    ar_quickReply.push(obj_quickReply);
                }
            }
        });
        var objReply = {
            'message': {
                'quick_replies': ar_quickReply
            }
        }
        if (!('module' in card[card.length - 1])) {
            $.extend(true, card[card.length - 1], objReply);
        } else if (card.length > 1) {
            $.extend(true, card[card.length - 2], objReply);
        }
    }
    var objectCard = {
        '_id': $('#idCard').val(),
        'userId': $('#userId').val(),
        'pageId': $('#pageId').val(),
        'botId': $('#botId').val(),
        'blockId': $('#blockId').val(),
        'nameCard': $('#name_card').val(),
        'arProduct': arProduct,
        'cardContent': card
    }

    if (checkCard) {
        var element = $(this);
        var block = element.parents('body');
        // $(block).block({
        //     message: '<i class="icon-spinner4 spinner"></i>',
        //     overlayCSS: {
        //         backgroundColor: '#000',
        //         opacity: 0.8,
        //         cursor: 'wait'
        //     },
        //     css: {
        //         border: 0,
        //         padding: 0,
        //         backgroundColor: 'transparent'
        //     }
        // });
        var data = JSON.stringify(card);
        var tag = $('#cboTag').val();
        return {
                data: data,
                tag: tag
                // listUpdate  : listUpdate,
                // arLink: arLink

            }

    } else {
        return;
        swal({
            title: txtCard57,
            text: txtCard58,
            confirmButtonColor: "#EF5350",
            type: "error"
        });
    }
};