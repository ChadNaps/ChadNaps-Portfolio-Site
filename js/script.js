// Scrollspy Helper
var offset = 59;

$('.navbar li a').click(function(event) {
    event.preventDefault();

    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});

// Section 3 Layout Responsiveness
toggleSkills();
$(window).resize(toggleSkills);

// Form Submission
$("form").submit(function(event){
    event.preventDefault();
    if ($("#formAlert").val() != null) {
        $("#formAlert").empty();
    }

    if ($("#submitButton").text() == "Submit") {
        $("#submitButton").text("Sending...");
    }

    $.ajax({
        type: 'POST',
        url: "../php/main.php",
        data: {"inputEmail": $("input[name='inputEmail']").val(), 
               "inputName": $("input[name='inputName']").val(),
               "inputMessage": $("textarea[name='inputMessage']").val()
              }
    }).done(function(data) { // On Success
        $("#formAlert").append(data);

        if ($("#formAlert").hasClass("alert-danger")) {
            $("#formAlert").removeClass("alert-danger")
        }

        $("#formAlert").addClass("alert-success");

        completeAjax();

        $("input[name='inputEmail']").val("");
        $("input[name='inputName']").val("");
        $("textarea[name='inputMessage']").val("");
    }).fail(function(data) { // On Fail
        $("#formAlert").append("A problem occurred. Please resolve the following and try again:<br>");

        for (var inc = 0; inc < data.responseJSON.length; inc++) {
            if(inc != data.responseJSON.length - 1) {
                $("#formAlert").append("- " + data.responseJSON[inc] + "<br>");
            } else {
                $("#formAlert").append("- " + data.responseJSON[inc]);                
            }
            
        }
        
        if ($("#formAlert").hasClass("alert-success")) {
            $("#formAlert").removeClass("alert-success")
        }
        $("#formAlert").addClass("alert-danger");

        completeAjax();
    });
});

// Footer
$("footer").append( "<p>&copy; " + (new Date).getFullYear() + " Chad Napper. All rights reserved.</p>");


// Functions

function toggleSkills() {
    var widthBreakPoint = 484;
    if ($(window).innerWidth() <= widthBreakPoint && $("#tabs-col").hasClass("col-4")) {
        $("#tabs-col").toggleClass("col-4");
        $("#tabs-col").toggleClass("col-6");
        $("#content-col").toggleClass("col-8");
        $("#content-col").toggleClass("col-6");
    } else if ($(window).innerWidth() > widthBreakPoint && $("#tabs-col").hasClass("col-6")) {
        $("#tabs-col").toggleClass("col-6");
        $("#tabs-col").toggleClass("col-4");
        $("#content-col").toggleClass("col-6");
        $("#content-col").toggleClass("col-8");
    }
}

function completeAjax() {
    if ($("#submitButton").text() == "Sending...") {
        $("#submitButton").text("Submit");
    }

    $("#formAlert")[0].scrollIntoView();
    scrollBy(0, -offset);
}