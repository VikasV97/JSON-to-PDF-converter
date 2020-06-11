function Export() {
    //The JSON string.
    var json = '[["Question number","Question","Answer"]]';

    //Convert JSON string to JSON object.
    var customers = eval(json);

    //Convert JSON to HTML Table.
    var table = document.createElement("TABLE");
    table.border = "1";
    
    table.Id = "tblCustomers";

    //Get the count of columns.
    var columnCount = customers[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 1; i < customers.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][j];
        }
    }

    //Append the Table to the HTML DIV.
    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);


    //Convert Table to PDF.
    html2canvas(document.getElementById('dvTable'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("JSON.pdf");

            //Remove the Table.
            dvTable.innerHTML = "";
        }
    });
}