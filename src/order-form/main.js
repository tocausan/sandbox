var app = angular.module('order', []);
app.controller('newOrdersController', function($scope) {

    // now (time object)
    var date = new Date();
    $scope.now = {
        date:		date,
        day:		date.getDate(),
        week_day:	date.getDay(),
        month:		date.getMonth(),
        year:		date.getFullYear(),
        hour:		date.getHours(),
        min:		date.getMinutes(),
        sec:		date.getSeconds(),
        time:		date.getTime()/1000,
        monthsName:	["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","December"]
    };
    parseTime	= function(day, month, year, hour, min) {
        var parsedTime =  Date.parse( day +" "+ $scope.now.monthsName[month] +" "+ year +" "+ hour +":"+ min +":00 GMT+0100")  / 1000;
        return parsedTime;
    };


    // master
    $scope.master = {
        hours:	[
            { name: "open", hour: 9, min: 0 },
            { name: "close", hour: 18, min: 30 },
        ],
        pickup:			[
            {name: "Pickup home",		value: 0},
            {name: "Delivery home",		value: 1},
            {name: "Something else",	value: 2}
        ],
        travel:			[
            {name: "One-way",	value: 0, price: 1},
            {name: "Two-way",	value: 1, price: 1.75}
        ],
        size:	[
            { name: "small", 	value: 0, price: 7 },
            { name: "medium", 	value: 1, price: 10 },
            { name: "large", 	value: 2, price: 13 },
            { name: "xxl", 	    value: 3, price: 20 }
        ],
        speed:	[
            { name: "today", 	value: 0, price: 2 },
            { name: "fast", 	value: 1, price: 7 },
            { name: "express", 	value: 2, price: 9 },
            { name: "tomorrow", value: 3, price: 0 }
        ],
        distance:	[
            { name: "small", 	value: 0, price: 7,		distance: 4.5 },
            { name: "medium", 	value: 1, price: 10,	distance: 6 },
            { name: "large", 	value: 2, price: 13,	distance: 7.5 },
            { name: "xxl", 		value: 3, price: 20,	distance: 15 },
        ],
        pickup_at:		[],
        sizeInfo:			[
            {name: "less than two kilos & shoebox size",		value: 0},
            {name: "< ...",		value: 1},
            {name: "< ...",		value: 2},
            {name: "< ...",		value: 3},
        ],
        speedInfo:			[
            {name: "today",		        value: 0},
            {name: "two hours later",	value: 1},
            {name: "30 minutes later",	value: 2},
            {name: "tomorrow",	        value: 3}
        ],
        distanceInfo:	"should be under 7,5 km"
    };

    $scope.master.openTime		= parseTime($scope.now.day, $scope.now.month, $scope.now.year, $scope.master.hours[0].hour, $scope.master.hours[0].min);
    $scope.master.closeTime		= parseTime($scope.now.day, $scope.now.month, $scope.now.year, $scope.master.hours[1].hour, $scope.master.hours[1].min);


    // order
    $scope.order = {
        pickup:		$scope.master.pickup[0].value,
        travel:		$scope.master.travel[0].value,
        size:		$scope.master.size[0].value,
        speed:		$scope.master.speed[0].value,
        pickup_at:	0,
        D_time:	    0,
        distance:	0,
        distanceValue: 0,
        price:		0
    };


    // order time
    $scope.orderTime = function() {
        var time = {
            now:		$scope.now.time + 1800,
            openTime:	$scope.master.openTime,
            closeTime:	$scope.master.closeTime,
            orderHour: "",
            hour: "",
            min: ""
        };

        if (time.now < time.openTime){ time.orderHour = time.openTime; }
        else{ time.orderHour = time.now; }

        $scope.master.pickup_at.splice(0, $scope.master.pickup_at.length);
        // while openTime < closeTime
        while(time.orderHour < time.closeTime - 3600){

            time.day = (new Date(time.orderHour*1000)).getDate();
            time.month = (new Date(time.orderHour*1000)).getMonth();
            time.year = (new Date(time.orderHour*1000)).getFullYear();
            time.hour = (new Date(time.orderHour*1000)).getHours();

            time.min = (new Date(time.orderHour*1000)).getMinutes();
            time.date = (new Date(time.orderHour*1000))
            time.cleanDate = time.day +"-"+ time.month +"-"+ time.year +"  "+ time.hour +":"+ time.min

            // push options
            $scope.master.pickup_at.push({name: time.hour +":"+ time.min, value: time.cleanDate});
            // incrementation
            time.orderHour += 1800;
        }
    }
    $scope.orderTime();



    // get distance
    $scope.getDistance = function () {
        $scope.order.distance = $("#distance").val();
    }

    /*
    * PRICE CALCULATION
    */
    $scope.priceCalculation = {
        distanceValue:   function(){},
        size:       function(){},
        speed:      function(){},
        travel:     function(){},
        total:      function(){},
    };

    // set distance value
    $scope.priceCalculation.distanceValue = function(){
        if ($scope.order.distance <= $scope.master.distance[0].distance) {
            $scope.order.distanceValue = 0;
        }
        else if ($scope.order.distance <= $scope.master.distance[1].distance) {
            $scope.order.distanceValue = 1;
        }
        else if ($scope.order.distance <= $scope.master.distance[2].distance) {
            $scope.order.distanceValue = 2;
        }
        else {
            $scope.order.distanceValue = 3;
        }
    };
    $scope.priceCalculation.distanceValue();

    // set total price
    $scope.priceCalculation.total = function(){
        $scope.priceCalculation.distanceValue();

        $scope.order.price =
            $scope.master.travel[$scope.order.travel].price *
            (
                $scope.master.size[$scope.order.size].price +
                $scope.master.speed[$scope.order.speed].price +
                $scope.master.distance[$scope.order.distanceValue].price
            )
    };
    $scope.priceCalculation.total();




    setInterval(function(){
        $scope.priceCalculation.total();
    },1000);

    // ready
    $(document).ready( function() {

        // set day
        $(".form input").mouseout( function() {
            $scope.orderTime($scope.order.speed);

        });

        // set pickup_at
        $("select[name='PU_timeSelect']").hover( function() {
            $("input[name='pickup_at']").val( $scope.order.pickup_at );
        });

        $("input, select, textarea").hover( function() {
            var PU_position = $("input[name$='PU_position']").val();
            var D_position = $("input[name$='D_position']").val();
            $scope.order.PU_position = PU_position;
            $scope.order.D_position = D_position;

            $scope.priceCalculation.total();
        })

    });



    /*
     ##   ##  #####  ######
     ### ### ##   ## ##   ##
     ## # ## ####### ######
     ##   ## ##   ## ##
     ##   ## ##   ## ##
     ##   ## ##   ## ##
     */

    /* initialize */
    $scope.initialize = function initialize() {
        /* set options */
        var mapOptions = {
            center: new google.maps.LatLng(50.8503396, 4.351710300000036),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true
        };
        var autocompleteOptions = {
            componentRestrictions: {country: "be"}
        };


        /* set datas */
        // delivery map
        var order_map 			= new google.maps.Map(document.getElementById('order_map'), mapOptions);
        var geocoder			= new google.maps.Geocoder(), PU_address_input 	= document.getElementById("PU_address");
        var PU_address_input		= document.getElementById("PU_address");
        var PU_position_input 	= document.getElementById("PU_position");
        var D_address_input		= document.getElementById("D_address");
        var D_position_input	= document.getElementById("D_position");
        var distance_input		= document.getElementById("distance");
        var price_input			= document.getElementById("price");

        PU_address_input.style.border = "1px solid tomato";
        D_address_input.style.border = "1px solid tomato";

        var PU = {
            autocomplete:	new google.maps.places.Autocomplete(PU_address_input, autocompleteOptions),
            place:			"",
            name:			"",
            vicinity:		"",
            position:		""
        };

        var D = {
            autocomplete:	new google.maps.places.Autocomplete(D_address_input, autocompleteOptions),
            place:			"",
            name:			"",
            vicinity:		"",
            position:		""
        };


        /* event listeners */
        // PU_address
        google.maps.event.addListener(PU.autocomplete, 'place_changed', function () {
            // set datas
            PU.place 		= PU.autocomplete.getPlace();
            PU.name 		= PU.place.name;
            PU.vicinity		= PU.place.vicinity;
            PU.position		= PU.place.geometry.location;

            //console datas
            //console.log("name: " + PU.name)
            //console.log("vicinity: " + PU.vicinity)
            //console.log("position: " + PU.position.toString())

            // set form info input
            console.log(PU.name.toString() +" "+ PU.vicinity.toString());
            $scope.order.PU_address = PU.name.toString() +" "+ PU.vicinity.toString();
            PU_position_input.value = PU.position.toString();
            $scope.order.PU_position = PU.position.toString();
            PU_address_input.style.border = "1px solid lightgreen";

            // add marker
            PU.marker = new google.maps.Marker({
                position: PU.position,
                title:"Hello World!",
                icon: ""
            });
            PU.marker.setMap(order_map);

            // get distance
            var distance = ((google.maps.geometry.spherical.computeDistanceBetween( PU.position, D.position ))/1000).toFixed(3);
            distance_input.value = distance;
            $scope.order.distance = distance;

            $scope.priceCalculation.total();

            // set flightplan
            var flightPlanCoordinates = [
                PU.position,
                D.position
            ];
            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: "rgba(255,50,100,.8)",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            flightPath.setMap(order_map);
        });


        // D_address
        google.maps.event.addListener(D.autocomplete, 'place_changed', function () {
            // set datas
            D.place 		= D.autocomplete.getPlace();
            D.name 			= D.place.name;
            D.vicinity		= D.place.vicinity;
            D.position		= D.place.geometry.location;

            //console datas
            //console.log("name: " + D.name)
            //console.log("vicinity: " + D.vicinity)
            //console.log("position: " + D.position.toString())

            // set form info input
            console.log(D.name.toString() +" "+ D.vicinity.toString());
            $scope.order.D_address = D.name.toString() +" "+ D.vicinity.toString();
            D_position_input.value = D.position.toString();
            $scope.order.D_position = D.position.toString();
            D_address_input.style.border = "1px solid lightgreen";

            // add marker
            D.marker = new google.maps.Marker({
                position: D.position,
                title:"Hello World!",
                icon: ""
            });
            D.marker.setMap(order_map);

            // get distance
            var distance = ((google.maps.geometry.spherical.computeDistanceBetween( PU.position, D.position ))/1000).toFixed(3);
            distance_input.value = distance;
            $scope.order.distance = distance;
            $scope.priceCalculation.total();

            // set flightplan
            var flightPlanCoordinates = [
                PU.position,
                D.position
            ];
            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: "rgba(255,50,100,.8)",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            flightPath.setMap(order_map);

        });

    }
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
});

