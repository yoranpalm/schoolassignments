let objectFields = {};
objectFields.voornaam = {field: "voornaam", required: true, placeholder: "Voornaam", minChar: 2, maxChar: 15, type: "string", regEx: ""};
objectFields.tv = {field: "tv", required: false, placeholder: "Tussenvoegsel", minChar: 0, maxChar: 15, type: "string", regEx: ""};
objectFields.achternaam = {field: "achternaam", required: true, placeholder: "Achternaam", minChar: 2, maxChar: 15, type: "string", regEx: ""};
objectFields.adres = {field: "adres", required: true, placeholder: "Adres", minChar: 3, maxChar: 50, type: "varchar", regEx: ""};
objectFields.postcode = {field: "postcode", required: true,  placeholder: "Postcode", minChar: 4, maxChar: 15, type: "varchar", regEx: '(^[0-9]{4}[A-Za-z]{2}$)'};
objectFields.woonplaats = {field: "woonplaats", required: true,  placeholder: "Woonplaats", minChar: 2, maxChar: 15, type: "varchar", regEx: ""};
objectFields.email = {field: "email", required: true, placeholder: "E-mail", minChar: 2, maxChar: 50, type: "varchar", regEx: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'};
objectFields.telefoonnummer = {field: "telefoonnummer", required: false, placeholder: "Telefoonnummer", minChar: 8, maxChar: 15, type: "varchar", regEx: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'};
objectFields.gebDatum = {field: "gebDatum", required: false, placeholder: "Geboortedatum",  minChar: 0, maxChar: 15, type: "date", regEx: ""};

let objectGeslacht = {};
objectGeslacht.man = { label: "kleding", options: ["Broeken", "Jacks & Jassen", "Overhemden", "Shorts"]};
objectGeslacht.vrouw = { label: "kleding", options: ["Jurken", "Tops", "Overhemden & Blouses", "Swimwear"]};
objectGeslacht.onzijdig = { label: "kleding", options: ["Tops", "Jassen & Blazers", "Jurken & Jumpsuits", "Broeken"]};

var arrayGeslacht = [{value: "man", label: "Man"}, {value: "vrouw", label: "Vrouw"}, {value: "onzijdig", label: "Onzijdig"}];
objectFields.geslacht   = {field: "geslacht", type: "radio", options: arrayGeslacht};

$(document).ready(function () {
    let errorMessages = {};

    $.each(objectFields, function(key, value) {
        var div = $("<div class='divField'>");
        div.append($("<div>").html(value.placeholder));

        if(value.type === "string" || value.type === "varchar") {
            div.append($("<div class='field'><div class='control'>").append(
                $("<input class='inpField input' type='text' name='" + value.field + "' id='" + value.field + "' placeholder='" + value.placeholder + "'>")
            ));
        }

        if(value.type === "date") {
            div.append($("<div class='field'><div class='control'>").append(
                $("<input class='inpField input' type='date' name='" + value.field + "' placeholder='" + value.placeholder + "'>")
            ));
        }

        if(value.type === "radio") {
            var divRadio = $("<div><div class='field'><div class='control'>");
            $.each(arrayGeslacht, function (key, value) {
                divRadio.append(
                    $("<label class='radio'><input type='radio' name='geslacht' value='" + value.value + "'> " + value.label + "</label>")
                );
            });

            div.append(divRadio);

            var divOptions = $("<div id='radio'>");
        }

        $("#form").append(div);
        $("#form").append(divOptions);
    });

    $('.inpField')
        .on("blur", function(element) {
            checkInputField(element);
    });

    function checkInputField(element) {
        let inputElement = $(element.target);
        let inputName = inputElement.attr("name");
        let fieldData = objectFields[inputName];

        if (fieldData.required && $(inputElement).val() == "") {
            errorMessages[inputName] = "<span>" + fieldData.placeholder + " mag niet leeg zijn.</span><br>";
            $(inputElement).addClass('is-danger');
        }
        else if (fieldData.minChar > $(inputElement).val().length) {
            errorMessages[inputName] = "<span>" + fieldData.placeholder + " moet minimaal " + fieldData.minChar + " tekens hebben.</span><br>";
            $(inputElement).addClass('is-danger');
        }
        else if (fieldData.maxChar <= $(inputElement).val().length) {
            errorMessages[inputName] = "<span>" + fieldData.placeholder + " mag niet meer dan " + fieldData.maxChar + " tekens hebben.</span><br>";
            $(inputElement).addClass('is-danger');
        }
        else if (!new RegExp($(fieldData).attr("regEx"), "g").test($(inputElement).val())) {
            errorMessages[inputName] = "<span>" + fieldData.placeholder + " moet een gelding " + fieldData.placeholder.toLowerCase() + " bevatten.</span><br>";
            $(inputElement).addClass('is-danger');
        }
        else {
            $(inputElement).addClass("is-success");
            $(inputElement).removeClass("is-danger");
            delete errorMessages[inputName];
        }

        let errorMessage = Object.values(errorMessages);

        if (errorMessage.length > 0) {
            $('#showError').removeClass('is-hidden');
            $('#showError').html(errorMessage.join(""));
            $('button').attr("disabled", "disabled");;
        }
        else {
            $('#showError').addClass('is-hidden');
            $('button').removeAttr("disabled");
        }
    }

    $(function(){
        $("#radio").append($("<div class='divField is-hidden' id='dropdown'><div class='control'><div class='select'><select id='select'></select></div></div></div>"));
        $('input[type="radio"]').click(function(){
            $("#dropdown").removeClass('is-hidden');

            if ($("input[type=radio]:checked").val() == "man") {
                $("#select").empty();
                var gender = objectGeslacht.man.options;
            }
            else if ($("input[type=radio]:checked").val() == "vrouw") {
                $("#select").empty();
                var gender = objectGeslacht.vrouw.options;
            }
            else {
                $("#select").empty();
                var gender = objectGeslacht.onzijdig.options;
            }

            for (i = 0; i < gender.length; i++) {
                $("#select").append("<option name='geslacht' value='" + gender[i] + "'> " + gender[i] + "</option>");
            }

        });
    });

    var divButton = $("<hr><div class='divField'><div class='control'><button onClick='showAlert()' id='button' class='button is-link is-outlined' disabled='disabled''>Submit</button></div></div>");
    $("#form").append(divButton);
});

function showAlert() {
    alert("Formulier verstuurd");
}