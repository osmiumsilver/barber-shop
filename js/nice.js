function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}


function getAllCSSClasses(cssdata) {
  var re = /\.(.+)\{/g;
  var m;
  let classes = [];
  do {
    m = re.exec(cssdata);
    if (m) {
      for(let key in m) {
        if(
           (typeof m[key] == "string") && 
           (classes.indexOf(m[key]) == -1) &&
           (m[key].indexOf(".") == -1)
          )
          classes.push(m[key].replace(/\s/g, " "));
      }
    }
  } while (m);
  return classes;
}

function getAllClasses() {
  var csses = document.querySelectorAll('link[rel="stylesheet"]'); 
   var classes = []
  for (i = 0; i < csses.length; ++i) {
    let styledata = httpGet(csses[i].href);
    // var styledata = ".hi{ display: none; }";
    var cclasses = getAllCSSClasses(styledata);
    var classes = Object.assign([], classes, cclasses);
    classes.concat(cclasses);
  }
  return classes;
}

function getHTMLUsedClasses() {
  var elements = document.getElementsByTagName('*');
  var unique = function (list, x) {
    if (x != "" && list.indexOf(x) === -1) {
        list.push(x);
    }
    return list;
  };
  var trim = function (x) { return x.trim(); };
  var htmlclasses = [].reduce.call(elements, function (acc, e) {
    return e.className.split(' ').map(trim).reduce(unique, acc);
  }, []);
  return htmlclasses;
}


function getUndefinedClasses(cssclasses, htmlclasses) {
  var undefinedclasses = [];
  for (let key in htmlclasses) {
    if(cssclasses.indexOf(htmlclasses[key])  == -1 ) {
       undefinedclasses.push(htmlclasses[key]);
    }
  }
  return undefinedclasses;
}

var cssclasses = getAllClasses();
var htmlclasses = getHTMLUsedClasses();

console.log("Undefined classes : " + getUndefinedClasses(cssclasses, htmlclasses))