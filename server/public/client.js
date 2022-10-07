

console.log('in client.js');

$( document ).ready(function(){
    console.log('JQ');

    //render current list to DOM
    getList();
    //on click of add button call addTask function
    $('#addBtn').on('click', addTask);
    //on click of buttons that WILL exist but don't yet
    $('body').on('click', '#completeBtn', markComplete);
    $('body').on('click', '#deleteBtn', deleteTask);
});

// send AJAX request to router 
function addTask() {
    const taskToSend = {
        task: $('#taskInput').val()
    }
    console.log('new task added ✅', taskToSend)

    $.ajax({
        method:'POST',
        url:'/list' ,
        data: taskToSend //variable containing our task input data from client
    })
    .then((response) => {
        console.log(response);
        getList();
    })
    .catch((err) => {
        console.log('POST task error', err);
    })
}

//function to render list on ready and after add/complete/delete
function getList() {

    $.ajax({
        method:'GET',
        url: '/list'
    })
    .then((response) =>{                    //response = list.rows
        console.log('response from database is:', response);
        $('#listTable').empty(); //empty before appending updated data
        //loop through all tasks in database and append with buttons
        for(chore of response){
            
            $('#listTable').append(`
            <tr>
                <td>${chore.task}</td>
                <td>
                    <button class="btn" id="completeBtn" data-id=${chore.id} >Complete</button>
                </td>
                <td>
                    <button class="btn" id="deleteBtn" data-id=${chore.id} >Delete</button>
                </td>
            </tr>
        `)
        }
        
    })
}

function markComplete() {
    console.log('client marked task as complete 🥳');
    //get the specific task ID
    const taskID = $(this).data('id');
    console.log('TESTING FOR DATA', $(this).data('id'))
    //PUT request to change status of completed from false to true
    $.ajax({
        method:'PUT',
        url: `/list/${taskID}`
    })
    .then((res) => {
        console.log('task saved as complete ✔️')
        getList();
    })
    .catch((err) => {
        console.log('PUT list error', err);
    })

}

function deleteTask() {
    const taskID = $(this).data('id');
    console.log('TESTING FOR DATA TO DELETE', $(this).data('id'))

    $.ajax({
        method:'DELETE',
        url: `/list/${taskID}`
    })
    .then((res) => {
        console.log('task successfully deleted!');
        getList(); //render update to DOM
    })
    .catch((err) => {
        console.log('DELETE error', err);
    })
}