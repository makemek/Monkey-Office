jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });

    $('#tab_2_selectall').click(function(event) {  //on click 
        
            $('.tab_2_check').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "tab_2_check"               
            });
       
    });

    $('#tab_2_unselect').click(function(event) {  //on click 
        
            $('.tab_2_check').each(function() { //loop through each checkbox
                this.checked = false;  //unselect all checkboxes with class "tab_2_check"               
            });
       
    });

    
    


    // var tableRef = document.getElementById('table_all').getElementsByTagName('tbody')[0];

    // // Insert a row in the table at the last row
    // var newRow   = tableRef.insertRow(tableRef.rows.length);

    // // Insert a cell in the row at index 0
    // var newCell1  = newRow.insertCell(0);
    // var newCell2  = newRow.insertCell(1);
    // var newCell3  = newRow.insertCell(2);
    // var newCell4  = newRow.insertCell(3);
    // var newCell5  = newRow.insertCell(4);
    // var newCell6  = newRow.insertCell(5);

    // newCell2.appendChild(document.createTextNode('APAPAPA'));

    // // Append a text node to the cell
    // var newText  = document.createTextNode('New row');
    // newCell.appendChild(newText);

    // alert($('#dropstatus').val());
    // $(".dropdown-menu li a").click(function(){
    //     $(this).parents(".form-group .group1").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    //     $(this).parents(".form-group .group1").find('.btn ul li a').val($(this).data('value'));
    // });

    // $(".dropdown-menu li a").click(function(){
    //     $(this).parents(".form-group .group2").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    //     $(this).parents(".form-group .group2").find('.btn').val($(this).data('value'));
    // });

    // alert($('#doc_status :selected').text());
    $('#add_row').click(function(event) {
        var doc1 = {{docs[0]}};
            var tableRef = document.getElementById('table_all').getElementsByTagName('tbody')[0];

        // Insert a row in the table at the last row
        var newRow   = tableRef.insertRow(tableRef.rows.length);

        // Insert a cell in the row at index 0
        var newCell1  = newRow.insertCell(0);
        var newCell2  = newRow.insertCell(1);
        var newCell3  = newRow.insertCell(2);
        var newCell4  = newRow.insertCell(3);
        var newCell5  = newRow.insertCell(4);
        var newCell6  = newRow.insertCell(5);

        newCell2.innerHTML = '<td> <div class="col-md-5"></div></td>';
        // newCell2.appendChild(document.createTextNode('APAPAPA'));
    });
});



    

