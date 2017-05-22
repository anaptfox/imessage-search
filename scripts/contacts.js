var Application = require('jxa').Application;
const osa = require('osa2')
var contacts = Application('Address Book');

var people = contacts.people;

console.log(people.length)
    //console.log(people.list())
console.log(people[0].name())

for (person in contacts.people) {
    console.log(person.name())
}

const Messages = Application('Messages')
console.log(Messages.buddies.whose({ handle: '+16152687524' })[0].name())
osa(name => {
    const Messages = Application('Messages')
    return Messages.buddies.whose({ handle: '+16152687524' })[0].name()
})("JIGGABOO").then(function(err, name) {
    console.log(err)
        //console.log(name)
})

//console.log()
// Messages.buddies().forEach(function(element) {
//     console.log(element)
// }, this);
//console.log(people);
// Pay No Mind (feat. Passion Pit) by Madeon