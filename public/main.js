const thumbUp = document.getElementsByClassName("fa-thumbs-up");
const thumbDown = document.getElementsByClassName("fa-thumbs-down");
const trash = document.getElementsByClassName("fa-trash-o");
const plus = document.getElementsByClassName("fa-plus");
const minus = document.getElementsByClassName("fa-minus");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('down', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbDown':thumbDown
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const workout = this.parentNode.parentNode.childNodes[1].innerText
        const sets = this.parentNode.parentNode.childNodes[3].innerText
        const reps = this.parentNode.parentNode.childNodes[5].innerText
        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'workout': workout,
            'sets': sets,
            'reps': reps,

          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



Array.from(plus).forEach(function(element) {
      element.addEventListener('click', function(){
        const workout = this.parentNode.parentNode.childNodes[1].innerText
        const sets = this.parentNode.parentNode.childNodes[3].innerText
        const reps = this.parentNode.parentNode.childNodes[5].innerText
        fetch('/sets', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'workout': workout,
            'sets': sets,
            'reps': reps,
            'change': 1
            // ask loen about this
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


Array.from(minus).forEach(function(element) {
      element.addEventListener('click', function(){
        const workout = this.parentNode.parentNode.childNodes[1].innerText
        const sets = this.parentNode.parentNode.childNodes[3].innerText
        const reps = this.parentNode.parentNode.childNodes[5].innerText
        fetch('/sets', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'workout': workout,
            'sets': sets,
            'reps': reps,
            'change': -1
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});