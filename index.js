proxy = 'https://hasocgermanannotation.el.r.appspot.com'

async function displayTweetForAnnotate(tweet_id) {
    //document.getElementById("submitlabels").style.display = 'block';
    const response = await fetch(proxy + '/tweet_for_annotation/' + tweet_id)
    if (response.status === 200) {
        var data = await response.json();
        //console.log(data)
        data = data['tweet']
            //console.log(data)
        labels = data['labels']
            //console.log(labels)
        document.getElementById('main_tweet_id').value = data.tweet_id;
        //localStorage.setItem('tweet_id', data.tweet_id)

        //main tweet_id
        tab_1 = `<ul class="list-group affix my-3 sticky-top" id="top_tweet">
        <li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary" id="main_tweet">
            <span class="w-90">${data.tweet}</span>`
        if (labels[tweet_id] == 'SHOF') {
            tab_1 += `<div class="btn-group" data-toggle="buttons">
                <label class="btn btn-danger form-check-label mr-3">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="SHOF" checked>SHOF</label>
                <label class="btn btn-info form-check-label mr-3">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="CHOF" >CHOF</label>
                <label class="btn btn-success form-check-label">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="NONE">NONE</label>
                </div></li></ul>`
        } else if (labels[tweet_id] == 'CHOF') {
            tab_1 += `<div class="btn-group" data-toggle="buttons">
                <label class="btn btn-danger form-check-label mr-3">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="SHOF" >SHOF</label>
                <label class="btn btn-info form-check-label mr-3">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="CHOF" checked>CHOF</label>
                <label class="btn btn-success form-check-label">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="NONE">NONE</label>
                </div></li></ul>`
        } else if (labels[tweet_id] == 'NONE') {
            tab_1 += `<div class="btn-group" data-toggle="buttons">
                <label class="btn btn-danger form-check-label mr-3">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="SHOF">SHOF</label>
                <label class="btn btn-info form-check-label mr-3">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="CHOF">CHOF</label>
                <label class="btn btn-success form-check-label">
                <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${data.tweet_id}" value="NONE" checked>NONE</label>
                </div></li></ul>`
        }
        document.getElementById('top_tweet').innerHTML = tab_1;
        tab = ``
        if (data.comments.length > 0) {
            for (let comm of data.comments) {
                tab += `<div class="mb-3">
                <li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend comment list-group-item-secondary">
                    <span class="comment w-90">${comm.tweet}</span>`
                if (labels[comm.tweet_id] === 'SHOF') {
                    tab += `<div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-danger form-check-label mr-3">
                    <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="SHOF" checked>SHOF</label>
                    <label class="btn btn-info form-check-label mr-3">
                    <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="CHOF" >CHOF</label>
                    <label class="btn btn-success form-check-label">
                    <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="NONE">NONE</label>
                    </div></li>`
                } else if (labels[comm.tweet_id] === 'CHOF') {
                    tab += `<div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="SHOF" >SHOF</label>
                        <label class="btn btn-info form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="CHOF" checked>CHOF</label>
                        <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="NONE" >NONE</label>
                        </div></li>`
                } else {
                    tab += `<div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="SHOF" >SHOF</label>
                        <label class="btn btn-info form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="CHOF" >CHOF</label>
                        <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${comm.tweet_id}" value="NONE" checked>NONE</label>
                        </div></li>`
                }
                if ('replies' in comm) {
                    for (let rep of comm.replies) {
                        tab += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
                        <span class="reply w-90">${rep.tweet}</span>`
                        if (labels[rep.tweet_id] === 'SHOF') {
                            tab += `<div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="SHOF" checked>SHOF</label>
                        <label class="btn btn-info form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="CHOF" >CHOF</label>
                        <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="NONE">NONE</label>
                        </div></li>`
                        } else if (labels[rep.tweet_id] === 'CHOF') {
                            tab += `<div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-danger form-check-label mr-3">
                            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="SHOF" >SHOF</label>
                            <label class="btn btn-info form-check-label mr-3">
                            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="CHOF" checked>CHOF</label>
                            <label class="btn btn-success form-check-label">
                            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="NONE" >NONE</label>
                            </div></li>`
                        } else {
                            tab += `<div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-danger form-check-label mr-3">
                            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="SHOF" >SHOF</label>
                            <label class="btn btn-info form-check-label mr-3">
                            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="CHOF" >CHOF</label>
                            <label class="btn btn-success form-check-label">
                            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${rep.tweet_id}" value="NONE" checked>NONE</label>
                            </div></li>`
                        }

                    }

                }

               tab+=`</div>`
            } 
        }


        document.getElementById('top_tweet').innerHTML = tab_1;
        document.getElementById("comments_replies").innerHTML = tab;
        $('tweets_by_user').modal('show');
    }
}



////// DONE  //////
async function display_tweets_by_user() {
    let name = localStorage.getItem('name');
    url = proxy + '/list_tweets'
    let response = await fetch(url)
    if (response.status === 200) {
        var data = await response.json();
        data = data.data
            //console.log(data)
        if (data.length === 0) {
            tab = `<h1 class="my-3">No Assigned Tweets.......!</h1>`
        } else {
            //console.log(data)
            tab = ``
            for (let key of data) {
                {
                    tab += `<tr>

            <td class="align-middle">${key['tweet_id']}</td>
            <td class="align-middle">${key['tweet']}</td>`

                    btn = `<td class="align-middle"><button class="btn btn-info" id="${key['tweet_id']}" onclick="displayTweetForAnnotate(this.id)" data-dismiss="modal">Annotate</button></td></tr>`
                }
                tab += btn
            }
        }
        document.getElementById("show_tweets_for_user").innerHTML = tab;
        $('tweets_by_user').modal('show');
    }

}


async function addLabel(id, label) {
    //console.log(id + ' ' + label)
    //var formElements = document.getElementById("labels_form").elements;
    var tweet_id = document.getElementById("main_tweet_id").value;
    //console.log(tweet_id); //localStorage.getItem('tweet_id')
    //let name = localStorage.getItem('name')
    //console.log(tweet_id)
    $.ajax({
        type: 'POST',
        url: proxy + '/tweet_for_annotation/' + tweet_id,
        //contentType: "application/json; charset=utf-8",  
        //dataType: 'json',  
        headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify({ 'id': id, 'label': label }),
        async: true,
        success: function(response) {
            myparent = $('[name=' + id + ']').parent().parent();
            //console.log(myparent)
            if (label == "SHOF") {
                innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="SHOF" checked>
            SHOF
          </label>
          <label class="btn btn-info form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="CHOF">
            CHOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="NONE"> NONE
          </label>`
            } else if (label == "CHOF") {
                innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="SHOF" >
            SHOF
          </label>
          <label class="btn btn-info form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="CHOF" checked>
            CHOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="NONE"> NONE
          </label>`
            } else if (label == "NONE") {
                innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="SHOF" >
            SHOF
          </label>
          <label class="btn btn-info form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="CHOF">
            CHOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.value)" type="radio" name="${id}" value="NONE" checked> NONE
          </label>`
            }
            myparent.html(innerhtml)

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}
