function Book(title,author,isbn)
{
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}
function bookMethods(){}
bookMethods.prototype.addBook=function(book){
    let row=document.createElement("tr");
    row.innerHTML=`<th>${book.title}</th><th>${book.author}</th><th>${book.isbn}</th><th><span class="cross"><a href="#">&#10006</a></span></th>`;
    document.querySelector("tbody").appendChild(row);
    displayMessage("Book Added","green");  
}
bookMethods.prototype.deleteBook=function(delrow){
    delrow.remove();
    displayMessage("Book Removed","green");
}
bookMethods.prototype.addToStorage=function(book){
    let booklist={};
    if(localStorage.getItem("Booklists"))
        booklist=JSON.parse(localStorage.getItem("Booklists"));  
    booklist[book.isbn]={author:book.author,title:book.title};
    localStorage.setItem("Booklists",JSON.stringify(booklist));
}
bookMethods.prototype.removeFromStorage=function(delrow){
    let isbn=delrow.children[2].innerText.trim();
    console.log(typeof(isbn));
    let booklist=JSON.parse(localStorage.getItem("Booklists"));
    console.log(booklist);
    delete booklist[isbn]
    console.log(booklist);
    localStorage.setItem("Booklists",JSON.stringify(booklist));
}
bookMethods.prototype.loadFromStorage=function(){
    let booklist=JSON.parse(localStorage.getItem("Booklists"));
    for(key in booklist)
    {
        let row=document.createElement("tr");
        row.innerHTML=`<th>${booklist[key].title}</th><th>${booklist[key].author}</th><th>${key}</th><th><span class="cross"><a href="#">&#10006</a></span></th>`;
        document.querySelector("tbody").appendChild(row);
    }


}
window.onload=function(){
    document.querySelector("input[type=\"submit\"]").addEventListener("click",callback1);
    document.querySelector("table").addEventListener("click",callback2);
    let bm=new bookMethods();
    bm.loadFromStorage();
}
function callback1(ev){
    let title=document.getElementById("title").value.trim();
    let author=document.getElementById("author").value.trim();
    let isbn=parseInt(document.getElementById("isbn").value);
    if(title=="" || author=="" || isNaN(isbn))
    {
        displayMessage("Please fill in all the fields","red");
        return;
    }
    document.querySelectorAll("input:not(input[type=\"submit\"])").forEach(function(elem){elem.value=""});
    let newbook=new Book(title,author,isbn);
    let bm=new bookMethods();
    bm.addBook(newbook);
    bm.addToStorage(newbook);
    ev.preventDefault();
}
function callback2(ev){
    if(ev.target.parentNode.className=="cross")
    {
        let bm=new bookMethods();
        let row=ev.target.closest("tr");
        bm.removeFromStorage(row);
        bm.deleteBook(row)
    }
}
function displayMessage(msg,color)
{
    document.querySelector(".message").innerText=msg;
    document.querySelector(".message").classList.add(color);
    $(".message").slideDown(300);
    window.setTimeout(function(){
        $(".message").slideUp(300,function(){
            document.querySelector(".message").innerText="";
            document.querySelector(".message").classList.remove(color);
        });
    },3000);

}