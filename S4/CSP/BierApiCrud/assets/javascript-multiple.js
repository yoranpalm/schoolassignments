var basicFields = [
    {title: 'ID', field: 'id'},
    {title: 'Naam', field: 'naam'}
  ]
  
  var personeelFields = [
    {title: 'ID', field: 'id'},
    {title: 'Achternaam', field: 'ACHTERNAAM'}
  ]
  
  function showTable(data, fieldset) {
    var tbl = $("<table>");
    var tr = $("<tr>");
  
    $(fieldset).each(function ( key, field) {
        $(tr).append( $("<td>").html(field.title) );
    });
    tbl.append(tr);
    
    $(data).each(function( key, row ) {
        tr = $("<tr>");
        $(fieldset).each(function (key, val) {
            $(tr).append($("<td>").html(row[val.field]));
        });
        tbl.append(tr);
    });
  
    return tbl;
  }
  
  function loadApi(api) {
    $.getJSON( "http://15euros.nl/csp2/modules/api_" + api + ".php", function(data) {
  
      $("#table").append(showTable(data, api+'Fields'));
    });
  }
  
  function drawTable(data) {
    for (var i = 0; i < data.length; i++){
        drawRow(data[i]);
    }
  }
  
  function getDetails(id) {
    console.log(id);
  }
  
  function drawRow(beerData) {
    var row = $("<tr/>").addClass('trShow');
    $("#table").append(row);
    row.append($("<td>" + beerData.id + "</td>"));
    row.append($("<td>" + beerData.naam + "</td>"));
    row.append($("<td>" + beerData.brouwer + "</td>"));
    row.append($("<td>" + beerData.type + "</td>"));
    row.append($("<td>" + (beerData.perc * 100).toFixed(1)  + "%</td>"));
    row.append($("<td>&euro;" + beerData.inkoop_prijs + "</td>"));
  }
  
  $(document).on("click", ".trShow", function dialogShow() {
    var biertje = $(this).data();
     document.getElementById("overlay").style.display = "block";
     document.getElementById("my_dialog").style.top = "150px";
     $("#hdDialogp").html("<b>Biertje:</b> " + biertje.naam + "<br><b>Brouwer:</b> " + biertje.brouwer
         + "<br><b>Type:</b> " + biertje.type + "<br><b>Gisting:</b> " + biertje.gisting + "<br><b>Percentage:</b> " + (biertje.perc*100).toFixed(2) + "%" + "<br><b>Inkoopprijs:</b> &euro;" + biertje.inkoop_prijs);
  });
  
  $( document ).ready(function() {
    // var api_url = 'https://api.ypwebdev.nl/bier'
    // $( "#form" ).each(function( index, element ) {
    //   $.ajax({
    //       url: api_url,
    //       contentType: "application/json",
    //       dataType: 'json',
    //       success: function(result){
    //         $("#form").append(drawTable(result));
    //       }
    //   })
    // });
  
    window.onload=function() {
      onload(drawTable(data));
    };
    
    // function loadBeerApi() {
    //   $.getJSON( "https://api.ypwebdev.nl/bier", function(data) {
    //       $("#table").append(drawTable(data));
    //   });
    // }
  
    // function loadEmployeeApi() {
    //   $.getJSON( "http://15euros.nl/csp2/modules/api_personeel.php", function(data) {
    //     $("#table").append(drawTable(data));
    //   });
    // }
  });
  
  