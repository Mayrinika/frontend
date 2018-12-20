let clickCount = 0;
document.addEventListener("click",
    function() {
        clickCount++;
        console.log("clicked", clickCount);
    });
setInterval(()=>{
	if (clickCount !== 5) {
        console.log("wait");
    } else {
        console.log("5 clicks!");
    }},15);
    



