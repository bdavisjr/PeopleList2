$(document).on('click', '#showAllContacts', function () {
    $('#availableContacts').empty();
    $('#contactFilter').val('');
    $('#selectedContacts option').prop('selected', true);
    var url = "/Home/GetPeople";
    $.ajax({
        url: url,
        data: {
            //selectedMultipleFields: $('#selectedContacts').val()
            selected: $('#selectedContacts').val()
        },
        type: 'POST',
        success: function (data) {
            $('#availableContacts').empty();
            $.each(data, function (index, valuex) {
                if ($('#selectedContacts option[value="' + valuex["Value"] + '"]').text() == false) {
                    $('#availableContacts').append('<option class="jsHasEmail" selected value="' + valuex["Key"] + '">' + valuex["Value"] + '</option>');
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
        var url = "/Home/GetPeople";
        $.ajax({
            url: url,
            data: {
                contactFilter: $("#contactFilter").val(),
                selected: $('#selectedContacts').val()
            },
            type: 'POST',
            success: function (data) {
                $.each(data, function (index, valuex) {
                    if ($('#selectedContacts option[value="' + valuex["Value"] + '"]').text() == false) {
                        $('#availableContacts').append('<option class="jsHasEmail" selected value="' + valuex["Key"] + '">' + valuex["Value"] + '</option>');
                    }
                });
            }
        });
    }, 500);
});


$("#multiSelectWrapper").click(function () {
    $("#emailContactsDialogue").dialog("open");
    $('#availableContacts').empty();
    $('#selectedContacts').empty();
    var contacts = $("#contactAddressBookList option").clone();
    $('#selectedContacts').append(contacts);

    $('#contactFilter').val('');

    $('#selectedContacts option').prop('selected', true);

    var url = "/Home/GetPeople";
    $.ajax({
        url: url,
        data: {
            //selectedMultipleFields: $('#selectedContacts').val()
            selected: $('#selectedContacts').val()
        },
        type: 'POST',
        success: function (data) {
            $.each(data, function (index, valuex) {
                if ($('#selectedContacts option[value="' + valuex["Value"] + '"]').text() == false) {
                    $('#availableContacts').append('<option class="jsHasEmail" selected value="' + valuex["Key"] + '">' + valuex["Value"] + '</option>');
                }
            });

            $('#availableContacts').val(-1);
        }
    });
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