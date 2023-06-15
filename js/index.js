
let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// 리사이즈
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})


function parseMd(md){

    var md0 = md;
  
    //ul
    md = md.replace(/^\s*\n\*\s/gm, '<ul>\n* ');
    md = md.replace(/^(\*\s.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*\s(.+)/gm, '<li class="before">$1</li>');
    
    //ul
    md = md.replace(/^\s*\n\-\s/gm, '<ul>\n* ');
    md = md.replace(/^(\-\s.+)\s*\n([^\-])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\-\s(.+)/gm, '<li class="before">$1</li>');
    
    //ol
    md = md.replace(/^\s*\n\d\.\s/gm, '<ol>\n1. ');
    md = md.replace(/^(\d\.\s.+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.\s(.+)/gm, '<li>$1</li>');
    
    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
    md = md.replace('</blockquote><blockquote>', '');
    md = md.replace('</blockquote>\n<blockquote>', '\n');

    //hr
    md = md.replace(/[\-]{3}/g, '</div></div><div class="item_wrap"><div class="line">✿</div><div class="item">');
    
    //h
    md = md.replace(/\n[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/\n[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/\n[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/\n[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/\n[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/\n[\#]{1}(.+)/g, '</div></div><div class="item_wrap"><div class="line">✿</div><div class="item"><h1>🎼 $1</h1>');
    
    //images with links
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<div class="gallery"><a href="$3"><img src="$2" alt="$1" width="100%" /></a></div>');
    
    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" width="100%" />');
    
    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
    
    //font styles
    md = md.replace(/[\*]{2}([^\*]+)[\*]{2}/g, '<strong>$1</strong>');
    md = md.replace(/[\*]{1}([^\*]+)[\*]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');


    //주석
    md = md.replace(/\n[\/]{2}(.+)/g, '');
    

    //pre
    
    var mdpos = [];
    var rawpos = [];
    let pos1 = -1;
    let k = 0;

    var diff = [0]

    while( (pos1 = md0.indexOf('\n```', pos1 + 1)) != -1 ) { 
        if (k % 2 == 0){
            rawpos[k] = pos1 + 4;
        } else {
            rawpos[k] = pos1;
        }
        k++;
    }

    let pos2 = -1;
    let l = 0;

    while( (pos2 = md.indexOf('\n```', pos2 + 1)) != -1 ) { 
        if (l % 2 == 0){
            mdpos[l] = pos2 - 1;
        } else {
            mdpos[l] = pos2 + 5;
        }
        l++;
    }


    for (var i = 0; i < mdpos.length; i++){
        if (i % 2 == 0){
            md = md.replace(md.substring(mdpos[i] - diff[i], mdpos[i+1] - diff[i]), '<pre class="code">'+md0.substring(rawpos[i], rawpos[i+1])+'</pre>');

            var mdSubStringLength = mdpos[i+1] - mdpos[i];
            var rawSubStringLength = rawpos[i+1] - rawpos[i] + '<pre class="code">'.length + '</pre>'.length;
            diff[i+2] = diff[i] + mdSubStringLength - rawSubStringLength;

        }
    }

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

    //br
    md = md.replace(/\n\n/g, '</p><p>');
    
    return md;
    
}

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject();
var page = qs.p;
var model = qs.m;


if (!page && !model) {
    var url = "https://raw.githubusercontent.com/jyhyun1008/seodangcat/main/README.md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        document.querySelector(".page_title").innerText = 'MAIN'
        document.querySelector("#post").innerHTML += parseMd(out)
    })
    .catch(err => { throw err });
} else if (page) {
    var url = "https://raw.githubusercontent.com/jyhyun1008/seodangcat/main/page/"+page+".md"
    fetch(url)
    .then(res => res.text())
    .then((out) => {
        document.querySelector(".page_title").innerText = page.substring(page.lastIndexOf('/') + 1)
        document.querySelector("#post").innerHTML += parseMd(out)

    })
    .catch(err => { throw err });
    
} else if (model) {
    async function importModel (model) {
        const mymodel = await tf.loadLayersModel('/models/'+model+'/model.json');
    }
    document.querySelector("#piano-roll").innerHTML = '<canvas id="pianoroll"></canvas>';

    var canvas = document.getElementById('pianoroll');

    resizeCanvasToDisplaySize(canvas); 

    var ctx=canvas.getContext("2d");
    var w = canvas.scrollWidth;    
    var h = canvas.scrollHeight;
    var cellwidth=w/16;
    var cellheight=h/28;

    drawPianoGrid();

    drawNote(2,4,4);
    drawNote(4,8,4);
    drawNote(7,12,1, 'la', true);

    drawPlayHead(357);

    function drawNote(x,y,length, p='a', selected=false){
    x=x*cellwidth;
    y=h - y*cellheight;
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,219,88)";
    if(selected){
        ctx.strokeStyle = "rgb(255,255,255)";
    }else{
        ctx.strokeStyle = "rgb(255,219,88)";
    }
    ctx.rect(x, y, cellwidth*length, cellheight);
    ctx.fill()
    ctx.stroke();

    ctx.font = "16px serif";
    ctx.fillText(p, x, y);
    }

    function drawPlayHead(x){
    ctx.beginPath();    
            ctx.moveTo(x,0);
            ctx.lineWidth = 2;      
            ctx.strokeStyle = "red";
            ctx.lineTo(x,h);
            ctx.shadowBlur=0;
            ctx.stroke();
    }

    function drawPianoGrid(){
    for(y=0;y<w;y=y+cellheight){
        for(x=0;x<w;x=x+cellwidth){
        if(x % 8 ==0){
            ctx.beginPath();    
            ctx.moveTo(x,0);
            ctx.strokeStyle = "white";
            ctx.lineTo(x,h);
            ctx.shadowBlur=0;
            ctx.stroke();
        }
        ctx.beginPath();
        if((y/cellheight) % 12 == 0 || (y/cellheight) % 12 == 2 || (y/cellheight) % 12 == 4 || (y/cellheight) % 12 == 5 || (y/cellheight) % 12 == 7 || (y/cellheight) % 12 == 9 || (y/cellheight) % 12 == 11 ){
            ctx.fillStyle = "rgb(210,210,210)";
        }else{
            ctx.fillStyle = "rgb(40,40,40)";
        }
        ctx.strokeStyle = "rgb(24,24,24)";
        ctx.rect(x, y, cellwidth, cellheight);
        ctx.fill()
        ctx.stroke();
        }
    }
    }

    function resizeCanvasToDisplaySize(canvas) {
    // look up the size the canvas is being displayed
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }

    return false;
    }

}