import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
//const commentDeleteBtn = document.getElementById("jsCommentDeleteButton");
const commentDeleteBtns = document.getElementsByClassName("video__comment-delete");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
}

const deleteComment = async () => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/delete-comment`,
        method: "POST"
        // TODO: Find out the id of the comment and send it in a form of data.
    });
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if (response.status == 200) {
        addComment(comment)
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const commnetInput = addCommentForm.querySelector("input");
    const comment = commnetInput.value;
    sendComment(comment);
    commnetInput.value = "";
}

const handleClick = (event) => {
    event.preventDefault();
    const commentDeleteBtn = addCommentForm.querySelector("button");
    console.log(commentDeleteBtn.id);
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
    // commentDeleteBtn.addEventListener("click", deleteComment);
    for (let i = 0; i < commentDeleteBtns.length; i++) {
        commentDeleteBtns[i].addEventListener("click", handleClick);
    }
}

if (addCommentForm) {
    init();
}