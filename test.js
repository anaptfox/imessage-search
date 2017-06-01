var array = [{
    test: "value",
    foo: "bar"
}, {
    test: "value",
    foo: "bat"
}];

var newArray = array.map(function(entry) {
    return entry.foo;
})

console.log(newArray);
//  [bar, bat]