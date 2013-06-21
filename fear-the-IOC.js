/*
 * $ Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-$-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */

$.extend({
    highlight: function (node, re, nodeName, className) {
        if (node.nodeType === 3) {
            var match = node.data.match(re);
            if (match) {
                var highlight = document.createElement(nodeName || 'span');
                highlight.className = className || 'highlight';
                var wordNode = node.splitText(match.index);
                wordNode.splitText(match[0].length);
                var wordClone = wordNode.cloneNode(true);
                highlight.appendChild(wordClone);
                wordNode.parentNode.replaceChild(highlight, wordNode);
                return 1; //skip added node in parent
            }
        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                i += $.highlight(node.childNodes[i], re, nodeName, className);
            }
        }
        return 0;
    }
});

$.fn.unhighlight = function (options) {
    var settings = { className: 'highlight', element: 'span' };
    $.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function () {
        var parent = this.parentNode;
        parent.replaceChild(this.firstChild, this);
        parent.normalize();
    }).end();
};

$.fn.highlight = function (words, options) {
    var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
    $.extend(settings, options);
    
    if (words.constructor === String) {
        words = [words];
    }
    words = $.grep(words, function(word, i){
      return word !== '';
    });
    words = $.map(words, function(word, i) {
      return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length === 0) { return this; };

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
        pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);
    
    return this.each(function () {
        $.highlight(this, re, settings.element, settings.className);
    });
};

//Fear the IOC by Mark Durrant & pebble {code}

$(document).ready(function () {
  
  var wordList = [
    "Olympic",
    "Olympics",
    "Olympian",
    "Olympiad",
    "Paralympic",
    "Paralympics",
    "Paralympian", 
    "Paralympiad",
    "ioc",
    "ipc",
    "Olympics",
    "Paralympics",
    "games",
    "london",
    "2012",
    "medal",
    "gold",
    "silver",
    "bronze",
    "team GB",
    "get set",
    "games maker",
    "javelin",
    "Coca-Cola", 
    "McDonalds",
    "GE",
    "Dow",
    "Panasonic",
    "Acer",
    "Atos",
    "Omega",
    "Visa",
    "P&G",
    "Samsung",
    "Adidas",
    "BMW",
    "BP",
    "British Airways",
    "BT",
    "EDF",
    "Lloyds TSB",
    "Adecco",
    "ArcelorMittal",
    "Cadbury",
    "Cisco",
    "Deloitte",
    "Thomas Cook",
    "UPS",
    "Aggreko",
    "Airwave",
    "Atkins",
    "The Boston Consulting Group",
    "CBS Outdoor",
    "Crystal CG",
    "Eurostar",
    "Freshfields Bruckhaus Deringer LLP",
    "G4S",
    "GlaxoSmith-Kline",
    "Gymnova",
    "Heineken",
    "Holiday Inn",
    "John Lewis",
    "McCann Worldgroup",
    "Mondo",
    "Nature Valley Granola Bars",
    "Next",
    "The Nielsen Company",
    "Populous",
    "Rapiscan Systems",
    "Rio Tinto",
    "Technogym",
    "Thames Water",
    "Ticketmaster",
    "Trebor",
    "kathmandu bazar plaza",
    "banjara group",
    "Archery",
    "Badminton",
    "Basketball",
    "Beach Volleyball",
    "Boxing",
    "Cycling - Road",
    "Equestrian",
    "Fencing",
    "Football",
    "Gymnastics",
    "Handball",
    "Judo",
    "Rowing",
    "Shooting",
    "Swimming",
    "Table Tennis",
    "Tennis",
    "Volleyball",
    "Weightlifting",
    "LeBron James",
    "Michael Phelps",
    "Liu Xiang",
    "Yao Ming",
    "Allyson Felix",
    "Shawn Johnson",
    "Roman Sebrle",
    "Guo Jingjing",
    "Tyson Gay",
    "Asafa Powell",
    "Usain Bolt",
    "Yang Wei",
    "Jeremy Wariner",
    "Heather O'Reilly",
    "Pascal Hens",
    "Stephanie Rice",
    "Chris Paul",
    "Paul Hamm",
    "Zou Shiming",
    "Sheila Taormina",
    "Sara Khoshjamal",
    "Marta Vieira da Silva",
    "Nastia Liukin",
    "Alicia Sacramone",
    "Chellsie Memmel",
    "Laure Manaudou",
    "Federica Pellegrini",
    "Alain Bernard",
    "Laura Flessel-Colovic",
    "Paula Radcliffe",
    "Nader al Masri",
    "Kobe Bryant",
    "Vanessa Ferrari",
    "Freddy Adu",
    "Andrew Howe",
    "Martin Lel",
    "Catherine Ndereba",
    "Marianne Vos",
    "Adam Korol",
    "Aaron Peirsol",
    "Mark Lopez",
    "Diana Lopez", 
    "Steven Lopez",
    "Mark Warkentin",
    "Bryan Volpenhein",
    "Guo Yue",
    "Taufik Hidayat",
    "Lin Dan",
    "Tibor Benedek",
    "Kohei Uchimura",
    "Wang Liqin",
    "Billy Joe Saunders",
    "J.R. Holden",
    "Rajyavardhan Singh Rathore",
    "Amnat Ruenroeng",
    "Ryan Lochte",
    "Nagmeldin Ali Abubakr",
    "Dayron Robles",
    "Kerri Walsh",
    "Misty May-Treanor",
    "Libby Trickett",
    "Tom Daley",
    "Oxana Chusovitina",
    "Otylia Jedrzejczak",
    "Natalie Coughlin",
    "Katie Hoff",
    "Jenn Stuczynski",
    "Cat Osterman",
    "Ryan Hall",
    "Candace Parker",
    "Bernard Lagat",
    "Reese Hoffa",
    "Jennie Finch",
    "Breaux Greer",
    "Ryoko Tani",
    "Sanya Richards",
    "Brian Clay",
    "Rau'Shee Warren",
    "Taylor Phinney",
    "Donny Robinson",
    "Melanie Roach",
    "Kristy Coventry",
    "Eric Shanteau",
    "Brad Vering",
    "Laura Wilkinson",
    "Howard Bach",
    "Terrence Trammell",
    "Vladimir Dyatchin",
    "Blanka Vlasic",
    "Novak Djokovic",
    "Matt Emmons",
    "Ali Adnan",
    "Im Dong Hyun",
    "Keeth & Erinn Smart",
    "Haile Gebrselassie",
    "Kyle Shewfelt",
    "Dana Hussein Abdul-Razzaq",
    "Natalie du Toit",
    "torch",
    "rings",
    "race",
    "boris",
    "athletes",
    "athlete",
    "team"
    ];

  $("body").highlight(wordList);

  $(".highlight").css({"background":"black","color":"transparent","transform":"rotate(2deg)","-ms-transform":"rotate(2deg)","-moz-transform":"rotate(2deg)","-webkit-transform":"rotate(2deg)","-o-transform":"rotate(2deg)","display": "inline-block"
  });
  
  var imgSelector = "";
  for (var i = 0; i < wordList.length; i++) {
    imgSelector += "img[src*='" + wordList[i] + "'], img[alt*='" + wordList[i] + "']";
    if (i < wordList.length - 1) {
      imgSelector += ",";
    }
  }

  $(imgSelector).attr("src","http://pebblecode.github.com/fear-the-IOC/img/blank.gif")
    .css({"background":"black","transform":"rotate(-1deg)","-ms-transform":"rotate(-1deg)","-moz-transform":"rotate(-1deg)","-webkit-transform":"rotate(-1deg)","-o-transform":"rotate(-1deg)","display": "inline-block"});
});