$(document).ready(function () {
    importCsv()
    let nodedataDic = [];
    $('#calculate').submit(function (e) {
        let canal = $("#canal").val()
        let region = $("#region").val()
        e.preventDefault()
        gatData(canal, region)
    });
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

        $("#g_PA").html(frezz.max);
        $("#g_PM").html(frezz.med);
        $("#g_PB").html(frezz.min);
        $("#g_PP").html(frezz.pro);

        $("#g_PA1").html(delicassen.max);
        $("#g_PM1").html(delicassen.med);
        $("#g_PB1").html(delicassen.min);
        $("#g_PP1").html(delicassen.pro);

        $("#g_PA2").html(grocery.max);
        $("#g_PM2").html(grocery.med);
        $("#g_PB2").html(grocery.min);
        $("#g_PP2").html(grocery.pro);

        $("#g_PA3").html(detergen.max);
        $("#g_PM3").html(detergen.med);
        $("#g_PB3").html(detergen.min);
        $("#g_PP3").html(detergen.pro);

        $("#g_PA4").html(milk.max);
        $("#g_PM4").html(milk.med);
        $("#g_PB4").html(milk.min);
        $("#g_PP4").html(milk.pro);

        $("#g_PA5").html(fresh.max);
        $("#g_PM5").html(fresh.med);
        $("#g_PB5").html(fresh.min);
        $("#g_PP5").html(fresh.pro);
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
        return avg.toFixed(4);
    }
    function pro(data1, data2, data3) {
        let result = data1 + data2 + data3;
        return (result / 3).toFixed(4);
    }


    function importCsv() {
        $.ajax({
            type: "GET",
            url: "output.csv",
            dataType: "text",
            success: function (response) {
                dataArray = $.csv.toArrays(response);
                nodes = $.csv.toObjects(response);
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
});