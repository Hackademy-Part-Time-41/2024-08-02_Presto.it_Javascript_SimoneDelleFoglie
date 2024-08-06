


fetch('/server/annunci.json')
    .then((response)=>{
       return response.json();
    })
    .then((announcements) => {

        const params= new URLSearchParams(window.location.search);
        const id= params.get('id');
        
        const announcementFound= announcements.find((announcement) => {
            return announcement.id = id;
        })

        console.log(announcementFound);

    })
    .catch((error) => {
        console.error();
    })