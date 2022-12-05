var mqtt = require('mqtt')

var Wemo = require('wemo-client');

//var clientMqtt  = mqtt.connect('mqtt://test.mosquitto.org')


var wemo = new Wemo();



wemo.discover(function(err, deviceInfo) {
  //console.log('Wemo Device Found: %j', deviceInfo);

  // Get the client for the found device
  var client = wemo.client(deviceInfo);

  // You definitely want to listen to error events (e.g. device went offline),
  // Node will throw them as an exception if they are left unhandled  
  client.on('error', function(err) {
    console.log('Error: %s', err.code);
  });

  // Handle BinaryState events
  client.on('binaryState', function(value) {
    //console.log('Binary State changed to: %s', value);
  });


  var clientMqtt  = mqtt.connect('mqtt://mqtt.eclipseprojects.io')
  clientMqtt.on('connect', function () {
    clientMqtt.subscribe('ace/switch', function (err) {
      if (!err) {
        clientMqtt.publish('ace/switch', 'Hello mqtt')
      }
    })
  })
  
  clientMqtt.on('message', function (topic, message) {
    // message is Buffer
    
    if(message == "1"){
      client.setBinaryState(1);
    }
    else{
      client.setBinaryState(0);
    }
    
    console.log(message.toString())
    //clientMqtt.end()
  })


  // Turn the switch on
  
  //client.setBinaryState(1);
});



