function sinDataFunctionTest(min, max, bin, context, callback){ 
    $.ajax({
        url: "json-test.php?min=" + min + "&max=" + max + "&bin=" + bin,
        dataType: "json",
        success: function(series) {
            var data = series.response;
                        
            var dataset = {
                sets: {
                    data1: {
                        label: "Test data 1",
                        data: data
                    }
                },
                bounds: {
                    min: data[0][0],
                    max: data[data.length - 1][0]
                }
            };
            
            callback.call(context, dataset);
        }
    });
}

