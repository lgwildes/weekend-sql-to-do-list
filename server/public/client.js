

console.log('in client.js')

$( document ).ready(function(){
    console.log('JQ')

    getList();
    $('#addBtn').on('click', addTask)
});

function addTask() {
    const taskToSend = {
        task: $('#taskInput').val()
    }
    console.log('new task added ✅', taskToSend)

    $.ajax({
        method:'POST',
        url:'/list' ,
        data: taskToSend
    })
    .then((response) => {
        console.log(response);
        getList();
    })
    .catch((err) => {
        console.log('POST task error', err);
    })
}

function getList(){
    console.log('Here is the to do list:')

    $.ajax({
        method:'GET',
        url: '/list'
    })
    .then((response) =>{
        console.log('response from database is:', response);

        for(chore of response){
            $('#listTable').append(`
            <tr>
                <td>${chore.task}</td>
            </tr>
        `)
        }
        
    })
}