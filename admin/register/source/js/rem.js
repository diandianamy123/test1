function rem(){
    let width = document.documentElement.clientWidth|| window.innerWidth

    let size = width/7.5
    
    let _style=document.createElement('style')
    _style.innerHTML=`
        html{font-size:${size}px}
    `
    document.head.appendChild(_style)
}

window.onload=rem()
window.onresize=rem()