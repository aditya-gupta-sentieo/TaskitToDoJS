function Note(id,title,description,done){
  this.id=id;
  this.title=title;
  this.description=description;
  this.done=done;

  this.isDone = function(){
    return done;
  }
  this.toString = function(){
    return "Note #" + this.id + " : " + this.title + " : " + this.description + " Completed?: "+ this.done;
  }
  this.createListItem = function(){
    var li = document.createElement('li');
    var noteDiv = document.createElement('div');
    noteDiv.className += "notediv";
    var title = document.createElement('h4');
    title.innerHTML = this.title;
    var note = this;
    var description = document.createElement('h5');
    description.innerHTML = this.description;

    var checkbox = document.createElement('input');
    checkbox.className+="cb";
    checkbox.setAttribute("type","checkbox");
    checkbox.checked = this.done;

    noteDiv.appendChild(checkbox);

    noteDiv.appendChild(title);

    li.addEventListener("click", function(){
      note.done = !note.done;
      checkbox.checked = note.done;

      li.setAttribute("done",note.done);
      if(note.done){
        title.style.textDecoration="line-through";
        description.style.textDecoration="line-through";
      }
      else{
        title.style.textDecoration="none";
        description.style.textDecoration = "none";
      }

      console.log("this is " + this);
      console.log("note is " + note);

      var div = document.createElement('li');

      //TODO Why is this != the note but is = li element
      div.innerHTML = note.title + " was clicked";
      updateTodoCount();

    });

    var del = document.createElement("i");
    del.className +="del material-icons";
    del.innerHTML="delete";
    del.addEventListener("click",
      function(){
        event.stopPropagation();
        deleteNote(note);
        li.remove();
        updateTodoCount();
      }
    );
    noteDiv.appendChild(del);

    noteDiv.appendChild(description);


    li.setAttribute("desc",this.description);
    li.setAttribute("id","note-"+this.id);
    li.setAttribute("done",this.done);
    li.setAttribute("title",this.title);

    li.className+="note";
    li.appendChild(noteDiv);
    return li;
  }
}

var note1 = new Note(1,"This is a dynamic note title","Lorem ipsum ........",false);
var note2 = new Note(2,"This is a dynamic note title #2","Lorem ipsum ......",false);
var notesArray = [note1,note2];

for(i in notesArray){
  note = notesArray[i];
  appendNewNote(note);
}

function displayArray(){
  console.log('display array called');
  for(i in notesArray){
    note = notesArray[i];
    console.log(note.toString());
  }
}
function createNote(){
  var inputEle = document.getElementById("new-note-input")
  var newTitle = inputEle.value;
  if(newTitle=="")return;

  var descEle = document.getElementById("new-note-desc-input")
  var newDesc = descEle.value;
  inputEle.value = "";
  descEle.value = "";
  var newNote = new Note(5,newTitle,newDesc,false);
  notesArray.push(newNote);
  appendNewNote(newNote);

}
function appendNewNote(note){
  var notesList = document.getElementById("notes-list");
  notesList.appendChild(note.createListItem());
  updateTodoCount();
  filterNotes();
}
function updateTodoCount(){
  var todoEle = document.getElementById("todo-count");
  todoEle.innerHTML=notesArray.filter(x=>!x.done).length.toString();
  filterNotes();
}

function deleteNote(note){

    console.log("note to be deleted is " + note);
    removeFromArray(notesArray,note);
}
function removeFromArray(array,item){
  for(var i=0;i<array.length;i++){
    if(array[i]===item){
      array.splice(i,1);
    }
  }
}
function filterNotes(){

  var hide = document.getElementById("hide-done").checked;
  var filterText = document.getElementById("filter-notes").value.toLowerCase();
  console.log("filterNotestext is " + filterText);
  var noteList = document.getElementById("notes-list").getElementsByTagName("li");
  console.log(noteList);
  for(var i=0;i<noteList.length;i++){
    var item = noteList[i];
    var title = item.getAttribute("title").toLowerCase();
    var desc = item.getAttribute("desc").toLowerCase();
    var done = item.getAttribute("done")=="true";
    var searchMatch = title.includes(filterText) || desc.includes(filterText);
    if((hide&& done) || !searchMatch){
      item.style.display="none";
    }
    else{
      item.style.display= "block";
    }
}
}
