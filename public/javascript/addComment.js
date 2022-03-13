async function newFormHandler(event){
    event.preventDefault();

    let comment_text = document.querySelector('input[name="comment_text"]:checked') !==null;
    let atmosphere = document.querySelector('input[name="atmosphere"]:checked') !==null;
    let staff_experience = document.querySelector('input[name="staff_experience"]:checked') !==null;
    let speed = document.querySelector('input[name="speed"]:checked') !==null;
    let rating = document.querySelector('input[name=rating]').value
    let comment = document.querySelector('textarea[name=comment]').value.trim();
    let restaurant_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
   
      let attributesArray = [comment_text, atmosphere, staff_experience, speed, rating, comment]

      for (let i = 0; i < attributesArray.length; i++){
          if (attributesArray[i] === true){
              attributesArray[i] = "checked"
          } else {
              attributesArray[i] = null
          }
      }

      comment_text = attributesArray[0];
      atmosphere = attributesArray[1]
      staff_experience = attributesArray[2]
      speed = attributesArray[3],
      rating = attributesArray[4]


    console.log(comment_text, atmosphere, staff_experience, speed, comment, restaurant_id)

    const response = await fetch (`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
           comment_text,
           atmosphere,
           staff_experience,
           speed,
           rating,
           comment,
           restaurant_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
};

document.querySelector('#submit-review-btn').addEventListener('click', newFormHandler);