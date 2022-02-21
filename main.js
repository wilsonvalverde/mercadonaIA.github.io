let nodedataDic = [];
const ML = require('ml');
$(document).ready(function () {
    importCsv()
    $('#calculate').submit(function (e) {
        e.preventDefault()
        let canal = $("#canal").val()
        let region = $("#region").val()


        gatData(canal, region)
        $('html, body').animate({
            scrollTop: $("#resultados").offset().top
        }, 1000)
    });
});

function regresionLineal() {

    // Define features
    var x = new Array(100);
    var y = new Array(100);
    for (var i = 0; i < 100; ++i) {
        x[i] = (i - 50) / 50;
        y[i] = 2 * x[i] + 3 + 0.25 * (Math.random() - 0.5);
    }
    // Create a model
    const regression = new ML.SimpleLinearRegression(x, y);
    // Get results
    console.log(regression.predict(0));
    console.log(regression.computeX(0));
    console.log(regression);
}

function gatData(canal, region) {
    let nDataDic = [];
    nodedataDic.map(element => {
        if (element.Channel == canal && element.Region == region) {
            nDataDic.push(element);
        }
    });
    getAltFrocen_C(nDataDic)
}


function get_GPA(frezz, delicassen, grocery, milk, fresh, detergen) {

    $("#g_PA").html(frezz.max > 0 ? frezz.max + '$' : 'NC');
    $("#g_PM").html(frezz.med > 0 ? frezz.med + '$' : 'NC');
    $("#g_PB").html(frezz.min > 0 ? frezz.min + '$' : 'NC');
    $("#g_PP").html(frezz.pro > 0 ? frezz.pro + '$' : 'NC');

    $("#g_PA1").html(delicassen.max > 0 ? delicassen.max + '$' : 'NC');
    $("#g_PM1").html(delicassen.med > 0 ? delicassen.med + '$' : 'NC');
    $("#g_PB1").html(delicassen.min > 0 ? delicassen.min + '$' : 'NC');
    $("#g_PP1").html(delicassen.pro > 0 ? delicassen.pro + '$' : 'NC');

    $("#g_PA2").html(grocery.max > 0 ? grocery.max + '$' : 'NC');
    $("#g_PM2").html(grocery.med > 0 ? grocery.med + '$' : 'NC');
    $("#g_PB2").html(grocery.min > 0 ? grocery.min + '$' : 'NC');
    $("#g_PP2").html(grocery.pro > 0 ? grocery.pro + '$' : 'NC');

    $("#g_PA3").html(detergen.max > 0 ? detergen.max + '$' : 'NC');
    $("#g_PM3").html(detergen.med > 0 ? detergen.med + '$' : 'NC');
    $("#g_PB3").html(detergen.min > 0 ? detergen.min + '$' : 'NC');
    $("#g_PP3").html(detergen.pro > 0 ? detergen.pro + '$' : 'NC');

    $("#g_PA4").html(milk.max > 0 ? milk.max + '$' : 'NC');
    $("#g_PM4").html(milk.med > 0 ? milk.med + '$' : 'NC');
    $("#g_PB4").html(milk.min > 0 ? milk.min + '$' : 'NC');
    $("#g_PP4").html(milk.pro > 0 ? milk.pro + '$' : 'NC');

    $("#g_PA5").html(fresh.max > 0 ? fresh.max + '$' : 'NC');
    $("#g_PM5").html(fresh.med > 0 ? fresh.med + '$' : 'NC');
    $("#g_PB5").html(fresh.min > 0 ? fresh.min + '$' : 'NC');
    $("#g_PP5").html(fresh.pro > 0 ? fresh.pro + '$' : 'NC');

    let ordenName = {
        'Productos Frescos': fresh.pro,
        'Lácteos': milk.pro,
        'Artículos de limpieza': detergen.pro,
        'Víveres': grocery.pro,
        'Embutidos': delicassen.pro,
        'Congelados': frezz.pro
    }
    let orden = [fresh.pro, milk.pro, detergen.pro, grocery.pro, delicassen.pro, frezz.pro];
    orden.sort((a, b) => a - b);
    orden.reverse();
    console.log(orden)
    for (const key in ordenName) {
        if (Object.hasOwnProperty.call(ordenName, key)) {
            const element = ordenName[key];

            for (let index = 0; index < orden.length; index++) {
                const contenido = orden[index];
                if (contenido == element) {
                    $("#r_" + index).html(key);
                    $("#rm_" + index).attr("src", "images/" + key + '.jpeg');
                    key == 'Artículos de limpieza' && $("#rm_" + index).attr("src", "images/limpieza.jpeg");
                    key == 'Productos Frescos' && $("#rm_" + index).attr("src", "images/Productos_Frescos.jpeg");
                    key == 'Víveres' && $("#rm_" + index).attr("src", "images/Viveres.jpeg");
                    key == 'Lácteos' && $("#rm_" + index).attr("src", "images/Lacteos.jpeg");


                }
            }
        }
    }


}
function getAltFrocen_C(data) {
    let getPayMax = [];
    let getPayMed = [];
    let getPayMin = [];

    let getPayMax1 = [];
    let getPayMed1 = [];
    let getPayMin1 = [];

    let getPayMax2 = [];
    let getPayMed2 = [];
    let getPayMin2 = [];

    let getPayMax3 = [];
    let getPayMed3 = [];
    let getPayMin3 = [];

    let getPayMax4 = [];
    let getPayMed4 = [];
    let getPayMin4 = [];

    let getPayMax5 = [];
    let getPayMed5 = [];
    let getPayMin5 = [];
    data.map(element => {

        element.Frozen_C == 'Alto' && getPayMax.push(parseInt(element.Frozen));
        element.Frozen_C == 'Medio' && getPayMed.push(parseInt(element.Frozen));
        element.Frozen_C == 'Bajo' && getPayMin.push(parseInt(element.Frozen));

        element.Grocery_C == 'Alto' && getPayMax1.push(parseInt(element.Grocery));
        element.Grocery_C == 'Medio' && getPayMed1.push(parseInt(element.Grocery));
        element.Grocery_C == 'Bajo' && getPayMin1.push(parseInt(element.Grocery));

        element.Delicassen_C == 'Alto' && getPayMax2.push(parseInt(element.Delicassen));
        element.Delicassen_C == 'Medio' && getPayMed2.push(parseInt(element.Delicassen));
        element.Delicassen_C == 'Bajo' && getPayMin2.push(parseInt(element.Delicassen));

        element.Milk_C == 'Alto' && getPayMax3.push(parseInt(element.Milk));
        element.Milk_C == 'Medio' && getPayMed3.push(parseInt(element.Milk));
        element.Milk_C == 'Bajo' && getPayMin3.push(parseInt(element.Milk));

        element.Fresh_C == 'Alto' && getPayMax4.push(parseInt(element.Fresh));
        element.Fresh_C == 'Medio' && getPayMed4.push(parseInt(element.Fresh));
        element.Fresh_C == 'Bajo' && getPayMin4.push(parseInt(element.Fresh));

        element.Detergents_Paper_C == 'Alto' && getPayMax5.push(parseInt(element.Detergents_Paper));
        element.Detergents_Paper_C == 'Medio' && getPayMed5.push(parseInt(element.Detergents_Paper));
        element.Detergents_Paper_C == 'Bajo' && getPayMin5.push(parseInt(element.Detergents_Paper));

    });
    let dataAlt = { 'max': getResult(getPayMax), 'med': getResult(getPayMed), 'min': getResult(getPayMin), 'pro': pro(getResult(getPayMax), getResult(getPayMed), getResult(getPayMin)) };
    let dataAlt1 = { 'max': getResult(getPayMax1), 'med': getResult(getPayMed1), 'min': getResult(getPayMin1), 'pro': pro(getResult(getPayMax1), getResult(getPayMed1), getResult(getPayMin1)) };
    let dataAlt2 = { 'max': getResult(getPayMax2), 'med': getResult(getPayMed2), 'min': getResult(getPayMin2), 'pro': pro(getResult(getPayMax2), getResult(getPayMed2), getResult(getPayMin2)) };

    let dataAlt3 = { 'max': getResult(getPayMax3), 'med': getResult(getPayMed3), 'min': getResult(getPayMin3), 'pro': pro(getResult(getPayMax3), getResult(getPayMed3), getResult(getPayMin3)) };
    let dataAlt4 = { 'max': getResult(getPayMax4), 'med': getResult(getPayMed4), 'min': getResult(getPayMin4), 'pro': pro(getResult(getPayMax4), getResult(getPayMed4), getResult(getPayMin4)) };
    let dataAlt5 = { 'max': getResult(getPayMax5), 'med': getResult(getPayMed5), 'min': getResult(getPayMin5), 'pro': pro(getResult(getPayMax5), getResult(getPayMed5), getResult(getPayMin5)) };


    get_GPA(dataAlt, dataAlt1, dataAlt2, dataAlt3, dataAlt4, dataAlt5)
}

function getResult(data) {
    let sum;
    let avg
    if (data.length > 0) {
        sum = data.reduce((previous, current) => current += previous);
        avg = sum / data.length;
    } else {
        avg = 0;
    }
    return avg.toFixed(2);
}
function pro(data1, data2, data3) {
    let result = (parseFloat(data1 > 0 ? data1 : 0)) + (parseFloat(data2 > 0 ? data2 : 0)) + (parseFloat(data3 > 0 ? data3 : 0));
    let cont = (data1 > 0 && 1) + (data2 > 0 && 1) + (data3 > 0 && 1);
    console.log(cont)
    return (result / cont).toFixed(2);
}


function importCsv() {
    $.ajax({
        type: "GET",
        url: "output.csv",
        dataType: "text",
        success: function (response) {
            let nodes = $.csv.toObjects(response);
            nodesToJson(nodes);
        }
    });

}
function nodesToJson(nodes) {
    nodedataDic = [];
    for (var i = 0; i < nodes.length; i++) {
        nodedataDic.push(nodes[i])
    }
}