// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$("#emailContactsDialogue").dialog({
    dialogClass: "no-close",
    width: 800,
    autoOpen: false,
    modal: true,
    buttons: [
        {
            text: "Keep Selections",
            click: function () {
                thisObj = $(this);
                if ($('#selectedContacts option').length == 0) {
                    //Need function call because the confirm dialog executes asynchronously
                    confirmThis("There are no selections to keep. Continue?", function () {
                        ListBoxKeepContacts(thisObj);
                    })
                } else {
                    ListBoxKeepContacts(thisObj);
                }
                $(this).dialog("close");
            }
        },
        {
            text: "Close",
            click: function () {
                $(this).dialog("close");
            }
        }
    ]
});

$("#multiSelectWrapper").click(function () {
    $("#emailContactsDialogue").dialog("open");
    $('#availableContacts').empty();
    $('#selectedContacts').empty();
    var contacts = $("#contactAddressBookList option").clone();
    $('#selectedContacts').append(contacts);

    $('#contactFilter').val('');

    $('#selectedContacts option').prop('selected', true);

    var url = "/Home/FillContactsDialouge";
    $.ajax({
        url: url,
        data: {
            //selectedMultipleFields: $('#selectedContacts').val()
            selected: $('#selectedContacts').val()
        },
        type: 'POST',
        success: function (data) {
            $.each(data, function (index, valuex) {
                if ($('#selectedContacts option[value="' + valuex["value"] + '"]').text() == false) {
                    $('#availableContacts').append('<option class="jsHasEmail" selected value="' + valuex["key"] + '">' + valuex["value"] + '</option>');
                }
            });

            $('#availableContacts').val(-1);
        }
    });
});

$('#contactFilter').keyup(function () {
    var timer = null;
    clearTimeout(timer);
    timer = setTimeout(function () {
        $('#availableContacts').empty();
        var url = "/Home/FillContactsDialouge";
        $.ajax({
            url: url,
            data: {
                contactFilter: $("#contactFilter").val()               
            },
            type: 'POST',
            success: function (data) {
                $.each(data, function (index, valuex) {
                    let textvalue = $('#selectedContacts option[value="' + valuex["key"] + '"]').text();
                    if (textvalue == "") {
                        $('#availableContacts').append('<option class="jsHasEmail" selected value="' + valuex["key"] + '">' + valuex["value"] + '</option>');
                    }
                });

                $('#availableContacts').val(-1);
            }
        });
    }, 500);
});

$("#showAllContacts").click(function () {
  
    $('#availableContacts').empty();  
    $('#contactFilter').val('');
    $('#selectedContacts option').prop('selected', true);

    var url = "/Home/FillContactsDialouge";
    $.ajax({
        url: url,
        data: {
            contactFilter: $("#contactFilter").val()       
        },
        type: 'POST',
        success: function (data) {
            $.each(data, function (index, valuex) {
                let textvalue = $('#selectedContacts option[value="' + valuex["key"] + '"]').text();
                if (textvalue == "") {
                    $('#availableContacts').append('<option class="jsHasEmail" selected value="' + valuex["key"] + '">' + valuex["value"] + '</option>');
                }
            });

            $('#availableContacts').val(-1);
        }
    });
});

$("#btnAdd").click(function () {
    return !$('#availableContacts option:selected').remove().appendTo('#selectedContacts'); 
      
});

$("#btnRemove").click(function () {
    return !$('#selectedContacts option:selected').remove().appendTo('#availableContacts');

});




function ListBoxKeepContacts(thisObj) {
    $('#selectedContacts > option').prop("selected", true);

    //Remove dups here
    $("#selectedContacts option").each(function () {
        var thisValue = $(this);
        var valueCntr = 0;
        $("#selectedContacts option").each(function () {
            if ($(this).val() == $.trim(thisValue.val())) {
                valueCntr = valueCntr + 1;
            }
        });
        if (valueCntr > 1) {
            $('#selectedContacts option[value*="' + thisValue.val() + '"]').remove();
            $('#selectedContacts').append(thisValue);
        }
    });

    var contactListboxId = '#contactAddressBookList';

    $(contactListboxId).empty();

    if ($(contactListboxId + '-HistoryPersistence')) {
        $(contactListboxId + '-HistoryPersistence').val($('#selectedContacts').html());
    }
    $('#selectedContacts option').appendTo(contactListboxId);

    thisObj.dialog('close');

}