
function save(data){
jsonfile.writeFile('sample.json', data, {
    encoding: 'utf-8', 
    replacer: null, 
    spaces: 2
}, function (err) {
});
}

function addData(ID,NAME,PASS){
  var add = {
  			 id : ID,
  			 name : NAME ,
  			 pass : PASS 
  			}

  data.push(add);
}

function removeData(ID){
var newData = data.filter(function(item, index){
  if (item.id != ID) return true;
});
data = newData;
}
