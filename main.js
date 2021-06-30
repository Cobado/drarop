window.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".js-drag")
  let current = null
  
  function getData() {
    const listData = [];
    document.querySelectorAll('.js-drag').forEach( function(item, index){
      listData.push( item.innerHTML );
    });
  }
  
  for (let i of items) {
    i.draggable = true;
    
    i.addEventListener("dragstart", function() {
      current = this;
      for (let it of items) {
        if (it != current) {
          it.classList.add("hint");
        }
      }
    });

    i.addEventListener("dragenter", function() {
      if (this != current) {
        this.classList.add("active");
      }
    });

    i.addEventListener("dragleave", function() {
      this.classList.remove("active");
    });

    i.addEventListener("dragend", function() {
      for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
      getData();
    });

    i.addEventListener("dragover", function(e) {
      e.preventDefault();
    });

    i.addEventListener("drop", function(e) {
      e.preventDefault();
      if (this != current) {
        let currentpos = 0,
            droppedpos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) {
            currentpos = it;
          }
          if (this == items[it]) {
            droppedpos = it;
          }
        }
        if (currentpos < droppedpos) {
          this.parentNode.insertBefore(current, this.nextSibling);
        } else {
          this.parentNode.insertBefore(current, this);
        }
      }
    });
  }
})


