function showModal(id) {
  $.getJSON('https://api.ypwebdev.nl/bier/' + id, function (data) {
    modalContent(data);
    $('.modal').addClass('is-active');
  });
}

$('#modal-close').click(function () {
  $('.modal').removeClass('is-active');
});

function drawTable(data) {
  for (var i = 0; i < data.length; i++) {
    drawRow(data[i]);
  }
}

function drawRow(beerData) {
  var row = $(`<tr/>`);

  row.append($(`<td>${beerData.id}</td>`));
  row.append($(`<td>${beerData.naam}</td>`));
  row.append($(`<td>${beerData.brouwer}</td>`));
  row.append($(`<td>${beerData.type}</td>`));
  row.append($(`<td>${beerData.perc}%</td>`));
  row.append($(`<td>&euro;${beerData.inkoop_prijs}</td>`));

  row.click(() => {
    showModal(beerData.id)
  });

  $('#table').append(row);
}

$('.deleteButton').click(() => {
  const id = $('#modalContent table').attr("data-id");

  $.ajax({
    url: 'https://api.ypwebdev.nl/bier/' + id,
    type: 'DELETE',
    success: function (result) {
      $('.modal').removeClass('is-active');
      loadBeerApi();
    }
  });
})

$('.editButton').click(() => {
  this.onEdit();
})

function onEdit() {
  const id = $('#modalContent table').attr("data-id");
  const datajson = {
    "naam": $('input[name=naam]').val(),
    "brouwer": $('input[name=brouwer]').val(),
    "type": $('input[name=type]').val(),
    "gisting": $('input[name=gisting]').val(),
    "perc": parseFloat($('input[name=percentage]').val()).toFixed(2),
    "inkoop_prijs": parseFloat($('input[name=inkoop_prijs]').val()).toFixed(2)
  };
  $.ajax({
    method: "PATCH",
    url: "https://api.ypwebdev.nl/bier/" + id,
    data: datajson
  }).done(function (msg) {
    console.log(msg);
    loadBeerApi();
    $('.modal').removeClass('is-active');
  });
}

function modalContent(beerData) {
  $('#modalContent').empty();
  var modalData = $(`<table data-id='${beerData.id}'>`);

  modalData.append($(`<tr><th>Details van ${beerData.naam}</th><th></th></tr>`));
  modalData.append($(`<tr><td>ID</td><td>${beerData.id}</td>`));
  modalData.append($(`<tr><td>Naam</td><td><input class="input" type="text" name="naam" value="${beerData.naam}"></td>`));
  modalData.append($(`<tr><td>Brouwer</td><td><input class="input" type="text" name="brouwer" value="${beerData.brouwer}"></td>`));
  modalData.append($(`<tr><td>Gisting</td><td><input class="input" type="text" name="gisting" value="${beerData.gisting}"></td>`));
  modalData.append($(`<tr><td>Type</td><td><input class="input" type="text" name="type"value="${beerData.type}"></td>`));
  modalData.append($(`<tr><td>Percentage (%)</td><td><input class="input" name="percentage" type="text" value="${beerData.perc}"></td>`));
  modalData.append($(`<tr><td>Prijs (€)</td><td><input class="input" name="inkoop_prijs" type="text" value="${beerData.inkoop_prijs}"></td>`));

  $('#modalContent').append(modalData);
}

function loadBeerApi() {
  $.getJSON('https://api.ypwebdev.nl/bier', function (data) {
    $("#table").empty();
    $('#table').append(drawTable(data));
  });
}

$(document).ready(function () {
  loadBeerApi();
});

