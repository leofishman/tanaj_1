var bereshit_array, bereshit_comments_array;
$.getJSON("bereshit-sp-comments-json.js", function(bereshit_comments) {
    bereshit_comments_array = bereshit_comments;

    $.getJSON("bereshit-sp-json.js", function(bereshit) {
            bereshit_array = bereshit;
            bereshit_array.chapter.forEach(chapters);

            function chapters(chapter, chapter_number) {
                capitulo = '<div class="bereshit-chapter"><h3 class="chapter">Capitulo ' + (chapter_number + 1) + '</h3>';
                versiculos = '';
                bereshit_array.chapter[chapter_number].forEach(versicles);
                function versicles(versicle, versicle_number) {
                    console.log(chapter_number);
                    if (typeof bereshit_comments_array.chapter[chapter_number][versicle_number] !== 'undefined') {
                        comment = bereshit_comments_array.chapter[chapter_number][versicle_number].toString();
                    } else {
                        comment = '';
                    }
                    
                    prefix = '<div class="bereshit-versicle"><div class="bereshit-' + (chapter_number + 1) + '-versicle-' + (versicle_number + 1) + '">';
                    suffix = '</div>';
                  //  console.log(bereshit_comments_array.chapter[chapter_number][versicle_number], comment);
                    if (comment!=''){
                        suffix += '<div class="bereshit-comment' + (chapter_number + 1) + '-versicle-' + (versicle_number + 1) + '">'
                        suffix += comment + '</div>';
                    }
                    suffix += '</div>'
                    versiculos += prefix + (versicle_number + 1) + ":" + versicle + suffix;

                }

                document.getElementById("bereshit").innerHTML += capitulo + versiculos + '</div>';
            }

        });

});



document.addEventListener('click', function (e) {
    console.log(e.target.className);
    versicle = e.target.className.split('-');
    console.log(versicle[0],versicle[1],versicle[2],versicle[3]);
    if (versicle[0] == 'bereshit' && versicle[2] == 'versicle') {
        coordenada = [parseInt(versicle[1])-1,parseInt(versicle[3])-1];
        console.log(coordenada, bereshit_array.chapter[(versicle[1]-1)][(versicle[3]-1)],bereshit_comments_array.chapter[(versicle[2]-1)]);
    }
    if (hasClass(e.target, 'bereshit')) {
        // .bu clicked
        // Do your thing
        console.log('bereshit');
    } else if (hasClass(e.target, 'bereshit-versicle')) {
        // .test clicked
        // Do your other thing
        console.log('bereshit-versicle');
    }
}, false);

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}