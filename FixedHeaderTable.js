(function($) {

    $.fn.fixHeader = function(options) {

        var settings = $.extend({
            height: '250px',
        }, options);

        return this.each(function() {

            var theTable = this;

            var cls = $(theTable).prop("class");
            var width = $(theTable).width();
            var extendedWidth = parseInt(width) + getScrollWidth();
            var color = $(theTable).parent().css("background-color");

            var html =
                "<table style='border-collapse:collapse;padding:0;margin:0;border:0;width:" + extendedWidth + "px;background-color:" + color +";'>" +
                "   <tr>" +
                "       <td style='padding:0;border:0;padding-bottom:1px;'>" +
                "           <table id='tblHeader' class='" + cls + "' style='width:" + width + "px;'>" +
                "               <thead></thead>" +      
                "           </table>" +
                "       </td>" +
                "   </tr>" +
                "   <tr>" +
                "       <td style='padding:0;border:0;'>" +
                "           <div style='width:" + extendedWidth + "px; height:" + settings.height + "; overflow-y: scroll;overflow-x:hidden;'>" +
                "               <table id='tblBody' class='" + cls + "' style='border-collapse:collapse;width:" + width + "px;'>" +
                "                   <tbody></tbody>" +
                "               </table>" +
                "           </div>" +
                "       </td>" +
                "   </tr>" +
                "</table>";

            var newElement = $(html);

            var theHeader = $(theTable).find("thead").html();
            var theBody = $(theTable).find("tbody").html();

            $(newElement).find("#tblHeader thead").append(theHeader);
            $(newElement).find("#tblBody tbody").append(theBody);

            var originalHeader = $(theTable).find("thead").find("tr:last").find("th");
            var originalBody = $(theTable).find("tbody").find("tr:first").find("td");

            for (var i = 0; i < originalHeader.length; i++) {
                
                $(newElement).find("#tblHeader").find("tr:last").find("th:eq(" + i + ")").width($(originalHeader[i]).outerWidth());
            }

            for (var j = 0; j < originalBody.length; j++) {

                $(newElement).find("#tblBody").find("td:eq(" + j + ")").width($(originalBody[j]).outerWidth());
            }

            $(theTable).parent().prepend($(newElement));
            $(theTable).remove();
        });
    };

    var getScrollWidth = function() {

        var testDiv = document.createElement("div");
        testDiv.style.width = "100px";
        testDiv.style.height = "100px";
        testDiv.style.overflow = "scroll";
        testDiv.style.position = "absolute";
        testDiv.style.top = "-9999px";

        document.body.appendChild(testDiv);
        var scrollbarWidth = testDiv.offsetWidth - testDiv.clientWidth;
        document.body.removeChild(testDiv);

        return scrollbarWidth;
    };

})(jQuery);
