const regexObject = {
    quarter: new RegExp("(?:\\S+\\s+){1,3}(?:mah|mh|m|mahalles(I|İ))[.\\s]\\s*", "gi"),
    village: new RegExp("(?:((?:\\S+\\s+){1,3}(?:köyü|köy))[.\\s]\\s*)", "gi"),
    mainStreet: new RegExp("(?<=(?:mah\\.*|mahalle|mh.|mahalles(I|İ))[\\s.]\\s*)((?:\\S+\\s+){1,3}(?:cd|cad|cadde|caddes(I|İ)|yolu))[.\\s]\\s", "gi"),
    street: new RegExp("(?<=(?:mah\\.*|mahalle|mh.|mahalles(I|İ)|cd|cad|cadde|caddes(I|İ))[\\s.]\\s*)((?:\\S+\\s+){1,3}(?:sokak|sok|sk))[.\\s]\\s", "gi"),
    apartment: new RegExp("(?<=sok\\.*\\s|cad\\.*\\s|(?<=no:[\\/\\d\\w].{3,}\\s*))(?:((?:\\S+\\s+){1,3}(apt|apartman[Ii]))[.\\s]\\s*)", "gi"),
    addressNo: new RegExp("(?:(?:no\\s*:\\s*)?(\\d\\w*(?:\\s*\\/\\s*\\w{1,3})?)\\s+(?:d\\s*:\\s*(\\d+)\\s+)?)", "gi"),
    cityDistrict: new RegExp("([^/\\s]+?)\\s*/\\s*([^/\\s]+){5,}", "gi"),
    site: new RegExp("(?<=sok\\.*\\s|cad\\.*\\s|cd.|mah\\.*\\s)(?:((?:\\S+\\s+){1,3}(s(I|İ)te|s(I|İ)tes(I|İ)))[.\\s]\\s*)", "gi")
}

var dataTableTr = {
    "sDecimal":        ",",
    "sEmptyTable":     "Tabloda herhangi bir veri mevcut değil",
    "sInfo":           "_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor",
    "sInfoEmpty":      "Kayıt yok",
    "sInfoFiltered":   "(_MAX_ kayıt içerisinden bulunan)",
    "sInfoPostFix":    "",
    "sInfoThousands":  ".",
    "sLengthMenu":     "Sayfada _MENU_ kayıt göster",
    "sLoadingRecords": "Yükleniyor...",
    "sProcessing":     "İşleniyor...",
    "sSearch":         "Ara:",
    "sZeroRecords":    "Eşleşen kayıt bulunamadı",
    "oPaginate": {
        "sFirst":    "İlk",
        "sLast":     "Son",
        "sNext":     "Sonraki",
        "sPrevious": "Önceki"
    },
    "oAria": {
        "sSortAscending":  ": artan sütun sıralamasını aktifleştir",
        "sSortDescending": ": azalan sütun sıralamasını aktifleştir"
    },
    "select": {
        "rows": {
            "_": "%d kayıt seçildi",
            "0": "",
            "1": "1 kayıt seçildi"
        }
    }
}

$.get('Adres.txt',
    { '_': $.now() } // Prevents caching
).done(function(data) {
    // Here's the Addresses
    data = data.split(/\r?\n/);
    console.log(data.length)
    console.log("mahalle")
    regexMatchCount(data, regexObject.quarter);
    console.log("köy")
    regexMatchCount(data, regexObject.village);
    console.log("cadde")
    regexMatchCount(data, regexObject.mainStreet);
    console.log("sokak")
    regexMatchCount(data, regexObject.street);
    console.log("apartman")
    regexMatchCount(data, regexObject.apartment);
    console.log("no")
    regexMatchCount(data, regexObject.addressNo);
    console.log("şehir ilçe")
    regexMatchCount(data, regexObject.cityDistrict);
    console.log("site")
    regexMatchCount(data, regexObject.site);

    var dataTableList = [];
    data.forEach(element => {
        var addressObject = {
            quarter: element.match(regexObject.quarter) != null ? element.match(regexObject.quarter)[0] : null,
            village: element.match(regexObject.village) != null ? element.match(regexObject.village)[0] : null,
            mainStreet: element.match(regexObject.mainStreet) != null ? element.match(regexObject.mainStreet)[0] : null,
            street: element.match(regexObject.street) != null ? element.match(regexObject.street)[0] : null,
            apartment: element.match(regexObject.apartment) != null ? element.match(regexObject.apartment)[0] : null,
            addressNo: element.match(regexObject.addressNo) != null ? element.match(regexObject.addressNo)[0] : null,
            cityDistrict: element.match(regexObject.cityDistrict) != null ? element.match(regexObject.cityDistrict)[0] : null,
            site: element.match(regexObject.site) != null ? element.match(regexObject.site)[0] : null
        }
        dataTableList.push(addressObject);
    });

    console.log(dataTableList);

    $("#adress-table").dataTable({
        "aaData": dataTableList,
        "iDisplayLength": 25,
        "aaSorting": [[1, 'desc']],
        "aoColumns": [
            { "mData": "quarter", "sTitle":"Mahalle" },
            { "mData": "village",  "sTitle":"Köy"},
            { "mData": "mainStreet", "sTitle":"Cadde" },
            { "mData": "street", "sTitle":"Sokak" },
            { "mData": "apartment", "sTitle":"Apartman" },
            { "mData": "site", "sTitle":"Site" },
            { "mData": "addressNo", "sTitle":"No" },
            { "mData": "cityDistrict", "sTitle":"Şehir/İlçe" }    
        ],
        "language": dataTableTr,
        "oLanguage": {
            "sProcessing": "Fetching Data, Please wait..."
        },
    })
    
}).fail(function(jqXHR, textStatus) {
    // Handle errors here
    alert("Adres.txt file could not be read");
});

function regexMatchCount(data, regObj){
    var result = data.filter(element => {
        return element.match(regObj) !== null
    });
    console.log(result.length)
    return result.length;
}