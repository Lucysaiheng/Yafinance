// /**
//  * Created by SAIHENG on 4/30/18.
//  */
// function initMap() {
//
//     $.ajax({
//         dataType: "json",
//         url: "/api",
//         success: loadData
//     });
//
//     var location = {lat: 35.7990, lng: -78.7383}
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 8,
//         center: location
//     });
//     var marker = new google.maps.Marker({
//       position: location,
//       map: map
//     });
//
//
//
//     function loadData(locData) {
//         console.log(LocData);
//         var locData=[]
//         locData = locData.company
//         for (i = 0; i < locData.length; i++) {
//
//             //var name = locData.length[i]["name"];
//             //var id = locData.length[i]["cid"];
//             var marker = new google.maps.Marker({
//                 position: {
//                     latitude: parseFloat(finalData[i]["latitude"]),
//                     longtitude: parseFloat(finalData[i]["longtitude"])
//                 },
//                 map: map,
//
//
//                 //content:'<div id="content" style="font-size: 20px;"><a href="c.get_absolute_url' + id + '"><h2>'+name</div>',
//
//             });
//
//                  //this tells the code to create an info marker when you click on the markers
//          google.maps.event.addListener(marker, 'click', (function(marker, i) {
//            return function() {
//              infowindow.setContent(content[i]);
//              infowindow.open(map, marker);
//            }
//          })(marker, i));
//         }
//     }
//
// }